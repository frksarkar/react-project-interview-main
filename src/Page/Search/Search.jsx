import React, { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import axios from 'axios';

const Search = () => {
	const [formId, setFormId] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const handleSearch = async () => {
		// Handle the search logic here
		const formData = new FormData();
		formData.append('form_no', formId);
		formData.append('phone_no', phoneNumber);
		try {
			const data = await axios.post(
				`https://itder.com/api/search-purchase-data`,
				formData
			);
			setSearchResults((prev) => [
				...prev,
				data.data.singleCoursePurchaseData,
			]);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="min-h-screen flex flex-col text-text_40px font-bold items-center justify-center">
			<h1 className="w-[600px] mx-auto">Search here</h1>
			{searchResults.length === 0 ? (
				<div className="h-[52px] relative col-span-4 w-[600px] mx-auto">
					<input
						type="text"
						name="search"
						placeholder="form number"
						className="text-black px-2 w-full block h-full outline-0 rounded-[4px] border"
						value={formId}
						onChange={(e) => setFormId(e.target.value)}
					/>
					<input
						type="text"
						name="phone number"
						placeholder="phone number"
						className="text-black px-2 w-full block h-full outline-0 rounded-[4px] border"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
					/>
					<button
						className="button_primary w-[100px] mx-auto my-5"
						onClick={handleSearch}
					>
						<IoMdSearch className="text-2xl" />
					</button>
				</div>
			) : (
				CoursePurchaseData({ data: searchResults[0] })
			)}
		</div>
	);
};

const CoursePurchaseData = ({ data }) => {
	const {
		course_id,
		admission_date,
		name,
		father_name,
		father_phone_no,
		school_collage_name,
		job_title,
		email,
		gender,
		present_address,
		permanent_address,
		nid_no,
		phone_no,
		local_guardian_name,
		local_guardian_phone_no,
		date_of_birth,
		blood_group,
		course_fee,
		course_qty,
		total_course_fee,
		discount_course_fee,
		sub_total_course_fee,
		photo,
	} = data;

	return (
		<div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
			<h2 className="text-2xl font-bold mb-4 text-center">
				Course Purchase Details
			</h2>

			<div className="flex justify-center mb-6">
				<img
					src={photo}
					alt="Student"
					className="w-32 h-32 object-cover rounded-full border-4 border-gray-200"
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* Personal Information */}
				<div className="bg-gray-50 p-4 rounded-lg shadow-sm">
					<h3 className="text-lg font-bold mb-2">
						Personal Information
					</h3>
					<p className="text-4rem">
						<strong>Name:</strong> {name}
					</p>
					<p>
						<strong>Date of Birth:</strong> {date_of_birth}
					</p>
					<p>
						<strong>Gender:</strong> {gender}
					</p>
					<p>
						<strong>Blood Group:</strong> {blood_group}
					</p>
					<p>
						<strong>Email:</strong> {email}
					</p>
					<p>
						<strong>Phone:</strong> {phone_no}
					</p>
					<p>
						<strong>Present Address:</strong> {present_address}
					</p>
					<p>
						<strong>Permanent Address:</strong> {permanent_address}
					</p>
				</div>

				{/* Guardian Information */}
				<div className="bg-gray-50 p-4 rounded-lg shadow-sm">
					<h3 className="text-lg font-bold mb-2">
						Guardian Information
					</h3>
					<p>
						<strong>Father's Name:</strong> {father_name}
					</p>
					<p>
						<strong>Father's Phone:</strong> {father_phone_no}
					</p>
					<p>
						<strong>Local Guardian:</strong> {local_guardian_name}
					</p>
					<p>
						<strong>Local Guardian Phone:</strong>{' '}
						{local_guardian_phone_no}
					</p>
					<p>
						<strong>NID No:</strong> {nid_no}
					</p>
				</div>

				{/* Course Information */}
				<div className="bg-gray-50 p-4 rounded-lg shadow-sm">
					<h3 className="text-lg font-bold mb-2">
						Course Information
					</h3>
					<p>
						<strong>Course ID:</strong> {course_id}
					</p>
					<p>
						<strong>Admission Date:</strong> {admission_date}
					</p>
					<p>
						<strong>Course Quantity:</strong> {course_qty}
					</p>
					<p>
						<strong>Course Fee (per unit):</strong> {course_fee} BDT
					</p>
					<p>
						<strong>Total Fee:</strong> {total_course_fee} BDT
					</p>
					<p>
						<strong>Discount:</strong> {discount_course_fee} BDT
					</p>
					<p>
						<strong>Sub-total:</strong> {sub_total_course_fee} BDT
					</p>
				</div>

				{/* Additional Information */}
				<div className="bg-gray-50 p-4 rounded-lg shadow-sm">
					<h3 className="text-lg font-bold mb-2">
						Additional Information
					</h3>
					<p>
						<strong>School/College Name:</strong>{' '}
						{school_collage_name}
					</p>
					<p>
						<strong>Job Title:</strong> {job_title}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Search;
