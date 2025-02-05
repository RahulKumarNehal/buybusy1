import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../index";

const Orders = () => {
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        async function getOrderDetails() {
            try {
                const results = await getDocs(collection(db, "orders"));
                const fetchedOrders = results.docs.map((doc) => ({ docId: doc.id, ...doc.data() }));
                setOrderDetails(fetchedOrders);
            } catch (error) {
                console.log(error);
            }
        }

        getOrderDetails();
    }, [])

    // Log orderDetails whenever it updates
    useEffect(() => {
    }, [orderDetails]);


    return (
        <div className="mt-5">
            {orderDetails == null || orderDetails.length === 0 ? <h1 className="text-center text-4xl font-bold">No Orders</h1> :
                <>
                    <h1 className="text-center text-4xl font-bold">Your Orders</h1>
                    {orderDetails.map((order, index) => {
                        const timestamp = order.date; // Adjust this based on your data structure
                        const orderDate = new Date(
                            timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
                        );
                        // Format date components
                        const year = orderDate.getFullYear();
                        const month = String(orderDate.getMonth() + 1).padStart(2, '0');
                        const day = String(orderDate.getDate()).padStart(2, '0');

                        // Format time components   
                        let hours = orderDate.getHours();
                        const minutes = String(orderDate.getMinutes()).padStart(2, '0');
                        const ampm = hours >= 12 ? 'PM' : 'AM';
                        hours = hours % 12 || 12; // Convert to 12-hour format

                        const formattedDate = `Date: ${year}-${month}-${day}, `;
                        const formattedTime = `${hours}:${minutes} ${ampm}`;

                        // Calculate total price for the order
                        const totalPrice = order.order.reduce(
                            (acc, item) => acc + item.price * item.quantity,
                            0
                        );

                        return (
                            <div className="my-6">
                                <div className="text-center py-8" key={order.docId}>
                                    <h1 className="text-xl font-bold">Order Id : {index + 1}</h1>
                                    <h1 className="text-xl font-bold">{formattedDate} {formattedTime}</h1>
                                    <table className="border-0 relative w-1/2 m-auto border-spacing-1 border-separate">
                                        <thead>
                                            <tr className="bg-zinc-100">
                                                <th className="p-3 border-b-2 border-black">Title</th>
                                                <th className="p-3 border-b-2 border-black">Price</th>
                                                <th className="p-3 border-b-2 border-black">Quantity</th>
                                                <th className="p-3 border-b-2 border-black">Total Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.order.map(item =>
                                                <tr className="bg-zinc-100">
                                                    <td>{item.title}</td>
                                                    <td>₹ {item.price}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>₹ {item.price * item.quantity}</td>
                                                </tr>
                                            )}
                                        </tbody>

                                        <tr className="bg-zinc-100 absolute text-end w-full p-2 ps-[85%]">
                                            <td>₹ {totalPrice}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        )
                    }
                    )}
                </>
            }
        </div>
    );
};

export default Orders;
