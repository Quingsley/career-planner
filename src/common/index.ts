export * from "./types";
export * from "./unis";
export * from "./career-interest";
export * from "./skills";

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// function to generate years from now to 30 years ago
export function generateYears() {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= currentYear - 30; year--) {
    years.push(year);
  }
  return years;
}
