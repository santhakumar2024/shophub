import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { createOrder } from "../services/orderService";
import useCartStore from "../store/cartStore";
import useAuthStore from "../store/authStore";

export default function Checkout() {
  const { user } = useAuthStore();
  const uid = user?.uid;
  const { cart, clearCart } = useCartStore();

  const [addresses, setAddresses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newAddr, setNewAddr] = useState({ label: "", address: "" });
  const [saving, setSaving] = useState(false);

  // Safe cart items with fallback to empty array
  const safeCartItems = cart || [];
  console.log("Cart Items:", safeCartItems);
  
  // Calculate total safely
  const calculateTotal = () => {
    if (!safeCartItems.length) return 0;
    return safeCartItems.reduce((s, it) => s + (it.price || 0) * (it.quantity || 1), 0);
  };

  useEffect(() => {
    if (!uid) return;
    (async () => {
      try {
        const snap = await getDocs(collection(db, `users/${uid}/addresses`));
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setAddresses(list);
        if (list.length) setSelected(list[0].id);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    })();
  }, [uid]);

  const handleAddAddress = async () => {
    if (!uid) return;
    
    setSaving(true);
    try {
      const ref = await addDoc(collection(db, `users/${uid}/addresses`), newAddr);
      setAddresses((p) => [...p, { id: ref.id, ...newAddr }]);
      setSelected(ref.id);
      setNewAddr({ label: "", address: "" });
      setAdding(false);
    } catch (error) {
      console.error("Error adding address:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleConfirm = async () => {
    if (!uid) return;
    
    // Check if cart has items
    if (!safeCartItems.length) {
      alert("Your cart is empty. Please add items before checkout.");
      return;
    }

    const addr = addresses.find((a) => a.id === selected);
    const orderPayload = {
      items: safeCartItems,
      address: addr || null,
      total: calculateTotal(),
    };
    
    setSaving(true);
    try {
      const orderId = await createOrder(uid, orderPayload);
      
      // Clear user's cart from Firestore
      try {
        const snap = await getDocs(collection(db, `users/${uid}/cart`));
        await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
      } catch (error) {
        console.error("Error clearing cart from Firestore:", error);
      }
      
      // Clear local store
      clearCart();
      
      // Navigate to order history
      window.location.href = "/dashboard/orders";
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!uid) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="p-6">Please login to checkout.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

      {/* Cart Items Summary with Images */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="font-medium text-lg mb-4">Order Summary</h3>
        {safeCartItems.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            <div className="text-lg mb-2">Your cart is empty</div>
            <p className="text-sm">Add some items to proceed with checkout</p>
          </div>
        ) : (
          <div className="space-y-4">
            {safeCartItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 border-b pb-4 last:border-b-0">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img
                    src={item.image || item.photoURL || "/placeholder-image.jpg"}
                    alt={item.title || item.name || "Product"}
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border"
                    onError={(e) => {
                      e.target.src = "/placeholder-image.jpg";
                    }}
                  />
                </div>
                
                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">
                    {item.title || item.name || "Unnamed Item"}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Qty:</span> {item.quantity || 1}
                  </div>
                  {item.description && (
                    <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {item.description}
                    </div>
                  )}
                </div>
                
                {/* Price */}
                <div className="flex flex-col items-end">
                  <div className="font-semibold text-gray-900">
                    ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    ${(item.price || 0).toFixed(2)} each
                  </div>
                </div>
              </div>
            ))}
            
            {/* Total Summary */}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span className="text-primary-600">${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="text-sm text-gray-500 text-right mt-1">
                {safeCartItems.length} item{safeCartItems.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Shipping Address Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="font-medium text-lg mb-4">Shipping Address</h3>

        {addresses.length === 0 && (
          <div className="text-sm text-gray-500 mb-4 p-4 bg-gray-50 rounded-lg">
            No saved addresses. Please add a shipping address below.
          </div>
        )}
        
        <div className="space-y-3">
          {addresses.map((a) => (
            <label key={a.id} className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="addr"
                checked={selected === a.id}
                onChange={() => setSelected(a.id)}
                className="mt-1 text-primary-600 focus:ring-primary-500"
              />
              <div className="text-sm flex-1">
                <div className="font-medium text-gray-900">{a.label || "Address"}</div>
                <div className="text-gray-600 mt-1 whitespace-pre-line">{a.address}</div>
              </div>
            </label>
          ))}
        </div>

        {/* Add New Address */}
        <div className="mt-6">
          {adding ? (
            <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
              <h4 className="font-medium text-gray-900">Add New Address</h4>
              <input
                value={newAddr.label}
                onChange={(e) => setNewAddr((s) => ({ ...s, label: e.target.value }))}
                placeholder="Label (Home, Office, Work...)"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <textarea
                value={newAddr.address}
                onChange={(e) => setNewAddr((s) => ({ ...s, address: e.target.value }))}
                placeholder="Full shipping address including street, city, state, and zip code"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={4}
              />
              <div className="flex gap-3">
                <button 
                  onClick={handleAddAddress} 
                  disabled={saving || !newAddr.label.trim() || !newAddr.address.trim()} 
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed px-6"
                >
                  {saving ? "Saving..." : "Save Address"}
                </button>
                <button 
                  onClick={() => setAdding(false)} 
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setAdding(true)} 
              className="w-full md:w-auto px-6 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-gray-600 hover:text-primary-600"
            >
              + Add New Address
            </button>
          )}
        </div>

        {/* Checkout Action */}
        <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="text-sm text-gray-500">Order Total</div>
            <div className="text-2xl font-bold text-primary-600">${calculateTotal().toFixed(2)}</div>
          </div>

          <button 
            onClick={handleConfirm} 
            disabled={saving || safeCartItems.length === 0 || addresses.length === 0}
            className="btn-primary px-8 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
          >
            {saving ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              "Confirm Order"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}