export const generateFullName = (firstName: string, 
  middleName: string, 
  lastName: string): string => {
  
  // Extract the first character of the middle name as the initial
  const middleInitial = middleName ? middleName.charAt(0) + ". " : "";

  // Concatenate the components to form the full name
  const fullName = `${firstName} ${middleInitial}${lastName}`;

  return fullName.trim(); // Trim to remove any leading/trailing whitespaces
}