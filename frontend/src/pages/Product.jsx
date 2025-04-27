/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RealtedProducts from "../components/RealtedProducts";


const Product = () => {
  const { productId } = useParams();
  // console.log(productId);
  const { products, currency, addToCart } = useContext(ShopContext);
  // console.log(products);
  const [productData, setProductData] = useState();
  const [image, setImage] = useState();
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id == productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-z-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, idx) => (
              <img
                src={item}
                key={idx}
                onClick={() => setImage(item)}
                className="w-[24%] sm:w-full sm:mb-3 flex-hrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" alt="" />
          </div>
        </div>
        {/* Product info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center mt-2 gap-1">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 mt-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, idx) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 cursor-pointer bg-gray-200 ${
                    item === size ? "border-orange-400" : "border-none"
                  }`}
                  key={idx}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => addToCart({ itemId: productData._id, size })} className="bg-black text-white px-8 py-3 active:bg-gray-700 mt-4 cursor-pointer">
            Add to Cart
          </button>
          <hr className="mt-8 sm:w-4/5"/>
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p className="">100% Orginal Product.</p>
            <p className="">Cash on Delivery is avilable ont this product.</p>
            <p className="">Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* Description and review section */}
      <div className="mt-20">
        <div className="flex gap-1">
          <b className="border px-5 py-3 text-sm cursor-pointer">Description</b>
          <p className="border px-5 py-3 text-sm cursor-pointer">Review (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati nam explicabo beatae repellat, quidem illum error? Iure molestias quos vitae voluptates ad error dignissimos, praesentium delectus, earum facilis rem aspernatur?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam sed soluta eius ab consequatur fuga dicta deserunt, repellendus quae officia quidem, in cupiditate itaque necessitatibus. Consequuntur dolore doloribus incidunt dolorem?</p>
        </div>
      </div>
      {/* ---Display related Product Product */}
      <RealtedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
