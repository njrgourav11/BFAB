import { NextRequest, NextResponse } from 'next/server';

const PROJECT_ID = 'bfab-d83b9';
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

/**
 * POST /api/admin/reset-orders
 * Body: { idToken: string }
 *
 * Lists all documents in the `orders` collection and deletes them one by one
 * using the caller's Firebase ID token (must be an admin).
 * Runs in batches and streams progress back as newline-delimited JSON.
 */
export async function POST(req: NextRequest) {
    const { idToken } = await req.json();
    if (!idToken) {
        return NextResponse.json({ error: 'Missing idToken' }, { status: 401 });
    }

    const authHeader = `Bearer ${idToken}`;

    // Collect all order document names (paginated with pageToken)
    const docNames: string[] = [];
    let pageToken: string | undefined;

    do {
        const url = `${BASE_URL}/orders?pageSize=300${pageToken ? `&pageToken=${pageToken}` : ''}`;
        const res = await fetch(url, { headers: { Authorization: authHeader } });
        if (!res.ok) {
            const body = await res.text();
            return NextResponse.json({ error: `Firestore list failed: ${body}` }, { status: res.status });
        }
        const data = await res.json();
        if (data.documents) {
            for (const d of data.documents) docNames.push(d.name);
        }
        pageToken = data.nextPageToken;
    } while (pageToken);

    // Delete each document
    let deleted = 0;
    for (const name of docNames) {
        const deleteUrl = `https://firestore.googleapis.com/v1/${name}`;
        const res = await fetch(deleteUrl, {
            method: 'DELETE',
            headers: { Authorization: authHeader },
        });
        if (res.ok || res.status === 404) {
            deleted++;
        }
    }

    return NextResponse.json({ deleted, total: docNames.length });
}
