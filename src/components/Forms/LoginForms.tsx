/* eslint-disable react/no-unescaped-entities */
'use client';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { loginApi } from '@/services/auth';
import Button from '../Button/Button';
import { useMutation } from '@tanstack/react-query';
// import GoogleAuth from '@components/googleAuth';

interface LoginFormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(4, 'Password must be at least 4 characters')
    .required('Password is required'),
});

const LoginForm: React.FC = () => {
  const router = useRouter();
  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const mutation = useMutation({
    mutationFn:loginApi,
    onSuccess:(response) =>{
      if(response.success){
        router.push('/')
        toast.success(response?.message)
      }
      else{
        toast.warn(response?.message)
      }
    },
    onError: (err) =>{
      toast.error(err.message)
      console.error(err)
    }
  })

  // console.log('Current path:', window.location.pathname); // This will log the current path


  const handleSubmit = async (values: LoginFormValues) => {
    mutation.mutate(values)
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Welcome Back!
        </h1>
        <p className="text-gray-400 text-sm text-center mb-8">
          Please log in to your account to continue.
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
              {/* Email Input */}
              <div>
                <label className="text-white mb-2">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-2 rounded-md bg-[#1a1c26] text-sm text-gray-400 h-10"
                  placeholder="Enter your email"
                />
                <div className="text-red-500 text-sm mt-1">
                  <ErrorMessage name="email" />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className=" text-white mb-2">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full p-2 rounded-md bg-[#1a1c26] text-sm text-gray-400 h-10"
                  placeholder="Enter your password"
                />
                <div className="text-red-500 text-sm mt-1">
                  <ErrorMessage name="password" />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                text="Login"
              />

            

              {/* Optional Link */}
              <p className="text-center text-sm text-gray-400 mt-4">
                Don't have an account?{' '}
                <a
                  href="/auth/registration"
                  className="text-blue-500 hover:underline"
                >
                  Sign up
                </a>
              </p>
            </Form>
          )}
        </Formik>
        </div>
      </div>
  );
};

export default LoginForm;
