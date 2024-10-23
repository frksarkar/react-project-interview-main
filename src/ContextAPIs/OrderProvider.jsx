import { createContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from '../Hooks/useLocalStorage';

export const OrderContext = createContext(null);
const OrderProvider = ({ children }) => {
	const [examID, setExamID] = useState(null);
	const [open, setOpen] = useState(true);
	const [cart, setCart] = useLocalStorage('cart', null); // Cart state
	const [cartItem, setCartItem] = useState(null);
	const [purchaseCourseData, setPurchaseCourseData] = useLocalStorage('purchaseCourseData', {});
	const [userData, setUserData] = useLocalStorage('userData',null);
	const sidebarRef = useRef(null);

	const addToCart = (course, quantity) => {
		setCart({ ...course, quantity });
	};

	// Update cart quantity
	const updateCartQuantity = (courseId, quantity) => {
		setCart((prevCart) => {
			return prevCart.id === courseId
				? { ...prevCart, quantity: quantity }
				: prevCart;
		});
	};

	// Remove item from cart
	const removeFromCart = (courseId) => {
		setCart(null);
	};

	const info = {
		examID,
		setExamID,
		open,
		setOpen,
		cart, // Expose cart state
		addToCart, // Expose add to cart function
		removeFromCart, // Expose remove from cart function
		updateCartQuantity, // Expose update cart quantity function
		purchaseCourseData, // Expose purchase form data
		setPurchaseCourseData, // Expose set purchase form data function
		userData, // user info
		cartItem,
		setCartItem,
		setUserData,
		sidebarRef,
	};

	return (
		<OrderContext.Provider value={info}>{children}</OrderContext.Provider>
	);
};

OrderProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default OrderProvider;
