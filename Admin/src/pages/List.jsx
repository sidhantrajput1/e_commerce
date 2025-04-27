import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/product/list`, {
        headers: { token }
      });
      if (data.success) {
        setList(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/product/remove`,
        { id },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchList();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-4 text-lg font-semibold text-gray-800">All Product List</p>
      <div className="flex flex-col divide-y">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] px-4 py-2 bg-gray-100 font-medium">
          <div>Image</div>
          <div>Name</div>
          <div>Category</div>
          <div>Price</div>
          <div className="text-center">Action</div>
        </div>

        {list.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-4 py-3 hover:bg-gray-50 transition text-sm"
          >
            <img
              src={item.image[0]}
              alt={item.name}
              className="w-12 h-12 object-cover rounded"
            />
            <div className="truncate">{item.name}</div>
            <div>{item.category}</div>
            <div>
              {currency}
              {item.price}
            </div>
            <button
              onClick={() => removeProduct(item._id)}
              className="text-red-500 hover:text-red-700 font-bold text-center"
            >
              X
            </button>
          </div>
        ))}

        {list.length === 0 && (
          <p className="py-6 text-center text-gray-500">No products found.</p>
        )}
      </div>
    </>
  );
};

export default List;
