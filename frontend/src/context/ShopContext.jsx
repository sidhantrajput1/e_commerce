/* eslint-disable react-refresh/only-export-components */
import { createContext,  useEffect,  useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import axios from 'axios'

// Named export for context
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendURL = import.meta.env.VITE_BACKEND_URL

  const [search, setSearch] = useState();
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([])
  const [token, setToken] = useState('')

  const addToCart = async ({ itemId, size }) => {

    if (!size) {
        toast.error("Select Product Size")
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

     if (token) {
      try {

        await axios.post(backendURL+"/api/v1/cart/add", {itemId ,size} , {headers : {token}})

      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
     }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
        for (let item in cartItems[items]) {
            try {
                if (cartItems[items][item] > 0) {
                    totalCount += cartItems[items][item]
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    return totalCount;
  }

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems)

    cartData[itemId][size] = quantity

    setCartItems(cartData);

    if (token) {
      try {

        await axios.post(backendURL+'/api/v1/cart/update', {itemId,size,quantity}, {headers : {token}})


      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
  }

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for(const item in cartItems[items]) {
        try {
          if(cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item]
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    return totalAmount
  }

  const getProductsData = async () => {
    // const token = localStorage.getItem("token");
  
    // console.log(token)
  
    try {
      const response = await axios.get(backendURL+"/api/v1/product/list");
      // console.log(response)
  
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };
  
  const getUserCart = async (token) => {
    try {

        const response = await axios.post(backendURL+"/api/v1/cart/get", {} , {headers : {token}})

        if (response.data.success) {
          setCartItems(response.data.cartData)
        }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  
  useEffect(() => {
    getProductsData()
  },[])

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
      getUserCart(localStorage.getItem('token'));
    }
  }, []);  // This should handle the case when token is available
  

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    backendURL,
    token, setToken,setCartItems
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

// Default export for the provider component
export default ShopContextProvider;
