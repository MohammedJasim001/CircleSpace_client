/* eslint-disable react/no-unescaped-entities */
'use client';
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query'; // Import useMutation from React Query
import { registerApi } from '@/services/auth';
import Button from '../Button/Button';
import { toast } from 'react-toastify';

// Define the interface for RegistrationFormValues
interface RegistrationFormValues {
  name: string;
  userName: string;
  email: string;
  password: string;
}

// Validation schema with Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  userName: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
});

const RegistrationForm: React.FC = () => {
  const router = useRouter();

  // Initial form values
  const initialValues: RegistrationFormValues = {
    name: '',
    userName: '',
    email: '',
    password: '',
  };

  // React Query mutation hook
  const mutation = useMutation({
    mutationFn: registerApi, // API function for registration
    onSuccess: (response, variables) => {
      if (response?.success) {
        const email = variables.email; // Get the email from the form submission
        router.push(`/auth/otp?email=${encodeURIComponent(email)}`);
    
        toast.success(response?.message);
      } else {
        toast.warn(response?.message);
        console.log(response?.message);
      }
    },
    onError: (error) => {
      toast.error('Something went wrong');
      console.error(error);
    },
  });

  // Form submission handler
  const handleSubmit = async (values: RegistrationFormValues) => {
    mutation.mutate(values); // Trigger the mutation with the form values
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Let's Learn More About You</h1>
        <p className="text-gray-400 text-sm">
          Please fill out the form below to help us know you better. Your information will help us provide you with a personalized experience.
        </p>
      </div>
      <div className="w-full max-w-sm mx-auto">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label className="block mb-1 text-white">Name</label>
                <Field
                  type="text"
                  name="name"
                  className="w-full p-2 rounded-md bg-[#1a1c26] text-sm text-gray-400 h-10"
                  placeholder="Please Enter your Name"
                />
                <div className="text-red-500">
                  <ErrorMessage name="name" />
                </div>
              </div>

              {/* Username */}
              <div>
                <label className="block mb-1 text-white">Username</label>
                <Field
                  type="text"
                  name="userName"
                  className="w-full p-2 rounded-md bg-[#1a1c26] text-sm text-gray-400 h-10"
                  placeholder="Please Enter a Username"
                />
                <div className="text-red-500">
                  <ErrorMessage name="userName" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 text-white">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-2 rounded-md bg-[#1a1c26] text-sm text-gray-400 h-10"
                  placeholder="Please Enter your Email"
                />
                <div className="text-red-500">
                  <ErrorMessage name="email" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1 text-white">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full p-2 rounded-md bg-[#1a1c26] text-sm text-gray-400 h-10"
                  placeholder="Create a Password"
                />
                <div className="text-red-500">
                  <ErrorMessage name="password" />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                text={mutation.isPending ? 'Submitting...' : 'Get OTP'}
                isDisabled={mutation.isPending} // Disable while loading
              />
              <p className="text-center text-sm text-gray-400 mt-4">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-blue-500 hover:underline">
                  Login
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationForm;
