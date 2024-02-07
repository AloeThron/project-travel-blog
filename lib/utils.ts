import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateTime: string) => {
  const dateObj = new Date(dateTime);

  const date = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  return `${date}-${month}-${year}`;
};

export function convertFileToUrl(file: File) {
  return URL.createObjectURL(file);
}