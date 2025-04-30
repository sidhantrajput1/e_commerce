import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
    const {navigate,backendURL ,token, setCartItems} = useContext(ShopContext)
    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');


    const verifyPayment = async() => {
        try {
            if (!token) return null;

            const response = axios.post(backendURL+"/api/v1/order/verifystripe", {success, orderId}, {headers : {token}})
            console.log(response.data);

            if (response.data.success) {
                setCartItems({});
                navigate('/orders')
            } else {
                navigate('/cart')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        verifyPayment()
    },[token])

    return (
        <div className=''>
            <h3>Hello World</h3>
        </div>
    );
}

export default Verify;
