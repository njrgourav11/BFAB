import Link from 'next/link';

export default function VetProfessionalsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a1512] flex flex-col">
      <section className="py-20 flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-slate-900 rounded-3xl p-12 border-2 border-gray-100 dark:border-slate-800 shadow-sm">
            <span className="text-6xl mb-6 block">🩺</span>
            <h2 className="text-3xl font-bold text-[#11241f] dark:text-white mb-6">More coming soon!</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
              We are building out dedicated resources, research, and partnership tools for veterinary professionals. Check back soon.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
