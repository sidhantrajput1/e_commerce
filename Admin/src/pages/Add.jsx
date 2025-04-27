import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({token}) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [decription, setDecription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
        const formData = new FormData()

        formData.append("name", name)
        formData.append("description", decription)
        formData.append("price", price)
        formData.append("category", category)
        formData.append("subCategory", subCategory)
        formData.append("bestseller", bestseller)
        formData.append("sizes", JSON.stringify(sizes))

        image1 && formData.append("image1", image1)
        image2 && formData.append("image2", image2)
        image3 && formData.append("image3", image3)
        image4 && formData.append("image4", image4)

        const response = await axios.post(backendUrl+"/api/v1/product/add", formData, {
            headers:{token}
        })

        if (response.data.success) {
            toast.success(response.data.message)
            setName('')
            setDecription('')
            setImage1(false)
            setImage2(false)
            setImage3(false)
            setImage4(false)
            setPrice('')
        } else {
            console.log()
            toast.error(toast.error.message)
        }
        console.log(response.data)
        
    } catch (error) {
        console.log(error)
        console.log(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="flex flex-col w-full items-start gap-3">
        <p className="mb-2">Upload Image</p>

        <div className="flex gap-3">
          <label htmlFor="image1">
            <img
              className="w-24 h-24 object-cover border cursor-pointer rounded-md"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-24 h-24 object-cover border cursor-pointer rounded-md"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-24 h-24 object-cover border cursor-pointer rounded-md"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-24 h-24 object-cover border cursor-pointer rounded-md"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="w-full">
          <p className="mb-2">Product Name</p>
          <input
            className="w-full max-w-[500px] px-3 py-2 border"
            type="text"
            placeholder="Type here.."
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="w-full">
          <p className="mb-2">Product Description</p>
          <textarea
            className="w-full max-w-[500px] px-3 py-2 border"
            placeholder="Write content here"
            required
            onChange={(e) => setDecription(e.target.value)}
            value={decription}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full mt-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Product Category
          </p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className="w-full px-4 py-2 border border-gray-300 rounded-md">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className="flex-1">
          <p className="text-sm font-medium text-gray-700 mb-2">Sub Category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className="w-full px-4 py-2 border border-gray-300 rounded-md">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className="flex-1">
          <p className="text-sm font-medium text-gray-700 mb-2">Product Price</p>
          <input
            type="number"
            placeholder="25"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-gray-700 mb-3">Product Size</p>
        <div className="grid grid-cols-5 gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
                )
              }
              className={`text-center px-4 py-2 border rounded-md text-sm font-semibold cursor-pointer transition-all active:scale-95 ${
                sizes.includes(size)
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100 hover:border-blue-400"
              }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      <button
        type="submit"
        className="w-28 cursor-pointer py-3 mt-4 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition-all duration-300 active:scale-95 shadow-md"
      >
        Add
      </button>
    </form>
  );
};

export default Add;
