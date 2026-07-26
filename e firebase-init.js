// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } 
  from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDw4dtnX3zoWbxHiLdt5kKM4n6ak6wLe9U",
  authDomain: "truongn-va-may-thang-ngu.firebaseapp.com",
  projectId: "truongn-va-may-thang-ngu",
  storageBucket: "truongn-va-may-thang-ngu.firebasestorage.app",
  messagingSenderId: "571695423799",
  appId: "1:571695423799:web:1b3cc0e53c8f0d57cafab2",
  measurementId: "G-QBNDGTZ33K"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.saveVictim = async function (name, escapeAttempts, caught, deviceType) {
  try {
    await addDoc(collection(db, "victims"), {
      name: name,
      escape_attempts: escapeAttempts,
      caught: caught,
      device_type: deviceType,
      caught_at: serverTimestamp()
    });
    console.log("Đã lưu nạn nhân:", name);
  } catch (error) {
    console.error("Lỗi khi lưu:", error);
  }
};