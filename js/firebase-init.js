// Firebase Web SDK loaded via CDN (ES modules) — this project is a static
// site with no bundler, so the npm "firebase" package (in package.json)
// cannot be imported directly in the browser. These config values are the
// public Firebase Web config; they are safe to expose client-side and are
// protected by Firebase Security Rules / authorized-domain restrictions,
// not by secrecy.
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyCWP7qWpLoNJ1Jx9Dg4q-2o829f7HQzi7M",
  authDomain: "prosystem-security.firebaseapp.com",
  projectId: "prosystem-security",
  storageBucket: "prosystem-security.firebasestorage.app",
  messagingSenderId: "61129601676",
  appId: "1:61129601676:web:35866d9f5efb57815881a9",
  measurementId: "G-VZS6EY91K1",
};

const app = initializeApp(firebaseConfig);

// Analytics needs browser APIs (cookies/IndexedDB) that aren't always
// available (e.g. some privacy modes) — isSupported() guards against that.
isSupported().then((supported) => {
  if (supported) getAnalytics(app);
});
