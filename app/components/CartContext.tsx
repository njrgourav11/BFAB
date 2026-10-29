'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { AppliedCoupon } from '@/lib/types';
import { validateCouponCode } from '@/lib/coupon-utils';

export interface CartItem {
  id: string | number;
  name: string;
  price: string;
  quantity: number;
  image: string;
  petType: string;
  productCategory: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  // Coupon support
  appliedCoupon: AppliedCoupon | null;
  couponError: string | null;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string; discount?: number }>;
  removeCoupon: () => void;
  getDiscountAmount: () => number;
  getDiscountedSubtotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Load cart and saved coupon from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }

    const savedCoupon = localStorage.getItem('bfab_coupon');
    if (savedCoupon) {
      try {
        setAppliedCoupon(JSON.parse(savedCoupon));
      } catch (error) {
        console.error('Error loading saved coupon:', error);
      }
    }

    // Check URL parameters for ?coupon=CODE
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlCoupon = urlParams.get('coupon') || urlParams.get('code') || urlParams.get('c');
      if (urlCoupon) {
        // Auto-attempt coupon application once cart is loaded
        validateCouponCode(urlCoupon, 1000).then((res) => {
          if (res.valid && res.coupon) {
            const couponObj: AppliedCoupon = {
              code: res.coupon.code,
              groupName: res.coupon.groupName,
              discountType: res.coupon.discountType,
              discountValue: res.coupon.discountValue,
              discountAmount: res.discountAmount,
              minOrderValue: res.coupon.minOrderValue,
              maxDiscount: res.coupon.maxDiscount,
            };
            setAppliedCoupon(couponObj);
            localStorage.setItem('bfab_coupon', JSON.stringify(couponObj));
          }
        });
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save coupon to localStorage whenever it changes
  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('bfab_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('bfab_coupon');
    }
  }, [appliedCoupon]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string | number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
    localStorage.removeItem('bfab_coupon');
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity, 0);
  }, [cartItems]);

  const getDiscountAmount = useCallback((): number => {
    if (!appliedCoupon) return 0;
    const subtotal = getTotalPrice();
    if (subtotal <= 0) return 0;

    if (appliedCoupon.minOrderValue && subtotal < appliedCoupon.minOrderValue) {
      return 0;
    }

    let discount = 0;
    if (appliedCoupon.discountType === 'percentage') {
      discount = (subtotal * appliedCoupon.discountValue) / 100;
      if (appliedCoupon.maxDiscount && appliedCoupon.maxDiscount > 0) {
        discount = Math.min(discount, appliedCoupon.maxDiscount);
      }
    } else {
      discount = appliedCoupon.discountValue;
    }

    return Math.min(discount, subtotal);
  }, [appliedCoupon, getTotalPrice]);

  const getDiscountedSubtotal = useCallback((): number => {
    const subtotal = getTotalPrice();
    const discount = getDiscountAmount();
    return Math.max(0, subtotal - discount);
  }, [getTotalPrice, getDiscountAmount]);

  const applyCoupon = async (code: string): Promise<{ success: boolean; message: string; discount?: number }> => {
    setCouponError(null);
    const subtotal = getTotalPrice();
    const result = await validateCouponCode(code, subtotal);

    if (!result.valid || !result.coupon) {
      setCouponError(result.message);
      return { success: false, message: result.message };
    }

    const newApplied: AppliedCoupon = {
      code: result.coupon.code,
      groupName: result.coupon.groupName,
      discountType: result.coupon.discountType,
      discountValue: result.coupon.discountValue,
      discountAmount: result.discountAmount,
      minOrderValue: result.coupon.minOrderValue,
      maxDiscount: result.coupon.maxDiscount,
    };

    setAppliedCoupon(newApplied);
    localStorage.setItem('bfab_coupon', JSON.stringify(newApplied));
    return { success: true, message: result.message, discount: result.discountAmount };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
    localStorage.removeItem('bfab_coupon');
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    getDiscountAmount,
    getDiscountedSubtotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
