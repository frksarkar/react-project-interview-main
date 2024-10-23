import React, { useContext } from 'react';
import { OrderContext } from '../ContextAPIs/OrderProvider';
import { toast } from 'react-toastify';

const CourseCard = ({ course, addToCart, calculateDiscount }) => {
	const { cart } = useContext(OrderContext); 

	return (
		<div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 ease-in-out">
			<div className="relative">
				<img
					src={
						course.photo
							? course.photo
							: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
					}
					alt="Course"
					className="w-full h-48 object-cover"
				/>
				<div className="absolute top-0 left-0 bg-black bg-opacity-50 p-2">
					<h3 className="text-white text-xl font-bold">{course.course_name}</h3>
				</div>
			</div>
			<div className="p-6">
				<h2 className="text-gray-900 text-lg font-semibold mb-2">
					{course.course_name}
				</h2>
				<div className="flex items-center justify-between mb-4">
					<span className="flex text-yellow-400 text-md">★★★★★</span>
					<span className="ml-2 text-gray-600 text-md font-bold">
						{course.trainer_data.name}
					</span>
				</div>

				<p className="text-gray-600 text-sm mb-4 leading-relaxed">
					Course Details{' '}
					<span className="text-blue-500 underline cursor-pointer">
						Show Details
					</span>
				</p>
				<hr className="border-gray-300 mb-4" />

				<div className="flex justify-between items-center">
					<div>
						<span className="line-through text-gray-400 text-sm">
							Tk {course.regular_price}
						</span>
						<span className="text-green-600 text-md font-bold ml-2">
							-
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

				<div className="mt-4">
					<button
						className={`py-2 px-4 rounded w-full font-bold text-md transition-colors duration-300 ${
                            cart?.id === course.id
                                ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
						onClick={() => {
                            toast.success('Course added to cart');
							addToCart(course, 1);
						}}
						disabled={cart?.id === course.id}
					>
						Add To Cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
