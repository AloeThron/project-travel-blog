import { StringValidation } from "zod";

export type userTypes = {
  id: StringValidation;
  name: string | null;
  email: string | null;
  emailVerified: Date | string | null;
  image: string | null;
  password: String;
} | null;

// export type userTypes = {
//   id: StringValidation;
//   name: string | null;
//   email: string | null;
//   emailVerified: Date | string | null;
//   image: string | null;
//   password: String;
// } | null;