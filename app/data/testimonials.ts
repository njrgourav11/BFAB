export interface Testimonial {
    id: number;
    quote: string;
    name: string;
    username?: string; // Optional since original data didn't have it, or we can derive it
    avatar: string;
    pet?: string;
    rating?: number;
    verified?: boolean;
}

export const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Noah the beagle',
        quote: 'Food with Hemp oil drops, ever since I started using Hemp seed oil of @begginforabite Noah\'s appetite has noticeably increased! She now enjoys her meals with excitement, making mealtime a happy and satisfying moment for both of us. A small addition with big benefits, healthy, happy, and always ready for her next bite!',
        avatar: '/review/3.svg',
        pet: 'Beagle',
        rating: 5,
        verified: true,
        username: '@noah_the_beagle'
    },
    {
        id: 2,
        name: 'Binit Soreng',
        quote: "My pup Berry's overall health and skin condition improved drastically after using this supplement for just 5 weeks. Earlier, he struggled with ticks, dry skin, and excessive hair fall. But after starting this Ashwagandha + Hemp Protein supplement, his coat became healthier, his skin improved, and the shedding reduced a lot.",
        avatar: '/review/Golden-Retriever.webp',
        pet: 'Dog',
        rating: 5,
        verified: true,
        username: '@binit_soreng'
    },
    {
        id: 3,
        name: 'Sudeshna Jena',
        quote: 'I honestly didn\'t expect such a big difference, but these supplements have been a blessing for my pet. What I love the most is how clean and natural the ingredients are, it gives me peace of mind every time I use it. And the best part? My pupper actually enjoys it! No more forcing or mixing tricks… he happily finishes every meal when this is added on top.',
        avatar: '/review/2.svg',
        pet: 'Dog',
        rating: 5,
        verified: true,
        username: '@sudeshna_jena'
    },
];
