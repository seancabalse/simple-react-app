/**
 * @author seancabalse
 * @email seancabalse.dev@gmail.com
 * @create date 2023-11-22 16:11:47
 * @modify date 2023-11-22 16:11:47
 * @desc This file houses the custom useValidation hook
 */

import { useState } from "react";
import { User } from "@models/user.model";

interface IValidationResponse {
  valid: boolean;
  message: string | null | undefined;
  data?: User
}

const useValidation = () => {
  const [validation, setValidation] = useState({} as IValidationResponse);
  
  return {
    validation,
    setValidation,
  };
}

export { 
  useValidation
};
