import { createContext, useRef, useState } from "react";
import PropTypes from 'prop-types';

export const OrderContext = createContext(null);
const OrderProvider = ({children}) => {
    const [examID, setExamID] = useState(null);
    const [open, setOpen] = useState(true);
    const [cart, setCart] = useState([]);  // Cart state
    const [purchaseCourseData, setPurchaseCourseData] = useState([]);
    const sidebarRef = useRef(null);


    // setOrderCheckoutData
    const setOrderCheckoutData = (data) => {
        setPurchaseCourseData((prevData) => [...prevData, data]);
    }



     // Function to update cart quantity
     const updateCartQuantity = (courseId, newQuantity) => {
        setCart((prevCart) => 
            prevCart.map((course) => 
                course.id === courseId ? { ...course, quantity: newQuantity } : course
            )
        );
    };

    // Function to add an item to the cart
    const addToCart = (course) => {
        setCart((prevCart) => {
            const isCourseInCart = prevCart.some((item) => item.id === course.id);
            if (isCourseInCart) {
                return prevCart.map((item) =>
                    item.id === course.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...course, quantity: 1 }];
            }
        });
    };

    // Remove item from cart
    const removeFromCart = (courseId) => {
        setCart(prevCart => prevCart.filter(course => course.id !== courseId));
    };

    const info = {
        examID,
        setExamID,
        open,
        setOpen,
        cart,         // Expose cart state
        addToCart,    // Expose add to cart function
        removeFromCart, // Expose remove from cart function
        updateCartQuantity, // Expose update cart quantity function
        purchaseCourseData, // Expose purchase form data
        setOrderCheckoutData, // Expose set purchase form data function
        sidebarRef
    };
    
    return (
        <OrderContext.Provider value={info}>
            {children}
        </OrderContext.Provider>
    );
};

OrderProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default OrderProvider;
