/**
 * @author seancabalse
 * @email seancabalse.dev@gmail.com
 * @create date 2023-11-22 08:08:27
 * @modify date 2023-11-22 08:08:27
 * @desc This file houses the code for the Dashboard page of the 
 * application
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@components/Table';

function Dashboard() {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => {
              navigate({
                pathname: `/`
              })
            }}>Logout</button>
      <form>
        <label htmlFor="branch-id">Branch ID</label>
        <input id="branch-id" name="branch-id" type="text" />
        
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" />
        
        <label htmlFor="first-name">First name</label>
        <input id="first-name" name="first-name" type="text" />
        
        <label htmlFor="middle-name">Middle name</label>
        <input id="middle-name" name="middle-name" type="text" />
        
        <label htmlFor="last-name">Last name</label>
        <input id="last-name" name="last-name" type="text" />
        
        <label htmlFor="position">Position</label>
        <input id="position" name="position" type="text" />
        
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" /> 
      </form>
      
      <button onClick={() => {
              navigate({
                pathname: `/dashboard`
              })
            }}>Reset</button>
            
      <button onClick={() => {
        navigate({
          pathname: `/dashboard`
        })
      }}>Add</button>
      
      <Table />
    </div>
  )
}

export default Dashboard