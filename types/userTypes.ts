import { StringValidation } from "zod";

export type userTypes = {
  id: String | null;
  name: string | null;
  email: string | null;
  emailVerified: Date | string | null;
  image: string | null;
  password: String | null;
} | null;

// export type userTypes = {
//   id: StringValidation;
//   name: string | null;
//   email: string | null;
//   emailVerified: Date | string | null;
//   image: string | null;
//   password: String;
// } | null;