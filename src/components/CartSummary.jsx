import React from 'react';
import { Link } from 'react-router-dom';


const CartSummary = ({ calculateTotalPrice, handleSubmit, link }) => {
	return (
		<div className="px-[30px]">
			<h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
				Cart Summary
			</h2>
			<div className="py-3 flex justify-between border-b border-gray-300">
				<p className="text-black font-bold">Total Price</p>
				<p className="text-black font-bold">{calculateTotalPrice()}</p>
			</div>

			<Link
				to={link} // Using the link prop for the destination
				state={{ currency: 'bdt' }}
				onClick={handleSubmit}
				className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4 block text-center mx-auto w-full"
			>
				Submit
			</Link>
		</div>
	);
};

// const CartSummary = ({ cart, calculateTotalPrice }) => {
//     return (
//         <div className="px-[30px]">
//             <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
//                 Cart Summary
//             </h2>
//             <div className="py-3 flex justify-between border-b border-gray-300">
//                 <p className="text-black font-bold">Total Price</p>
//                 <p className="text-black font-bold">Tk {calculateTotalPrice(cart)}</p>
//             </div>
//             <Link
//                 to={`/checkout`}
//                 state={'bdt'}
//                 className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4 block text-center mx-auto w-full"
//             >
//                 PROCEED TO CHECKOUT
//             </Link>
//         </div>
//     );
// };

export default CartSummary;
