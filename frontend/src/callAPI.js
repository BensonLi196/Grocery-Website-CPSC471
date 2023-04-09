import axios from "axios";

// Endpoint to login
export const LoginAPI = async (Username,Password) => {
    const response = await axios
      .post(`${BASE_URL}/api/user/login`, {
          username: Username,
          password: Password,
      })
      .catch((error) => {
        if (error.response)
        {
          console.error(error);
          alert("Login failed. Please try again.");
        }
      });
    return response.data;
  };
  