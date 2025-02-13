'use client';

import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { OtpVerifyApi } from '@/services/auth';
import Button from '../Button/Button';

export default function VerifyOTP() {
  const [otp, setOtp] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email'); // Retrieve email from query parameters

  // React Query mutation for OTP verification

  const { mutate, isPending } = useMutation({
    mutationFn: OtpVerifyApi,
    onSuccess: (response) => {
      if (response.success && otp.length === 4) {
        toast.success(response?.message); // Show success message
        router.push(`/auth/profileimage?email=${encodeURIComponent(email!)}`); // Pass email as query parameter
      } else {
        toast.warn(response?.message); // Show warning message if unsuccessful
      }
    },
    onError: (error) => {
      toast.error('Error during OTP verification'); // Handle errors
      console.error(error);
    },
  });

  // Handle OTP verification
  const handleOtpVerify = () => {
    const values = { email: email!, otp: Number(otp) };
    mutate(values);
  };

  return (
    <div>
      <div className="w-full max-w-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-white mb-6">Verify Your Email</h1>
        <p className="text-gray-400 text-sm mb-6">Enter the OTP sent to your email to proceed.</p>

        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderSeparator={<span className="mx-5 text-xl text-white"> </span>}
          renderInput={(props) => (
            <input
              {...props}
              className="text-center text-white bg-[#1a1c26] rounded-md focus:outline-none w-16 h-16 m-2 ml-0"
              style={{ width: '52px', height: '52px' }}
            />
          )}
        />

        <div className="mt-6">
          <Button
            text={isPending ? 'Verifying...' : 'Verify OTP'}
            onClick={handleOtpVerify}
            isDisabled={otp.length !== 4 || isPending}
            variant="primary"
            size="medium"
            label="Verify OTP"
          />
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">
          Didn&apos;t receive the OTP?{' '}
          <button className="text-blue-500 hover:underline">Resend OTP</button>
        </p>
      </div>
    </div>
  );

}
