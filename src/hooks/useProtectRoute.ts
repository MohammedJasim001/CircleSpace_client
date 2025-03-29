// hooks/useAuth.ts
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current route
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Define routes that don't require authentication
    const authRoutes = ["/auth/login", "/auth/register", "/auth/otp", "/auth/profileimage"];

    // Check if the current route is an auth route
    const isAuthRoute = authRoutes.includes(pathname);

    // If it's not an auth route, check for user authentication
    if (!isAuthRoute) {
      const user = localStorage.getItem("user");

      // If no user is found, redirect to the login page
      if (!user) {
        router.push("/auth/login");
      } else {
        setIsLoading(false);
      }
    } else {
      // If it's an auth route, no need to check authentication
      setIsLoading(false);
    }
  }, [router, pathname]);

  return isLoading;
};

export default useAuth;