export const getCurrentDate = (): string => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Meses começam do zero
  const year = now.getFullYear();
  return `${day}-${month}-${year}`;
};