"use client";
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowToast(true);
      setTimeout(() => {
        router.push('/shop-now');
      }, 2000);
    } catch (error) {
      console.error('Login error:', error);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setShowToast(true);
      setTimeout(() => {
        router.push('/shop-now');
      }, 2000);
    } catch (error) {
      console.error('Google login error:', error);
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
            <p className="font-semibold">Login Successful!</p>
            <p className="text-sm opacity-90">Redirecting to shop...</p>
          </div>
        </motion.div>
      )}
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Sign In</h2>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
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
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
        >
          Sign in with Google
        </button>
        
        <p className="text-center text-gray-600 dark:text-gray-400">
          Don't have an account? <Link href="/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}