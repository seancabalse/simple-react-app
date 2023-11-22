/**
 * @author seancabalse
 * @email seancabalse.dev@gmail.com
 * @create date 2023-11-22 10:37:18
 * @modify date 2023-11-22 10:37:18
 * @desc This file houses the different utitlity functions for the
 * application
 */

import { validateAuth, checkIfPasswordExists, checkIfUsernameExists } from "./auth";


const generateFullName = (firstName: string, 
  middleName: string, 
  lastName: string): string => {
  
  // Extract the first character of the middle name as the initial
  const middleInitial = middleName ? middleName.charAt(0) + ". " : "";

  // Concatenate the components to form the full name
  const fullName = `${firstName} ${middleInitial}${lastName}`;

  return fullName.trim(); // Trim to remove any leading/trailing whitespaces
}

export {
  validateAuth,
  checkIfPasswordExists,
  checkIfUsernameExists,
  generateFullName
}