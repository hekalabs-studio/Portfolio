// ============================================================
// Firebase — Novemas Heka Portfolio
// Dokumentasi: https://firebase.google.com/docs/web/setup
// ============================================================

// Import SDK Firebase yang dibutuhkan
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-analytics.js";

// Konfigurasi web app Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDaXaewLjYB-XSDcOz2jthGKbxEKKpxsOs",
  authDomain: "hekaportfolio.firebaseapp.com",
  projectId: "hekaportfolio",
  storageBucket: "hekaportfolio.firebasestorage.app",
  messagingSenderId: "1094913845913",
  appId: "1:1094913845913:web:1b90c63d9fe0c460556608",
  measurementId: "G-9LZ32GTRJ6"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Aktifkan Analytics.
// Dibungkus try/catch agar website tetap berjalan normal walau
// Analytics tidak tersedia (mis. dibuka lewat file:// atau browser
// yang memblokir cookie/storage).
try {
  const analytics = getAnalytics(app);
  console.log("Firebase Analytics aktif ✅");
} catch (error) {
  console.warn("Firebase Analytics tidak aktif:", error.message);
}