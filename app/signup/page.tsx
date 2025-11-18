"use client";
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setShowToast(true);
      setTimeout(() => {
        router.push('/shop-now');
      }, 2000);
    } catch (error) {
      console.error('Signup error:', error);
    }
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setShowToast(true);
      setTimeout(() => {
        router.push('/shop-now');
      }, 2000);
    } catch (error) {
      console.error('Google signup error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 relative">
      {/* Toast Notification */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3"
        >
          <CheckCircle size={24} />
          <div>
            <p className="font-semibold">Account Created!</p>
            <p className="text-sm opacity-90">Redirecting to shop...</p>
          </div>
        </motion.div>
      )}
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Sign Up</h2>
        </div>
        <form className="space-y-6" onSubmit={handleSignup}>
          <div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email address"
            />
          </div>
          <div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        
        <button
          onClick={handleGoogleSignup}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
        >
          Sign up with Google
        </button>
        
        <p className="text-center text-gray-600 dark:text-gray-400">
          Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}