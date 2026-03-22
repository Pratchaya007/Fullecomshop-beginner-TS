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
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import { toast } from "sonner";
import { loginSchema } from "@/schemas/auth.schema";
import { useEcomStore } from "@/stores/ecom-store";

type RegisterInput = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const actionLogin = useEcomStore((stete) => stete.actionLogin)
  const user = useEcomStore((stete) => stete.user)
  // console.log('user from zudtand' , user)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({ resolver: zodResolver(loginSchema) });

  const onsubmit: SubmitHandler<RegisterInput> = async (data) => {
    try{
      const res = await actionLogin(data)
      const role = res.data.payload.role //เข้าถึง role in db ให้ไล่การเข้าถึงตามขั้นตอน
      // console.log('role', role)
      roleRedirect(role)
      toast.success('Welcom Back')
    }catch (err) {
      if (axios.isAxiosError(err)) { // with isAxiosError เข้ามาช่วยในการเช็คและเข้าถึง error
      const errorMsg = err.response?.data?.message
      toast.error(errorMsg)
    } else {
      toast.error("Something went wrong")
    }
  };
}

const roleRedirect = (role: string) => {
  if (role === 'ADMIN'){
    navigate('/admin')
  }else{
    navigate(-1)
  }
}

  return (
    <div className="flex justify-center items-center h-screen bg-[#f5f5f5]">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSubmit(onsubmit)}>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Link to={"/register"}>Sign Up</Link>
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
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2 mt-2 bg-white border-none">
            <Button type="submit" className="w-full hover:animate-pulse active:scale-95">
              {isSubmitting ? 'Loading....' : 'Login'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};


export default Login;