/**
 * @author seancabalse
 * @email seancabalse.dev@gmail.com
 * @create date 2023-11-22 08:08:50
 * @modify date 2023-11-22 08:08:50
 * @desc This file houses the code for the Login page of the application
 */
import { useNavigate } from 'react-router-dom';
import useTogglePassword from '@hooks/useTogglePassword';
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from 'react-redux';
import { RootState } from '@hooks/state/store';
import { validateAuth } from '@utils/auth';
import { useSignedInUser, ISignedInUserContext } from '@context/SignedInUser';
import { useValidation } from "@hooks/useValidation"

function LoginPage() {
  const navigate = useNavigate();
  const { showPassword, setShowPassword, buttonText, inputType } = useTogglePassword()
  const users = useSelector((state : RootState) => state.user);
  const { validation, setValidation } = useValidation()
  
  const { setIsSignedIn, setUserData } = useSignedInUser() as ISignedInUserContext;
  
  
  const formik = useFormik({
    initialValues: {
      branchId: "",
      username: "",
      password: "",  
    },

    validationSchema: yup.object({
      username: yup
        .string()
        .matches(/^[A-Za-z0-9]+$/, 'Username should only contain letters and numbers')
        .required('Username is required'),
    
      branchId: yup
        .string()
        .matches(/^[A-Za-z0-9]+$/, 'Branch ID should only contain letters and numbers')
        .required('Branch ID is required'),
    
      password: yup
        .string()
        .min(8, 'Password should be at least 8 characters')
        .matches(/^[A-Za-z0-9]+$/, 'Password should only contain letters and numbers')
        .matches(/[0-9]/, 'Password should contain at least 1 digit')
        .required('Password is required'),
    }),

    onSubmit: async (values) => {
        
      // Simulates a mock call and to avoid synchronously navigating
      await  new Promise((resolve) => setTimeout(resolve, 500));
      const { valid, message, data } = validateAuth({ values, users});
      
      if (valid) {
        setIsSignedIn(true);
        setUserData(data);
        navigate('/dashboard');
      }
      
      // Sets the state of where the user is validated or not
      setValidation({
        valid,
        message
      });
      
      await  new Promise((resolve) => setTimeout(resolve, 3000));
      setValidation({
        valid: true,
        message
      });
      
      
      
      
    
    },
  });
  
  return (
    <div className='flex justify-center items-center h-screen flex-col overflow-x-auto'>
      {/* Login page header */}
      <h1 className="text-3xl font-bold m-10">Login Page</h1>
      
      {/* Login Form */}
      <form data-testid="login-form" className="p-10 flex flex-col border-2 border-black w-3/5 rounded-md gap-5 max-w-[600px] min-w-[400px]"
        onSubmit={formik.handleSubmit}>
          
        {/* Branch ID input field */}
        <input className="p-2 border-2 border-black rounded-sm placeholder-gray-500"
          data-testid="branchId-input"
          id="branchId" name="branchId" type="text" placeholder='Branch ID'
          onChange={formik.handleChange}
          value={formik.values.branchId}
          onBlur={formik.handleBlur}
          />
        <label
          data-testid="branchId-label"
          className={`block p-1 text-xs font-bold  ${
            formik.touched.branchId && formik.errors.branchId ? "text-red-400" : "hidden"
          }`}
          htmlFor="branchId"
        >
          {formik.touched.branchId && formik.errors.branchId
            ? formik.errors.branchId
            : ""}
        </label>
        
        {/* Username input field */}
        <input className="p-2 border-2 border-black rounded-sm placeholder-gray-500"
          data-testid="username-input"
          id="username" name="username" type="text" placeholder='Username' 
          onChange={formik.handleChange}
          value={formik.values.username}
          onBlur={formik.handleBlur}
          />
          
        <label
          data-testid="username-label"
          className={`block p-1 text-xs font-bold  ${
            formik.touched.username && formik.errors.username ? "text-red-400" : "hidden"
          }`}
          htmlFor="username"
          >
          {formik.touched.username && formik.errors.username
            ? formik.errors.username
            : ""}
        </label>
        
        
        {/* Password and show/hid button contianer */}
        <div className='flex flex-row'>
          {/* Password input field */}
          <input className="p-2 border-2 border-black rounded-sm placeholder-gray-500 w-4/5"
            data-testid="password-input"
            id="password" name="password" type={inputType} placeholder='Password'
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            />
          {/* Show/hide password button */}
          <button className="border-2 border-black rounded-sm h-full w-1/5"
            data-testid="show-password-button"
            onClick={() =>  setShowPassword(!showPassword)}
            type="button"
            >{buttonText}</button>
        </div>
        <label
          data-testid="password-label"
          className={`block p-1 text-xs font-bold  ${
            formik.touched.password && formik.errors.password ? "text-red-400" : "hidden"
          }`}
          htmlFor="password"
          >
          {formik.touched.password && formik.errors.password
            ? formik.errors.password
            : ""}
        </label>
        
        {/* Error message */}
        <div 
          data-testid="error-message" 
          className={`p-2 bg-red-300 border-1 border-red-500 text-sm text-red-700 flex items-center justify-center ${(!validation.valid) ? "hidden" : "" }`}>
          {/* Error field */}
          Error: {validation.message}
        </div>
        <button data-testid="login-submit-button" className='border-2 border-black rounded-sm p-3' type="submit">Submit</button>
      </form>
      
      
    </div>
  )
}

export default LoginPage