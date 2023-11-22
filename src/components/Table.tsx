/**
 * @author seancabalse
 * @email seancabalse.dev@gmail.com
 * @create date 2023-11-22 08:09:50
 * @modify date 2023-11-22 08:09:50
 * @desc This file houses the code for the table to be rendered in the 
 * dashboard component
 */

import React from 'react';
import { generateFullName } from '@utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@hooks/state/store';
import { deleteUser } from '@hooks/state/users/usersSlice';
import { useSignedInUser, ISignedInUserContext } from '@context/SignedInUser';

function Table() {
  const users = useSelector((state : RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>()
  const { userData } = useSignedInUser() as ISignedInUserContext;
  
  return (
    <div className="overflow-x-auto w-full">
      <table className='table-auto border w-full min-w-[600px]'>
        <thead className='border'>
          <tr className='p-4'>
            <th className='border'>#</th>
            <th className='border'>Branch ID</th>
            <th className='border'>Username</th>
            <th className='border'>Name</th>
            <th className='border'>Position</th>
            <th className='border'>Action</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td className='border pl-2'>{index + 1}</td>
            <td className='border pl-2'>{user.branchId}</td>
            <td className='border pl-2'>{user.userName}</td>
            <td className='border pl-2'>{generateFullName(user.firstName, user.middleName, user.lastName)}</td>
            <td className='border pl-2'>{user.position}</td>
            <td className='border flex items-center justify-center group relative'>
              <button className={`border-1 py-1 px-4 rounded-md ${(userData?.userName === user.userName) ? `bg-gray-300 text-gray-500` : "border-gray-500 bg-red-300" }`}
                disabled={userData?.userName === user.userName}
                onClick={() => dispatch(deleteUser(index))}>Remove</button>
                
                {
                  (userData?.userName === user.userName) && 
                  (
                  <span className="pointer-events-none absolute -top-7 right-1 w-max rounded bg-gray-900 px-2 py-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100"> 
                    Unable to remove logged in user
                  </span>
                  )
                }
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table