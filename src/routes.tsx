import React from "react";
import { Route, Routes } from 'react-router-dom';


// Maintenance page
const LogInPage = React.lazy(() => 
  import('@pages/Login')
);

// Dashboard page
const Dashboard = React.lazy(() => 
  import('@pages/Dashboard')
);


/**
 * This functional component is responsible for maintaining all the
 * routes to the pages of the application
 * @returns JSX element containing all the definitions of all the routes
 * of the page
 */
const AppRoutes  = () => {
  return (
    <Routes>
      <Route path="/" element={<LogInPage/>} />
      <Route path="/dashboard" element={ <Dashboard/> } />
    </Routes>
  )
}

export {
  AppRoutes
};