import axios from "axios";
const BASE_URL = "http://localhost:5000";


// Endpoint to login
export const LoginAPI = async (Email, password) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.post(
      `${BASE_URL}/api/user/login`,
      {
        email: `${Email}`,
        Upassword: `${password}`,
      },
      options
    );
    console.log("Login response:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("Login failed. Please try again.");
    throw error;
  }
};

// Endpoint to Register
export const RegisterAPI = async (First,Last,Email,password) => {
  const response = await axios
    .post(`${BASE_URL}/api/user/register`, {
        FName: `${First}`,
        lName: `${Last}`,
        email: `${Email}`,
        Upassword: `${password}`,
    })
    .catch((error) => {
      if (error.response)
      {
        console.error(error);
        alert("Registration failed. Please try again.");
      }
    });
    console.log("response:", response.data);
  return response.data;
};
