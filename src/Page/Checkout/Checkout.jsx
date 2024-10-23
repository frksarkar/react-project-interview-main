import { useContext, useState } from 'react';
import { OrderContext } from '../../ContextAPIs/OrderProvider';
// import userAxiosSecure from '../../Hooks/useAxiosSecure';
import axios from 'axios';
import { toast } from 'react-toastify';
import formValidation from '../../Utils/formValidation';

import {
	CartItem,
	MyForm,
	CartSummary,
	CartItemHeader,
} from '../../components/index';
import {
	calculateSubTotal,
	calculateTotalPrice,
	dateNow,
} from '../../Utils/helpers';

const Checkout = () => {
	// const axiosSecure = userAxiosSecure();

	const {
		cartItem: cart,
		removeFromCart,
		setPurchaseCourseData,
		setUserData,
        setCartItem
	} = useContext(OrderContext);

	// State for form inputs
	const [fullName, setFullName] = useState('');
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
	const [localGuardianNumber, setLocalGuardianNumber] = useState('');
	const [districtThana, setDistrictThana] = useState('');
	const [Country, setCountry] = useState('');
	const [orderNote, setOrderNote] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault(); // Prevent the form's default submit behavior

        // validation check for form inputs
		const errors = formValidation({
			fullName,
			parentName,
			parentNumber,
			school,
			jobInfo,
			email,
			gender,
			Country,
			districtThana,
			presentAddress,
			permanentAddress,
			nid,
			mobile,
			guardianName,
			localGuardianNumber,
			dob,
			bloodGroup,
			photo,
			orderNote,
		});

		if (Object.keys(errors).length > 0) {
			toast.error(errors[Object.keys(errors)[0]], {
                className: 'top-14'
            });
			return;
		}

		const formData = new FormData();

		const coursePurchaseData = {
			course_id: cart.id,
			admission_date: dateNow(),
			photo: photo,
			name: fullName,
			father_name: parentName,
			father_phone_no: parentNumber,
			school_collage_name: school,
			job_title: jobInfo,
			email: email,
			gender: gender,
			district_thana: districtThana,
			country: Country,
			present_address: presentAddress,
			permanent_address: permanentAddress,
			nid_no: nid,
			phone_no: mobile,
			local_guardian_name: guardianName,
			local_guardian_phone_no: localGuardianNumber,
			date_of_birth: dob,
			blood_group: bloodGroup,
			course_fee: cart.regular_price,
			course_qty: cart.quantity,
			total_course_fee: cart.regular_price * cart.quantity,
			discount_course_fee: cart.discount_price,
			sub_total_course_fee: calculateSubTotal(cart),
			order_note: orderNote,
		};

		console.log(coursePurchaseData);

		for (const key in coursePurchaseData) {
			formData.append(key, coursePurchaseData[key]);
		}


		const response = await axios.post(
			'https://itder.com/api/course-purchase',
			formData
		);

		if (response.status === 201) {
			toast.success('Course Purchase Successful');
            setCartItem(null);

            setUserData(coursePurchaseData);	
            setPurchaseCourseData(response.data.coursePurchaseData);
            
            setTimeout(() => {
                window.location.href = '/order-details';
            }, 1000);

          
		} else {
			toast.error('Course Purchase Failed');
		}
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

				<MyForm
					fullName={fullName}
					setFullName={setFullName}
					parentName={parentName}
					setParentName={setParentName}
					parentNumber={parentNumber}
					setParentNumber={setParentNumber}
					school={school}
					setSchool={setSchool}
					jobInfo={jobInfo}
					setJobInfo={setJobInfo}
					email={email}
					setEmail={setEmail}
					gender={gender}
					setGender={setGender}
					districtThana={districtThana}
					setDistrictThana={setDistrictThana}
					Country={Country}
					setCountry={setCountry}
					presentAddress={presentAddress}
					setPresentAddress={setPresentAddress}
					permanentAddress={permanentAddress}
					setPermanentAddress={setPermanentAddress}
					nid={nid}
					setNid={setNid}
					mobile={mobile}
					setMobile={setMobile}
					guardianName={guardianName}
					setGuardianName={setGuardianName}
					localGuardianNumber={localGuardianNumber}
					setLocalGuardianNumber={setLocalGuardianNumber}
					dob={dob}
					setDob={setDob}
					bloodGroup={bloodGroup}
					setBloodGroup={setBloodGroup}
					setPhoto={setPhoto}
					orderNote={orderNote}
					setOrderNote={setOrderNote}
				/>

				<div className="m-mt_16px">
					<div className="pt-p_16px">
						<div className="lg:flex items-start gap-3">
							<div className="w-full lg:w-[58%] bg-white border-2">
								<table className=" overflow-x-auto  w-full">
									<thead>
										<CartItemHeader />
									</thead>

									{/* cart items table data start */}
									{!cart ? (
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
										<tbody className="overflow-x-auto ">
											<CartItem
												cart={cart}
												removeFromCart={removeFromCart}
												arrProp={{disabled: true}}
												calculateSubTotal={
													calculateSubTotal
												}
											/>
										</tbody>
									)}

									{/* cart items table data end */}
								</table>
							</div>
							<div className="lg:w-[41%] bg-white border-2 ">
								<CartSummary
									calculateTotalPrice={() =>
										calculateTotalPrice(cart)
									}
									handleSubmit={handleSubmit}
									link="/order-details"
								/>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Checkout;
