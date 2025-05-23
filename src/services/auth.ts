/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './api';
import axios, { AxiosError } from 'axios';

  


// Define types for the response and error
interface RegistrationResponse {
  success: boolean;
  message: string;
  data:any
}

interface OtpVerifyResponse {
  success: boolean;
  message: string;
}




// Define the API function
export const registerApi = async (
 values:any
): Promise<RegistrationResponse> => {
  try {
    const res = await axios.post('https://circlespace-server.onrender.com/api/user/register', values, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return {
      success: true,
      message: res.data.message || 'Registration successful',
      data:res.data
    };
  } catch (err) {
    if (err instanceof AxiosError) {
      return {
        success: false,
        message: err.response?.data?.message || 'Something went wrong during registration',
        data:'error'
      };
    } else {
      return {
        success: false,
        message: 'An unknown error occurred',
        data:'error'
      };
    }
  }
};



export const OtpVerifyApi = async (values: { email: string; otp: number }): Promise<OtpVerifyResponse> => {
  try {
    // Send the OTP and email for verification
    const res = await axios.post('https://circlespace-server.onrender.com/api/user/verifyotp', values ,  {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    // Check if response contains data and return success message
    if (res.data?.success) {
      return {
        success: true,
        message: res.data.message || 'OTP verified successfully',
      };
    }

    // In case the API does not send a success flag, handle it gracefully
    return {
      success: false,
      message: res.data?.message || 'OTP verification failed',
    };
  } catch (err) {
    if (err instanceof AxiosError) {
      // Return an error message if it's an Axios error
      return {
        success: false,
        message: err.response?.data?.message || 'Something went wrong during OTP verification',
      };
    } else {
      // Handle non-Axios errors
      return {
        success: false,
        message: 'An unknown error occurred during OTP verification',
      };
    }
  }
};

export const profileImageApi = async (formdata:FormData) =>{
  try {
    const res = await axios.post('https://circlespace-server.onrender.com/api/user/profileimage',formdata,{
      headers: {
         "Content-Type":"multipart/form-data",
      },
    })
    return res.data
  }  catch (err) {
    if (err instanceof AxiosError) {
      // Return the error message or any other relevant error information
      return {
        message: err.response?.data?.message || 'Something went wrong during registration',
      };
    } else {
      // Handle non-Axios errors
      return {
        success: false,
        message: 'An unknown error occurred',
      };
    }
  }
}

export const loginApi = async (values: any) => {
    try {
        const res = await api.post('/user/login',values)
        
        if (res.data.token) {
            localStorage.setItem('Access_token', res.data.token ,); // Expires in 1 day
        }
        if(res.data.user){
          localStorage.setItem('user',JSON.stringify(res.data.user))
        }
        return res.data
        
    }  catch (err) {
        if (err instanceof AxiosError) {
          // Return the error message or any other relevant error information
          return {
            message: err.response?.data?.message || 'Something went wrong during registration',
          };
        } else {
          // Handle non-Axios errors
          return {
            success: false,
            message: 'An unknown error occurred',
          };
        }
      }
}


