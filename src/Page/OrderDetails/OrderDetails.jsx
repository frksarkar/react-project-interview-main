import TrackOrder from './TrackOrder';
import { OrderContext } from '../../ContextAPIs/OrderProvider';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const OrderDetails = () => {
	const [course, setCourse] = useState([]);
	const { purchaseCourseData } = useContext(OrderContext);

	useEffect(() => {
		if (course.length === 0) {
			purchaseCourseData.forEach(async (data) => {
				const response = await fetchCourse(data);
				setCourse((prevState) => {
					return [...prevState, response];
				});
			});
		}
	}, []);

	function generateOrderId() {
		const timestamp = Date.now().toString(36); // Converts current timestamp to base 36 (alphanumeric)
		const randomString = Math.random().toString(36).substring(2, 10); // Random alphanumeric string
		return `ORD-${timestamp}-${randomString}`; // Customize prefix if needed
	}

	const fetchCourse = async (purchaseData) => {
		try {
			const formData = new FormData();
			formData.append('form_no', purchaseData.form_no);
			formData.append('phone_no', purchaseData.phone_no);

			const response = await axios.post(
				`https://itder.com/api/search-purchase-data`,
				formData
			);

			return response.data.singleCoursePurchaseData;
		} catch (error) {
			console.error('Error fetching courses:', error);
		}
	};

	return (
		<div className=" m-mt_16px">
			<div className="w-full flex flex-col lg:flex-row items-start justify-center h-full gap-2 ">
				<div className="bg-white lg:p-p_30px w-full  ">
					<div className="text-center  flex flex-col justify-center items-center ">
						<p className="text-xl font-bold">Order Information</p>
						<p className="p-3 rounded-md lg:my-2 my-1 w-fit border bg-[#D2C5A2] font-bold text-lg">
							Order Id :
							<span className="font-semibold">
								{generateOrderId()}
							</span>
						</p>
					</div>
					<div className="w-full border flex flex-col md:flex-row md:items-start   md:mt-4 mt-3 bg-[#D2C5A2] rounded-md p-4  ">
						<div className="md:text-base text-sm flex-1  font-semibold   md:border-r-2 md:border-black md:pr-10">
							<p className="font-bold md:mb-4 w-full">
								Demo information,Checkout page information will
								be here{' '}
							</p>
							<div className="space-y-1 w-full">
								<div className="flex items-center justify-between">
									<p>Full Name :</p>
									<p className="text-start">
										{course[0]?.name}
									</p>
								</div>
								<div className="flex items-center justify-between">
									<p>Country :</p>
									<p>{course[0]?.country}</p>
								</div>
								<div className="flex items-center justify-between">
									<p>District Thana :</p>
									<p className="text-start">
										{course[0]?.district}
									</p>
								</div>
								<div className="flex items-center justify-between">
									<p>Address :</p>
									<p>{course[0]?.permanent_address}</p>
								</div>
								<div className="flex items-center justify-between">
									<p>Order Notes :</p>
									<p className="text-start">
										{course[0]?.note}
									</p>
								</div>
								<div className="flex items-center justify-between">
									<p>Mobile :</p>
									<p>{course[0]?.phone_no}</p>
								</div>
							</div>
						</div>

						<div className="md:text-base text-sm  flex-1 font-semibold  md:ml-10 mt-m_medium">
							<p className="font-bold  md:mb-4 w-full">
								Demo information,Checkout page information will
								be here{' '}
							</p>
							<div className="space-y-1 w-full">
								<div className="flex items-center justify-between">
									<p>Full Name :</p>
									<p className="text-start">
										{course[0]?.name}
									</p>
								</div>
								<div className="flex items-center justify-between">
									<p>Country :</p>
									<p>{course[0]?.country}</p>
								</div>
								<div className="flex items-center justify-between">
									<p>District Thana :</p>
									<p className="text-start">
										{course[0]?.district}
									</p>
								</div>
								<div className="flex items-center justify-between">
									<p>Address :</p>
									<p>{course[0]?.permanent_address}</p>
								</div>
								<div className="flex items-center justify-between">
									<p>Order Notes :</p>
									<p className="text-start">
										{course[0]?.note}
									</p>
								</div>
								<div className="flex items-center justify-between">
									<p>Mobile :</p>
									<p>{course[0]?.phone_no}</p>
								</div>
							</div>
						</div>
					</div>

					<div className="lg:my-8 md:my-6 my-8 px-p_4px">
						<p className=" md:my-2 font-semibold">Courses:</p>
						<table className="overflow-x-auto border w-full">
							<thead className="b w-full">
								<tr className="text-sm ">
									<th className="lg:w-20 md:w-16 w-8 py-2 md:py-4 lg:py-6 border ">
										Image
									</th>
									<th className="lg:w-72 md:w-64 w-40 py-2 md:py-4 lg:py-6 border">
										Course Name
									</th>
									<th className="lg:w-72 md:w-64 w-40 py-2 md:py-4 lg:py-6 border">
										Student Name
									</th>
									<th className="lg:w-20 md:w-20 w-16 py-2 md:py-4 lg:py-6 border">
										Quantity
									</th>
									<th className="lg:w-20 md:w-20 w-16  py-2 md:py-4 lg:py-6 border text-center">
										Price
									</th>
									<th className="lg:w-20 md:w-20 w-16  py-2 md:py-4 lg:py-6 border text-center">
										Total
									</th>
								</tr>
							</thead>
							<tbody className="md:text-base text-sm font-semibold">
								{course.length &&
									course.map((course, index) => (
										<tr>
											<td className="border text-center w-10 h-12 px-2">
												<img
													className=" w-full h-full object-cover mx-auto"
													src={
														course.course_data.photo
													}
													alt=""
												/>
											</td>
											<td className="lg:py-6 md:py-4 py-2 text-center border">
												{course.course_data.course_name}
											</td>
											<td className="lg:py-6 md:py-4 py-2 text-center border">
												{course.name}
											</td>
											<td className="lg:py-6 md:py-4 py-2 text-center border">
												{course.course_qty}
											</td>
											<td className="lg:py-6 md:py-4 py-2 text-center border">
												{course.course_fee}
											</td>
											<td className="lg:py-6 md:py-4 py-2 text-center border">
												{course.sub_total_course_fee}
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderDetails;
