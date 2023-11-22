/**
 * @author seancabalse
 * @email seancabalse.dev@gmail.com
 * @create date 2023-11-22 09:40:19
 * @modify date 2023-11-22 09:40:19
 * @desc This file houses the hook that allows user to toggle the
 * password view
 */
import { useState } from 'react'

const useTogglePassword = () => {
  
  const [showPassword, setShowPassword] = useState(false);
  
  const buttonText = showPassword? "Hide" : "Show";
  const inputType = showPassword? "text" : "password";
  
  return {
    showPassword, 
    setShowPassword, 
    buttonText, 
    inputType
  }
}

export default useTogglePassword