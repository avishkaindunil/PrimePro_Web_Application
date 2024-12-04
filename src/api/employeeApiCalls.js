import { publicAuthRequest } from "../constants/requestMethods";

export const UpdateEmployee = async (
    employeeId,
    token,
    userEmployeeData
  ) => {
    let loading = false;
    let error = null;
    let data = [];
    if (!(employeeId && userEmployeeData)) {
      error = "User Id or token or User or Status must be provided";
      return { data, loading, error };
    }
    try {
      const res = await publicAuthRequest.put(
        `/employee/update/${employeeId}`,
        userEmployeeData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      data = res.data;
      return { data, loading, error };
    } catch (err) {
      console.error(err);
      error = err.message;
      data = null;
      return { data, loading, error };
    }
  };