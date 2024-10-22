import { OrderContext } from '../../ContextAPIs/OrderProvider';
import { useContext, useEffect, useState } from 'react';

const Courses = () => {

	const { addToCart } = useContext(OrderContext); // Access the addToCart function
	const [courses, setCourses] = useState([]); // State to store courses
	// State variables for pagination
	const [currentPage, setCurrentPage] = useState(1); // State for pagination
	const itemsPerPage = 2; // Number of items per page

	// Calculate the total number of pages
	const totalPages = Math.ceil(courses.length / itemsPerPage);

	// Get courses for the current page
	const paginatedCourses = courses.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	// Fetch courses from API
	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await fetch(
					'https://itder.com/api/get-course-list'
				);
				const data = await response.json();
				setCourses(data.courseData); // Assume API returns 'courses' in response
			} catch (error) {
				console.error('Error fetching courses:', error);
			}
		};
		fetchCourses();
	}, [currentPage]);

	// Pagination handler
	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	function calculateDiscount(originalPrice, discountPrice) {
		const discountPercentage =
			((originalPrice - discountPrice) / originalPrice) * 100;
		return Math.round(discountPercentage); // Rounded to nearest whole number
	}

	return (
		<div className="m-mt_16px">
			{/* Courses display */}
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				{paginatedCourses.map((course, index) => (
					<div
						key={course.id}
						className=" bg-white shadow-lg rounded-lg overflow-hidden"
					>
						<div className="relative">
							<img
								src={
									'https://itderbd.nextwebservice.com/storage/uploads/course/7674951728743412.jpg'
								}
								alt=""
							/>
							<div className="absolute top-0 left-0 p-2">
								<h3 className="text-white text-xl font-bold">
									Data Entry
								</h3>
							</div>
						</div>
						<div className="p-4">
							<h2 className="text-gray-800 text-lg font-semibold mb-2">
								{course.course_name}
							</h2>
							<div className="flex items-center justify-between mb-4">
								<span className="flex text-blue-500 text-md">
									★★★★★(no need to change)
								</span>
								<span className="ml-2 text-gray-600 text-md font-bold">
									{course.trainer_data.name}
								</span>
							</div>
							{/* <div className="flex gap-2 mb-4 flex-wrap">
                                {['Photography', 'Light set up', 'Camera angle', 'Self Development'].map((tag) => (
                                    <span key={tag} className="bg-yellow-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div> */}
							<p className="text-gray-600 text-md mb-4">
								Course Details{' '}
								<span className="text-blue-500">
									Show Details(no need to change)
								</span>
							</p>
							<hr />
							<div className="mt-4 flex justify-between items-center">
								<div>
									<span className="line-through text-gray-400 text-sm">
										Tk {course.regular_price} (regular price
										from Api)
									</span>
									<span className="text-green-600 text-md font-bold ml-2">
										-
										{calculateDiscount(
											course.regular_price,
											course.discount_price
										)}
										% (calculate from regular-discount
										price)
									</span>
									<span className="text-black text-lg font-bold ml-2">
										Tk {course.discount_price}( discount
										price from Api)
									</span>
								</div>
								{/* <span className="text-green-600 text-sm">Earn Tk 48</span> */}
							</div>
							<div className="mt-4 flex gap-2">
								<button
									className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-500 w-full font-bold text-md"
									onClick={() => addToCart(course)}
								>
									Add To Cart
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Pagination Controls */}
			<div className="flex justify-center mt-6">
				{Array.from({ length: totalPages }, (_, index) => (
					<button
						key={index}
						className={`mx-1 px-3 py-1 rounded ${
							currentPage === index + 1
								? 'bg-blue-500 text-white'
								: 'bg-gray-200'
						}`}
						onClick={() => handlePageChange(index + 1)}
					>
						{index + 1}
					</button>
				))}
			</div>
			{/* Pagination Controls end */}
		</div>
	);
};

export default Courses;
