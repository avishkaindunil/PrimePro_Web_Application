import { publicAuthRequest } from "../constants/requestMethods";

export const getTaskCountByEmployeeId = async (employeeId) => {
  let loading = true;
  let error = null;
  let data = [];
  try {
    const res = await publicAuthRequest.get(`tasks/employee/count/${employeeId}`);
    console.log(res);
    loading = false;
    data = res.data;
    console.log(data);
    // return res.data;
    return { data, loading, error };
  } catch (err) {
    console.error(err);
    // throw new Error(err.message);
    loading = false;
    error = err.message;
    data = null;
    return { data, loading, error };
  }
};
