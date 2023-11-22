import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  fireEvent,
  render,
  screen,
  cleanup,
  waitFor,
} from "@testing-library/react/pure";
import userEvent from '@testing-library/user-event';
import { act } from "react-dom/test-utils";
import { Provider } from 'react-redux';
import { store } from '../../../src/hooks/state/store';
import { BrowserRouter } from 'react-router-dom';
import { SignedInUserProvider } from '../../../src/context/SignedInUser';
import Dashboard from '../../../src/pages/Dashboard';
import * as utilsExports from "../../../src/utils"
import { SignedInUserProvider, useSignedInUser } from '../../../src/context/SignedInUser';
import { renderHook } from '@testing-library/react-hooks'

describe('Dashboard Page', () => {
  const origLocation = window.location;

  beforeEach(() => {
    // Reset all cached modules before executing each test case
    vi.resetModules();

    const component = render(
      <Provider store={store}>
        <BrowserRouter>
        <SignedInUserProvider>
          <Dashboard />
        </SignedInUserProvider>
        </BrowserRouter>
      </Provider>
    );
  });

   // Resets the state of all mocks after executing each test case
   afterEach(() => {
      window.location = origLocation;
      cleanup();
      vi.resetAllMocks();
   });
  
   describe('Dashboard Page Elements', () => {
    
    it('Should render a header with the signed in username`', () => {
      
      screen.debug()
    });
  });
});