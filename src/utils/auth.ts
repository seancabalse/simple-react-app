/**
 * @author seancabalse
 * @email seancabalse.dev@gmail.com
 * @create date 2023-11-22 10:26:41
 * @modify date 2023-11-22 10:26:41
 * @desc This file is created to house the code for validation of the 
 * user login
 */
import { User } from "../models/user.model"


const validateAuth = ({ values, users }) => {
  console.log(values);
  console.log(users);
  const { username, password, branchId } = values;
  const user = users.find((u: User) => u.userName === username);
  console.log(user);

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
    message: ""
  };
}

export {
  validateAuth
}