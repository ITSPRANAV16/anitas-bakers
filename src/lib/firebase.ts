import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA1bUNzmx7LWN1slI2ZblV_eqh2DdxZ2gw",
  authDomain: "anitas-bakers.firebaseapp.com",
  projectId: "anitas-bakers",
  storageBucket: "anitas-bakers.firebasestorage.app",
  messagingSenderId: "852088197591",
  appId: "1:852088197591:web:a81af0e85f95d3eeba7b92",
};

// Initialize Firebase only if it hasn't been initialized yet
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Data Models
export type Product = {
  id: string;
  name: string;
  price: string;
  cat: string;
  img: string;
};

export type Review = {
  dbId?: string;
  id?: number;
  name: string;
  text: string;
  rating: number;
  date?: string;
  createdAt?: string;
};

export const DEFAULT_PRODUCTS: Product[] = [
  { id: 'bread30', name: '🍞 Bread (30)', price: '₹30', cat: 'bread', img: '/img/bread_lux.png' },
  { id: 'bread40', name: '🍞 Bread (40)', price: '₹40', cat: 'bread', img: '/img/bread_lux.png' },
  { id: 'biscuit', name: '🫓 Biscuit', price: '₹50', cat: 'snacks', img: '/img/biscuit_lux.png' },
  { id: 'khari', name: '🥐 Khari', price: '₹60', cat: 'snacks', img: '/img/khari_lux.png' },
  { id: 'toast20', name: '🍞 Toast (20)', price: '₹20', cat: 'bread', img: '/img/toast_lux.png' },
  { id: 'toast40', name: '🍞 Toast (40)', price: '₹40', cat: 'bread', img: '/img/toast_lux.png' },
  { id: 'pav30', name: '🍞 Pav Ladi (30)', price: '₹30', cat: 'bread', img: '/img/pav_lux.png' },
  { id: 'pav40', name: '🍞 Pav Ladi (40)', price: '₹40', cat: 'bread', img: '/img/pav_lux.png' },
  { id: 'pastry', name: '🧁 Pastry', price: '₹30', cat: 'cakes', img: '/img/pastry_lux.png' },
  { id: 'mava', name: '🍰 Mava Cake', price: '₹125', cat: 'cakes', img: '/img/mava_lux.png' },
  { id: 'chocolate', name: '🎂 Chocolate Cake', price: '₹250', cat: 'cakes', img: '/img/chocolate_lux.png' },
  { id: 'strawberry', name: '🎂 Strawberry Cake', price: '₹200', cat: 'cakes', img: '/img/strawberry_lux.png' },
  { id: 'blueberry', name: '🎂 Blueberry Cake', price: '₹200', cat: 'cakes', img: '/img/blueberry_lux.png' },
  { id: 'pineapple', name: '🎂 Pineapple Cake', price: '₹200', cat: 'cakes', img: '/img/pineapple_lux.png' },
  { id: 'blackforest', name: '🎂 Black Forest', price: '₹200', cat: 'cakes', img: '/img/blackforest_lux.png' },
  { id: 'mixfruit', name: '🎂 Mix Fruit Cake', price: '₹250', cat: 'cakes', img: '/img/mixfruit_lux.png' },
  { id: 'redvelvet', name: '🎂 Red Velvet', price: '₹300', cat: 'cakes', img: '/img/redvelvet_lux.png' },
  { id: 'rasmalai', name: '🎂 Rasmalai Cake', price: '₹300', cat: 'cakes', img: '/img/rasmalai_lux.png' },
];

export const APP_CONFIG = {
  WHATSAPP_NUM: '919595997500',
  SHOP_NAME: "Anita's Bakers",
  SHOP_TAGLINE: '100% Pure Vegetarian',
};
