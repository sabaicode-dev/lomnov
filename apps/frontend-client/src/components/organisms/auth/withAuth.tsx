import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/user";

const withAuthRedirect = (Component: React.ComponentType) => {
  return (props: any) => {
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (isAuthenticated || user) {
        router.push("/"); // Redirect to home if already logged in
      }
    }, [isAuthenticated, user, router]);

    return !isAuthenticated && !user ? <Component {...props} /> : null;
  };
};

export default withAuthRedirect;
