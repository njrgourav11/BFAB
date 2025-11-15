"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dog, Cat, Heart, AlertCircle, Droplet, Zap, Activity, Apple } from 'lucide-react';

const FeedingGuidePage = () => {
  const [activeTab, setActiveTab] = useState('dog');
  const [petWeight, setPetWeight] = useState('');
  const [calculatedAmount, setCalculatedAmount] = useState(null);

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
    for (let entry of data) {
      const [min, max] = entry.weight.split('-').map(w => parseFloat(w));
      if (weight >= min && weight <= max) {
        result = entry.amount;
        break;
      }
    }
    setCalculatedAmount(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-green-600 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">🥗 Feeding Guide</h1>
            <p className="text-xl text-green-100">Proper nutrition for every life stage</p>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-white border-b sticky top-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 justify-center">
            {[
              { id: 'dog', label: 'Dog Feeding Guide', icon: <Dog size={24} /> },
              { id: 'cat', label: 'Cat Feeding Guide', icon: <Cat size={24} /> },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveTab(tab.id);
                  setCalculatedAmount(null);
                  setPetWeight('');
                }}
                className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition text-lg ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Interactive Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-blue-100 to-green-100 rounded-lg p-8 mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">📊 Portion Calculator</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Pet Weight (lbs):
                </label>
                <input
                  type="number"
                  value={petWeight}
                  onChange={(e) => setPetWeight(e.target.value)}
                  placeholder="Enter weight..."
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                onClick={handleCalculate}
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-2 px-6 rounded-lg transition shadow-lg"
              >
                Calculate
              </button>
              {calculatedAmount && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-white border-2 border-green-500 rounded-lg p-4"
                >
                  <p className="text-gray-700 font-semibold">Daily Portions:</p>
                  <p className="text-2xl font-bold text-green-600">{calculatedAmount} cups</p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Feeding Guide Tables */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              {activeTab === 'dog' ? '🐕 Dog Feeding Guide' : '🐱 Cat Feeding Guide'}
            </h2>

            <div className="overflow-x-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(activeTab === 'dog' ? dogFeedingData : catFeedingData).map((row, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-gradient-to-b from-blue-500 to-green-500 hover:shadow-2xl transition"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{row.icon}</span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {row.lifeStage}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Weight Range</h3>
                    <p className="text-gray-600 mb-4">{row.weight}</p>
                    <div className="pt-4 border-t">
                      <p className="text-gray-700 font-semibold mb-2">Daily Portions:</p>
                      <p className="text-2xl font-bold text-green-600">{row.amount} cups</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 pt-16 border-t-2"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
              💡 Feeding Tips for {activeTab === 'dog' ? 'Dogs' : 'Cats'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tips[activeTab].map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg p-6 flex gap-4 border-l-4 border-gradient-to-b from-yellow-500 to-orange-500 hover:shadow-2xl transition"
                >
                  <div className="flex-shrink-0">{tip.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{tip.title}</h3>
                    <p className="text-gray-600">{tip.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Important Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg"
          >
            <div className="flex gap-4">
              <AlertCircle size={28} className="text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">⚠️ Important Notice</h3>
                <p className="text-gray-700 mb-2">
                  These guidelines are general recommendations. Every pet is unique with individual dietary needs.
                </p>
                <ul className="text-gray-700 list-disc list-inside space-y-1">
                  <li>Consult your veterinarian before making dietary changes</li>
                  <li>Consider your pet's activity level and metabolism</li>
                  <li>Transition to new food gradually over 7-10 days</li>
                  <li>Monitor your pet's weight and adjust portions as needed</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Nutritional Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">🌿 Key Nutritional Elements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Protein', desc: 'Essential for muscle development' },
                { title: 'Fats', desc: 'Healthy coat and skin support' },
                { title: 'Fiber', desc: 'Aids digestion and gut health' },
                { title: 'Vitamins & Minerals', desc: 'Supports immune system' },
              ].map((nutrient, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-4 text-center shadow-md"
                >
                  <p className="font-bold text-gray-800 mb-2">{nutrient.title}</p>
                  <p className="text-sm text-gray-600">{nutrient.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FeedingGuidePage;