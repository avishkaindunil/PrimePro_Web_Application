import { publicAuthRequest } from "../constants/requestMethods";

export const getAllLeaveRequestByUserId = async (userId) => {
  let loading = true;
  let error = null;
  let data = [];
  try {
    const res = await publicAuthRequest.get(
      `leave-requests/employee/${userId}`
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

export const saveLeaveDetails = async (leaveDetails) => {
  let loading = true;
  let error = null;
  let data = [];

  try {
    if (!leaveDetails) {
      console.log("Leave Data is missing");
      return { data, loading, error };
    }
    const res = await publicAuthRequest.post(
      `leave-requests/add`,
      leaveDetails
    );
    loading = false;
    data = res.data;
    return { data, loading, error };
  } catch (err) {
    console.error(err);
    loading = false;
    error = err.response.data;
    data = null;
    return { data, loading, error };
  }
};

export const approveLeaveRequest = async (leaveDetails) => {
    let loading = true;
    let error = null;
    let data = [];
  
    try {
      if (!leaveDetails) {
        console.log("Leave Data is missing");
        return { data, loading, error };
      }
      const res = await publicAuthRequest.post(
        `leave-requests/approve`,
        leaveDetails
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