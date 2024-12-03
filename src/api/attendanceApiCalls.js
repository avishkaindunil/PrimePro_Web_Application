import { publicAuthRequest } from "../constants/requestMethods";

export const getAllAttendanceByEmployeeId = async (employeeId) => {
  let loading = true;
  let error = null;
  let data = [];
  try {
    const res = await publicAuthRequest.get(
      `attendance/employee/${employeeId}`
    );
    loading = false;
    data = res.data;
    return { data, loading, error };
  } catch (err) {
    console.error(err);
    loading = false;
    error = err.message;
    data = null;
    return { data, loading, error };
  }
};

export const saveAttendanceByEmployeeId = async (attendanceDetails) => {
  let loading = true;
  let error = null;
  let data = [];
  console.log(attendanceDetails);
  try {
    if (!attendanceDetails) {
      console.log("Attedance Data is missing");
      return { data, loading, error };
    }
    const res = await publicAuthRequest.post(
      `attendance/mark`,
      attendanceDetails
    );
    loading = false;
    data = res.data;
    return { data, loading, error };
  } catch (err) {
    console.error(err);
    loading = false;
    error = err.message;
    data = null;
    return { data, loading, error };
  }
};

export const getTotalWorkHoursAndOverTimeByEmployeeIdAndMonth = async (employeeId) => {
    let loading = true;
    let error = null;
    let data = [];
    try {
      const res = await publicAuthRequest.get(
        `attendance/calculate/${employeeId}`
      );
      loading = false;
      data = res.data;
      return { data, loading, error };
    } catch (err) {
      console.error(err);
      loading = false;
      error = err.message;
      data = null;
      return { data, loading, error };
    }
  };