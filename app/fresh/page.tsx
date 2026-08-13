import Image from 'next/image';
import Link from 'next/link';

export default function FreshMealPage() {
  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Section 1: Fresh Approach */}
      <section className="bg-[#11241f] pt-20 md:pt-32 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            
            {/* Left side */}
            <div className="md:w-1/2 flex flex-col justify-between">
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-extrabold text-white leading-[1.05] tracking-tight mb-8">
                  It's time for a fresh approach to pet food
                </h1>
                <p className="text-lg md:text-xl text-white font-medium mb-12 max-w-lg leading-relaxed">
                  By bringing fresh, wholesome food to your pet’s bowl, we’re making everyday nutrition better. Made with carefully selected ingredients and prepared with your pet’s health in mind, our fresh meals are packed with goodness, flavour, and real nourishment.
                </p>
              </div>
              
              {/* Product Image */}
              <div className="relative h-[250px] md:h-[300px] w-[90%] mx-auto md:mx-0 -mb-4 mt-auto">
                 <Image src="/products/1/20.png" alt="Fresh Pet Food Pouch" fill className="object-contain" />
              </div>
            </div>

            {/* Right side: Strike-through text list */}
            <div className="md:w-1/2 flex flex-col gap-12 pb-20 md:pb-32 justify-center text-center md:text-center mt-12 md:mt-0">
              
              {/* Item 1 */}
              <div>
                <div className="inline-block relative mb-4">
                  <h3 className="text-[26px] md:text-3xl font-extrabold text-white relative z-10 font-serif">"MYSTERY MEAT"</h3>
                  {/* Strike through */}
                  <div className="absolute top-1/2 left-[-10%] w-[120%] h-[3px] bg-[#E76F51] transform -translate-y-1/2 rotate-[-2deg] z-20"></div>
                </div>
                <p className="text-white/90 text-[17px] md:text-lg max-w-sm mx-auto font-medium">Some pet foods use vague ingredient terms like “meat meal” or “animal meal,” making it harder for pet parents to know exactly what goes into the bowl.</p>
              </div>
              
              {/* Item 2 */}
              <div>
                <div className="inline-block relative mb-4">
                  <h3 className="text-[26px] md:text-3xl font-extrabold text-white relative z-10 font-serif">Brown Pellets</h3>
                  {/* Strike through */}
                  <div className="absolute top-1/2 left-[-10%] w-[120%] h-[3px] bg-[#E76F51] transform -translate-y-1/2 rotate-[-1deg] z-20"></div>
                </div>
                <p className="text-white/90 text-[17px] md:text-lg max-w-sm mx-auto font-medium">Kibble is extremely processed regardless of the ingredient claims (or pictures).</p>
              </div>
              
              {/* Item 3 */}
              <div>
                <div className="inline-block relative mb-4">
                  <h3 className="text-[26px] md:text-3xl font-extrabold text-white relative z-10 font-serif">Label Tricks</h3>
                  {/* Strike through */}
                  <div className="absolute top-1/2 left-[-10%] w-[120%] h-[3px] bg-[#E76F51] transform -translate-y-1/2 rotate-[-3deg] z-20"></div>
                </div>
                <p className="text-white/90 text-[17px] md:text-lg max-w-sm mx-auto font-medium">Food can hide behind misleading bags. “Made with Chicken” can mean just 3% chicken.</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Section 2: How we make it healthy */}
      <section className="bg-[#fef6eb] dark:bg-slate-900 py-20 md:py-32 border-b-2 border-white dark:border-[#11241f]/20">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
            
            {/* Left side: Video */}
            <div className="w-full md:w-1/2 relative flex justify-center">
              <div className="relative w-[300px] h-[400px] md:w-[420px] md:h-[550px] bg-gray-200 dark:bg-slate-800 rounded-xl flex items-center justify-center overflow-hidden">
                 <p className="text-gray-500 font-medium">Video Placeholder</p>
                 {/* <video src="/path/to/video.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover"></video> */}
              </div>
            </div>

            {/* Right side: Content */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-[3.5rem] md:text-[4.5rem] font-bold text-[#11241f] dark:text-white leading-[1.05] tracking-tight mb-12">
                How we make <br className="hidden md:block" /> pet food healthy:
              </h2>
              
              <div className="flex flex-col gap-10">
                <div>
                  <h3 className="text-[22px] font-bold text-[#11241f] dark:text-white mb-3">Personalized plans</h3>
                  <p className="text-[17px] text-[#11241f]/90 dark:text-gray-300 font-medium">A pet-centric meal plan is customized to meet your dog’s individual nutritional and dietary requirements. Meals are pre-prepared and portioned according to their specific calorie needs, based on the details provided about your dog.</p>
                </div>

                <div>
                  <p className="text-[17px] text-[#11241f]/90 dark:text-gray-300 font-medium">Our retort-packed meals lock in freshness and nutrition, offering a convenient, shelf-stable way to serve wholesome, ready-to-serve food your pet will love.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 3: Better for them */}
      <section className="bg-[#fef6eb] dark:bg-slate-900 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-[1300px]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
            
            {/* Left side */}
            <div className="w-full md:w-[45%] flex flex-col justify-center">
              <h2 className="text-[4rem] md:text-[5rem] lg:text-[5.5rem] font-bold text-[#11241f] dark:text-white leading-[1.0] tracking-tight mb-8">
                Better for them.<br/>Easier for you.
              </h2>
              <p className="text-[19px] md:text-[22px] text-[#11241f]/90 dark:text-gray-300 mb-12 font-medium">
                Our vet-developed plans guide you to the best diet, while perfectly-timed deliveries make sure you never run out.
              </p>
              
              {/* Plan features */}
              <div className="mb-6 border-b-2 border-[#11241f]/20 pb-4 max-w-[400px]">
                <h4 className="text-[19px] font-bold text-[#11241f] dark:text-white">Plan features</h4>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-full md:max-w-none">
                <div className="font-bold text-[#11241f] dark:text-white text-[15px] leading-tight">
                  Free & flexible<br/>deliveries
                </div>
                <div className="font-bold text-[#11241f] dark:text-white text-[15px] leading-tight">
                  Pan India<br/>shipping
                </div>
                <div className="font-bold text-[#11241f] dark:text-white text-[15px] leading-tight">
                  Retort technology<br/>packaging
                </div>
                <div className="font-bold text-[#11241f] dark:text-white text-[15px] leading-tight">
                  24-hour<br/>customer service
                </div>
              </div>
            </div>

            {/* Right side: Image */}
            <div className="w-full md:w-[50%] relative">
              <div className="relative w-full aspect-[4/3] shadow-2xl bg-white border-[8px] border-white dark:border-slate-800">
                <Image src="/products/1/20.png" alt="Happy dog and owner" fill className="object-cover" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 4: How your plan works */}
      <section className="bg-[#fef6eb] dark:bg-slate-900 py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#11241f] dark:text-white text-center tracking-tight mb-16 md:mb-24">
            How your plan works
          </h2>
          
          <div className="relative flex flex-col md:flex-row justify-between items-start gap-12 md:gap-4">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center w-full md:w-1/3 z-10 px-4">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-[#4f7762] rounded-[45%_55%_40%_60%] flex items-center justify-center mb-6 shadow-md transform -rotate-3">
                <span className="text-4xl md:text-5xl font-bold text-white font-serif">1</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#11241f] dark:text-white mb-4">Build your plan</h3>
              <p className="text-[#11241f]/80 dark:text-gray-300 font-medium">
                Simply tell us a little bit about your dog, and we'll create a plan with personalized portions to meet their unique nutritional and caloric needs.
              </p>
            </div>
            
            {/* Arrow 1 */}
            <div className="hidden md:block absolute top-12 left-[28%] w-[15%] text-[#4f7762]">
               <svg viewBox="0 0 100 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full drop-shadow-sm opacity-80">
                 <path d="M0 10 Q 50 8 95 10 M85 2 L96 10 L83 18" />
               </svg>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center w-full md:w-1/3 z-10 px-4">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-[#4f7762] rounded-[50%_40%_60%_45%] flex items-center justify-center mb-6 shadow-md transform rotate-2">
                <span className="text-4xl md:text-5xl font-bold text-white font-serif">2</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#11241f] dark:text-white mb-4">Try it out</h3>
              <p className="text-[#11241f]/80 dark:text-gray-300 font-medium">
                To start, you'll get your first box with up to two weeks of freshly made food – perfect for your dog to get a taste.
              </p>
            </div>
            
            {/* Arrow 2 */}
            <div className="hidden md:block absolute top-12 left-[60%] w-[15%] text-[#4f7762]">
               <svg viewBox="0 0 100 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full drop-shadow-sm opacity-80">
                 <path d="M0 10 Q 50 12 95 10 M85 2 L96 10 L83 18" />
               </svg>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center w-full md:w-1/3 z-10 px-4">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-[#4f7762] rounded-[40%_60%_50%_55%] flex items-center justify-center mb-6 shadow-md transform -rotate-1">
                <span className="text-4xl md:text-5xl font-bold text-white font-serif">3</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#11241f] dark:text-white mb-4">Fall in love</h3>
              <p className="text-[#11241f]/80 dark:text-gray-300 font-medium">
                If you and your dog love it – we think you will! – you're all set. You'll start receiving boxes of food automatically whenever you're running low.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Section 5: Over 1 billion meals */}
      <section className="bg-[#fef6eb] dark:bg-slate-900 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-[2.5rem] md:text-[4rem] font-extrabold text-[#11241f] dark:text-white leading-[1.05] tracking-tight mb-16">
            Over 1 billion meals <br className="hidden md:block"/> delivered
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {/* Benefit 1 */}
            <div className="flex flex-col items-center gap-3">
              <svg className="w-6 h-6 text-[#4f7762]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              <span className="text-[17px] font-bold text-[#11241f] dark:text-white leading-tight">Increased<br/>vitality</span>
            </div>
            {/* Benefit 2 */}
            <div className="flex flex-col items-center gap-3">
              <svg className="w-6 h-6 text-[#4f7762]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              <span className="text-[17px] font-bold text-[#11241f] dark:text-white leading-tight">Clear skin &<br/>shiny coat</span>
            </div>
            {/* Benefit 3 */}
            <div className="flex flex-col items-center gap-3">
              <svg className="w-6 h-6 text-[#4f7762]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              <span className="text-[17px] font-bold text-[#11241f] dark:text-white leading-tight">Less<br/>"dog odor"</span>
            </div>
            {/* Benefit 4 */}
            <div className="flex flex-col items-center gap-3">
              <svg className="w-6 h-6 text-[#4f7762]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              <span className="text-[17px] font-bold text-[#11241f] dark:text-white leading-tight">Better<br/>#2</span>
            </div>
          </div>
          
          <Link href="/products" className="inline-block bg-[#11241f] text-white px-12 py-5 font-bold text-[19px] hover:bg-[#1a3b34] transition-colors shadow-xl">
            Build Your Plan
          </Link>
        </div>
      </section>

      {/* Section 6: Testimonial */}
      <section className="bg-[#fef6eb] dark:bg-slate-900 pb-32 pt-10">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-[20px] md:text-[24px] font-bold text-[#11241f] dark:text-white mb-8 leading-snug">
            "HE IS MORE PLAYFUL THAN EVER. At 9-years-old he is no longer lethargic and wants to play until I eventually give up. I cannot rave about this food enough. It's worth every penny to see my pup this happy and healthy."
          </p>
          <div className="inline-block transform -rotate-[4deg] mb-12">
            <span className="font-display font-semibold italic text-[22px] text-[#11241f] dark:text-white tracking-wide">
              Giovanni's person
            </span>
          </div>
          
          {/* Slider indicator */}
          <div className="flex justify-center gap-2">
            <div className="w-10 h-1 bg-[#4f7762]"></div>
            <div className="w-10 h-1 bg-[#11241f]/10 dark:bg-white/20"></div>
          </div>
        </div>
      </section>

    </div>
  );
}
