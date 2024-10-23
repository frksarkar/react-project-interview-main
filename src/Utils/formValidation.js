const validateForm = ({
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
    orderNote
}) => {
    let errors = {};
  
    // Full Name validation (required)
    if (!fullName.trim()) {
      errors.fullName = "Full Name is required";
    }
  
    // Parent Name validation (required)
    if (!parentName.trim()) {
      errors.parentName = "Parent Name is required";
    }
  
    // Parent Number validation (required & number format)
    if (!parentNumber.trim()) {
      errors.parentNumber = "Parent Number is required";
    } else if (!/^\d{11}$/.test(parentNumber)) {
      errors.parentNumber = "Parent Number should be a valid 11-digit number";
    }
  
    // School validation (optional)
    // if school is required, uncomment below:
    // if (!school.trim()) {
    //   errors.school = "School is required";
    // }
  
    // Job Info validation (optional)
    // if jobInfo is required, uncomment below:
    // if (!jobInfo.trim()) {
    //   errors.jobInfo = "Job Info is required";
    // }
  
    // Email validation (required & email format)
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
  
    // Gender validation (required)
    if (!gender.trim()) {
      errors.gender = "Gender is required";
    }
  
    // Present Address validation (required)
    if (!presentAddress.trim()) {
      errors.presentAddress = "Present Address is required";
    }
  
    // Permanent Address validation (optional)
    if (!permanentAddress.trim()) {
      errors.permanentAddress = "Permanent Address is required";
    }
  
    // NID validation (required)
    if (!nid.trim()) {
      errors.nid = "NID is required";
    }
  
    // Mobile validation (required & number format)
    if (!mobile.trim()) {
      errors.mobile = "Mobile is required";
    } else if (!/^\d{11}$/.test(mobile)) {
      errors.mobile = "Mobile should be a valid 10-digit number";
    }
  
    // Guardian Name validation (required)
    if (!guardianName.trim()) {
      errors.guardianName = "Guardian Name is required";
    }
  
    // Date of Birth validation (required)
    if (!dob.trim()) {
      errors.dob = "Date of Birth is required";
    }
  
    // Blood Group validation (optional)
    // if bloodGroup is required, uncomment below:
    // if (!bloodGroup.trim()) {
    //   errors.bloodGroup = "Blood Group is required";
    // }
  
    // Photo validation (optional)
    // if photo is required, uncomment below:
    // if (!photo.trim()) {
    //   errors.photo = "Photo is required";
    // }
  
    // Local Guardian Number validation (required & number format)
    if (!localGuardianNumber.trim()) {
      errors.localGuardianNumber = "Local Guardian Number is required";
    } else if (!/^\d{11}$/.test(localGuardianNumber)) {
      errors.localGuardianNumber = "Local Guardian Number should be a valid 11-digit number";
    }
  
    // District Thana validation (required)
    if (!districtThana.trim()) {
      errors.districtThana = "District Thana is required";
    }
  
    // Country validation (required)
    if (!Country.trim()) {
      errors.Country = "Country is required";
    }
  
    // Order Note validation (optional)
    // if orderNote is required, uncomment below:
    // if (!orderNote.trim()) {
    //   errors.orderNote = "Order Note is required";
    // }
  
    return errors;
  };

export default validateForm