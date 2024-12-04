import { publicAuthRequest } from "../constants/requestMethods";

export const getTaskCountByEmployeeId = async (employeeId) => {
  let loading = true;
  let error = null;
  let data = [];
  try {
    const res = await publicAuthRequest.get(`tasks/employee/count/${employeeId}`);
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

export const getAllTaskByEmployeeId = async (employeeId) => {
  let loading = true;
  let error = null;
  let data = [];
  try {
    const res = await publicAuthRequest.get(`tasks/employee/${employeeId}`);
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

export const getAllTasksByEmployeeId = async (employeeId) => {
  let loading = true;
  let error = null;
  let data = [];
  try {
    const res = await publicAuthRequest.get(`tasks/employee/all/${employeeId}`);
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

export const updateTaskStatus = async (taskData) => {
  let loading = true;
  let error = null;
  let data = [];
  if (!taskData) {
    console.log("Task Data is missing");
    return { data, loading, error };
  }
  try {
    const res = await publicAuthRequest.post(`tasks/changeStatus`, taskData);
    loading = false;
    data = res.data;
    console.log(data);
    return { data, loading, error };
  } catch (err) {
    console.error(err);
    loading = false;
    error = err.message;
    data = null;
    return { data, loading, error };
  }
};

export const getLastFiveMonthsData = async (employeeId) => {
  let loading = true;
  let error = null;
  let data = [];

  try {
    const res = await publicAuthRequest.get(`tasks/employee/fiveMonths/count/${employeeId}`);
    loading = false;
    data = res.data;
    console.log(data);
    return { data, loading, error };
  } catch (err) {
    console.error(err);
    loading = false;
    error = err.message;
    data = null;
    return { data, loading, error };
  }
};