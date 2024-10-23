import React from 'react';

const InputField = ({ label, id, type, value, onChange, arrayOfProps }) => {
	return (
		<div>
			<label htmlFor={id} className="block font-semibold text-base mb-2">
				{label}:
			</label>
			<input
                {... arrayOfProps }
				type={type}
				id={id}
				className="w-full border border-gray-300 rounded-md p-2"
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};

const TextAreaField = ({ label, id, value, onChange }) => {
	return (
		<div>
			<label htmlFor={id} className="block font-semibold text-base mb-2">
				{label}:
			</label>
			<textarea
				id={id}
				className="w-full border border-gray-300 rounded-md p-2"
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};


const SelectField = ({ label, id, value, onChange, options }) => {
	return (
		<div>
			<label htmlFor={id} className="block font-semibold text-base mb-2">
				{label}:
			</label>
			<select
				id={id}
				className="w-full border border-gray-300 rounded-md p-2"
				value={value}
				onChange={onChange}
			>
				<option value="" disabled>
					Select {label}
				</option>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
};



const FileInputField = ({ label, id, onChange }) => {
	return (
		<div>
			<label htmlFor={id} className="block font-semibold text-base mb-2">
				{label}:
			</label>
			<input
				type="file"
				id={id}
				className="w-full border border-gray-300 rounded-md p-2"
				onChange={onChange}
			/>
		</div>
	);
};


const MyForm = ({
	fullName, setFullName,
	parentName, setParentName,
	parentNumber, setParentNumber,
	school, setSchool,
	jobInfo, setJobInfo,
	email, setEmail,
	gender, setGender,
    Country, setCountry,
    districtThana ,setDistrictThana,
	presentAddress, setPresentAddress,
	permanentAddress, setPermanentAddress,
    localGuardianNumber, setLocalGuardianNumber,
	nid, setNid,
	mobile, setMobile,
	guardianName, setGuardianName,
	dob, setDob,
	bloodGroup, setBloodGroup,
	setPhoto,
    orderNote, setOrderNote

}) => {
	return (
		<div className="form-section">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<InputField
					label="Full Name"
					id="fullName"
					type="text"
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
				/>
                <InputField
					label="Mobile No"
					id="mobile"
					type="text"
					value={mobile}
					onChange={(e) => setMobile(e.target.value)}
                    arrayOfProps={{required: true}}
				/>
				
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<InputField
					label="Father/Mother Name"
					id="parentName"
					type="text"
					value={parentName}
					onChange={(e) => setParentName(e.target.value)}
				/>
				<InputField
					label="Number"
					id="parentNumber"
					type="text"
					value={parentNumber}
					onChange={(e) => setParentNumber(e.target.value)}
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<InputField
					label="School/College"
					id="school"
					type="text"
					value={school}
					onChange={(e) => setSchool(e.target.value)}
				/>
				<InputField
					label="Job Information"
					id="jobInfo"
					type="text"
					value={jobInfo}
					onChange={(e) => setJobInfo(e.target.value)}
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<InputField
					label="Email"
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<SelectField
					label="Gender"
					id="gender"
					value={gender}
					onChange={(e) => setGender(e.target.value)}
					options={['Female', 'Male', 'Others']}
				/>
			</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<InputField
					label="Country"
					id="country"
					type="text"
					value={Country}
					onChange={(e) => setCountry(e.target.value)}
				/>
				<InputField
					label="District Thana"
					id="districtThana"
					type="text"
					value={districtThana}
					onChange={(e) => setDistrictThana(e.target.value)}
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<TextAreaField
					label="Present Address"
					id="presentAddress"
					value={presentAddress}
					onChange={(e) => setPresentAddress(e.target.value)}
				/>
				<TextAreaField
					label="Permanent Address"
					id="permanentAddress"
					value={permanentAddress}
					onChange={(e) => setPermanentAddress(e.target.value)}
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<InputField
					label="NID Number"
					id="nid"
					type="text"
					value={nid}
					onChange={(e) => setNid(e.target.value)}
				/>
                <InputField
					label="Date of Birth"
					id="dob"
					type="date"
					value={dob}
					onChange={(e) => setDob(e.target.value)}
				/>
				
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<InputField
					label="Local Guardian’s Name"
					id="guardianName"
					type="text"
					value={guardianName}
					onChange={(e) => setGuardianName(e.target.value)}
				/>
				 <InputField
					label="Local Guardian Number"
					id="local-guardian-number"
					type="text"
					value={localGuardianNumber}
					onChange={(e) => setLocalGuardianNumber(e.target.value)}
                    arrayOfProps={{required: true}}
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<SelectField
					label="Blood Group"
					id="bloodGroup"
					value={bloodGroup}
					onChange={(e) => setBloodGroup(e.target.value)}
					options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
				/>
				<FileInputField
					label="Photo"
					id="photo"
					onChange={(e) => setPhoto(e.target.files[0])}
				/>
			</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<TextAreaField
					label="Order Note"
					id="orderNote"
					value={orderNote}
					onChange={(e) => setOrderNote(e.target.value)}
				/>
				
			</div>
		</div>
	);
};

export default MyForm;