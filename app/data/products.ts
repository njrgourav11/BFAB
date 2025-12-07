export interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
  images: string[];
  rating: number;
  reviews: number;
  description: string;
  benefits: string[];
  category: string;
  inStock: boolean;
  weight: string;
  petType: 'Canine' | 'Feline' | 'Both';
  productCategory: 'Treats' | 'Cat Food' | 'Supplements' | 'Grooming';
  // New detailed fields
  longDescription?: string;
  ingredients?: { name: string; description: string }[];
  feedGuide?: string[];
  storage?: string[];
  detailedBenefits?: { title: string; description: string }[];
  faqs?: { question: string; answer: string }[];
  detailedReviews?: { name: string; rating: number; text: string; date?: string; verified?: boolean }[];
  vetApproval?: { quote: string; doctorName: string; qualification: string };
  processSteps?: { title: string; description: string }[];
  whyUnique?: { title: string; points: string[] }[];
}

export const products: Product[] = [
  {
    id: 1,
    name: 'BFAB Peanut Butter for Dogs - 100% Roasted Peanuts',
    price: '₹349',
    originalPrice: '₹599',
    images: ['/products/1/20.png', '/products/1/21.png', '/products/1/22.png', '/products/1/23.png', '/products/1/24.png'],
    rating: 5.0,
    reviews: 400,
    description: 'Creamy & Thick Texture | No Artificial Preservatives | Pets Supplements | ISO & FSSAI Certified | Vet Approved',
    longDescription: 'BFAB Peanut Butter for Dogs is crafted from 100% roasted peanuts to deliver pure, wholesome goodness with every scoop. Free from added sugar, salt, xylitol, or artificial preservatives, it offers a naturally creamy, protein-rich treat that supports your dog’s daily energy needs. Packed with healthy fats, antioxidants, and essential nutrients, it helps promote strong muscles, a shiny coat, and overall vitality. Its smooth texture makes it perfect for training, enriching toys, hiding medication, or simply adding flavour to meals. Gentle on the stomach and irresistibly tasty, this clean, nutritious peanut butter is the ideal everyday reward for dogs of all ages, keeping them active, happy, and tail-wagging satisfied.',
    benefits: [
      'Boosts Energy & Vitality',
      'Supports Skin & Coat Health',
      'Promotes Muscle Strength',
      'Encourages Mental Stimulation',
      'Easy to Digest & Gentle on the Stomach',
      'Ideal as a Treat or Meal Topper'
    ],
    detailedBenefits: [
      { title: 'Boosts Energy & Vitality', description: 'Made from 100% roasted peanuts, it provides natural healthy fats and protein that help maintain steady energy and overall activity levels.' },
      { title: 'Supports Skin & Coat Health', description: 'Rich in essential fatty acids and antioxidants that nourish the skin, reduce dryness, and promote a healthy, shiny coat.' },
      { title: 'Promotes Muscle Strength', description: 'The high-quality plant protein helps support strong muscles, making it a great addition for active and growing dogs.' },
      { title: 'Encourages Mental Stimulation', description: 'Perfect for stuffing toys or enrichment activities, helping reduce boredom and promote healthier behaviour.' },
      { title: 'Easy to Digest & Gentle on the Stomach', description: 'With no added sugar, salt, or preservatives, it’s a clean, natural treat that supports easy digestion for most dogs.' },
      { title: 'Ideal as a Treat or Meal Topper', description: 'Versatile and tasty, it can be used for training, hiding medicines, or enhancing meal flavour, making feeding time more enjoyable.' }
    ],
    ingredients: [
      { name: '100% Roasted Peanuts', description: 'A natural source of protein and healthy fats that support strong muscles, steady energy, and a shiny coat. Rich in vitamins and antioxidants, they promote overall well-being and make treats naturally tasty for dogs.' }
    ],
    feedGuide: [
      'Serve as a treat, reward, or meal topper based on your dog’s size, age, and activity level.',
      'Start with a small amount and gradually increase to ensure your dog tolerates it well.',
      'Use a teaspoon for small dogs (½–1 tsp), 1–2 teaspoons for medium dogs, and 1–1½ tablespoons for large dogs.',
      'Perfect for lick mats, enrichment toys, training sessions, or mixing with food.',
      'Always provide fresh drinking water and monitor your dog while feeding.',
      'Not recommended for dogs with peanut allergies or pancreatitis.'
    ],
    storage: [
      'Store the peanut butter in a cool, dry place away from direct sunlight.',
      'After opening, keep the jar tightly sealed to maintain freshness.',
      'Stir well if natural oil separation occurs.',
      'Refrigeration is optional but can help extend shelf life.',
      'Do not allow moisture to enter the jar, and always use a clean spoon to avoid contamination.'
    ],
    vetApproval: {
      quote: 'This 100% roasted peanut butter is a healthy, digestible, and enrichment-friendly option for dogs. With no sugar, salt, or additives, it provides clean energy, supports skin and coat health, and makes an excellent reward or meal topper. A safe, natural choice recommended for dogs of all sizes.',
      doctorName: 'Dr. Lokhnath Mishra',
      qualification: 'MVSc. Veterinary Physician'
    },
    processSteps: [
      { title: 'Sourced With Purity in Mind', description: 'We begin with the finest, high-quality peanuts, carefully selected and naturally grown to ensure maximum freshness and flavour.' },
      { title: 'Slow Roasting for Rich Flavour', description: 'The peanuts are gently slow-roasted to enhance their natural aroma and nutrient profile, creating a richer, deeper flavour dogs love.' },
      { title: 'Stone-Ground for Creamy Texture', description: 'Each batch is ground to a smooth, creamy consistency without adding sugar, salt, oils, or preservatives, keeping it 100% natural and dog-safe.' },
      { title: 'Quality Checked & Packed Fresh', description: 'Every jar undergoes strict quality checks before being sealed to lock in freshness, purity, and clean nutrition, ready for your dog\'s daily enjoyment.' }
    ],
    whyUnique: [
      { title: 'Made From 100% Roasted Peanuts', points: ['Slow-roasted to enhance natural flavour, retain essential nutrients, and create a creamy, protein-rich treat that’s wholesome, digestible, and irresistibly tasty for dogs.'] }
    ],
    faqs: [
      { question: 'Is BFAB Peanut Butter safe for all dogs?', answer: 'Yes! It is made from 100% roasted peanuts with no sugar, salt, xylitol, or preservatives, making it safe for most dogs. However, dogs with peanut allergies or pancreatitis should avoid it.' },
      { question: 'How can I use peanut butter for my dog?', answer: 'You can serve it as a treat, use it on lick mats (we provide a free lick mat for 1Kg pack), fill enrichment toys, hide medicines, or mix it with meals. It’s versatile, tasty, and great for training or mental stimulation.' },
      { question: 'How much peanut butter can I give my dog?', answer: 'Serve in moderation. Small dogs: ½–1 tsp, Medium: 1–2 tsp, Large: 1–1½ tbsp. Always introduce slowly to avoid digestive upset.' },
      { question: 'Does peanut butter help with training?', answer: 'Absolutely! Its natural aroma and creamy texture make it a high-value reward that keeps dogs focused, motivated, and eager to learn during training sessions.' },
      { question: 'Is this peanut butter easy to digest?', answer: 'Yes. Since it\'s made from 100% roasted peanuts with no additives, it’s gentle on the stomach and easy to digest for most dogs. Start with small amounts to check tolerance.' },
      { question: 'How should I store BFAB Peanut Butter for Dogs?', answer: 'Keep it in a cool, dry place, away from direct sunlight. After opening, seal the jar tightly. Stir if natural oil separation occurs. Refrigeration is optional but helps extend freshness.' }
    ],
    detailedReviews: [
      { name: 'Arjun Rao', rating: 5, text: 'My dog Bruno absolutely loves this peanut butter! He licks the spoon clean every time, and it’s now his favourite treat during training.', date: '2 days ago', verified: true },
      { name: 'P. Amit', rating: 4.5, text: 'I’ve tried many peanut butters for my dog Luna, but this one is the cleanest and freshest. No added sugar or salt, just pure goodness!', verified: true },
      { name: 'Pallavi Mund', rating: 4.5, text: 'Milo goes crazy the moment he hears the jar open. It’s perfect for stuffing his toys and keeps him busy for a long time.', verified: true },
      { name: 'Radhika Mishra', rating: 5, text: 'My pupper Coco has a sensitive stomach, but this peanut butter works really well for her. Easy to digest and super tasty!', verified: true },
      { name: 'Divya Sahu', rating: 4, text: 'Love how creamy and fresh it is. My golden retriever Simba loves it as a meal topper, makes him finish his bowl happily.', verified: true },
      { name: 'Domnic King', rating: 5, text: 'I use this peanut butter on the lick mat during grooming. Keeps my dog Rocky calm and fully engaged. Really helpful!', verified: true },
      { name: 'Reema Sharma', rating: 4.5, text: 'My pug Simba struggles with appetite sometimes, but adding a little bit of this peanut butter really encourages him to eat.', verified: true },
      { name: 'Ujjwal Nayak', rating: 4.5, text: 'Very impressed with the quality. No oil separation issues and smells exactly like freshly roasted peanuts. My dog Hazel loves it!', verified: true },
      { name: 'Prem Kumar', rating: 5, text: 'It’s now a must-have in our home. From training to enrichment toys, this peanut butter makes everything easier and more fun for my dog Tuffy.', verified: true },
      { name: 'Priyanka Ray', rating: 5, text: 'Perfect for hiding medicines! My senior dog Oreo takes his pills without any fuss now. Big win for us.', verified: true }
    ],
    category: 'Dog Treats',
    inStock: true,
    weight: '500g',
    petType: 'Canine',
    productCategory: 'Treats'
  },
  {
    id: 2,
    name: 'BFAB Oven Baked Kitten Kibbles - Chicken & Tuna Fish',
    price: '₹329',
    originalPrice: '₹399',
    images: ['/products/2/3.png', '/products/2/4.png', '/products/2/5.png', '/products/2/6.png', '/products/2/7.png'],
    rating: 5.0,
    reviews: 400,
    description: 'Oven Baked, Omega FA | No Artificial Preservatives | Pets Supplements | ISO & FSSAI Certified | Vet Approved',
    longDescription: 'The perfect everyday meal for your growing kitten, crafted with real chicken and tuna for wholesome, high-quality nutrition! Our oven-baked kitten Kibbles are gently cooked to lock in natural flavour and essential nutrients, without any nasties or heavy processing. Enriched with taurine for heart and brain development, tuna oil for Omega fatty acids, and psyllium husk for natural hairball control, each bite supports healthy growth from the inside out. With added prebiotics, high fibre, and a crunchy, digestion-friendly texture, it’s a nourishing, delicious, and complete meal made to keep your kitten active, happy, and thriving every single day.',
    benefits: [
      'Supports Healthy Growth & Development',
      'Oven-Baked for Better Nutrition',
      'Promotes Heart & Brain Health',
      'Aids Digestion & Gut Health',
      'Manages Hairballs Naturally',
      'Supports Skin & Coat Shine'
    ],
    detailedBenefits: [
      { title: 'Supports Healthy Growth & Development', description: 'Made with real chicken and tuna fish, the formula provides essential proteins that help build strong muscles and support healthy kitten development.' },
      { title: 'Oven-Baked for Better Nutrition', description: 'The gentle oven-baking process helps retain nutrients, enhances flavour, and creates a crunchier texture that’s easier to digest than high-heat extruded kibble.' },
      { title: 'Promotes Heart & Brain Health', description: 'Enriched with taurine, a vital amino acid that supports heart strength, eye health, and healthy cognitive development in kittens.' },
      { title: 'Aids Digestion & Gut Health', description: 'Contains prebiotics and high-fibre ingredients that support smooth digestion, healthy stool quality, and overall gut balance.' },
      { title: 'Manages Hairballs Naturally', description: 'Formulated with psyllium husk, which helps reduce hairball formation and supports healthy bowel movement.' },
      { title: 'Supports Skin & Coat Shine', description: 'With tuna oil rich in Omega fatty acids, it nourishes the skin, promotes a shiny coat, and supports overall immune health.' }
    ],
    ingredients: [
      { name: 'Chicken Meal', description: 'A highly concentrated, high-quality protein source that provides essential amino acids for strong muscle development. It supports healthy growth, boosts energy, and helps kittens build a solid foundation during their crucial early months.' },
      { name: 'Corn', description: 'A natural, energy-dense carbohydrate that fuels playful activity and daily movement. Its added fibre helps support digestive health, ensuring your kitten stays active, energetic, and satisfied.' },
      { name: 'Fish Meal', description: 'Rich in Omega-3 and Omega-6 fatty acids, fish meal promotes healthy brain development and cognitive function. It also nourishes the skin and coat, giving kittens a soft, shiny fur texture as they grow.' },
      { name: 'Brown Rice', description: 'A wholesome, fibre-packed grain that gently supports digestion and gut health. It releases energy slowly, keeping kittens full and energised throughout the day.' },
      { name: 'Rice', description: 'A soft, easily digestible carbohydrate ideal for delicate kitten stomachs. It helps maintain consistent energy and supports smooth digestion.' },
      { name: 'Gluten-Free Meal', description: 'A gentle, hypoallergenic ingredient formulated for kittens with food sensitivities. It aids in reducing digestive discomfort and promotes easier nutrient absorption.' },
      { name: 'Cassava', description: 'A clean, grain-free carbohydrate that delivers balanced energy without irritating the digestive system. Perfect for kittens requiring a simple, stomach-friendly nutrition source.' },
      { name: 'Chicken Fat', description: 'A flavourful source of Omega fatty acids that nourish skin health and give coats a glossy shine. Also serves as a tasty energy booster for growing kittens.' },
      { name: 'Tuna Oil', description: 'Packed with Omega-3 and Omega-6 fatty acids, it supports heart health, brain development, and joint mobility. It enhances coat shine and strengthens the immune system for growing kittens.' },
      { name: 'Yucca Schidigera Extract', description: 'Known for reducing stool odour naturally, improving the overall litter box experience. It supports better digestion and can help improve nutrient absorption.' },
      { name: 'Yeast Extract', description: 'A rich provider of B-vitamins, minerals, and natural nutrients that boost immunity. It helps support healthy metabolism and overall vitality in developing kittens.' },
      { name: 'Psyllium Husk', description: 'A natural fibre source that regulates bowel movements and helps control hairballs. It keeps digestion smooth, preventing discomfort and digestive blockages.' },
      { name: 'Antioxidants', description: 'Provide essential cellular protection by combating free radicals and oxidative stress. They support immunity, long-term health, and overall growth in kittens.' }
    ],
    feedGuide: [
      'Serve as a dry meal directly from the pack, according to your kitten’s age, weight, and activity level.',
      'Introduce gradually by mixing the kibble with your kitten’s current food over 5–7 days to avoid digestive upset.',
      'Ensure that fresh, clean drinking water is always available.',
      'For kittens younger than 12 months, feed 2–3 small meals daily to support healthy growth.',
      'Refer to the feeding chart on the pack for specific gram/day recommendations.'
    ],
    storage: [
      'Store in a cool, dry place. Away from direct sunlight & heat.',
      'Make sure that the zip pouch is properly closed after each feeding.',
      'Ensure that your pet has permanent access to fresh water.',
      'Not for human consumption.'
    ],
    vetApproval: {
      quote: 'This oven-baked kitten kibble provides a gentle, nutrient-rich diet that supports healthy growth. With taurine for heart and brain development, tuna oil for Omega fatty acids, and prebiotics for smooth digestion, it offers a safer, more wholesome alternative to heavily processed kibble, making it an excellent choice for your kitten’s daily wellbeing.',
      doctorName: 'Dr. Lokhnath Mishra',
      qualification: 'MVSc. Veterinary Physician'
    },
    processSteps: [
      { title: 'Made With Real, Premium Ingredients', description: 'We start with high-quality chicken, tuna, healthy fats, and natural fibres—carefully selected to support healthy growth and easy digestion in kittens.' },
      { title: 'Gentle Oven-Baking Process', description: 'Each batch is slowly oven-baked at low temperatures to lock in natural nutrients, enhance flavour, and create a crunchy texture that kittens love.' },
      { title: 'Enriched With Essential Nutrients', description: 'The kibble is fortified with taurine, Omega fatty acids, psyllium husk, antioxidants, and prebiotics to support heart health, brain development, coat shine, digestion, and hairball control.' },
      { title: 'Quality Checked & Packed Fresh', description: 'Every kibble is inspected for consistency, texture, and safety before being sealed to maintain freshness—ensuring your kitten receives pure, wholesome nutrition in every bite.' }
    ],
    whyUnique: [
      { title: 'Oven-Baked for Superior Nutrition', points: ['Gently cooked at low temperatures to lock in natural flavour, preserve essential nutrients, and create a crunchy, easy-to-digest kibble for growing kittens.'] }
    ],
    faqs: [
      { question: 'Is BFAB Oven-Baked Kitten Kibble suitable for all breeds?', answer: 'Yes! This kibble is formulated for all kitten breeds up to 12 months of age. It provides balanced nutrition with real chicken, tuna, taurine, and Omega fatty acids to support healthy overall growth.' },
      { question: 'What makes oven-baked kibble better than regular kibble?', answer: 'Oven-baked kibble is cooked slowly at low temperatures, helping retain natural nutrients and flavour while creating a crunchier, more digestible texture. It’s less processed and easier on a kitten’s stomach compared to high-heat extruded kibble.' },
      { question: 'Does this kibble help with hairballs?', answer: 'Yes. It contains psyllium husk, a natural high-fibre ingredient that helps control hairballs by supporting smooth digestion and regular bowel movements.' },
      { question: 'How does this food support heart and brain health?', answer: 'The formula includes taurine and tuna oil rich in Omega fatty acids, which are essential for healthy heart function, vision development, and brain growth in kittens.' },
      { question: 'Is the kibble easy to digest for kittens with sensitive stomachs?', answer: 'Absolutely. The recipe includes gentle grains like rice and brown rice, along with prebiotic fibres that support gut health. Its oven-baked texture also makes it easier to digest.' },
      { question: 'How often should I feed BFAB Kitten Kibbles to my kitten?', answer: 'You can feed it 2–3 times daily, depending on your kitten’s age and activity level. Follow the recommended feeding chart and always provide fresh drinking water.' }
    ],
    detailedReviews: [
      { name: 'Komal Priya', rating: 5, text: 'My kitten Snowy absolutely loves this kibble! The crunch and flavour are perfect, and her energy levels have improved so much.', verified: true },
      { name: 'Vinay Verma', rating: 4.5, text: 'I noticed a big difference in Luna’s coat within a week. The Omega-rich tuna oil really works, her fur is shinier and softer now.', verified: true },
      { name: 'Simran Rao', rating: 4.5, text: 'My kitten Oreo digests this really well. No tummy upsets and the prebiotics seem to help a lot. Happy with the results!', verified: true },
      { name: 'Rishi Kumar', rating: 5, text: 'Milo used to struggle with hairballs, but after switching to this kibble, it\'s become so much better. Psyllium husk truly helps!', verified: true },
      { name: 'Anmol Pattnaik', rating: 4, text: 'Great quality food! My kitten Tuffy loves the taste and finishes every bowl. The oven-baked texture seems easier for him to chew.', verified: true },
      { name: 'P. Anirudh', rating: 5, text: 'Lily’s stool quality improved after switching to this. The fibre and prebiotics make a noticeable difference. Highly recommend!', verified: true },
      { name: 'Reema Sharma', rating: 4.5, text: 'My kitten Simba is a picky eater, but he actually loves this kibble. The chicken and tuna combo works like magic!', verified: true },
      { name: 'Kirti Nayak', rating: 4.5, text: 'I like that it\'s oven-baked and not heavily processed. It feels like a much cleaner, healthier option for my kitten Coco.', verified: true },
      { name: 'Tejas Patel', rating: 5, text: 'My vet suggested taurine-rich food, and this fits perfectly. My kitten Zoe looks healthier and more active already.', verified: true },
      { name: 'Lalit Kumar', rating: 5, text: 'The kibble smells fresh, and my kitten Pixie gobbles it up instantly. Nice texture, great ingredients, and good results!', verified: true }
    ],
    category: 'Cat Food',
    inStock: true,
    weight: '500g',
    petType: 'Feline',
    productCategory: 'Cat Food'
  },
  {
    id: 3,
    name: 'BFAB Natural Ice-Cream Mix - Prebiotic Gut Goodness',
    price: '₹199',
    originalPrice: '₹199',
    images: ['/products/3/9.png', '/products/3/12.png', '/products/3/14.png', '/products/3/16.png', '/products/3/18.png'],
    rating: 5.0,
    reviews: 2000,
    description: '100% Real Fruit Powder & Oat Milk Prebiotic | No Artificial Preservatives | Pets Supplements | ISO & FSSAI Certified | Vet Approved',
    longDescription: 'The perfect frozen treat mix for your dog, crafted with real fruit and prebiotic goodness! Our Natural Ice-Cream Mix is packed with gut-friendly ingredients and contains no nasties, just clean, wholesome nutrition. It’s refreshing, delicious, and supports smoother digestion while keeping your pup cool and energized. A fun, healthy addition to mealtimes or treat time, made to boost gut wellness in the most natural and tasty way!',
    benefits: [
      'Supports Gut Health',
      'Aids Smooth Digestion',
      'Boosts Hydration & Refreshes',
      'Nutrient-Rich & Natural',
      'Great for Sensitive Tummies',
      'Tasty, Fun & Enriching'
    ],
    detailedBenefits: [
      { title: 'Supports Gut Health', description: 'Prebiotics help nourish good bacteria and promote a balanced microbiome.' },
      { title: 'Aids Smooth Digestion', description: 'Gentle ingredients like oat milk and fruit powders support easy digestion.' },
      { title: 'Boosts Hydration & Refreshes', description: 'A cool, creamy treat that keeps your dog refreshed during hot days.' },
      { title: 'Nutrient-Rich & Natural', description: 'Made with real fruit, coconut milk powder, and clean plant-based ingredients.' },
      { title: 'Great for Sensitive Tummies', description: 'Free from artificial flavours, colours, and heavy dairy — gentle on the stomach.' },
      { title: 'Tasty, Fun & Enriching', description: 'Turns snack time into a healthy frozen treat experience dogs love.' }
    ],
    ingredients: [
      { name: 'Real Fruit Powder', description: 'Alphonso Mango & Peanut Butter Banana - Naturally flavourful and rich in vitamins, supporting overall wellness while making treats irresistibly tasty.' },
      { name: 'Coconut Milk Powder', description: 'Provides healthy fats that support skin, coat, and energy levels while adding a creamy texture dogs love.' },
      { name: 'Oat Milk Powder', description: 'A gentle, nutrient-rich source of fibre that supports digestion and helps maintain a healthy gut environment.' },
      { name: 'Prebiotic Fructooligosaccharides (FOS)', description: 'Benefits gut health and promotes a balanced microbiome. One of the most researched good bacteria.' },
      { name: 'Plant-Based Binding Agent', description: 'A safe, natural stabilizer that ensures smooth texture and consistency without artificial additives.' }
    ],
    feedGuide: [
      'Empty the 40g sachet into any jar and add 100ml of warm water.',
      'Mix until creamy. Stir well to avoid lumps.',
      'Freeze it for 3-4 hours and serve a cool, healthy and yummy snack!',
      'Top with treats or goodies.',
      'Consume once made within a week. Avoid repeated thawing and freezing.'
    ],
    storage: [
      'Once opened, make and frozen, consume it within a week.',
      'Avoid repeated thawing and freezing.',
      'Store in a cool, dry place before mixing.'
    ],
    vetApproval: {
      quote: 'Prebiotics play a key role in maintaining a balanced gut, and this natural ice-cream mix makes it both healthy and enjoyable for dogs. A refreshing treat that supports digestion and overall well-being.',
      doctorName: 'Dr. Lokhnath Mishra',
      qualification: 'MVSc. Veterinary Physician'
    },
    processSteps: [
      { title: 'SELECTING PREMIUM INGREDIENTS', description: 'We pick only real fruits, gentle plant-based ingredients, and high-quality prebiotics. This ensures every scoop is nutritious, safe, and naturally delicious for your dog.' },
      { title: 'CLEAN BLEND PROCESS', description: 'Each ingredient is carefully measured and blended to create a smooth, creamy mix. No artificial flavours or preservatives just pure, wholesome goodness in every batch.' },
      { title: 'QUALITY CHECKS & PACKING', description: 'Our team performs thorough quality checks to maintain consistency and safety. Every pack is sealed with care to maintain freshness and nutrition integrity.' },
      { title: 'DOGGO’S FROZEN DELIGHT', description: 'Freeze, scoop, and serve! Your pup enjoys a cool, gut-friendly treat boosted with natural prebiotics. This is the part they love the most the happy slurps!' }
    ],
    whyUnique: [
      { title: 'PERFECT MEAL ADDITION', points: ['A delicious natural ice-cream blend boosted with prebiotics for better gut health and smoother digestion.', 'Refreshingly tasty, wholesome, and rewarding for your furry friend.'] }
    ],
    faqs: [
      { question: 'Is the Natural Ice-Cream Mix safe for all dogs?', answer: 'Yes! The mix is made with gentle, natural ingredients like real fruit, coconut milk, oat milk, and prebiotics. It’s suitable for most dogs, including those with sensitive stomachs. However, if your dog has allergies or medical conditions, it’s best to consult your vet before use.' },
      { question: 'How do I prepare this ice-cream mix for my dog?', answer: 'Just add water, mix well, and freeze for a few hours until it sets. You can serve it as a frozen treat or use it as a fun, cooling meal topper.' },
      { question: 'What are the benefits of prebiotics for dogs?', answer: 'Prebiotics like Fructooligosaccharides (FOS) help nourish good gut bacteria, promote smoother digestion, improve stool quality, and support overall gut health all while boosting nutrient absorption.' },
      { question: 'Can this ice-cream mix be given to dogs with sensitive stomachs?', answer: 'Absolutely. The formula is dairy-free, preservative-free, and made from clean plant-based ingredients that are easy on the stomach. Prebiotics also help maintain digestive balance.' },
      { question: 'How often can I give this ice-cream to my dog?', answer: 'You can safely give it 2–3 times a week as a treat. For daily use, serve in small portions as a meal topper or a light digestive-support treat.' }
    ],
    detailedReviews: [
      { name: 'Manish', rating: 5, text: 'My dog Bruno absolutely loves this ice-cream mix! It’s so easy to make and his digestion has become smoother since we started giving it to him.', verified: true },
      { name: 'Nandini', rating: 4.5, text: 'I was looking for a healthy treat for my pup Luna, and this turned out perfect. She finishes every scoop and her tummy seems much happier now.', verified: true },
      { name: 'Rohan', rating: 4.5, text: 'My senior dog Oreo enjoys this like a kid! And the best part no stomach issues after. Really clean and natural treat!', verified: true },
      { name: 'Meera', rating: 5, text: 'So refreshing for my Shiro during the heat! Love that it has prebiotics. Makes me feel good about giving him something tasty and healthy.', verified: true },
      { name: 'Hemant', rating: 4, text: 'Honestly didn’t expect my picky eater Simba to enjoy this so much. He licks the bowl clean every single time!', verified: true },
      { name: 'Shreya', rating: 5, text: 'Such a fun and healthy treat! My dog Coco gets excited the moment he sees the frozen mix out of the fridge. Great product!', verified: true },
      { name: 'Kunal', rating: 4.5, text: 'Helped my dog Rio with his digestion, and he loves the fruity taste. Feels like giving him something both comforting and nutritious.', verified: true },
      { name: 'Tushar', rating: 4.5, text: 'Milo enjoys this more than any store-bought treat. And I feel safe giving it because the ingredients are so clean and natural.', verified: true },
      { name: 'Mitali', rating: 5, text: 'Our golden retriever Zara jumps around when she sees this coming! Perfect for hot days and light on her stomach.', verified: true },
      { name: 'Shruti', rating: 5, text: 'Finally found a treat that doesn’t upset my dog Pluto’s tummy. The prebiotics definitely make a difference. Highly recommended!', verified: true }
    ],
    category: 'Dog Treats',
    inStock: true,
    weight: 'Pack of 2',
    petType: 'Canine',
    productCategory: 'Treats'
  },
  {
    id: 4,
    name: 'BFAB Chicken Broth for Cats & Dogs | Zero Preservatives',
    price: '₹349',
    originalPrice: '₹399',
    images: ['/products/4/12.png', '/products/4/13.png', '/products/4/15.png', '/products/4/17.png', '/products/4/19.png'],
    rating: 4.9,
    reviews: 187,
    description: 'Zero Preservatives | Aids Joint Health and Digestion | Collagen Rich | Human Grade, Natural Wet Dog Food | Bone Broth',
    benefits: [
      'Supports Joint Health',
      'Aids Digestion',
      'Boosts Immunity',
      'Hydrates & Energizes',
      'Enhances Skin & Coat',
      '100% Human-Grade Ingredients',
      'Slow-Cooked for 24 Hours',
      'Ideal for All Breeds & Ages'
    ],
    category: 'Pet Supplements',
    inStock: true,
    weight: 'Pack of 3 x 100ml',
    petType: 'Both',
    productCategory: 'Supplements'
  },
  {
    id: 5,
    name: 'BFAB Dehydrated Crunchy Claws - Chicken Claws for Dogs',
    price: '₹249',
    originalPrice: '₹299',
    images: ['/products/5/WhatsApp Image 2025-11-16 at 1.39.05 PM.jpeg'],
    rating: 4.7,
    reviews: 150,
    description: 'Natural Ingredients, Maximum Flavor | Crafted from 100% natural chicken claws, these treats are free from artificial additives, preservatives, or fillers.',
    benefits: [
      'Natural Ingredients, Maximum Flavor',
      'Turmeric for Added Wellness',
      'Low-Fat and Calorie-Friendly',
      'Supports Joint Health',
      'Promotes Dental Hygiene',
      'Encourages Mental Stimulation',
      'Digestive Support',
      'Trainer-Approved and Versatile'
    ],
    category: 'Dog Treats',
    inStock: true,
    weight: '100g',
    petType: 'Canine',
    productCategory: 'Treats'
  },
  {
    id: 6,
    name: 'Ashwagandha + Hemp Protein Supplement for Dogs & Cats',
    price: '₹799',
    originalPrice: '₹999',
    images: ['/products/6/1.png', '/products/6/2.png', '/products/6/3.png', '/products/6/4.png', '/products/6/5.png', '/products/6/6.png', '/products/6/7.png'],
    rating: 4.9,
    reviews: 156,
    description: 'Scientifically formulated daily nutrition booster. Made using 42% organic plant protein, adaptogenic herbs, and essential nutrients.',
    benefits: [
      'Boosts Immunity & Overall Health',
      'Supports Joint & Muscle Strength',
      'Enhances Skin & Coat Health',
      'Boosts Heart & Brain Health',
      'Reduces Stress & Anxiety',
      'Promotes Energy & Vitality',
      '100% Human-Grade Ingredients',
      'Plant-Based Protein with High Absorption'
    ],
    category: 'Pet Supplements',
    inStock: true,
    weight: '200g',
    petType: 'Both',
    productCategory: 'Supplements'
  },
  {
    id: 7,
    name: 'BFAB Yak-Yak Himalayan Dental Chews for Dogs',
    price: '₹599',
    originalPrice: '₹549',
    images: ['/products/yak/1.png', '/products/yak/2.png', '/products/yak/3.png'], // Placeholder paths
    rating: 5.0,
    reviews: 3000,
    description: 'Clean Teeth, Fresh Breath | No Artificial Preservatives | Pets Supplements | ISO & FSSAI Certified | Vet Approved',
    longDescription: 'The perfect long-lasting chew for your dog, crafted from pure Himalayan yak and cow milk! Our Yak Chews are naturally rich in protein and contain no nasties - just clean, hard-textured goodness that keeps your dog happily engaged. Slow-aged for 35 days, they support healthier teeth, fresher breath, and stronger jaws with every bite. Tough, nutritious, and incredibly satisfying, they’re a wholesome alternative to rawhides and the ideal daily dental treat for your furry friend!',
    benefits: [
      'Supports Dental Health',
      'Highly Digestible Alternative to Rawhides',
      'Long-Lasting & Engaging',
      'High in Natural Protein',
      'Low in Fat & Preservative-Free',
      'Suitable for All Breeds & Ages'
    ],
    detailedBenefits: [
      { title: 'Supports Dental Health', description: 'Yak chews help naturally reduce plaque and tartar buildup through long-lasting chewing.' },
      { title: 'Highly Digestible Alternative to Rawhides', description: 'Made from yak and cow milk, they’re easier on the stomach and safer than rawhide treats.' },
      { title: 'Long-Lasting & Engaging', description: 'Their hard texture keeps dogs busy for extended periods, reducing boredom and destructive chewing.' },
      { title: 'High in Natural Protein', description: 'Rich in quality milk protein that supports muscle strength, energy, and overall wellness.' },
      { title: 'Low in Fat & Preservative-Free', description: 'A clean, natural treat with no chemicals, flavors, or artificial additives — suitable for daily chewing.' },
      { title: 'Suitable for All Breeds & Ages', description: 'Available in multiple sizes and safe for puppies (above 4 months), adults, and senior dogs.' }
    ],
    ingredients: [
      { name: 'Yak Milk (95%) & Cow Milk (5%)', description: 'Naturally rich in protein and essential nutrients, these Himalayan-sourced milks are slowly processed and aged for 35 days to create a hard, long-lasting chew that supports dental health while keeping dogs engaged and satisfied.' }
    ],
    feedGuide: [
      'Choose the right size chew based on your dog’s weight and chewing strength. (Small, Medium, Large, XL)',
      'Always supervise your dog while chewing to ensure safe consumption.',
      'Offer 2–3 times a week or as an occasional long-lasting chew treat — not a meal replacement.',
      'Provide fresh water at all times, as chewing can make dogs thirsty.',
      'Stop use immediately if the chew becomes too small (choking hazard).',
      'Microwave the small leftover piece for 45–60 seconds until it puffs, then cool and serve as a crunchy treat.'
    ],
    storage: [
      'Store the chew in a cool, dry place, away from direct sunlight and moisture.',
      'After each use, wipe the chew clean and let it dry completely before storing.',
      'Keep it in an airtight container or resealable pouch to maintain freshness and hardness.',
      'Do not refrigerate or freeze, as it may affect the texture.',
      'Discard the chew if you notice any unusual smell, mould, or excessive softening.'
    ],
    vetApproval: {
      quote: 'These Himalayan yak chews offer a natural, highly digestible alternative to rawhides (Rawhides can be tough on the stomach and pose choking risks). Rich in protein and designed to support dental health, they help reduce plaque and tartar while keeping your dog engaged, a safer, healthier chew recommended for everyday wellbeing.',
      doctorName: 'Dr. Lokhnath Mishra',
      qualification: 'MVSc. Veterinary Physician'
    },
    processSteps: [
      { title: 'Pure Himalayan Sourcing', description: 'We begin with the finest yak and cow milk, sourced from the high-altitude Himalayan regions renowned for their purity.' },
      { title: 'Traditional Cheese Crafting', description: 'The milk is gently heated, hand-churned, and shaped into dense cheese blocks using authentic Himalayan methods.' },
      { title: '35-Day Natural Smoke-Drying', description: 'Each block is slowly smoke-dried for over a month, resulting in a hard, long-lasting chew that is free from preservatives and chemicals.' },
      { title: 'Hand-Finished & Quality Checked', description: 'Every chew is cut, polished, and thoroughly inspected before being packed fresh for your dog’s chewing delight.' }
    ],
    whyUnique: [
      { title: 'Made Using the Traditional Himalayan Recipe', points: ['Crafted with an authentic mountain-style process for a natural, long-lasting, and flavour-rich chew.'] }
    ],
    faqs: [
      { question: 'Are Himalayan Yak Chews safe for all dogs?', answer: 'Yes, Himalayan Yak Chews are safe for most dogs above 4 months of age. They are made from natural yak and cow milk with no preservatives or rawhide. Always supervise chewing and choose the correct size for your dog.' },
      { question: 'What are the benefits of giving Yak Chews to dogs?', answer: 'Yak Chews help clean teeth, reduce plaque, and keep gums healthy. They are high in protein, long-lasting, low in fat, and provide excellent mental stimulation, making them a healthier alternative to rawhides.' },
      { question: 'How long does a Yak Chew typically last?', answer: 'Depending on your dog’s chewing strength, a Yak Chew can last anywhere from several hours to several days. Its naturally hardened, 35-day smoke-dried texture makes it extremely durable.' },
      { question: 'Are Yak Chews easy to digest?', answer: 'Yes. Unlike rawhides, Yak Chews are made from milk and become more digestible as your dog softens them while chewing. They break down gently, making them safer for the stomach.' },
      { question: 'Can small pieces of the chew be used safely?', answer: 'If the chew becomes too small, remove it to avoid choking. You can microwave the leftover piece for 45–60 seconds until it puffs up, then serve it as a crunchy, safe treat once cooled.' },
      { question: 'How should I store Himalayan Yak Chews?', answer: 'Store the chew in a cool, dry place. After each use, wipe it clean and allow it to dry before storing in an airtight container or resealable pack. Avoid refrigeration to maintain texture.' }
    ],
    detailedReviews: [
      { name: 'Anjali Mehta', rating: 5, text: 'My dog Bruno absolutely loves these yak chews! They last so long and keep him busy for hours. Finally found a treat that isn’t messy or smelly.', verified: true },
      { name: 'Nandini Sharma', rating: 4.5, text: 'These chews are so hard and durable. My pup Oreo has stopped chewing on furniture ever since we introduced this. Great quality!', verified: true },
      { name: 'Arjun Verma', rating: 4.5, text: 'Wasn’t sure at first, but my Indie dog Simba went crazy for it. The chew lasts days and keeps him mentally engaged. Totally worth it.', verified: true },
      { name: 'Priya Nair', rating: 5, text: 'My beagle Coco enjoys it every evening. I love that it’s natural and made with just yak and cow milk. No tummy issues at all.', verified: true },
      { name: 'Sneha Rao', rating: 4, text: 'Perfect for heavy chewers! My lab Max usually finishes treats in minutes, but this one keeps him busy for so long. Good value for money.', verified: true },
      { name: 'Amit Khurana', rating: 5, text: 'Rusty loves the flavour, and I love that it’s fully natural. Helps with his boredom and keeps him calm when I’m working.', verified: true },
      { name: 'Neha Sinha', rating: 4.5, text: 'Such a solid chew! My girl Miso enjoys every bite. No artificial stuff, just pure goodness. Definitely buying again.', verified: true },
      { name: 'Suresh Menon', rating: 4.5, text: 'This is one treat I can trust. My dog Sultan gets excited the moment he sees the pack. It lasts long and doesn’t splinter.', verified: true },
      { name: 'Ritu Sharma', rating: 5, text: 'My golden retriever, Bella is obsessed with these yak chews. Helps her chewing habit and keeps her busy during the day.', verified: true },
      { name: 'Karan Patel', rating: 5, text: 'I bought this for my dog Lily and she took to it instantly. It’s clean, healthy, and keeps her teeth looking much better.', verified: true }
    ],
    category: 'Dog Chews',
    inStock: true,
    weight: 'Pack of 3',
    petType: 'Canine',
    productCategory: 'Treats'
  },
  {
    id: 8,
    name: 'BFAB Hip & Joint Care Supplement for Dogs & Cats',
    price: '₹899',
    originalPrice: '₹599',
    images: ['/products/joint/1.png', '/products/joint/2.png', '/products/joint/3.png'], // Placeholder paths
    rating: 5.0,
    reviews: 200,
    description: 'From pain relief to real repair, support your dog’s joints daily | No Artificial Preservatives | Pets Supplements | ISO & FSSAI Certified | Vet Approved',
    longDescription: 'BFAB Hip & Joint Care Supplement is thoughtfully formulated to support mobility, comfort, and long-term joint health in both dogs and cats. Made with a powerful blend of glucosamine, chondroitin, MSM, collagen, and hyaluronic acid, it helps strengthen cartilage, lubricate joints, and ease everyday stiffness. Enhanced with turmeric, boswellia, fish oil (EPA & DHA), and antioxidant-rich vitamins, it naturally reduces inflammation and supports smoother, more flexible movement. Gentle on the stomach and easy to feed, it integrates seamlessly into your pet’s daily routine, whether mixed with meals or given as a standalone supplement. Ideal for growing pets, active adults, and seniors alike, this wholesome, science-backed blend is designed to keep your furry companions moving freely, staying active, and enjoying life to the fullest.',
    benefits: [
      'Supports Stronger Joints & Cartilage',
      'Reduces Joint Pain & Stiffness',
      'Enhances Mobility & Flexibility',
      'Strengthens Bones & Connective Tissues',
      'Boosts Overall Vitality & Recovery',
      'Suitable for All Life Stages'
    ],
    detailedBenefits: [
      { title: 'Supports Stronger Joints & Cartilage', description: 'Powered by glucosamine, chondroitin, and bovine collagen, the supplement helps rebuild cartilage, strengthen joints, and promote long-term mobility in both dogs and cats.' },
      { title: 'Reduces Joint Pain & Stiffness', description: 'MSM, turmeric, boswellia, and astaxanthin work together as natural anti-inflammatory agents to ease discomfort, reduce stiffness, and support smoother daily movement.' },
      { title: 'Enhances Mobility & Flexibility', description: 'Hyaluronic acid, green-lipped mussel extract, and Omega-3 rich fish oil help lubricate joints, improve flexibility, and make walking, running, and climbing easier for pets.' },
      { title: 'Strengthens Bones & Connective Tissues', description: 'Vitamins D, C, E, and manganese support bone density, collagen formation, and overall skeletal strength—ideal for growing pets, active breeds, and seniors.' },
      { title: 'Boosts Overall Vitality & Recovery', description: 'Antioxidant-rich ingredients like astaxanthin, vitamin E, and turmeric help protect cells, support immunity, and promote faster recovery after activity or age-related wear.' },
      { title: 'Suitable for All Life Stages', description: 'A gentle yet potent formula that supports young pets developing strong joints, active adults needing mobility care, and seniors experiencing natural age-related stiffness.' }
    ],
    ingredients: [
      { name: 'Bovine Collagen', description: 'Supports cartilage strength and joint flexibility, helping reduce stiffness in active and aging pets. Promotes healthier skin, coat, and connective tissues.' },
      { name: 'Glucosamine HCL', description: 'Helps rebuild and maintain healthy joint cartilage for smoother, pain-free movement. Reduces discomfort caused by wear, tear, and age-related joint issues.' },
      { name: 'MSM (Methylsulfonylmethane)', description: 'A natural anti-inflammatory compound that helps ease joint pain and muscle soreness. Supports mobility, recovery, and overall joint comfort.' },
      { name: 'Fish Oil (Containing EPA & DHA)', description: 'Rich in Omega-3 fatty acids that reduce inflammation and support joint cushioning. Promotes heart health, brain function, and a shiny, healthy coat.' },
      { name: 'Chondroitin', description: 'Helps protect and repair joint cartilage while improving shock absorption. Enhances long-term joint mobility and reduces stiffness.' },
      { name: 'Manganese', description: 'An essential mineral that supports bone density and joint structure. Plays a vital role in collagen formation and skeletal strength.' },
      { name: 'Hyaluronic Acid', description: 'Lubricates joints by improving synovial fluid quality for smoother movement. Provides cushioning and comfort for aging and active pets.' },
      { name: 'Astaxanthin (Algae Extract)', description: 'A powerful antioxidant that helps reduce inflammation and oxidative stress. Supports joint health, immunity, and overall vitality.' },
      { name: 'Vitamin C', description: 'Boosts collagen production to strengthen joints, bones, and connective tissues. Acts as a natural antioxidant to support immunity and recovery.' },
      { name: 'Vitamin D', description: 'Helps the body absorb calcium, strengthening bones and supporting skeletal health. Essential for proper muscle function and immune strength.' },
      { name: 'Vitamin E', description: 'A strong antioxidant that protects cells from damage and reduces inflammation. Supports skin health, immunity, and overall wellness.' },
      { name: 'Green-Lipped Mussels Extract', description: 'Naturally rich in Omega-3s, glucosamine, and chondroitin to support joint mobility. Helps reduce inflammation and improve overall joint comfort.' },
      { name: 'Eggshell Powder', description: 'A natural source of calcium that supports strong bones and healthy joints. Helps maintain proper bone density and skeletal structure.' },
      { name: 'Turmeric (Curcuma Longa)', description: 'A well-known natural anti-inflammatory that helps reduce pain and stiffness. Supports joint flexibility and overall mobility.' },
      { name: 'Black Pepper (Piper Nigrum)', description: 'Helps enhance the absorption of turmeric and other nutrients. Supports digestion and boosts the supplement’s effectiveness.' },
      { name: 'Shallaki (Boswellia Serrata)', description: 'A traditional herbal extract that reduces joint inflammation and stiffness. Helps improve mobility and support long-term joint comfort.' }
    ],
    feedGuide: [
      'Mix the recommended amount of the powder directly into your pet’s regular food.',
      'For best results, serve it with the dinner meal, as joint repair and recovery naturally occur during nighttime rest.',
      'Giving it at night allows nutrients like glucosamine, chondroitin, MSM, and collagen to be absorbed more effectively while your pet sleeps.',
      'Start with a smaller dose to help your pet adjust, then gradually increase to the full recommended amount based on weight.',
      'Ensure your dog or cat always has access to fresh, clean drinking water.',
      'Use consistently every day for optimum joint support and mobility benefits.',
      'Dosage: Up-to 11Kg (Includes Cats) - ½ Scoop; 11 - 26 Kg - 1 Scoop; 27 - 45 Kg - 2 Scoop; 46 Kg & Above - 3 Scoop'
    ],
    storage: [
      'Store the powder in a cool, dry place, away from direct sunlight, heat, and moisture.',
      'Always keep the container tightly sealed after each use to maintain freshness and prevent clumping.',
      'Use a clean, dry spoon when scooping to avoid contamination.',
      'Do not refrigerate or freeze, as this may affect texture and potency.',
      'Keep out of reach of pets and children when not in use.'
    ],
    vetApproval: {
      quote: 'This hip and joint supplement offers a balanced blend of glucosamine, chondroitin, MSM, turmeric, and Omega fatty acids — all clinically known to support mobility, reduce stiffness, and protect joint health. Its gentle, pet-safe formula makes it an excellent daily choice for growing pets, active adults, and seniors needing extra joint support.',
      doctorName: 'Dr. Lokhnath Mishra',
      qualification: 'MVSc. Veterinary Physician'
    },
    processSteps: [
      { title: 'Carefully Selected Functional Ingredients', description: 'We begin by sourcing high-quality, research-backed ingredients like glucosamine, chondroitin, MSM, collagen, hyaluronic acid, turmeric, boswellia, and Omega-rich fish oil, chosen for their proven joint-support benefits.' },
      { title: 'Scientifically Balanced Formulation', description: 'Each ingredient is measured in precise ratios to ensure maximum absorption and effectiveness. This balanced blend targets joint lubrication, inflammation control, cartilage repair, and overall mobility improvement.' },
      { title: 'Gentle Processing for Maximum Potency', description: 'The supplement is processed at controlled temperatures to preserve the bioactivity of its nutrients, ensuring your pet receives the full range of health benefits in every scoop.' }
    ],
    whyUnique: [
      { title: 'Formulated With a Complete Joint-Support Blend', points: ['Made with glucosamine, chondroitin, MSM, collagen, hyaluronic acid, and powerful anti-inflammatory herbs, this advanced formula targets joint health from every angle, helping your pet move comfortably, recover faster, and stay active at any age.'] }
    ],
    detailedReviews: [
      { name: 'Arjun Rao', rating: 5, text: 'My senior dog Bruno has been moving so much better since starting this supplement. His morning stiffness has reduced, and he seems happier on walks.', verified: true },
      { name: 'Tarun Bhatia', rating: 4.5, text: 'My cat Luna had trouble jumping onto the sofa, but after two weeks of this supplement, she’s back to her playful self. Really impressed!', verified: true },
      { name: 'Yash Thakur', rating: 4.5, text: 'My senior cat Miso had hip issues, and this supplement has really helped reduce her discomfort. She’s moving around more freely.', verified: true },
      { name: 'Sonal Mishra', rating: 5, text: 'My lab Simba struggled with joint pain after long walks, but this powder has made a huge difference. He climbs stairs much more confidently now.', verified: true },
      { name: 'Nandini Kaur', rating: 5, text: 'My husky Coco is very active, and this supplement keeps her joints strong. She recovers faster after playtime and seems more energetic overall.', verified: true },
      { name: 'Sameer D’Souza', rating: 5, text: 'Oreo, my beagle, has reduced limping since starting this. The improvement is visible and steady. I’m glad I found something that actually works.', verified: true },
      { name: 'Rajeev Nambiar', rating: 4.5, text: 'My kitten Pixie was showing early stiffness, and this supplement helped so quickly. She’s climbing and playing again like a little rocket.', verified: true },
      { name: 'Omkar Jadhao', rating: 4.5, text: 'My dog Sultan had trouble getting up after naps, but this formula has brought a real change. He’s moving more comfortably now.', verified: true },
      { name: 'Ravi Kulkarni', rating: 5, text: 'Bella, my senior indie, is more active and playful after starting this supplement. Her mood and mobility have improved a lot.', verified: true },
      { name: 'Supriya Nair', rating: 5, text: 'My golden retriever Max is aging, but this supplement keeps him active. He walks longer and plays more than before.', verified: true }
    ],
    category: 'Pet Supplements',
    inStock: true,
    weight: '250g',
    petType: 'Both',
    productCategory: 'Supplements'
  }
];