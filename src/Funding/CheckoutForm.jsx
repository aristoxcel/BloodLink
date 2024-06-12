/* eslint-disable react/prop-types */

import { useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import axios from 'axios';
import { useState } from 'react';

const CheckoutForm = ({ setIsPaymentOpen }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setPaymentError(error.message);
            setPaymentSuccess(null);
        } else {
            const response = await axios.post('/api/payments', {
                paymentMethodId: paymentMethod.id,
            });

            if (response.data.success) {
                setPaymentSuccess('Payment Successful!');
                setPaymentError(null);
                setIsPaymentOpen(false);
            } else {
                setPaymentError('Payment failed. Please try again.');
                setPaymentSuccess(null);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md md:w-3/5 lg:w-2/5 mb-10">
            <CardElement />
            <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 mt-4"
                disabled={!stripe}
            >
                Pay
            </button>
            {paymentError && <div className="text-red-500 mt-4">{paymentError}</div>}
            {paymentSuccess && <div className="text-green-500 mt-4">{paymentSuccess}</div>}
        </form>
    );
};

export default CheckoutForm