/**
 * @author seancabalse
 * @email seancabalse.dev@gmail.com
 * @create date 2023-11-22 10:26:41
 * @modify date 2023-11-22 10:26:41
 * @desc This file is created to house the code for validation of the 
 * user login
 */
import { User } from "../models/user.model";


/**
 * This function checks if the the username exists and if the branch Id 
 * and password of the user matches the database.
 * @param { values, users } - The values parameter from the login form;
 * While the users parameter is an array of objects of type User,
 * @returns 
 */
const validateAuth = ({ values, users }) => {
  const { username, password, branchId } = values;
  const user = users.find((u: User) => u.userName === username);

  if (!user) {
    return {
      valid: false,
      message: "User does not exist"
    };
  }

  if (user.password !== password) {
    return {
      valid: false,
      message: "Incorrect password"
    };
  }
  
  if (String(user.branchId) !== branchId) {
    return {
      valid: false,
      message: "Incorrect branchId"
    };
  }
  
  return {
    valid: true,
    message: "",
    data: user
  };
}

/**
 * This function checks if the password is already used
 * @param password - The password entered by the user
 * @param users - The array of users in the database
 * @returns Object with valid (boolean) and message properties
 */
const checkIfPasswordExists = (password: string, users: User[]) => {
  const user = users.find((u: User) => u.password === password);

  if (!user) {
    return {
      valid: true,
      message: ""
    };
  }

  return {
    valid: false,
    message: "Password is already used.",
  };
}

/**
 * This function checks if the username is already taken
 * @param username - The username entered by the user
 * @param users - The array of users in the database
 * @returns Object with valid (boolean) and message properties
 */
const checkIfUsernameExists = (username: string, users: User[]) => {
  const user = users.find((u: User) => u.userName === username);

  if (!user) {
    return {
      valid: true,
      message: ""
    };
  }

  return {
    valid: false,
    message: "Usrename is already used.",
  };
}


export {
  validateAuth,
  checkIfPasswordExists,
  checkIfUsernameExists,
}