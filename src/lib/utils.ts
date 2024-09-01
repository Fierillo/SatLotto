import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/*/ Utility function to check if the selected number matches the lucky number
export const isMatch = (selectedNumber: number | null, luckyNumber: number | null): boolean => {
  return selectedNumber === luckyNumber;
};*/