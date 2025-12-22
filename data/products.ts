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
    detailedBenefits?: { title: string; description: string }[];
    ingredients?: { name: string; description: string }[];
    feedGuide?: string[];
    storage?: string[];
    vetApproval?: { quote: string; doctorName: string; qualification: string };
    processSteps?: { title: string; description: string }[];
    whyUnique?: { title: string; points: string[] }[];
    faqs?: { question: string; answer: string }[];
    detailedReviews?: { name: string; rating: number; text: string; date?: string; verified?: boolean }[];
    category: string;
    inStock: boolean;
    weight: string;
    petType: 'Canine' | 'Feline' | 'Both';
    productCategory: 'Treats' | 'Cat Food' | 'Supplements' | 'Grooming';
    longDescription?: string;
}

export const products: Product[] = [
    {
        id: 3,
        name: "Natural Ice-Cream Mix + Prebiotic Goodness",
        price: "199",
        originalPrice: "199",
        images: [
            "/products/2/3.png",
            "/products/2/4.png",
            "/products/2/5.png",
            "/products/2/6.png",
            "/products/2/7.png",
            "/products/2/8.png"
        ],
        rating: 5,
        reviews: 2000,
        description: "The perfect frozen treat mix for your dog, crafted with real fruit and prebiotic goodness! Our Natural Ice-Cream Mix is packed with gut-friendly ingredients and contains no nasties, just clean, wholesome nutrition. It’s refreshing, delicious, and supports smoother digestion while keeping your pup cool and energized.",
        longDescription: "A delicious natural ice-cream blend boosted with prebiotics for better gut health and smoother digestion. Refreshingly tasty, wholesome, and rewarding for your furry friend.",
        benefits: [
            "Supports Gut Health",
            "Aids Smooth Digestion",
            "Boosts Hydration & Refreshes",
            "Nutrient-Rich & Natural",
            "Great for Sensitive Tummies",
            "Tasty, Fun & Enriching"
        ],
        detailedBenefits: [
            { title: "Supports Gut Health", description: "Prebiotics help nourish good bacteria and promote a balanced microbiome." },
            { title: "Aids Smooth Digestion", description: "Gentle ingredients like oat milk and fruit powders support easy digestion." },
            { title: "Boosts Hydration & Refreshes", description: "A cool, creamy treat that keeps your dog refreshed during hot days." },
            { title: "Nutrient-Rich & Natural", description: "Made with real fruit, coconut milk powder, and clean plant-based ingredients." },
            { title: "Great for Sensitive Tummies", description: "Free from artificial flavours, colours, and heavy dairy — gentle on the stomach." },
            { title: "Tasty, Fun & Enriching", description: "Turns snack time into a healthy frozen treat experience dogs love." }
        ],
        ingredients: [
            { name: "Real Fruit Powder", description: "Naturally flavourful and rich in vitamins, supporting overall wellness while making treats irresistibly tasty." },
            { name: "Coconut Milk Powder", description: "Provides healthy fats that support skin, coat, and energy levels while adding a creamy texture dogs love." },
            { name: "Oat Milk Powder", description: "A gentle, nutrient-rich source of fibre that supports digestion and helps maintain a healthy gut environment." },
            { name: "Prebiotic Fructooligosaccharides (FOS)", description: "Benefits gut health and promotes a balanced microbiome. One of the most researched good bacteria." },
            { name: "Plant-Based Binding Agent", description: "A safe, natural stabilizer that ensures smooth texture and consistency without artificial additives." }
        ],
        feedGuide: [
            "Empty the 40g sachet into any jar and add 100ml of warm water.",
            "Mix until creamy. Stir well to avoid lumps.",
            "Freeze it for 3-4 hours and serve a cool, healthy and yummy snack!",
            "Top with treats or goodies."
        ],
        storage: [
            "Once opened, make and frozen, consume it within a week.",
            "Avoid repeated thawing and freezing."
        ],
        vetApproval: {
            quote: "Prebiotics play a key role in maintaining a balanced gut, and this natural ice-cream mix makes it both healthy and enjoyable for dogs. A refreshing treat that supports digestion and overall well-being.",
            doctorName: "Dr. Lokhnath Mishra",
            qualification: "MVSc. Veterinary Physician"
        },
        whyUnique: [
            {
                title: "PERFECT MEAL ADDITION",
                points: [
                    "We pick only real fruits, gentle plant-based ingredients, and high-quality prebiotics.",
                    "Each ingredient is carefully measured and blended to create a smooth, creamy mix.",
                    "Freeze, scoop, and serve! Your pup enjoys a cool, gut-friendly treat boosted with natural prebiotics."
                ]
            }
        ],
        faqs: [
            { question: "Is the Natural Ice-Cream Mix safe for all dogs?", answer: "Yes! The mix is made with gentle, natural ingredients like real fruit, coconut milk, oat milk, and prebiotics. It’s suitable for most dogs, including those with sensitive stomachs." },
            { question: "How do I prepare this ice-cream mix for my dog?", answer: "Just add water, mix well, and freeze for a few hours until it sets." },
            { question: "What are the benefits of prebiotics for dogs?", answer: "Prebiotics like Fructooligosaccharides (FOS) help nourish good gut bacteria, promote smoother digestion, improve stool quality, and support overall gut health." },
            { question: "Can this ice-cream mix be given to dogs with sensitive stomachs?", answer: "Absolutely. The formula is dairy-free, preservative-free, and made from clean plant-based ingredients that are easy on the stomach." },
            { question: "How often can I give this ice-cream to my dog?", answer: "You can safely give it 2–3 times a week as a treat." }
        ],
        detailedReviews: [
            { name: "Manish", rating: 5, text: "My dog Bruno absolutely loves this ice-cream mix! It’s so easy to make and his digestion has become smoother since we started giving it to him." },
            { name: "Nandini", rating: 4.5, text: "I was looking for a healthy treat for my pup Luna, and this turned out perfect. She finishes every scoop and her tummy seems much happier now." },
            { name: "Rohan", rating: 4.5, text: "My senior dog Oreo enjoys this like a kid! And the best part no stomach issues after. Really clean and natural treat!" },
            { name: "Meera", rating: 5, text: "So refreshing for my Shiro during the heat! Love that it has prebiotics. Makes me feel good about giving him something tasty and healthy." },
            { name: "Hemant", rating: 4, text: "Honestly didn’t expect my picky eater Simba to enjoy this so much. He licks the bowl clean every single time!" }
        ],
        category: "Treats",
        inStock: true,
        weight: "40g",
        petType: "Canine",
        productCategory: "Treats"
    },
    {
        id: 7,
        name: "Yak-Yak Himalayan Dental Chews",
        price: "549",
        originalPrice: "599",
        images: ["https://images.unsplash.com/photo-1582798300397-29a519574805?auto=format&fit=crop&q=80&w=800"],
        rating: 5,
        reviews: 3000,
        description: "The perfect long-lasting chew for your dog, crafted from pure Himalayan yak and cow milk! Our Yak Chews are naturally rich in protein and contain no nasties - just clean, hard-textured goodness that keeps your dog happily engaged.",
        longDescription: "A natural, long-lasting Himalayan cheese chew that helps clean teeth and reduce plaque with every bite. Made from high-quality yak milk protein and available in 10 natural flavours.",
        benefits: [
            "Supports Dental Health",
            "Highly Digestible Alternative to Rawhides",
            "Long-Lasting & Engaging",
            "High in Natural Protein",
            "Low in Fat & Preservative-Free",
            "Suitable for All Breeds & Ages"
        ],
        detailedBenefits: [
            { title: "Supports Dental Health", description: "Yak chews help naturally reduce plaque and tartar buildup through long-lasting chewing." },
            { title: "Highly Digestible Alternative to Rawhides", description: "Made from yak and cow milk, they’re easier on the stomach and safer than rawhide treats." },
            { title: "Long-Lasting & Engaging", description: "Their hard texture keeps dogs busy for extended periods, reducing boredom and destructive chewing." },
            { title: "High in Natural Protein", description: "Rich in quality milk protein that supports muscle strength, energy, and overall wellness." },
            { title: "Low in Fat & Preservative-Free", description: "A clean, natural treat with no chemicals, flavors, or artificial additives." },
            { title: "Suitable for All Breeds & Ages", description: "Available in multiple sizes and safe for puppies (above 4 months), adults, and senior dogs." }
        ],
        ingredients: [
            { name: "Yak Milk (95%) & Cow Milk (5%)", description: "Naturally rich in protein and essential nutrients, these Himalayan-sourced milks are slowly processed and aged for 35 days." }
        ],
        feedGuide: [
            "Choose the right size chew based on your dog’s weight and chewing strength.",
            "Always supervise your dog while chewing.",
            "Offer 2–3 times a week or as an occasional long-lasting chew treat.",
            "Provide fresh water at all times.",
            "Microwave small leftover pieces for 45-60 seconds to make a crunchy puff."
        ],
        storage: [
            "Store in a cool, dry place, away from direct sunlight.",
            "After each use, wipe the chew clean and let it dry completely.",
            "Do not refrigerate or freeze."
        ],
        vetApproval: {
            quote: "These Himalayan yak chews offer a natural, highly digestible alternative to rawhides. Rich in protein and designed to support dental health, they help reduce plaque and tartar while keeping your dog engaged.",
            doctorName: "Dr. Lokhnath Mishra",
            qualification: "MVSc. Veterinary Physician"
        },
        faqs: [
            { question: "Are Himalayan Yak Chews safe for all dogs?", answer: "Yes, safe for most dogs above 4 months. Made from natural milk with no rawhide." },
            { question: "What are the benefits?", answer: "Clean teeth, reduce plaque, high protein, and long-lasting mental stimulation." },
            { question: "How long does it last?", answer: "From several hours to days depending on chewing strength." },
            { question: "Are they easy to digest?", answer: "Yes, made from milk and break down gently, unlike rawhides." },
            { question: "What to do with small pieces?", answer: "Microwave them to create a crunchy puff treat to avoid choking hazards." }
        ],
        detailedReviews: [
            { name: "Anjali Mehta", rating: 5, text: "My dog Bruno absolutely loves this yak chews! They last so long and keep him busy for hours. Finally found a treat that isn’t messy or smelly." },
            { name: "Nandini Sharma", rating: 4.5, text: "These chews are so hard and durable. My pup Oreo has stopped chewing on furniture ever since we introduced this. Great quality!" },
            { name: "Arjun Verma", rating: 4.5, text: "Wasn’t sure at first, but my Indie dog Simba went crazy for it. The chew lasts days and keeps him mentally engaged." }
        ],
        category: "Treats",
        inStock: true,
        weight: "90g",
        petType: "Canine",
        productCategory: "Treats"
    },
    {
        id: 2,
        name: "Oven Baked Kitten Kibbles",
        price: "199",
        originalPrice: "199",
        images: [
            "/products/3/12.png",
            "/products/3/14.png",
            "/products/3/16.png",
            "/products/3/18.png",
            "/products/3/9.png"
        ],
        rating: 5,
        reviews: 400,
        description: "The perfect everyday meal for your growing kitten, crafted with real chicken and tuna for wholesome, high-quality nutrition! Our oven-baked kitten Kibbles are gently cooked to lock in natural flavour and essential nutrients.",
        longDescription: "A nutrient-rich, oven-baked kitten kibble made with real chicken and tuna fish to support healthy growth and development. Enriched with tuna oil for Omega fatty acids.",
        benefits: [
            "Supports Healthy Growth & Development",
            "Oven-Baked for Better Nutrition",
            "Promotes Heart & Brain Health",
            "Aids Digestion & Gut Health",
            "Manages Hairballs Naturally",
            "Supports Skin & Coat Shine"
        ],
        detailedBenefits: [
            { title: "Supports Healthy Growth & Development", description: "Made with real chicken and tuna fish, providing essential proteins for strong muscles." },
            { title: "Oven-Baked for Better Nutrition", description: "Gently baked to retain nutrients and create a crunchier texture easier to digest." },
            { title: "Promotes Heart & Brain Health", description: "Enriched with taurine for heart strength and eye health." },
            { title: "Aids Digestion & Gut Health", description: "Contains prebiotics and high-fibre ingredients for smooth digestion." },
            { title: "Manages Hairballs Naturally", description: "Formulated with psyllium husk to help reduce hairball formation." },
            { title: "Supports Skin & Coat Shine", description: "With tuna oil rich in Omega fatty acids for skin nourishment." }
        ],
        ingredients: [
            { name: "Chicken Meal", description: "Concentrated source of high-quality protein." },
            { name: "Corn", description: "Natural carbohydrates and fibre for energy." },
            { name: "Fish Meal", description: "Packed with Omega fatty acids for brain function." },
            { name: "Brown Rice", description: "Nutrient-rich grain for smooth digestion." },
            { name: "Chicken Fat", description: "Source of essential Omega fatty acids." },
            { name: "Tuna Oil", description: "Rich in Omega-3 & 6 for heart and brain health." },
            { name: "Psyllium Husk", description: "Helps control hairballs and supports bowel movement." }
        ],
        feedGuide: [
            "Serve as a dry meal directly from the pack.",
            "Introduce gradually over 5-7 days.",
            "Ensure fresh drinking water is available.",
            "Feed 2-3 small meals daily for kittens under 12 months."
        ],
        storage: [
            "Store in a cool, dry place.",
            "Keep zip pouch properly closed.",
            "Not for human consumption."
        ],
        vetApproval: {
            quote: "This oven-baked kitten kibble provides a gentle, nutrient-rich diet that supports healthy growth. With taurine, tuna oil, and prebiotics, it offers a safer, more wholesome alternative.",
            doctorName: "Dr. Lokhnath Mishra",
            qualification: "MVSc. Veterinary Physician"
        },
        faqs: [
            { question: "Is this suitable for all breeds?", answer: "Yes, formulated for all kitten breeds up to 12 months." },
            { question: "Why oven-baked?", answer: "Cooked slowly at low temps to retain nutrients and flavour." },
            { question: "Does it help with hairballs?", answer: "Yes, contains psyllium husk to control hairballs." },
            { question: "How does it support heart/brain?", answer: "Includes taurine and tuna oil rich in Omegas." },
            { question: "Is it easy to digest?", answer: "Yes, includes gentle grains and prebiotics." }
        ],
        detailedReviews: [
            { name: "Komal Priya", rating: 5, text: "My kitten Snowy absolutely loves this kibble! The crunch and flavour are perfect, and her energy levels have improved so much." },
            { name: "Vinay Verma", rating: 4.5, text: "I noticed a big difference in Luna’s coat within a week. The Omega-rich tuna oil really works." },
            { name: "Simran Rao", rating: 4.5, text: "My kitten Oreo digests this really well. No tummy upsets and the prebiotics seem to help a lot." }
        ],
        category: "Food",
        inStock: true,
        weight: "250g",
        petType: "Feline",
        productCategory: "Cat Food"
    },
    {
        id: 1,
        name: "Peanut Butter for Dogs",
        price: "349",
        originalPrice: "599",
        images: [
            "/products/1/20.png",
            "/products/1/21.png",
            "/products/1/22.png",
            "/products/1/23.png",
            "/products/1/24.png",
            "/products/1/26.png"
        ],
        rating: 5,
        reviews: 400,
        description: "BFAB Peanut Butter for Dogs is crafted from 100% roasted peanuts to deliver pure, wholesome goodness with every scoop. Free from added sugar, salt, xylitol, or artificial preservatives.",
        longDescription: "A creamy, protein-rich peanut butter made from 100% roasted peanuts, crafted especially for dogs. Packed with natural healthy fats, vitamins, and antioxidants.",
        benefits: [
            "Boosts Energy & Vitality",
            "Supports Skin & Coat Health",
            "Promotes Muscle Strength",
            "Encourages Mental Stimulation",
            "Easy to Digest",
            "Ideal as a Treat or Meal Topper"
        ],
        detailedBenefits: [
            { title: "Boosts Energy & Vitality", description: "Provides natural healthy fats and protein for steady energy." },
            { title: "Supports Skin & Coat Health", description: "Rich in essential fatty acids and antioxidants." },
            { title: "Promotes Muscle Strength", description: "High-quality plant protein supports strong muscles." },
            { title: "Encourages Mental Stimulation", description: "Perfect for stuffing toys or enrichment activities." },
            { title: "Easy to Digest", description: "No added sugar, salt, or preservatives." },
            { title: "Ideal as a Treat or Meal Topper", description: "Great for training, hiding medicines, or enhancing meal flavour." }
        ],
        ingredients: [
            { name: "100% Roasted Peanuts", description: "Natural source of protein and healthy fats. Rich in vitamins and antioxidants." }
        ],
        feedGuide: [
            "Serve in moderation as a treat or meal topper.",
            "Small dogs: 1/2-1 teaspoon.",
            "Medium dogs: 1-2 teaspoons.",
            "Large dogs: 1-1.5 tablespoons.",
            "Introduce gradually."
        ],
        storage: [
            "Store in a cool, dry place.",
            "Stir well if oil separation occurs.",
            "Refrigeration optional."
        ],
        vetApproval: {
            quote: "This 100% roasted peanut butter is a healthy, digestible, and enrichment-friendly option for dogs. With no sugar, salt, or additives, it provides clean energy and supports skin health.",
            doctorName: "Dr. Lokhnath Mishra",
            qualification: "MVSc. Veterinary Physician"
        },
        faqs: [
            { question: "Is it safe for all dogs?", answer: "Yes, mostly. Made from 100% peanuts. Avoid if dog has peanut allergy or pancreatitis." },
            { question: "How to use?", answer: "Treat, lick mats, enrichment toys, hide medicines, or meal topper." },
            { question: "Does it help with training?", answer: "Yes, high-value reward!" }
        ],
        detailedReviews: [
            { name: "Arjun Rao", rating: 5, text: "My dog Bruno absolutely loves this peanut butter! He licks the spoon clean every time." },
            { name: "P. Amit", rating: 4.5, text: "I’ve tried many peanut butters, but this one is the cleanest. No added sugar or salt." },
            { name: "Pallavi Mund", rating: 4.5, text: "Milo goes crazy the moment he hears the jar open. Perfect for stuffing toys." }
        ],
        category: "Treats",
        inStock: true,
        weight: "500g",
        petType: "Canine",
        productCategory: "Treats"
    },
    {
        id: 8,
        name: "Hip & Joint Care Supplement",
        price: "599",
        originalPrice: "899",
        images: ["https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800"],
        rating: 5,
        reviews: 200,
        description: "BFAB Hip & Joint Care Supplement is thoughtfully formulated to support mobility, comfort, and long-term joint health in both dogs and cats. Made with a powerful blend of glucosamine, chondroitin, MSM, collagen, and hyaluronic acid.",
        longDescription: "A powerful, mobility-supporting supplement crafted to keep your dog or cat active, flexible, and comfortable every day. Enriched with joint-loving ingredients.",
        benefits: [
            "Supports Stronger Joints & Cartilage",
            "Reduces Joint Pain & Stiffness",
            "Enhances Mobility & Flexibility",
            "Strengthens Bones & Connective Tissues",
            "Boosts Overall Vitality & Recovery",
            "Suitable for All Life Stages"
        ],
        detailedBenefits: [
            { title: "Supports Stronger Joints & Cartilage", description: "Powered by glucosamine, chondroitin, and bovine collagen." },
            { title: "Reduces Joint Pain & Stiffness", description: "MSM, turmeric, boswellia, and astaxanthin work as natural anti-inflammatories." },
            { title: "Enhances Mobility & Flexibility", description: "Hyaluronic acid and Omega-3 rich fish oil help lubricate joints." },
            { title: "Strengthens Bones", description: "Vitamins D, C, E, and manganese support bone density." },
            { title: "Boosts Overall Vitality", description: "Antioxidant-rich ingredients help protect cells." },
            { title: "Suitable for All Life Stages", description: "Supports young pets, active adults, and seniors." }
        ],
        ingredients: [
            { name: "Bovine Collagen", description: "Supports cartilage strength and joint flexibility." },
            { name: "Glucosamine HCL", description: "Helps rebuild and maintain healthy joint cartilage." },
            { name: "MSM", description: "Natural anti-inflammatory to ease pain." },
            { name: "Fish Oil", description: "Rich in Omega-3 for inflammation." },
            { name: "Turmeric", description: "Natural anti-inflammatory." }
        ],
        feedGuide: [
            "Up to 11kg: 1/2 Scoop",
            "11-26kg: 1 Scoop",
            "27-45kg: 2 Scoop",
            "46kg+: 3 Scoop",
            "Mix with food."
        ],
        storage: [
            "Store in cool, dry place.",
            "Keep tightly sealed.",
            "Not for human consumption."
        ],
        vetApproval: {
            quote: "This hip and joint supplement offers a balanced blend of glucosamine, chondroitin, MSM... all clinically known to support mobility and protect joint health.",
            doctorName: "Dr. Lokhnath Mishra",
            qualification: "MVSc. Veterinary Physician"
        },
        faqs: [
            { question: "How does it help?", answer: "Supports cartilage repair, reduces stiffness, lubricates joints." },
            { question: "Is it safe for cats too?", answer: "Yes! Formulated for both dogs and cats." },
            { question: "How long to see results?", answer: "Many pets show improvement in 2-4 weeks." }
        ],
        detailedReviews: [
            { name: "Arjun Rao", rating: 5, text: "My senior dog Bruno has been moving so much better since starting this supplement." },
            { name: "Tarun Bhatia", rating: 4.5, text: "My cat Luna had trouble jumping, but after two weeks she’s back to playful self." },
            { name: "Sonal Mishra", rating: 5, text: "My lab Simba struggled with joint pain, but this powder has made a huge difference." }
        ],
        category: "Supplements",
        inStock: true,
        weight: "250g",
        petType: "Both",
        productCategory: "Supplements"
    },
    {
        id: 9,
        name: "Prebiotic ProTopper",
        price: "599",
        originalPrice: "899",
        images: ["https://images.unsplash.com/photo-1548767797-d8c844163c4b?auto=format&fit=crop&q=80&w=800"],
        rating: 5,
        reviews: 400,
        description: "BFAB Prebiotic ProTopper is designed to support smooth digestion and a healthy microbiome with its powerful 12-strain probiotic blend, natural prebiotics, and digestive enzymes.",
        longDescription: "A powerful, gut-supporting supplement designed to keep your dog or cat’s digestion smooth. Formulated with a 12-strain probiotic blend.",
        benefits: [
            "Improves Digestion & Nutrient Absorption",
            "Promotes Firm, Consistent Stool Quality",
            "Reduces Gas, Bloating & Discomfort",
            "Strengthens Immunity",
            "Supports Sensitive Stomachs",
            "Helps Recovery After Antibiotics"
        ],
        detailedBenefits: [
            { title: "Improves Digestion", description: "Probiotic blend supports healthy gut flora." },
            { title: "Promotes Firm Stool", description: "Prebiotics and enzymes regulate bowel movements." },
            { title: "Reduces Gas & Bloating", description: "Ginger, fennel, pumpkin soothe the tract." },
            { title: "Strengthens Immunity", description: "70% of immunity starts in the gut." },
            { title: "Supports Sensitive Stomachs", description: "Gentle formula restores balance." },
            { title: "Recovery Aid", description: "Replenishes beneficial microbes after antibiotics." }
        ],
        ingredients: [
            { name: "Lactobacillus Acidophilus", description: "Supports healthy gut flora." },
            { name: "Pumpkin Powder", description: "Regulates stool quality." },
            { name: "Papaya Powder", description: "Enzymes aid digestion." },
            { name: "Ginger", description: "Calms stomach." },
            { name: "Fennel Seeds", description: "Relieves gas." }
        ],
        feedGuide: [
            "Up to 11kg: 1/2 Scoop",
            "11-26kg: 1 Scoop",
            "27-45kg: 2 Scoop",
            "Mix with food."
        ],
        storage: [
            "Store in cool, dry place.",
            "Keep sealed.",
            "Do not refrigerate/freeze powder."
        ],
        vetApproval: {
            quote: "The BFAB Prebiotic ProTopper is an excellent daily gut-support formula... This combination helps restore healthy gut flora, improve nutrient absorption, and support consistent stool quality.",
            doctorName: "Dr. Lokhnath Mishra",
            qualification: "MVSc. Veterinary Physician"
        },
        faqs: [
            { question: "How does it help?", answer: "Restores healthy gut bacteria, improves absorption, reduces gas." },
            { question: "Safe for cats?", answer: "Yes, species-safe for both." },
            { question: "How long for results?", answer: "Usually 5-10 days." }
        ],
        detailedReviews: [
            { name: "Arjun Rao", rating: 5, text: "My dog Bruno had loose stools, this made a visible difference." },
            { name: "Tarun Bhatia", rating: 4.5, text: "My cat Luna’s sensitive stomach improved, no more vomiting." },
            { name: "Amit Chatterjee", rating: 4.5, text: "Simba struggled with gas, this calmed it down noticeably." }
        ],
        category: "Supplements",
        inStock: true,
        weight: "250g",
        petType: "Both",
        productCategory: "Supplements"
    },
    {
        id: 6,
        name: "Hemp Seed Oil",
        price: "349",
        originalPrice: "399",
        images: [
            "/products/6/1.png",
            "/products/6/2.png",
            "/products/6/3.png",
            "/products/6/4.png",
            "/products/6/5.png",
            "/products/6/6.png",
            "/products/6/7.png"
        ],
        rating: 5,
        reviews: 400,
        description: "BFAB Hemp Seed Oil is formulated to naturally nourish your pet’s skin, coat, joints, and overall wellbeing with its perfect 3:1 balance of Omega-6 to Omega-3 fatty acids.",
        longDescription: "A nutrient-dense, wellness-boosting oil designed to support skin, coat, joints, and vitality. Delivers perfect 3:1 Omega ratio.",
        benefits: [
            "Supports Healthy Skin & Soothes Itching",
            "Promotes Soft, Shiny Coat",
            "Reduces Inflammation & Joint Stiffness",
            "Boosts Immunity",
            "Supports Brain & Heart Health",
            "Assists With Calmness"
        ],
        detailedBenefits: [
            { title: "Supports Healthy Skin", description: "Calms irritated skin and reduces itching." },
            { title: "Promotes Soft Coat", description: "Nourishes coat for shine and reduced shedding." },
            { title: "Reduces Inflammation", description: "Omega-3 and 9 ease joint discomfort." },
            { title: "Boosts Immunity", description: "Antioxidants promote long-term wellbeing." },
            { title: "Supports Brain/Heart", description: "Balanced fatty acids for cognitive/cardiac health." },
            { title: "Assists Calmness", description: "Supports nervous system stability." }
        ],
        ingredients: [
            { name: "100% Raw & Cold-Pressed Hemp Seed Oil", description: "Pure oil with ideal 3:1 Omega-6 to Omega-3 balance." }
        ],
        feedGuide: [
            "Cats: 1/4 - 1/2 tsp",
            "Small Dogs: 1/2 tsp",
            "Medium Dogs: 1 tsp",
            "Large Dogs: 1.5 - 2 tsp",
            "Mix with food."
        ],
        storage: [
            "Store cool/dry away from light.",
            "Refrigerate after opening.",
            "Keep cap sealed."
        ],
        vetApproval: {
            quote: "Hemp seed oil is one of the most balanced plant-based supplements... BFAB’s formulation offers an ideal 3:1 Omega ratio that supports skin health, joint comfort, and overall wellness.",
            doctorName: "Dr. Lokhnath Mishra",
            qualification: "MVSc. Veterinary Physician"
        },
        faqs: [
            { question: "What does it do?", answer: "Supports skin, coat, joints, heart, and brain." },
            { question: "Safe for daily use?", answer: "Yes, 100% raw and additives-free." },
            { question: "Helps with anxiety?", answer: "Provides nervous system support for calmness." }
        ],
        detailedReviews: [
            { name: "Priya Malhotra", rating: 5, text: "My dog’s dry skin improved within a week. Coat looks shinier." },
            { name: "Tarun Bhatia", rating: 4.5, text: "My cat stopped scratching constantly. Itching reduced dramatically." },
            { name: "Ishita Ghosh", rating: 4.5, text: "Helped my senior dog’s joint stiffness. He gets up more easily now." }
        ],
        category: "Supplements",
        inStock: true,
        weight: "100ml",
        petType: "Both",
        productCategory: "Supplements"
    },
    {
        id: 4,
        name: "Chicken Bone Broth",
        price: "399",
        originalPrice: "499",
        images: [
            "/products/4/12.png",
            "/products/4/13.png",
            "/products/4/15.png",
            "/products/4/17.png",
            "/products/4/19.png"
        ],
        rating: 5,
        reviews: 400,
        description: "BFAB Chicken Bone Broth is crafted to nourish your pet’s body from the inside out with its naturally rich blend of collagen, calcium, protein, and essential minerals.",
        longDescription: "A nourishing, flavourful bone broth naturally rich in calcium and collagen. Made from 100% natural chicken bones and feet.",
        benefits: [
            "Strengthens Bones & Teeth",
            "Improves Joint Health & Mobility",
            "Boosts Immunity & Recovery",
            "Supports Digestive Health",
            "Enhances Skin & Coat Wellness",
            "Hydrates & Nourishes Picky Eaters"
        ],
        detailedBenefits: [
            { title: "Strengthens Bones", description: "Rich in calcium, magnesium, phosphorus." },
            { title: "Improves Joints", description: "Collagen and gelatin lubricate joints." },
            { title: "Boosts Immunity", description: "Essential minerals support immune function." },
            { title: "Supports Digestion", description: "Apple cider vinegar aids digestion." },
            { title: "Enhances Skin/Coat", description: "Anti-inflammatory nutrients improve hydration." },
            { title: "Hydrates Picky Eaters", description: "Savoury flavour encourages appetite." }
        ],
        ingredients: [
            { name: "Real Chicken Bones", description: "Source of calcium and minerals." },
            { name: "Real Chicken Feet", description: "Source of collagen and gelatin." },
            { name: "Apple Cider Vinegar", description: "Boosts digestion and pH balance." },
            { name: "Black Pepper", description: "Anti-inflammatory and flavour enhancer." }
        ],
        feedGuide: [
            "Add to meals for flavour.",
            "Mix with kibble.",
            "Serve warm/room temp as broth.",
            "Freeze as treats."
        ],
        storage: [
            "Store cool/dark.",
            "Refrigerate after opening.",
            "Use within 2 days of opening."
        ],
        vetApproval: {
            quote: "Bone broth is an excellent natural supplement... BFAB’s Chicken Bone Broth is made from 100% natural chicken bones and feet, providing a rich source of collagen.",
            doctorName: "Dr. Lokhnath Mishra",
            qualification: "MVSc. Veterinary Physician"
        },
        faqs: [
            { question: "Benefits?", answer: "Collagen, calcium, immunity, joints, digestion." },
            { question: "For cats too?", answer: "Yes, safe for both." },
            { question: "How to serve?", answer: "Pour over food, mix with kibble, or separate drink." }
        ],
        detailedReviews: [
            { name: "Richa Menon", rating: 5, text: "Made such a difference in my dog’s recovery. He looks more energetic." },
            { name: "Harish Rao", rating: 4.5, text: "My cat loves this! Helped appetite and coat is shinier." },
            { name: "Jay Prasad", rating: 4.5, text: "My dog’s joints seem much more comfortable now." }
        ],
        category: "Treats",
        inStock: true,
        weight: "200ml",
        petType: "Both",
        productCategory: "Treats"
    },
    {
        id: 5,
        name: "Dehydrated Crunchy Claws",
        price: "799",
        originalPrice: "999",
        images: [
            "/products/5/WhatsApp Image 2025-11-16 at 1.39.04 PM.jpeg",
            "/products/5/WhatsApp Image 2025-11-16 at 1.39.05 PM (1).jpeg",
            "/products/5/WhatsApp Image 2025-11-16 at 1.39.05 PM (2).jpeg",
            "/products/5/WhatsApp Image 2025-11-16 at 1.39.05 PM.jpeg",
            "/products/5/WhatsApp Image 2025-11-16 at 1.39.06 PM (1).jpeg",
            "/products/5/WhatsApp Image 2025-11-16 at 1.39.06 PM.jpeg"
        ],
        rating: 5,
        reviews: 400,
        description: "BFAB Dehydrated Crunchy Claws are crafted to naturally support your dog’s joint health, dental hygiene, and overall vitality with their rich, single-ingredient nutrition.",
        longDescription: "A crunchy, protein-rich natural treat made from 100% real chicken claws. Naturally crisp texture helps reduce plaque.",
        benefits: [
            "Supports Joint Health & Mobility",
            "Strengthens Bones & Connective Tissues",
            "Promotes Dental Hygiene",
            "Boosts Immunity",
            "Reduces Inflammation",
            "Provides a Natural Chew"
        ],
        detailedBenefits: [
            { title: "Supports Joint Health", description: "Rich in collagen and glucosamine." },
            { title: "Strengthens Bones", description: "Minerals support bone density." },
            { title: "Promotes Dental Hygiene", description: "Crunchy texture scrapes plaque." },
            { title: "Boosts Immunity", description: "Turmeric antioxidant properties." },
            { title: "Reduces Inflammation", description: "Turmeric and collagen soothe joints." },
            { title: "Natural Chew", description: "Digestible single-ingredient alternative to synthetics." }
        ],
        ingredients: [
            { name: "100% Chicken Feet", description: "Natural source of collagen and glucosamine." },
            { name: "Turmeric", description: "Natural antioxidant and anti-inflammatory." }
        ],
        feedGuide: [
            "Small: 1-2 feet/day",
            "Medium: 2-3 feet/day",
            "Large: 3-4 feet/day",
            "Not for puppies under 3 months."
        ],
        storage: [
            "Store cool/dry.",
            "Consume within 15-20 days opening.",
            "Refrigerate to last 30 days."
        ],
        vetApproval: {
            quote: "BFAB Dehydrated Crunchy Claws provide a clean, single-ingredient source of collagen and natural glucosamine... Their dehydrated structure aids mechanical plaque reduction.",
            doctorName: "Dr. Lokhnath Mishra",
            qualification: "MVSc. Veterinary Physician"
        },
        faqs: [
            { question: "Safe for dogs?", answer: "Yes, when properly dehydrated. No additives." },
            { question: "Benefits?", answer: "Joint health, dental hygiene, mobility." },
            { question: "For all breeds?", answer: "Most adults. Not for small puppies <3 months." }
        ],
        detailedReviews: [
            { name: "Rajeev Talwar", rating: 5, text: "Surprised how much my dog enjoyed these. Keeps him busy." },
            { name: "Tarun Bhatia", rating: 4.5, text: "My fussy eater Lily took to these instantly. Good crunch." },
            { name: "Aarohi Shetty", rating: 5, text: "Simple, clean, nothing extra. My senior dog enjoys them daily." }
        ],
        category: "Treats",
        inStock: true,
        weight: "500g",
        petType: "Canine",
        productCategory: "Treats"
    },
    {
        id: 10,
        name: "Dehydrated Chicken Breast Jerky",
        price: "799",
        originalPrice: "999",
        images: ["https://images.unsplash.com/photo-1569429532578-838612988cb6?auto=format&fit=crop&q=80&w=800"],
        rating: 5,
        reviews: 400,
        description: "BFAB Dehydrated Chicken Breast Jerky is made from 100% real chicken breast, gently sliced and dehydrated to preserve its rich 80% protein content along with essential amino acids.",
        longDescription: "A lean, protein-packed treat crafted to nourish your pet. Infused with turmeric for antioxidant support.",
        benefits: [
            "Supports Muscle Health",
            "Boosts Immunity",
            "High Protein Reward",
            "Easily Digestible",
            "Promotes Joint Comfort",
            "Natural & Clean"
        ],
        detailedBenefits: [
            { title: "Supports Muscle Health", description: "Rich in amino acids from chicken breast." },
            { title: "Boosts Immunity", description: "Turmeric provides antioxidants." },
            { title: "High Protein", description: "80% protein content for energy." },
            { title: "Easily Digestible", description: "Single ingredient + turmeric." },
            { title: "Promotes Joint Comfort", description: "Anti-inflammatory properties." },
            { title: "Natural & Clean", description: "No additives or preservatives." }
        ],
        ingredients: [
            { name: "100% Chicken Breast", description: "High quality lean protein source." },
            { name: "Turmeric", description: "Natural antioxidant and anti-inflammatory." }
        ],
        feedGuide: [
            "Small: 1-2 strips/day",
            "Medium: 2-3 strips/day",
            "Large: 3-4 strips/day",
            "Ensure water availability."
        ],
        storage: [
            "Store cool/dry.",
            "Consume within 15-20 days opening.",
            "Refrigerate to last 30 days."
        ],
        vetApproval: {
            quote: "BFAB’s Dehydrated Chicken Breast Jerky offers a clean, high-protein treat... The added turmeric delivers natural anti-inflammatory and antioxidant benefits.",
            doctorName: "Dr. Lokhnath Mishra",
            qualification: "MVSc. Veterinary Physician"
        },
        faqs: [
            { question: "Safe for all pets?", answer: "Yes, dogs and cats suitable." },
            { question: "Good for training?", answer: "Excellent high-value treat." },
            { question: "Benefits?", answer: "Muscle support, immunity, clean snaking." }
        ],
        detailedReviews: [
            { name: "Rajat Menon", rating: 5, text: "My dog goes crazy for these. Real chicken smell!" },
            { name: "Siddharth Pillai", rating: 5, text: "Perfect training treat. Breaks easily and he loves it." }
        ],
        category: "Treats",
        inStock: true,
        weight: "500g",
        petType: "Both",
        productCategory: "Treats"
    }
];
