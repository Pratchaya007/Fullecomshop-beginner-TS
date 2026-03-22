import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { payment } from "@/api/stripe";
import { useEcomStore } from "@/stores/ecom-store";
import CheckoutForm from "@/components/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK); //ไปโหลดที่ key ของเราที่ตั้งจ่ายเงินไว้

const Payment = () => {
  const [clientSecret, setclientSecret] = useState("");
  const token = useEcomStore((state) => state.token);

  useEffect(() => {
    payment(token!)
      .then((res) => {
        // console.log(res);
        setclientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(message)

  return (
    <div  className=" xl:max-w-5xl lg:max-w-4xl md:max-w-xl max-w-xl mx-auto px-5 py-3">
      {clientSecret && (
        <Elements
          options={{
            clientSecret,
            appearance: { theme: "stripe" },
            loader: "auto",
          }}
          stripe={stripePromise}
        >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};
export default Payment;
