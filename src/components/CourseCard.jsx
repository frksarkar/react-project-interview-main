import React, { useContext } from 'react';
import { OrderContext } from '../ContextAPIs/OrderProvider';
import { toast } from 'react-toastify';

const CourseCard = ({ course, addToCart, calculateDiscount }) => {
	const { cart, removeFromCart, updateCartQuantity } = useContext(OrderContext);

	return (
		<div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 ease-in-out">
			<div className="relative">
				{/* Course Image */}
				<img
					src={
						course.photo
							? course.photo
							: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
					}
					alt="Course"
					className="w-full h-48 object-cover"
				/>
				{/* Course Name Overlay */}
				<div className="absolute top-0 left-0 bg-black bg-opacity-50 p-2">
					<h3 className="text-white text-xl font-bold">
						{course.course_name}
					</h3>
				</div>
			</div>

			<div className="p-6">
				{/* Course Title */}
				<h2 className="text-gray-900 text-lg font-semibold mb-2">
					{course.course_name}
				</h2>

				{/* Trainer and Rating */}
				<div className="flex items-center justify-between mb-4">
					<span className="flex text-yellow-400 text-md">★★★★★</span>
					<span className="ml-2 text-gray-600 text-md font-bold">
						{course.trainer_data?.name}
					</span>
				</div>

				{/* Course Details */}
				<p className="text-gray-600 text-sm mb-4 leading-relaxed">
					Course Details{' '}
					<span className="text-blue-500 underline cursor-pointer">
						Show Details
					</span>
				</p>

				<hr className="border-gray-300 mb-4" />

				{/* Price Information */}
				<div className="flex justify-between items-center">
					<div>
						<span className="line-through text-gray-400 text-sm">
							Tk {course.regular_price}
						</span>
						<span className="text-green-600 text-md font-bold ml-2">
							-{' '}
							{calculateDiscount(
								course.regular_price,
								course.discount_price
							)}
							%
						</span>
						<span className="text-black text-lg font-bold ml-2">
							Tk {course.discount_price}
						</span>
					</div>
				</div>

				{/* Add to Cart Button - Only show when the item is NOT in the cart */}
				{cart?.id !== course.id && (
					<div className="mt-4">
						<button
							className={`py-2 px-4 rounded w-full font-bold text-md transition-colors duration-300 bg-blue-500 hover:bg-blue-600 text-white`}
							onClick={() => {
								toast.success('Course added to cart');
								addToCart(course, 1); // Adds course with quantity 1
							}}
						>
							Add To Cart
						</button>
					</div>
				)}

				{/* Quantity, Increment, Decrement, and Remove Buttons - Show only when the item is in the cart */}
				{cart?.id === course.id && (
					<div className="mt-4">
						<div className="flex items-center justify-between">
							{/* Decrement Button */}
							<button
								className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full text-lg font-medium"
								onClick={() => {
									if (cart.quantity > 1) {
										updateCartQuantity(
											course.id,
											cart.quantity - 1
										);
									}
								}}
							>
								-
							</button>

							{/* Quantity Input */}
							<input
								type="number"
								value={cart.quantity}
								// onChange={(e) =>
								// 	updateCartQuantity(
								// 		course.id,
								// 		Math.max(1, Number(e.target.value))
								// 	)
								// }
								className="w-12 text-center bg-gray-100 border border-gray-200 rounded-full text-gray-700"
							/>

							{/* Increment Button */}
							<button
								className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full text-lg font-medium"
								onClick={() =>
									updateCartQuantity(
										course.id,
										cart.quantity + 1
									)
								}
							>
								+
							</button>

							{/* Remove Button */}
							<button
								className="ml-4 px-4 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-full font-medium"
								onClick={() => removeFromCart()}
							>
								Remove
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CourseCard;
