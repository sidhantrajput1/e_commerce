/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const navigate = useNavigate();

  const {
    delivery_fee, backendURL, token, cartItems, setCartItems,getCartAmount, products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", street: "", city: "", state: "", zipcode: "",
    country: "", phone: "",
  });

  

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  
    try {
      let orderItems = [];
      // console.log("Starting cart parsing...");
      // console.log("cartItems:", cartItems);
      
      // Nested: { productId: { size: quantity } }
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      // console.log(orderItems)
  
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        // paymentMethod: method,
      };

      switch (method) {
         // API calls for cod 
         case 'cod' : 
            var response =await  axios.post(backendURL+"/api/v1/order/place" , orderData, {headers : {token}})
            // console.log(response)
            if (response.data.success) {
              setCartItems({});
              navigate('/orders')
            } else {
              toast.error(response.data.message);
            }
            break;

         default : 
            break;
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  };
  
  
  

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* --------------Left Side------------------------ */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px] ">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            className="border border-gray-500 rounded py-1.5 px-3.5 w-full "
            placeholder="Full Name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            className="border border-gray-500 rounded py-1.5 px-3.5 w-full "
            placeholder="Last Name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          type="text"
          className="border border-gray-500 rounded py-1.5 px-3.5 w-full "
          placeholder="Enter your email"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          className="border border-gray-500 rounded py-1.5 px-3.5 w-full "
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            className="border border-gray-500 rounded py-1.5 px-3.5 w-full "
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            className="border border-gray-500 rounded py-1.5 px-3.5 w-full "
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            type="number"
            className="border border-gray-500 rounded py-1.5 px-3.5 w-full "
            placeholder="Zipcode"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            type="text"
            className="border border-gray-500 rounded py-1.5 px-3.5 w-full "
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          type="number"
          className="border border-gray-500 rounded py-1.5 px-3.5 w-full "
          placeholder="Phone"
        />
      </div>
      {/* ------------------Right Side------------------------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
        </div>
        <div className="flex gap-3 flex-col lg:flex-row">
          <div
            onClick={() => setMethod(`stripe`)}
            className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${
                method === "stripe" ? "bg-green-400" : ""
              }`}
            ></p>
            <img className="h-5 mx-4 " src={assets.stripe_logo} alt="" />
          </div>
          <div
            onClick={() => setMethod(`razorpay`)}
            className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${
                method === "razorpay" ? "bg-green-400" : ""
              }`}
            ></p>
            <img className="h-5 mx-4 " src={assets.razorpay_logo} alt="" />
          </div>
          <div
            onClick={() => setMethod(`cod`)}
            className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${
                method === "cod" ? "bg-green-400" : ""
              }`}
            ></p>
            <p className="text-gray-500 text-sm font-medium mx-4 cursor-pointer">
              Cash On Delivery
            </p>
          </div>
        </div>
        <div className="w-full text-end mt-8">
          <button
            type="submit"
            className="bg-black text-white px-16 py-3 text-sm cursor-pointer"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
