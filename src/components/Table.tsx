/**
 * @author seancabalse
 * @email seancabalse.dev@gmail.com
 * @create date 2023-11-22 08:09:50
 * @modify date 2023-11-22 08:09:50
 * @desc This file houses the code for the table to be rendered in the 
 * dashboard component
 */

import React from 'react';
import { initialUsers } from '@data/users';
import { generateFullName } from '@utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@hooks/state/store';
import { deleteUser } from '@hooks/state/users/usersSlice';

function Table() {
  const users = useSelector((state : RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Branch ID</th>
            <th>Username</th>
            <th>Name</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{user.branchId}</td>
            <td>{user.userName}</td>
            <td>{generateFullName(user.firstName, user.middleName, user.lastName)}</td>
            <td>{user.position}</td>
            <td>
              <button onClick={() => dispatch(deleteUser(user.id))}>Remove</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table