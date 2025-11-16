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
  productCategory: 'Treats' | 'Cat Food' | 'Supplements';
}

export const products: Product[] = [
  {
    id: 1,
    name: 'BFAB Peanut Butter for Dogs - 500g Pack of 1',
    price: '₹349',
    originalPrice: '₹399',
    images: ['/products/1/20.png', '/products/1/21.png', '/products/1/22.png', '/products/1/23.png', '/products/1/24.png'],
    rating: 4.9,
    reviews: 328,
    description: 'All-Natural, xylitol-Free | Protein-Rich Treat with Zero preservatives | Perfect for Training, Grooming, Rewards & Snacking | Safe for All Breeds',
    benefits: [
      'NUTRITIONALLY BALANCED & HEALTHY: Packed with essential vitamins and minerals, helps maintain energy, vitality, and long-term health.',
      'RICH IN FIBRE & HEALTHY FATS: Made from premium roasted peanuts, loaded with dietary fiber and omega-rich healthy fats that aid digestion and promote a shiny, healthy coat.',
      'IDEAL DISTRACTION DURING GROOMING: The irresistible flavor makes it an excellent distraction during grooming, bathing, or nail trimming.',
      'BOOSTS ENERGY & STAMINA: Contains magnesium, a key mineral that supports energy production and stamina.',
      'SUPPORTS JOINT HEALTH & MOBILITY: Formulated with natural anti-inflammatory ingredients that help reduce arthritis symptoms.',
      'PROMOTES HEALTHY SKIN & COAT: Enriched with natural oils and nutrients that deeply nourish skin and maintain a soft, glossy coat.'
    ],
    category: 'Dog Treats',
    inStock: true,
    weight: '500g',
    petType: 'Canine',
    productCategory: 'Treats'
  },
  {
    id: 2,
    name: 'BFAB Oven Baked Kitten Kibble Dry Cat Food - 1Kg',
    price: '₹599',
    originalPrice: '₹799',
    images: ['/products/2/3.png', '/products/2/4.png', '/products/2/5.png', '/products/2/6.png', '/products/2/7.png'],
    rating: 4.8,
    reviews: 245,
    description: 'Chicken & Ocean Fish | Promotes Brain & Vision Development | Enhances Immunity | Improves Digestive Health',
    benefits: [
      'Supports Brain & Vision Development: Enriched with DHA and essential fatty acids that promote healthy brain and eye function.',
      'Boosts Immunity Naturally: Fortified with vitamins, minerals, and antioxidants to strengthen immune system and overall vitality.',
      'Improves Digestive Health: Contains high-quality proteins and natural prebiotics that support easy digestion and nutrient absorption.',
      'Made with Real Ingredients: Free from artificial colors, flavors, and preservatives.',
      'Oven-Baked for Better Nutrition: The gentle baking process preserves nutrients and enhances taste.',
      'Perfect for Growing Kittens: Specifically formulated for the nutritional needs of developing kittens.'
    ],
    category: 'Cat Food',
    inStock: true,
    weight: '1Kg',
    petType: 'Feline',
    productCategory: 'Cat Food'
  },
  {
    id: 3,
    name: 'BFAB Natural Frozen Dog Treats – Alphonso Mango & Peanut Butter + Banana – 2 x 40 gm',
    price: '₹99',
    originalPrice: '₹199',
    images: ['/products/3/9.png', '/products/3/12.png', '/products/3/14.png', '/products/3/16.png', '/products/3/18.png'],
    rating: 5.0,
    reviews: 512,
    description: 'Healthy Dog Treats | No Colour & Flavours | Made with Oat & Coconut Milk | Prebiotics for Digestion',
    benefits: [
      'Nutritious & Delicious: Made with real Alphonso mango, peanut butter, banana, oat milk, and coconut milk.',
      'Supports Digestion: Enriched with natural prebiotics to promote a healthy gut and aid smooth digestion.',
      '100% Natural Ingredients: No artificial colors, flavors, or preservatives.',
      'Easy to Prepare & Store: Convenient frozen format - cut, pour in 100ml water, mix well, freeze for 4-5 hours.',
      'Perfect for All Breeds & Ages: Suitable for puppies and adult dogs alike.',
      'Available in two flavors: Alphonso Mango & Peanut Butter + Banana.'
    ],
    category: 'Dog Treats',
    inStock: true,
    weight: '2 x 40gm',
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
      'Supports Joint Health: Rich in collagen to promote strong bones and flexible joints.',
      'Aids Digestion: Gentle on the stomach and improves gut health naturally.',
      'Boosts Immunity: Packed with nutrients to strengthen immune system.',
      'Hydrates & Energizes: Keeps pets active, hydrated, and full of vitality.',
      'Enhances Skin & Coat: Promotes a shiny coat and healthy skin.',
      '100% Human-Grade Ingredients: Safe, clean, and natural with no preservatives.',
      'Slow-Cooked for 24 Hours: Maximizes flavor and nutrition extraction.',
      'Ideal for All Breeds & Ages: Perfect for both dogs and cats.'
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
    images: ['/products/5/WhatsApp Image 2025-11-16 at 1.39.05 PM.jpeg', '/products/5/WhatsApp Image 2025-11-16 at 1.39.04 PM.jpeg', '/products/5/WhatsApp Image 2025-11-16 at 1.39.05 PM (1).jpeg', '/products/5/WhatsApp Image 2025-11-16 at 1.39.05 PM (2).jpeg', '/products/5/WhatsApp Image 2025-11-16 at 1.39.06 PM (1).jpeg'],
    rating: 4.7,
    reviews: 150,
    description: 'Natural Ingredients, Maximum Flavor | Crafted from 100% natural chicken claws, these treats are free from artificial additives, preservatives, or fillers.',
    benefits: [
      'Natural Ingredients, Maximum Flavor: Crafted from 100% natural chicken claws, free from artificial additives, preservatives, or fillers.',
      'Turmeric for Added Wellness: Enriched with turmeric for anti-inflammatory and antioxidant properties, promoting joint health and digestion.',
      'Low-Fat and Calorie-Friendly: Naturally low-fat and calorie content, ideal for weight management.',
      'Supports Joint Health: Thanks to turmeric, offers anti-inflammatory properties to maintain healthy joints.',
      'Promotes Dental Hygiene: The natural crunch helps clean teeth and reduce tartar buildup.',
      'Encourages Mental Stimulation: Chewing keeps pets engaged and mentally sharp.',
      'Digestive Support: Turmeric aids digestion and supports gut health.',
      'Trainer-Approved and Versatile: Perfect for training, suitable for all breeds and sizes.'
    ],
    category: 'Dog Treats',
    inStock: true,
    weight: '100g',
    petType: 'Canine',
    productCategory: 'Treats'
  },
  {
    id: 6,
    name: 'Ashwagandha + Hemp Protein Supplement for Dogs & Cats | Powerful Everyday Wellness Blend',
    price: '₹799',
    originalPrice: '₹999',
    images: ['/products/6/1.png', '/products/6/2.png', '/products/6/3.png', '/products/6/4.png', '/products/6/5.png', '/products/6/6.png', '/products/6/7.png'],
    rating: 4.9,
    reviews: 156,
    description: 'Our Ashwagandha + Hemp Protein Supplement is a scientifically formulated daily nutrition booster designed to support the complete well-being of dogs and cats. Made using 42% organic plant protein, adaptogenic herbs, and essential nutrients.',
    benefits: [
      'Boosts Immunity & Overall Health: Strengthens natural defense mechanisms.',
      'Supports Joint & Muscle Strength: Helps maintain mobility, flexibility, and lean muscles.',
      'Enhances Skin & Coat Health: Promotes healthier skin, reduced itching, and shinier fur.',
      'Boosts Heart & Brain Health: Rich in essential fatty acids and amino acids.',
      'Reduces Stress & Anxiety: Ashwagandha helps calm hyperactive or anxious pets.',
      'Promotes Energy & Vitality: Sustains daily energy levels and supports active lifestyles.',
      '100% Human-Grade Ingredients: Vet & Pet Nutritionist Approved.',
      'Plant-Based Protein with High Absorption: No Preservatives, Fillers, or Artificial Additives.'
    ],
    category: 'Pet Supplements',
    inStock: true,
    weight: '200g',
    petType: 'Both',
    productCategory: 'Supplements'
  }
];