import z from "zod";

export const patterns = {
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
};

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "กรุณากรอกอีเมลของท่าน")
      .refine((text) => patterns.email.test(text), {
        message: "โปรดตั้งชื่อใหม่อีเมลของคุณผิดพลาด",
      }),
    password: z.string().regex(/^[a-zA-Z0-9]{6,}$/, "กรุณากรอกรหัสผ่านมากว่า 6 ตัวอักษร"),
    ConfirmPassword: z.string().min(6, "กรุณากรอก ConfirmPassword").max(20),
  })
  .refine((data) => data.password === data.ConfirmPassword, {
    message: "Password ของคุณไม่ถูกต้องกรุณาใส่รหัสผ่านใหม่",
    path: ["ConfirmPassword"],
  });

export type User = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .string({ message: "Please enter your username" })
    .min(1, "Username cannot be empty"),

  password: z
    .string({ message: "Please enter your password" })
    .min(6, "Password must be at least 6 characters long"),
});
