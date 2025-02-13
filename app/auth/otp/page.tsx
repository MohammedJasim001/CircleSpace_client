import VerifyOTP from "@/components/Forms/VerifyOtp"
import { Suspense } from "react";


const OTP:React.FC = () => {
    return(
       
            <VerifyOTP/>
        
    )


}



const otpWithSuspense: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <OTP />
  </Suspense>
);

export default otpWithSuspense