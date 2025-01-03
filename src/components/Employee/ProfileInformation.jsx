import { useForm } from "react-hook-form";

// Function to calculate the age from the date of birth
const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth();
  if (month < birthDate.getMonth() || (month === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const ProfileInformation = ({ storedUserData, onUpdate }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: storedUserData?.name || "",
      dob: storedUserData?.dateOfBirth ? storedUserData.dateOfBirth.split("T")[0] : "",
      phoneNumber: storedUserData?.phoneNumber || "",
    }
  });

  const handleSubmitData = (data) => {
    const finalUserObject = {
      name: data.fullName,
      dateOfBirth: data.dob,
      phoneNumber: data.phoneNumber,
    };

    onUpdate(finalUserObject);
  };

  return (
    <div>
      <div className="w-2/3 p-4">
        <form onSubmit={handleSubmit(handleSubmitData)}>
          {/* Full Name */}
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              {...register("fullName", { required: "Full Name is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
          </div>

          {/* Employee ID */}
          <div className="mb-4">
            <label htmlFor="employeeID" className="block text-gray-700 text-sm font-bold mb-2">
              Employee ID
            </label>
            <input
              type="text"
              id="employeeID"
              value={storedUserData.employeeNumber}
              disabled
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label htmlFor="dob" className="block text-gray-700 text-sm font-bold mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              {...register("dob", { 
                required: "Date of Birth is required",
                validate: {
                  minAge: (value) => {
                    const age = calculateAge(value);
                    return age >= 18 || "You must be at least 18 years old";
                  }
                }
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>}
          </div>

          {/* Branch */}
          <div className="mb-4">
            <label htmlFor="branch" className="block text-gray-700 text-sm font-bold mb-2">
              Branch
            </label>
            <input
              type="text"
              id="branch"
              value={storedUserData.branchName}
              disabled
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              {...register("phoneNumber", { 
                required: "Phone Number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone Number must be 10 digits"
                }
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
          </div>

          {/* Designation */}
          <div className="mb-4">
            <label htmlFor="designation" className="block text-gray-700 text-sm font-bold mb-2">
              Designation
            </label>
            <input
              type="text"
              id="designation"
              value={storedUserData.designation}
              disabled
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileInformation;
