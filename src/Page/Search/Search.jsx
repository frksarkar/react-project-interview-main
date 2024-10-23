import React, { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { toast } from 'react-toastify';
import userAxiosSecure from '../../Hooks/useAxiosSecure';


const Search = () => {
	const [formId, setFormId] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [searchResults, setSearchResults] = useState(null);
    const axios = userAxiosSecure();

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

			setSearchResults(data.data.singleCoursePurchaseData);
		} catch (error) {
			toast.error(error.response.data.message);
			console.log(error);
		}
	};

    return (
		<div className="min-h-screen flex flex-col text-text_40px font-bold items-center justify-center">
            {!searchResults && (
                <h1 className="w-[600px] mx-auto">Search here</h1>
            )}
			{!searchResults ? (
				<>
					<div className="h-[52px] relative col-span-4 w-[600px] mx-auto">
						<input
							type="text"
							name="search"
							placeholder="form number"
							className="text-black my-2 px-2 w-full block h-full outline-0 rounded-[4px] border"
							value={formId}
							onChange={(e) => setFormId(e.target.value)}
						/>
					</div>
					<div className="h-[52px] relative col-span-4 w-[600px] mx-auto">
						<input
							type="text"
							name="phone number"
							placeholder="phone number"
							className="text-black px-2 w-full block h-full outline-0 rounded-[4px] border"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
						/>
					</div>
					<button
						className="button_primary w-[180px] mx-auto my-5"
						onClick={handleSearch}
					>
						<IoMdSearch className="text-2xl inline" /> Search
					</button>
				</>
			) : (
				CoursePurchaseData(searchResults, setSearchResults)
			)}
		</div>
	);
};

const CoursePurchaseData = ( data, setSearchResults ) => {
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
        <div className="max-w-4xl my-10 mx-auto p-8 bg-white shadow-lg rounded-xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600">
          Course Purchase Details
        </h2>
  
       
  
        {/* Profile Photo */}
        <div className="flex justify-center mb-8">
          <img
            src={photo}
            alt="Student"
            className="w-32 h-32 object-cover rounded-full border-4 border-indigo-100 shadow-lg"
          />
        </div>
  
        {/* Information Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-indigo-500">Personal Information</h3>
            <p className="text-lg"><strong>Name:</strong> {name}</p>
            <p className="text-lg"><strong>Date of Birth:</strong> {date_of_birth}</p>
            <p className="text-lg"><strong>Gender:</strong> {gender}</p>
            <p className="text-lg"><strong>Blood Group:</strong> {blood_group}</p>
            <p className="text-lg"><strong>Email:</strong> {email}</p>
            <p className="text-lg"><strong>Phone:</strong> {phone_no}</p>
            <p className="text-lg"><strong>Present Address:</strong> {present_address}</p>
            <p className="text-lg"><strong>Permanent Address:</strong> {permanent_address}</p>
          </div>
  
          {/* Guardian Information */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-indigo-500">Guardian Information</h3>
            <p className="text-lg"><strong>Father's Name:</strong> {father_name}</p>
            <p className="text-lg"><strong>Father's Phone:</strong> {father_phone_no}</p>
            <p className="text-lg"><strong>Local Guardian:</strong> {local_guardian_name}</p>
            <p className="text-lg"><strong>Local Guardian Phone:</strong> {local_guardian_phone_no}</p>
            <p className="text-lg"><strong>NID No:</strong> {nid_no}</p>
          </div>
  
          {/* Course Information */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-indigo-500">Course Information</h3>
            <p className="text-lg"><strong>Course ID:</strong> {course_id}</p>
            <p className="text-lg"><strong>Admission Date:</strong> {admission_date}</p>
            <p className="text-lg"><strong>Course Quantity:</strong> {course_qty}</p>
            <p className="text-lg"><strong>Course Fee (per unit):</strong> {course_fee} BDT</p>
            <p className="text-lg"><strong>Total Fee:</strong> {total_course_fee} BDT</p>
            <p className="text-lg"><strong>Discount:</strong> {discount_course_fee} BDT</p>
            <p className="text-lg"><strong>Sub-total:</strong> {sub_total_course_fee} BDT</p>
          </div>
  
          {/* Additional Information */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-indigo-500">Additional Information</h3>
            <p className="text-lg"><strong>School/College Name:</strong> {school_collage_name}</p>
            <p className="text-lg"><strong>Job Title:</strong> {job_title}</p>
          </div>
        </div>
         {/* Back Button */}
         <div className="flex justify-center align-middle  mt-6">
          <button
            onClick={() => setSearchResults(null)}
            className="px-6 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition duration-200"
          >
            Back to Search
          </button>
        </div>
      </div>

	);
};

export default Search;
