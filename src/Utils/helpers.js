import moment from 'moment';

// Function to calculate the sub-total for the item (discount_price * quantity)
export const calculateSubTotal = (course) => {
	return course?.discount_price * course?.quantity;
};

// Function to calculate the total price of the cart (since there's only one item)
export const calculateTotalPrice = (cart) => {
	return calculateSubTotal(cart) || 0;
};

export const dateNow = () => {
	return moment().format('YYYY-MM-DD');
};


