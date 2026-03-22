import z from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1 , {error: 'email is requred'}),
  password: z.string().min(1 , {error: 'password is reqired'})
})

export  const registerSchema = z.object({
  email: z.string().min(1, "first name connot be empty"),
  password: z
    .string()
    .regex(
      /^[a-zA-Z0-9]{6,}$/,
      "password must have at least 6 characters and contain only letters and numbers",
    ),
  // role: z.enum(["USER", "ADMIN"])
});

export const categorySchema = z.object({
  name: z.string().min(1)
})