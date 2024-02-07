// "use client";

// import { useState, useTransition } from "react";

// import * as z from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { RegisterSchema } from "@/lib/schemas";
// import { Input } from "@/components/ui/input";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import CardWrapper from "@/components/auth/card-wrapper";
// import { Button } from "@/components/ui/button";
// import register from "@/app/actions/register";

// type Props = {};

// export default function RegisterForm({}: Props) {
//   const [error, setError] = useState<string | undefined>("");
//   const [success, setSuccess] = useState<string | undefined>("");
//   const [isPending, startTransition] = useTransition();

//   const form = useForm<z.infer<typeof RegisterSchema>>({
//     resolver: zodResolver(RegisterSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//       name: "",
//     },
//   });

//   const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
//     setError("");
//     setSuccess("");

//     startTransition(() => {
//       register(values).then((data) => {
//         setError(data.error);
//         setSuccess(data.success);
//       });
//     });
//   };

//   return (
//     <div className="h-full flex items-center justify-center">
//       <CardWrapper
//         headerLabel="Create an account"
//         backButtonLabel="Already have an account?"
//         backButtonHref="/login"
//         showSocial
//       >
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <div className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Name</FormLabel>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         disabled={isPending}
//                         placeholder="example"
//                         type="name"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         disabled={isPending}
//                         placeholder="example@example.com"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         disabled={isPending}
//                         placeholder="********"
//                         type="password"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <Button disabled={isPending} type="submit" className="w-full">
//               Create an account
//             </Button>
//           </form>
//         </Form>
//       </CardWrapper>
//     </div>
//   );
// }
