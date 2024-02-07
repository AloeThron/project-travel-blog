// "use server";

// import * as z from "zod";
// import bcrypt from "bcryptjs";

// import { RegisterSchema } from "@/lib/schemas";
// import { db } from "@/lib/database";
// import { getUserByEmail } from "@/data/user";

// export default async function register(values: z.infer<typeof RegisterSchema>) {
//   const validatedFields = RegisterSchema.safeParse(values);

//   if (!validatedFields.success) {
//     return { error: "Invalid fields!" };
//   }

//   const { email, password, name } = validatedFields.data;
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const existingUser = await getUserByEmail(email);

//   if (existingUser) {
//     return { error: "Email already in use!" };
//   }

//   await db.user.create({
//     data: {
//       name,
//       email,
//       password: hashedPassword,
//     },
//   });

//   return { success: "User created!" };
// }
