import { useContext, useState } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { OrderContext } from '../../ContextAPIs/OrderProvider';
// import userAxiosSecure from '../../Hooks/useAxiosSecure';
import axios from 'axios';
import moment from 'moment';

// const coursePurchaseData = {
// 	course_id: '6',
// 	admission_date: '2024-10-22',
// 	name: 'Test Student',
// 	father_name: 'Father 1001',
// 	father_phone_no: '01799646663',
// 	school_collage_name: 'Colleage 1',
// 	job_title: 'Developer',
// 	email: 'email@gmail.com',
// 	gender: 'male',
// 	present_address: 'Pabna',
// 	permanent_address: 'Pabna',
// 	nid_no: '234234234',
// 	phone_no: '01799646665',
// 	local_guardian_name: 'Local 1001',
// 	local_guardian_phone_no: '01799646612',
// 	date_of_birth: '2001-10-12',
// 	blood_group: 'AB+',
// 	course_fee: '6000',
// 	course_qty: '2',
// 	total_course_fee: '12000',
// 	discount_course_fee: '0',
// 	sub_total_course_fee: '12000',
// 	photo: 'https://itder.com/storage/uploads/coursePurchasse/7320121729574687.jpg',
// 	user_id: 1,
// 	form_no: 100009,
// 	updated_at: '22-10-2024 05:24:47',
// 	created_at: '22-10-2024 05:24:47',
// 	id: 29,
// };

