import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { registerSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import { toast } from "sonner";

type RegisterInput = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const onsubmit: SubmitHandler<RegisterInput> = async (data) => {
    try{
      const res = await axios.post("http://localhost:3000/auth/register" , data)
      toast.success(res.data.message)
      navigate('/login')
    }catch (err) {
      if (axios.isAxiosError(err)) { // with isAxiosError เข้ามาช่วยในการเช็คและเข้าถึง error
      const errorMsg = err.response?.data?.message
      toast.error(errorMsg)
    } else {
      toast.error("Something went wrong")
    }

    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#f5f5f5]">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSubmit(onsubmit)}>
          <CardHeader>
            <CardTitle>Create to your account</CardTitle>
            <CardDescription>
              Enter your email below to create to your account
            </CardDescription>
            <CardAction>
              <Link to={"/login"}>Sign In</Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register('email')}
                  autoComplete="name"
                />
                {errors.email &&  <p className="text-red-500 text-[10px]">{errors.email.message}</p>}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password"  {...register('password')} autoComplete="email"/>
                {errors.password &&  <p className="text-red-500 text-[10px]">{errors.password.message}</p>}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">ConfirmPassword</Label>
                </div>
                <Input id="ConfirmPassword" type="password"  {...register('ConfirmPassword')} autoComplete="current-password"/>
                {errors.ConfirmPassword &&  <p className="text-red-500 text-[10px]">{errors.ConfirmPassword.message}</p>}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2 mt-2 bg-white border-none">
            <Button type="submit" className="w-full hover:animate-pulse active:scale-95">
              {isSubmitting ? 'Loading....' : 'Register'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
export default Register;


//✅ autocomplete Browser จะรู้ทันทีว่า ช่องนี้คือ email ดังนั้นมันจะ 	•	แนะนำ email ที่เคยใช้ 	•	autofill ให้ทันที ทำให้ user ไม่ต้องพิมพ์เองทุกครั้ง ✨
// <input type="email" name="email" autocomplete="email"> ❗️