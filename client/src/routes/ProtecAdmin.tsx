import { currenAdmin } from "@/api/auth";
import { useEcomStore } from "@/stores/ecom-store";
import { useEffect, useState, type ReactNode } from "react";
import Loading from "./Loading";

function ProtecAdmin({ element }: { element: ReactNode }) {
  const [check, setCheck] = useState(false);
  const user = useEcomStore((state) => state.user);
  const token = useEcomStore((state) => state.token);
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        if (user && token) {
          await currenAdmin(token);
          setCheck(true);
        }
      } catch {
        setCheck(false);
      }
    };
    checkAdmin();
  }, [user, token]);
  
  return check ? element : <Loading />;
}
export default ProtecAdmin;
