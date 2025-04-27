import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/v1/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/v1/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Order status updated!");
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="px-4 md:px-8 py-6">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Orders</h3>
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-6 items-start border rounded-lg p-5 md:p-6 bg-white shadow-sm"
          >
            <img src={assets.parcel_icon} alt="Parcel" className="w-14" />

            {/* Order Details */}
            <div className="text-sm text-gray-700">
              <div className="space-y-1 mb-3">
                {order.items.map((item, idx) => (
                  <p key={idx}>
                    {item.name} × {item.quantity} <span>({item.size})</span>
                    {idx !== order.items.length - 1 && ","}
                  </p>
                ))}
              </div>

              <p className="font-semibold mb-1">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p className="text-gray-600">{order.address.street}</p>
              <p className="text-gray-600">
                {order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}
              </p>
              <p className="text-gray-600">Phone: {order.address.phone}</p>
            </div>

            {/* Payment & Date */}
            <div className="text-sm text-gray-700 space-y-2">
              <p>Items: {order.items.length}</p>
              <p>Payment Method: {order.paymentMethod}</p>
              <p>Payment: <span className={order.payment ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>{order.payment ? "Done" : "Pending"}</span></p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Amount */}
            <div className="text-base font-semibold text-gray-800">
              {currency} {order.amount}
            </div>

            {/* Status Update */}
            <select
              value={order.status}
              onChange={(e) => statusHandler(e, order._id)}
              className="border rounded p-2 font-semibold text-gray-700"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
