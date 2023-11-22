/**
 * @author seancabalse
 * @email seancabalse.dev@gmail.com
 * @create date 2023-11-22 08:08:27
 * @modify date 2023-11-22 08:08:27
 * @desc This file houses the code for the Dashboard page of the 
 * application
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@components/Table';
import { useSignedInUser, ISignedInUserContext } from '@context/SignedInUser';
import * as yup from "yup";
import { useFormik } from 'formik';
import useTogglePassword from '@hooks/useTogglePassword'
import { AppDispatch, RootState } from '@hooks/state/store';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '@hooks/state/users/usersSlice';
import { checkIfPasswordExists, checkIfUsernameExists } from '@utils/auth';
import { useValidation } from '@hooks/useValidation';

function Dashboard() {
  const users = useSelector((state : RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();
  const { showPassword, setShowPassword, buttonText, inputType } = useTogglePassword()
  const { isSignedIn, userData, setIsSignedIn, setUserData } = useSignedInUser() as ISignedInUserContext;
  const  { validation, setValidation } = useValidation();
  
  // This checks if the user indeed signed in or not
  useEffect(() => {
    if (!isSignedIn) {
      navigate('/');
    }
  }, [isSignedIn, navigate]);
  
  const handleLogout = async () => {
    setIsSignedIn(false);
    setUserData(null);
    
    await  new Promise((resolve) => setTimeout(resolve, 500));
    navigate({
      pathname: `/`
    })
  }
  
  const formik = useFormik({
    initialValues: {
      branchId: "",
      userName: "",
      password: "",  
      firstName: "",
      middleName: "",
      lastName: "",
      position: ""
    },

    validationSchema: yup.object({
      userName: yup
        .string()
        .matches(/^[A-Za-z0-9]+$/, 'Username should only contain letters and numbers')
        .required('Username is required'),
    
      firstName: yup
        .string()
        .matches(/^[A-Za-z]+$/, 'First name should only contain letters')
        .required('First name is required'),
    
      lastName: yup
        .string()
        .matches(/^[A-Za-z]+$/, 'Last name should only contain letters')
        .required('Last name is required'),
    
      middleName: yup
        .string()
        .matches(/^[A-Za-z]+$/, 'Middle name should only contain letters'),
    
      branchId: yup
        .string()
        .matches(/^[A-Za-z0-9]+$/, 'Username should only contain letters and numbers')
        .required('Branch ID is required'),
    
      password: yup
        .string()
        .min(8, 'Password should be at least 8 characters')
        .matches(/[0-9]/, 'Password should contain at least 1 digit')
        .matches(/^[A-Za-z0-9]+$/, 'Password should only contain letters and numbers')
        .required('Password is required'),
    }),

    onSubmit: async (values, { resetForm }) => {
      
      const { valid: validPassword, message: messagePassword } = checkIfPasswordExists(values.password, users);
      const { valid: validUsername, message: messageUsername } = checkIfUsernameExists(values.userName, users);
      // Simulates a mock call and to avoid synchronously navigating
      await  new Promise((resolve) => setTimeout(resolve, 500));
      
      // Checks if the password is valid and updates the validate state
      if (!validPassword) {
        setValidation({
          valid: false,
          message: messagePassword
        });
      }
      
      // Checks if the user name is valid and updates the validate state
      if (!validUsername) {
        setValidation({
          valid: false,
          message: messageUsername
        });
      }
      
      // Proceed only here if the username and password is valid
      if (validPassword && validUsername) {
        dispatch(addUser(values));
        resetForm({ values: {
          branchId: "",
          userName: "",
          password: "",  
          firstName: "",
          middleName: "",
          lastName: "",
          position: ""
          }
        })
      }
      
      await  new Promise((resolve) => setTimeout(resolve, 3000));
      setValidation({
        valid: true,
        message: ""
      });
      
    },
  });
  
  return (
    <div className='p-10'>
      {/* Dashboard header */}
      <div className="flex justify-between py-10">
        {/* userName */}
        <h1 className="text-3xl font-bold">{userData?.userName}</h1>
        {/* Logout button */}
        <button 
          className='w-36 border bg-blue-400 border-blue-600 text-blue-950 rounded-sm p-3'
          onClick={() => handleLogout()}>Logout</button>
      </div>
      <div className='flex md:flex-row flex-col gap-2'>
        {/* Add user form */}
        <form className="p-10 flex flex-col border-2 border-black w-full md:w-2/6 min-w-[500px] rounded-md gap-5"
          onSubmit={formik.handleSubmit}>
          
          {/* Branch ID input field */}
          <input className="p-2 border-2 border-black rounded-sm placeholder-gray-500"
            id="branchId" name="branchId" type="text" placeholder='Branch ID'
            onChange={formik.handleChange}
            value={formik.values.branchId}
            onBlur={formik.handleBlur}
            />
          <label
            className={`block p-1 text-xs font-bold  ${
              formik.touched.branchId && formik.errors.branchId ? "text-red-400" : "hidden"
            }`}
            htmlFor="branchId"
          >
            {formik.touched.branchId && formik.errors.branchId
              ? formik.errors.branchId
              : ""}
          </label>
          
          {/* userName input field */}
          <input className="p-2 border-2 border-black rounded-sm placeholder-gray-500"
            id="userName" name="userName" type="text" placeholder='Username' 
            onChange={formik.handleChange}
            value={formik.values.userName}
            onBlur={formik.handleBlur}
            />
            
          <label
            className={`block p-1 text-xs font-bold  ${
              formik.touched.userName && formik.errors.userName ? "text-red-400" : "hidden"
            }`}
            htmlFor="userName"
            >
            {formik.touched.userName && formik.errors.userName
              ? formik.errors.userName
              : ""}
          </label>
          
          {/* firstName input field */}
          <input className="p-2 border-2 border-black rounded-sm placeholder-gray-500"
            id="firstName" name="firstName" type="text" placeholder='First name' 
            onChange={formik.handleChange}
            value={formik.values.firstName}
            onBlur={formik.handleBlur}
            />
            
          <label
            className={`block p-1 text-xs font-bold  ${
              formik.touched.firstName && formik.errors.firstName ? "text-red-400" : "hidden"
            }`}
            htmlFor="userName"
            >
            {formik.touched.firstName && formik.errors.firstName
              ? formik.errors.firstName
              : ""}
          </label>
          
          {/* middleName input field */}
          <input className="p-2 border-2 border-black rounded-sm placeholder-gray-500"
            id="middleName" name="middleName" type="text" placeholder='Middle name' 
            onChange={formik.handleChange}
            value={formik.values.middleName}
            onBlur={formik.handleBlur}
            />
            
          <label
            className={`block p-1 text-xs font-bold  ${
              formik.touched.middleName && formik.errors.middleName ? "text-red-400" : "hidden"
            }`}
            htmlFor="userName"
            >
            {formik.touched.middleName && formik.errors.middleName
              ? formik.errors.middleName
              : ""}
          </label>
          
          {/* lastName input field */}
          <input className="p-2 border-2 border-black rounded-sm placeholder-gray-500"
            id="lastName" name="lastName" type="text" placeholder='Last name' 
            onChange={formik.handleChange}
            value={formik.values.lastName}
            onBlur={formik.handleBlur}
            />
            
          <label
            className={`block p-1 text-xs font-bold  ${
              formik.touched.lastName && formik.errors.lastName ? "text-red-400" : "hidden"
            }`}
            htmlFor="userName"
            >
            {formik.touched.lastName && formik.errors.lastName
              ? formik.errors.lastName
              : ""}
          </label>
          
          {/* Position input field */}
          <input className="p-2 border-2 border-black rounded-sm placeholder-gray-500"
            id="position" name="position" type="text" placeholder='Position' 
            onChange={formik.handleChange}
            value={formik.values.position}
            onBlur={formik.handleBlur}
            />
            
          <label
            className={`block p-1 text-xs font-bold  ${
              formik.touched.position && formik.errors.position ? "text-red-400" : "hidden"
            }`}
            htmlFor="userName"
            >
            {formik.touched.position && formik.errors.position
              ? formik.errors.position
              : ""}
          </label>
          
          
          {/* Password and show/hid button contianer */}
          <div className='flex flex-row'>
            {/* Password input field */}
            <input className="p-2 border-2 border-black rounded-sm placeholder-gray-500 w-4/5"
              id="password" name="password" type={inputType} placeholder='Password'
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              />
            {/* Show/hide password button */}
            <button className="border-2 border-black rounded-sm w-1/5"
              onClick={() =>  setShowPassword(!showPassword)}
              type="button"
              >{buttonText}</button>
          </div>
          <label
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
          <div className={`p-2 bg-red-300 border-1 border-red-500 text-sm text-red-700 flex items-center justify-center ${(!validation.valid) ? "hidden" : "" }`}>
            {/* Error field */}
            Error: {validation.message}
          </div>
          
          {/* Reset and Add button */}
          
          <div className="flex flex-row gap-2">
            <button className="w-3/6 border border-black rounded-xl"
              onClick={() => {
                formik.resetForm();
                setShowPassword(false);
              }}
              type="reset"
              >Reset</button>
            <button className="w-3/6 border rounded-xl bg-blue-400 border-blue-600 text-blue-950"
              type="submit"
              >Add</button>
          
          </div>
          
        </form>
        
        
        
        <Table />
      </div>
      
      
      
    </div>
  )
}

export default Dashboard