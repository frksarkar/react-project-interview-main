import { OrderContext } from '../../ContextAPIs/OrderProvider';
import { useContext, useEffect, useState } from 'react';
import { Pagination, Loading, CourseCard } from '../../components/index';

const Courses = () => {
	const { addToCart } = useContext(OrderContext); // Access the addToCart function
	const [courses, setCourses] = useState([]); // State to store courses
	// State variables for pagination
	const [currentPage, setCurrentPage] = useState(1); // State for pagination
	const itemsPerPage = 3; // Number of items per page

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
			{courses.length === 0 ? (
				<Loading />
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
						{paginatedCourses &&
							paginatedCourses.map((course, index) => (
								<CourseCard
									key={index}
									course={course}
									addToCart={addToCart}
									calculateDiscount={calculateDiscount}
								/>
							))}
					</div>

					{/* Pagination Controls */}
					<Pagination
						handlePageChange={handlePageChange}
						currentPage={currentPage}
						totalPages={totalPages}
					/>
					{/* Pagination Controls end */}
				</>
			)}
		</div>
	);
};

export default Courses;
