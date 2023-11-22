/**
 * @author seancabalse
 * @email seancabalse.dev@gmail.com
 * @create date 2023-11-22 10:30:11
 * @modify date 2023-11-22 10:30:11
 * @desc [description]
 */

export interface User {
  branchId: string;
  userName: string;
  password: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  position: string;
}