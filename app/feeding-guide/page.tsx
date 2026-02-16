"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dog, Cat, Heart, AlertCircle, Droplet, Zap, Activity, Apple, Scale, ChevronRight } from 'lucide-react';

const FeedingGuidePage = () => {
  const [activeTab, setActiveTab] = useState('dog');
  const [petWeight, setPetWeight] = useState('');
  const [calculatedAmount, setCalculatedAmount] = useState<string | null>(null);

  const dogFeedingData = [
    { lifeStage: 'Puppy', weight: '5-10 lbs', amount: '1 - 1.5', icon: '🐶' },
    { lifeStage: 'Puppy', weight: '10-20 lbs', amount: '1.5 - 2.5', icon: '🐶' },
    { lifeStage: 'Adult', weight: '20-50 lbs', amount: '2.5 - 4', icon: '🐕' },
    { lifeStage: 'Adult', weight: '50-100 lbs', amount: '4 - 6', icon: '🐕' },
    { lifeStage: 'Senior', weight: '20-50 lbs', amount: '2 - 3.5', icon: '🦮' },
  ];

  const catFeedingData = [
    { lifeStage: 'Kitten', weight: '1-5 lbs', amount: '0.5 - 1', icon: '🐱' },
    { lifeStage: 'Adult', weight: '5-10 lbs', amount: '0.5 - 0.75', icon: '🐈' },
    { lifeStage: 'Adult', weight: '10-15 lbs', amount: '0.75 - 1', icon: '🐈' },
    { lifeStage: 'Senior', weight: '5-10 lbs', amount: '0.5 - 0.75', icon: '😺' },
  ];

  const tips = {
    dog: [
      { icon: <Droplet size={24} className="text-blue-500" />, title: 'Fresh Water', description: 'Always provide fresh, clean water throughout the day' },
      { icon: <Zap size={24} className="text-yellow-500" />, title: 'Energy Levels', description: 'Adjust portions based on activity level and metabolism' },
      { icon: <Activity size={24} className="text-green-500" />, title: 'Exercise Timing', description: 'Wait 1-2 hours after meals before vigorous exercise' },
      { icon: <Apple size={24} className="text-red-500" />, title: 'Healthy Treats', description: 'Keep treats to 10% of daily caloric intake' },
    ],
    cat: [
      { icon: <Droplet size={24} className="text-blue-500" />, title: 'Hydration', description: 'Cats need more water intake - provide multiple water sources' },
      { icon: <Heart size={24} className="text-pink-500" />, title: 'Portion Control', description: 'Feed measured portions to maintain healthy weight' },
      { icon: <Zap size={24} className="text-yellow-500" />, title: 'Feeding Schedule', description: 'Feed at the same time each day for routine' },
      { icon: <Apple size={24} className="text-red-500" />, title: 'Safe Foods Only', description: 'Avoid onions, garlic, chocolate, and raw fish' },
    ],
  };

  const handleCalculate = () => {
    if (!petWeight) return;
    const weight = parseFloat(petWeight);
    const data = activeTab === 'dog' ? dogFeedingData : catFeedingData;

    let result = null;
    for (const entry of data) {
      const [min, max] = entry.weight.split('-').map(w => parseFloat(w));
      if (weight >= min && weight <= max) {
        result = entry.amount;
        break;
      }
    }
    setCalculatedAmount(result);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300 font-sans">
      {/* Hero Section Removed */}

      {/* Tab Navigation */}
      <section className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="flex p-1 bg-gray-100 dark:bg-slate-800 rounded-xl my-4">
              {[
                { id: 'dog', label: 'Dog Guide', icon: <Dog size={20} /> },
                { id: 'cat', label: 'Cat Guide', icon: <Cat size={20} /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setCalculatedAmount(null);
                    setPetWeight('');
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === tab.id
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">

          {/* Interactive Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-slate-800 mb-16 max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
                <Scale size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Portion Calculator</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Calculate daily food intake based on weight</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Pet Weight (lbs)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={petWeight}
                    onChange={(e) => setPetWeight(e.target.value)}
                    placeholder="e.g., 25"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">lbs</span>
                </div>
              </div>

              <button
                onClick={handleCalculate}
                className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3 px-6 rounded-xl hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Calculate
                <ChevronRight size={18} />
              </button>
            </div>

            {calculatedAmount && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800 flex items-center justify-between"
              >
                <div>
                  <p className="text-green-800 dark:text-green-300 font-medium mb-1">Recommended Daily Portion</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">{calculatedAmount} cups</p>
                </div>
                <div className="h-12 w-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center text-green-600 dark:text-green-300">
                  <Apple size={24} />
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Feeding Guide Tables */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              {activeTab === 'dog' ? 'Dog Feeding Guidelines' : 'Cat Feeding Guidelines'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeTab === 'dog' ? dogFeedingData : catFeedingData).map((row, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{row.icon}</span>
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {row.lifeStage}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Weight Range</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{row.weight}</p>
                    </div>
                    <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Daily Portion</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{row.amount} cups</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tips Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
              Expert Feeding Tips
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tips[activeTab as keyof typeof tips].map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-6 flex gap-5 border border-gray-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-50 dark:bg-slate-800 rounded-xl flex items-center justify-center">
                    {tip.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{tip.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{tip.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Important Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-2xl p-8 flex flex-col md:flex-row gap-6 items-start"
          >
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-600 dark:text-amber-400 flex-shrink-0">
              <AlertCircle size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Important Notice</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                These guidelines are general recommendations. Every pet is unique with individual dietary needs.
                Always consult with your veterinarian for the best advice tailored to your pet.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600 dark:text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                  Consult your veterinarian before dietary changes
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                  Consider activity level and metabolism
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                  Transition to new food gradually (7-10 days)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                  Monitor weight and adjust portions
                </li>
              </ul>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default FeedingGuidePage;