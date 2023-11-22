/**
 * @author seancabalse
 * @email seancabalse.dev@gmail.com
 * @create date 2023-11-22 08:08:50
 * @modify date 2023-11-22 08:08:50
 * @desc This file houses the code for the Login page of the application
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { useFormik } from "formik";
// import * as Yup from "yup";

function LoginPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <label htmlFor="branch-id">Branch ID</label>
        <input id="branch-id" name="branch-id" type="text" />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
        
      </form>
      
      <button type="submit" onClick={() => {
              navigate({
                pathname: `/dashboard`
              })
            }}>Submit</button>
    </div>
  )
}

export default LoginPage