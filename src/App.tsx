/**
 * @author seancabalse
 * @email seancabalse.dev@gmail.com
 * @create date 2023-11-22 08:09:07
 * @modify date 2023-11-22 08:09:07
 * @desc This file houses the code for the root app component of the
 * application
 */

import { AppRoutes } from "./routes"
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "@hooks/state/store";


function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