const Checkout = () => {
	// const axiosSecure = userAxiosSecure();

	const { cart, removeFromCart, updateCartQuantity, setOrderCheckoutData } =
		useContext(OrderContext);

	// State for form inputs
	const [fullName, setFullName] = useState('');
	const [formNo, setFormNo] = useState('');
	const [parentName, setParentName] = useState('');
	const [parentNumber, setParentNumber] = useState('');
	const [school, setSchool] = useState('');
	const [jobInfo, setJobInfo] = useState('');
	const [email, setEmail] = useState('');
	const [gender, setGender] = useState('');
	const [presentAddress, setPresentAddress] = useState('');
	const [permanentAddress, setPermanentAddress] = useState('');
	const [nid, setNid] = useState('');
	const [mobile, setMobile] = useState('');
	const [guardianName, setGuardianName] = useState('');
	const [dob, setDob] = useState('');
	const [bloodGroup, setBloodGroup] = useState('');
	const [photo, setPhoto] = useState('');

	// Function to calculate the sub-total for each item (discountPrice * quantity)
	const calculateSubTotal = (course) => {
		return course.discount_price * course.quantity;
	};

	// Function to calculate the total price of all cart items
	const calculateTotalPrice = () => {
		return cart.reduce(
			(total, course) => total + calculateSubTotal(course),
			0
		);
	};

	// created '2024-10-22' date formate function date now
	const dateNow = () => {
		return moment().format('YYYY-MM-DD');
	};


	const handleSubmit = (event) => {
		event.preventDefault(); // Prevent the form's default submit behavior

		cart.forEach(async (course) => {
			const formData = new FormData();
			const coursePurchaseData = {
				course_id: course.id,
                // form_no: formNo,
				admission_date: dateNow(),
				photo: photo,
				name: fullName,
				father_name: parentName,
				father_phone_no: parentNumber,
				school_collage_name: school,
				job_title: jobInfo,
				email: email,
				gender: gender,
				present_address: presentAddress,
				permanent_address: permanentAddress,
				nid_no: nid,
				phone_no: mobile,
				local_guardian_name: guardianName,
				local_guardian_phone_no: '01799646612',
				date_of_birth: dob,
				blood_group: bloodGroup,
				course_fee: course.regular_price,
				course_qty: course.quantity,
				total_course_fee: course.regular_price * course.quantity,
				discount_course_fee: course.discount_price,
				sub_total_course_fee: course.discount_price * course.quantity,
			};

			for (const key in coursePurchaseData) {
				formData.append(key, coursePurchaseData[key]);
			}

			const response = await axios.post(
				'https://itder.com/api/course-purchase',
				formData
			);

            if (response.status === 201) {
                // toast.success('Course Purchase Successful');
                setOrderCheckoutData(response.data.coursePurchaseData);
            }
			console.log(response);
		});
	};

	return (
		<div className="  mt-5 border mx-2">
			<div className="bg-[#6f42c1] text-white p-6 text-center mb-5">
				<h2 className="text-5xl font-bold">Trainee Admission Form</h2>
			</div>
			<form
				className="bg-white shadow-md rounded-lg p-6"
				onSubmit={handleSubmit}
			>
				{/* Trainee Information Section */}
				<div className="form-section">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						<div>
							<label
								htmlFor="fullName"
								className="block font-semibold text-base mb-2"
							>
								Full Name:
							</label>
							<input
								type="text"
								id="fullName"
								className="w-full border border-gray-300 rounded-md p-2"
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
							/>
						</div>
						<div>
							<label
								htmlFor="formNo"
								className="block font-semibold text-base mb-2"
							>
								Form no:
							</label>
							<input
								type="text"
								id="formNo"
								className="w-full border border-gray-300 rounded-md p-2"
								value={formNo}
								onChange={(e) => setFormNo(e.target.value)}
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						<div>
							<label
								htmlFor="parentName"
								className="block font-semibold text-base mb-2"
							>
								Father/Mother Name:
							</label>
							<input
								type="text"
								id="parentName"
								className="w-full border border-gray-300 rounded-md p-2"
								value={parentName}
								onChange={(e) => setParentName(e.target.value)}
							/>
						</div>
						<div>
							<label
								htmlFor="parentNumber"
								className="block font-semibold text-base mb-2"
							>
								Number:
							</label>
							<input
								type="text"
								id="parentNumber"
								className="w-full border border-gray-300 rounded-md p-2"
								value={parentNumber}
								onChange={(e) =>
									setParentNumber(e.target.value)
								}
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						<div>
							<label
								htmlFor="school"
								className="block font-semibold text-base mb-2"
							>
								School/College:
							</label>
							<input
								type="text"
								id="school"
								className="w-full border border-gray-300 rounded-md p-2"
								value={school}
								onChange={(e) => setSchool(e.target.value)}
							/>
						</div>
						<div>
							<label
								htmlFor="jobInfo"
								className="block font-semibold text-base mb-2"
							>
								Job Information:
							</label>
							<input
								type="text"
								id="jobInfo"
								className="w-full border border-gray-300 rounded-md p-2"
								value={jobInfo}
								onChange={(e) => setJobInfo(e.target.value)}
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						<div>
							<label
								htmlFor="email"
								className="block font-semibold text-base mb-2"
							>
								Email:
							</label>
							<input
								type="email"
								id="email"
								className="w-full border border-gray-300 rounded-md p-2"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<label
								htmlFor="gender"
								className="block font-semibold text-base mb-2"
							>
								Gender:
							</label>
							<select
								id="gender"
								className="w-full border border-gray-300 rounded-md p-2"
								value={gender}
								onChange={(e) => setGender(e.target.value)}
							>
								<option value="" disabled selected>
									Select Gender
								</option>
								<option value="Female">Female</option>
								<option value="Male">Male</option>
								<option value="Others">Other</option>
							</select>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						<div>
							<label
								htmlFor="presentAddress"
								className="block font-semibold text-base mb-2"
							>
								Present Address:
							</label>
							<textarea
								id="presentAddress"
								className="w-full border border-gray-300 rounded-md p-2"
								value={presentAddress}
								onChange={(e) =>
									setPresentAddress(e.target.value)
								}
							/>
						</div>
						<div>
							<label
								htmlFor="permanentAddress"
								className="block font-semibold text-base mb-2"
							>
								Permanent Address:
							</label>
							<textarea
								id="permanentAddress"
								className="w-full border border-gray-300 rounded-md p-2"
								value={permanentAddress}
								onChange={(e) =>
									setPermanentAddress(e.target.value)
								}
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						<div>
							<label
								htmlFor="nid"
								className="block font-semibold text-base mb-2"
							>
								NID Number:
							</label>
							<input
								type="text"
								id="nid"
								className="w-full border border-gray-300 rounded-md p-2"
								value={nid}
								onChange={(e) => setNid(e.target.value)}
							/>
						</div>
						<div>
							<label
								htmlFor="mobile"
								className="block font-semibold text-base mb-2"
							>
								Mobile No:
							</label>
							<input
								type="text"
								id="mobile"
								className="w-full border border-gray-300 rounded-md p-2"
								value={mobile}
								onChange={(e) => setMobile(e.target.value)}
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						<div>
							<label
								htmlFor="guardianName"
								className="block font-semibold text-base mb-2"
							>
								Local Guardian’s Name:
							</label>
							<input
								type="text"
								id="guardianName"
								className="w-full border border-gray-300 rounded-md p-2"
								value={guardianName}
								onChange={(e) =>
									setGuardianName(e.target.value)
								}
							/>
						</div>
						<div>
							<label
								htmlFor="dob"
								className="block font-semibold text-base mb-2"
							>
								Date of Birth:
							</label>
							<input
								type="date"
								id="dob"
								className="w-full border border-gray-300 rounded-md p-2"
								value={dob}
								onChange={(e) => setDob(e.target.value)}
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						<div>
							<label
								htmlFor="bloodGroup"
								className="block font-semibold text-base mb-2"
							>
								Blood Group:
							</label>
							<select
								id="bloodGroup"
								className="w-full border border-gray-300 rounded-md p-2"
								value={bloodGroup}
								onChange={(e) => setBloodGroup(e.target.value)}
							>
								<option value="" disabled selected>
									Select Blood Group
								</option>
								<option value="A+">A+</option>
								<option value="A-">A-</option>
								<option value="B+">B+</option>
								<option value="B-">B-</option>
								<option value="AB+">AB+</option>
								<option value="AB-">AB-</option>
								<option value="O+">O+</option>
								<option value="O-">O-</option>
							</select>
						</div>
						<div>
							<label
								htmlFor="photo"
								className="block font-semibold text-base mb-2"
							>
								Job Information:
							</label>
							<input
								type="file"
								id="photo"
								className="w-full border border-gray-300 rounded-md p-2"
								onChange={(e) => setPhoto(e.target.files[0])}
							/>
						</div>
					</div>
				</div>

				<div className="m-mt_16px">
					<div className="pt-p_16px">
						<div className="lg:flex items-start gap-3">
							<div className="w-full lg:w-[58%] bg-white border-2">
								<table className=" overflow-x-auto  w-full">
									<thead>
										<tr className="border-b-4 border-gray-300">
											<th className="text-[14.4px] w-6/12 font-bold p-[7px] text-black">
												Course
											</th>
											<th className="text-[14.4px] font-bold p-[7px] text-black">
												Price
											</th>
											<th className="text-[14.4px] font-bold p-[7px] text-black">
												Quantity
											</th>
											<th className="text-[14.4px] font-bold p-[7px] text-black">
												Sub Total
											</th>
										</tr>
									</thead>

									{/* cart items table data start */}
									{cart.length === 0 ? (
										<tbody>
											<tr>
												<td
													colSpan="4"
													className="text-center py-4"
												>
													Your cart is empty
												</td>
											</tr>
										</tbody>
									) : (
										cart.map((course, index) => (
											<tbody
												key={index}
												className="overflow-x-auto "
											>
												<tr className="border-b border-gray-300 overflow-x-auto">
													<td>
														<div className="flex items-center justify-center ">
															<div className="w-[20%] text-center flex items-center justify-center ">
																<RiDeleteBin5Line
																	className="text-xl hover:text-footer_color cursor-pointer"
																	onClick={() =>
																		removeFromCart(
																			course.id
																		)
																	}
																/>
															</div>
															<div className="flex flex-col text-center justify-center items-center py-2  w-[80%]">
																<div className="mask">
																	<img
																		className="h-[40px] w-[70px]"
																		src=""
																		alt="Course"
																	/>
																</div>
																<p className="text-[14.4px] px-[7px] text-center flex ">
																	{
																		course.course_name
																	}{' '}
																	<span className="hidden lg:flex ">
																		- unit
																		name
																	</span>
																</p>
															</div>
														</div>
													</td>
													<td>
														<p className="text-[14.4px] font-bold p-[7px] text-black text-center">
															Tk{' '}
															{
																course.discountPrice
															}
														</p>
													</td>
													<td>
														<div className="flex justify-center">
															<div className="border">
																<button
																	className="px-4 w-[30px] font-bold font_standard my-1.5"
																	onClick={() =>
																		updateCartQuantity(
																			course.id,
																			course.quantity -
																				1
																		)
																	}
																	disabled={
																		course.quantity <=
																		1
																	}
																>
																	-
																</button>
															</div>
															<div className="border-y">
																<input
																	type="number"
																	readOnly
																	value={
																		course.quantity
																	}
																	className="font-bold w-[30px] lg:w-[60px] font_standard px-2 text-center mx-auto h-full"
																/>
															</div>
															<div className="border">
																<button
																	className="px-4 w-[30px] font-bold font_standard my-1.5"
																	onClick={() =>
																		updateCartQuantity(
																			course.id,
																			course.quantity +
																				1
																		)
																	}
																>
																	+
																</button>
															</div>
														</div>
													</td>
													<td>
														<p className="text-[14.4px] font-bold p-[7px] text-black text-center">
															Tk{' '}
															{calculateSubTotal(
																course
															)}
														</p>
													</td>
												</tr>
											</tbody>
										))
									)}

									{/* cart items table data end */}
								</table>
							</div>
							<div className="lg:w-[41%] bg-white border-2 ">
								<div className="px-[30px]">
									<h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
										Cart Summary
									</h2>
									<div className="py-3 flex justify-between border-b border-gray-300">
										<p className="text-black font-bold">
											Total Price
										</p>
										<p className="text-black font-bold">
											{calculateTotalPrice()}
										</p>
									</div>

									<Link
										state={'bdt'}
										onClick={handleSubmit}
										className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4  block text-center mx-auto w-full"
									>
										Submit
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Checkout;
