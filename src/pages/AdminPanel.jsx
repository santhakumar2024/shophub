import React, { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../services/orderService";

const STATUS_OPTIONS = ["On Process", "Shipped", "Delivered"];

export default function AdminPanel() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      const data = await getAllOrders();
      console.log("Fetched orders:", data);
      if (mounted) {
        // sort recent first
        setOrders(data.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)));
        setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  const handleChangeStatus = async (orderId, status) => {
    setUpdatingId(orderId);
    await updateOrderStatus(orderId, status);
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
    setUpdatingId(null);
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Simple date formatter without date-fns
  const formatDate = (timestamp) => {
    if (!timestamp?.seconds) return "time unknown";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "Shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "On Process":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) return <div className="p-6">Loading orders…</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Order Management</h2>
        <div className="text-sm text-gray-500">
          Total Orders: <span className="font-semibold">{orders.length}</span>
        </div>
      </div>
      
      {orders.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="text-gray-500 text-lg">No orders yet</div>
          <div className="text-sm text-gray-400 mt-2">Orders will appear here when customers place them</div>
        </div>
      )}
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            {/* Order Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order.adminOrderId || order.id?.slice(-8)}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">User:</span>{" "}
                          {order.user?.displayName || order.user?.email || order.userId || "Unknown User"}
                        </div>
                        <div>
                          <span className="font-medium">Date:</span> {formatDate(order.createdAt)}
                        </div>
                        <div>
                          <span className="font-medium">Items:</span> {order.items?.length || 0}
                        </div>
                        <div>
                          <span className="font-medium">Total:</span> ${order.total?.toFixed(2) || "0.00"}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <select
                        value={order.status}
                        onChange={(e) => handleChangeStatus(order.id, e.target.value)}
                        disabled={updatingId === order.id}
                        className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              {order.address && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Shipping to:</span>{" "}
                    {order.address.label && (
                      <span className="font-semibold">{order.address.label} • </span>
                    )}
                    {order.address.address}
                  </div>
                </div>
              )}
            </div>

            {/* Order Items */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-gray-900">Order Items</h4>
                <button
                  onClick={() => toggleOrderDetails(order.id)}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  {expandedOrder === order.id ? "Hide Details" : "Show Details"}
                </button>
              </div>

              <div className="space-y-4">
                {order.items?.slice(0, expandedOrder === order.id ? order.items.length : 3).map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image || item.photoURL || "/placeholder-image.jpg"}
                        alt={item.title || item.name || "Product"}
                        className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg border"
                        onError={(e) => {
                          e.target.src = "/placeholder-image.jpg";
                        }}
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900">
                        {item.title || item.name || "Unnamed Product"}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Qty:</span> {item.quantity || 1} • 
                        <span className="font-medium ml-2">Price:</span> ${(item.price || 0).toFixed(2)} each
                      </div>
                      {item.description && (
                        <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {item.description}
                        </div>
                      )}
                    </div>
                    
                    {/* Item Total */}
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Show more items indicator */}
              {order.items?.length > 3 && expandedOrder !== order.id && (
                <div className="text-center mt-4">
                  <button
                    onClick={() => toggleOrderDetails(order.id)}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    + {order.items.length - 3} more items
                  </button>
                </div>
              )}

              {/* Order Summary */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Order Total:</span>
                  <span className="text-primary-600">${order.total?.toFixed(2) || "0.00"}</span>
                </div>
              </div>
            </div>

            {/* Order Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Order ID: {order.id}
              </div>
              <div className="flex items-center space-x-3">
                {updatingId === order.id && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
                    <span>Updating...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}