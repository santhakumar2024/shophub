import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const ORDERS_COLL = "orders";
export const USERS_ORDERS_SUBCOL = "orders";
export const USERS_CART_SUBCOL = "cart";
export const USERS_ADDR_SUBCOL = "addresses";

export async function createOrder(uid, order) {
  // order: { items, address, total, status?: string }
  const payload = {
    ...order,
    userId: uid,
    status: order.status || "On Process",
    createdAt: serverTimestamp(),
  };

  // write top-level admin-visible order
  const topRef = await addDoc(collection(db, ORDERS_COLL), payload);

  // also write to user's subcollection
  await addDoc(collection(db, `users/${uid}/${USERS_ORDERS_SUBCOL}`), {
    ...payload,
    // copy createdAt as timestamp may differ; storing reference to topRef.id
    adminOrderId: topRef.id,
  });

  return topRef.id;
}

export async function getAllOrders() {
  const snap = await getDocs(collection(db, ORDERS_COLL));
  console.log("Order documents snapshot:", snap.docs.data);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getOrdersByUser(uid) {
  const snap = await getDocs(collection(db, `users/${uid}/${USERS_ORDERS_SUBCOL}`));
   console.log("Order documents snapshot11:", snap.docs.data);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function updateOrderStatus(orderId, status) {
  const ref = doc(db, ORDERS_COLL, orderId);
  await updateDoc(ref, { status });
  // Note: we do NOT automatically update the user's subcollection document.
  // If you store adminOrderId on user's doc, you can query user's orders and update them as needed.
}