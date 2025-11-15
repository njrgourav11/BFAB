"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Loader, Check, X } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: '', color: '' };

    let strength = 0;
    const checks = {
      hasLower: /[a-z]/.test(password),
      hasUpper: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*]/.test(password),
      isLongEnough: password.length >= 8,
    };

    Object.values(checks).forEach(check => {
      if (check) strength++;
    });

    let label = '';
    let color = '';
    if (strength <= 2) {
      label = 'Weak';
      color = 'bg-red-500';
    } else if (strength <= 3) {
      label = 'Fair';
      color = 'bg-yellow-500';
    } else if (strength <= 4) {
      label = 'Good';
      color = 'bg-blue-500';
    } else {
      label = 'Strong';
      color = 'bg-green-500';
    }

    return { strength, label, color, checks };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!agreedToTerms) newErrors.terms = 'You must agree to the terms';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Registration successful!');
    }, 2000);
  };

  const passwordStrength = getPasswordStrength();

  const handleSocialSignup = (provider) => {
    console.log(`Signing up with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 flex items-center justify-center px-3 sm:px-4 py-8 sm:py-12">
      {/* Animated Background Elements - Optimized for Mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-20 animate-pulse"></div>
        <div className="hidden sm:block absolute bottom-20 right-10 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo/Header */}
        <div className="text-center mb-6 sm:mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-5xl mb-2 sm:mb-3"
          >
            🐾
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Join the Pack!</h1>
          <p className="text-sm sm:text-base text-emerald-100">Create your BFAB account today</p>
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20"
        >
          {/* Social Signup Options */}
          <div className="mb-4 sm:mb-6">
            <p className="text-center text-gray-600 text-xs sm:text-sm font-semibold mb-3 sm:mb-4">Quick sign up with</p>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { label: 'Google', icon: '🔍' },
                { label: 'Apple', icon: '🍎' },
                { label: 'Facebook', icon: '👥' },
              ].map((provider) => (
                <motion.button
                  key={provider.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSocialSignup(provider.label)}
                  className="flex items-center justify-center py-2.5 sm:py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-xl sm:text-2xl"
                  type="button"
                >
                  {provider.icon}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="relative mb-4 sm:mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-3 bg-white text-gray-500 font-semibold">OR</span>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {/* Full Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 sm:top-3.5 text-gray-400" size={18} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2 sm:py-3 border-2 rounded-lg focus:outline-none transition text-gray-700 placeholder-gray-400 text-sm sm:text-base ${
                    errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                  }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>}
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 sm:top-3.5 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2 sm:py-3 border-2 rounded-lg focus:outline-none transition text-gray-700 placeholder-gray-400 text-sm sm:text-base ${
                    errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                  }`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 sm:top-3.5 text-gray-400" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-2 sm:py-3 border-2 rounded-lg focus:outline-none transition text-gray-700 placeholder-gray-400 text-sm sm:text-base ${
                    errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                  }`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 sm:top-3.5 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                        className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                      />
                    </div>
                    <span className={`text-xs font-bold whitespace-nowrap ${
                      passwordStrength.strength <= 2 ? 'text-red-600' :
                      passwordStrength.strength <= 3 ? 'text-yellow-600' :
                      passwordStrength.strength <= 4 ? 'text-blue-600' :
                      'text-green-600'
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>

                  {/* Requirements Checklist */}
                  <div className="bg-gray-50 rounded p-2 sm:p-3 space-y-1 text-xs">
                    {Object.entries({
                      'Lowercase letters': passwordStrength.checks?.hasLower,
                      'Uppercase letters': passwordStrength.checks?.hasUpper,
                      'Numbers': passwordStrength.checks?.hasNumber,
                      'Special characters': passwordStrength.checks?.hasSpecial,
                      '8+ characters': passwordStrength.checks?.isLongEnough,
                    }).map(([label, isValid]) => (
                      <div key={label} className="flex items-center gap-2">
                        {isValid ? (
                          <Check size={14} className="text-green-600 flex-shrink-0" />
                        ) : (
                          <X size={14} className="text-gray-400 flex-shrink-0" />
                        )}
                        <span className={isValid ? 'text-green-600' : 'text-gray-600'}>{label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
              {errors.password && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.password}</p>}
            </motion.div>

            {/* Confirm Password */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 sm:top-3.5 text-gray-400" size={18} />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-2 sm:py-3 border-2 rounded-lg focus:outline-none transition text-gray-700 placeholder-gray-400 text-sm sm:text-base ${
                    errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3 sm:top-3.5 text-gray-400 hover:text-gray-600 transition"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.confirmPassword}</p>}
            </motion.div>

            {/* Terms Checkbox */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="flex items-start gap-2"
            >
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 mt-1 rounded border-gray-300 accent-green-600 cursor-pointer flex-shrink-0"
              />
              <label htmlFor="terms" className="text-xs sm:text-sm text-gray-600 cursor-pointer">
                I agree to the{' '}
                <Link href="#" className="font-bold text-green-600 hover:text-green-700">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link href="#" className="font-bold text-green-600 hover:text-green-700">
                  Privacy Policy
                </Link>
              </label>
            </motion.div>
            {errors.terms && <p className="text-red-500 text-xs sm:text-sm">{errors.terms}</p>}

            {/* Sign Up Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || !agreedToTerms}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-2.5 sm:py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-75 text-sm sm:text-base"
            >
              {loading ? (
                <>
                  <Loader size={18} className="sm:w-5 sm:h-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </motion.button>
          </form>

          {/* Login Link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1 }}
            className="text-center mt-4 sm:mt-6 text-gray-700 text-xs sm:text-sm"
          >
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-green-600 hover:text-green-700 transition">
              Sign in here
            </Link>
          </motion.p>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.1 }}
          className="mt-6 text-center text-emerald-100 text-sm"
        >
          <p>🔒 Your data is safe and secure</p>
          <p className="mt-2">Questions? <Link href="/contact-us" className="underline hover:text-white transition">Get in touch</Link></p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;