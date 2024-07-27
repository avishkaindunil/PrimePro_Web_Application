import { useForm } from "react-hook-form";

const ProfileInformation = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="w-2/3 p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
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

          <div className="mb-4">
            <label
              htmlFor="employeeID"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Employee ID
            </label>
            <input
              type="text"
              id="employeeID"
              {...register("employeeID", { required: "Employee ID is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.employeeID && <p className="text-red-500 text-xs mt-1">{errors.employeeID.message}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="dob"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              {...register("dob", { required: "Date of Birth is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="branch"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Branch
            </label>
            <input
              type="text"
              id="branch"
              {...register("branch", { required: "Branch is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.branch && <p className="text-red-500 text-xs mt-1">{errors.branch.message}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
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

          <div className="mb-4">
            <label
              htmlFor="designation"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Designation
            </label>
            <input
              type="text"
              id="designation"
              {...register("designation", { required: "Designation is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation.message}</p>}
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
