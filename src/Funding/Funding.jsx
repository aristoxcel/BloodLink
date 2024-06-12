import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async"
import {Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";
import Pagination from "../Components/Pagination";


const stripePromise = loadStripe(import.meta.env.VITE_API_Strip); // Replace with your Stripe publishable key
function Funding() {
  const [funds, setFunds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [fundsPerPage] = useState(10);
    const [totalFunds, setTotalFunds] = useState(0);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    useEffect(() => {
        const fetchFunds = async () => {
            try {
                const response = await axios.get('/funds', {
                    params: { page: currentPage, limit: fundsPerPage },
                });
                setFunds(response.data.funds);
                setTotalFunds(response.data.totalFunds);
            } catch (error) {
                console.error('Error fetching funds:', error);
            }
        };

        fetchFunds();
    }, [currentPage]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleGiveFundClick = () => {
        setIsPaymentOpen(true);
    };

  return (
    <div>
      <Helmet>
        <title>BloodLink | Funding Page</title>
      </Helmet>
      <div className="container mx-auto p-4 my-10">
            <h1 className="text-3xl font-bold mb-1">Funding Page</h1>
            <h1 className="text-xl font-semibold mb-4">Fund us to help a helpless life in live</h1>
            <button
                onClick={handleGiveFundClick}
                className="bg-[#c4052b] text-white px-4 py-2 rounded-lg hover:bg-[#c4052bc0] mb-4"
            >
                Give Fund
            </button>
            {isPaymentOpen && (
                <Elements stripe={stripePromise}>
                    <CheckoutForm setIsPaymentOpen={setIsPaymentOpen} />
                </Elements>
            )}
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Fund Amount</th>
                        <th className="py-2 px-4 border-b">Funding Date</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {funds.map((fund) => (
                        <tr key={fund._id}>
                            <td className="py-2 px-4 border-b">{fund.name}</td>
                            <td className="py-2 px-4 border-b">{fund.amount}</td>
                            <td className="py-2 px-4 border-b">{new Date(fund.date).toLocaleDateString()}</td>
                        </tr>
                    ))} */}
                    <tr key={'1'}>
                            <td className="py-2 px-4 border-b">{'Rakib'}</td>
                            <td className="py-2 px-4 border-b">{432423}$</td>
                            <td className="py-2 px-4 border-b">{new Date().toLocaleDateString()}</td>
                        </tr>
                        <tr key={'2'}>
                            <td className="py-2 px-4 border-b">{'Hasib'}</td>
                            <td className="py-2 px-4 border-b">{23452}$</td>
                            <td className="py-2 px-4 border-b">{new Date().toLocaleDateString()}</td>
                        </tr>
                        <tr key={'3'}>
                            <td className="py-2 px-4 border-b">{'fund.name'}</td>
                            <td className="py-2 px-4 border-b">{'fund.amount'}</td>
                            <td className="py-2 px-4 border-b">{new Date().toLocaleDateString()}</td>
                        </tr>
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                itemsPerPage={fundsPerPage}
                totalItems={totalFunds}
                paginate={paginate}
            />
        </div>
        </div>


)}



export default Funding