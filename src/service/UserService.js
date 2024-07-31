import axios from 'axios';

class UserService {

    static BASE_URL = 'http://localhost:8080';


  static async login(email, password) {
    try {
      const response = await axios.post(`${UserService.BASE_URL}/auth/login`, { email, password });
      return response.data;

    } catch (error) {
      throw error;
    }
    

  }

  
  static async register(userData, token) {
    try {
      const response = await axios.post(`${UserService.BASE_URL}/auth/register`, userData,  
        {
        headers: {Autherization: `Bearer ${token}`}
      }
      );
      return response.data;

    } catch (error) {
      throw error;
    }

}


static async getAllUsers(token) {
    try {
      const response = await axios.get(`${UserService.BASE_URL}/admin/get-all-users`, 
     {
        headers: {Autherization: `Bearer ${token}`}
      }
      );
      return response.data;

    } catch (error) {
      throw error;
    }

}

static async getYourProfile(token) {
    try {
      const response = await axios.get(`${UserService.BASE_URL}/adminuser/get-profile`, 
     {
        headers: {Autherization: `Bearer ${token}`}
      }
      );
      return response.data;

    } catch (error) {
      throw error;
    }

}


static async getUserById(userId, token) {
    try {
      const response = await axios.get(`${UserService.BASE_URL}/admin/get-user/${userId}`, 
     {
        headers: {Autherization: `Bearer ${token}`}
      }
      );
      return response.data;

    } catch (error) {
      throw error;
    }

}


static async deleteUser(userId, token) {
    try {
      const response = await axios.delete(`${UserService.BASE_URL}/admin/delete/${userId}`, 
     {
        headers: {Autherization: `Bearer ${token}`}
      }
      );
      return response.data;

    } catch (error) {
      throw error;
    }

}

static async updateUser(userId,userData, token) {
    try {
      const response = await axios.post(`${UserService.BASE_URL}/admin/delete/${userId}`, userData, 
     {
        headers: {Autherization: `Bearer ${token}`}
      }
      );
      return response.data;

    } catch (error) {
      throw error;
    }

} 

static logout(){
    console.log("logout function");
    localStorage.removeItem('token');
    localStorage.removeItem('role');
}

static isAuthenticated(){
    const token = localStorage.getItem('token');
    return !!token  
}

static isAdmin(){
    const role = localStorage.getItem('role');
    return role === 'ADMIN';
}

static isUser(){
    const role = localStorage.getItem('role');
    return role === 'USER';

}

static isEmployee(){
  const role = localStorage.getItem('role');
  return role === 'EMPLOYEE';

}


static adminOnly(){
    return this.isAuthenticated() && this.isAdmin();
}

}

export default UserService;