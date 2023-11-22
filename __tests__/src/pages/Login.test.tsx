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
import LogInPage from '../../../src/pages/Login';
import * as utilsExports from "../../../src/utils"

describe('Login Page', () => {
  const origLocation = window.location;

  beforeEach(() => {
    // Reset all cached modules before executing each test case
    vi.resetModules();

    const component = render(
      <Provider store={store}>
        <BrowserRouter>
        <SignedInUserProvider>
          <LogInPage />
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
  
   describe('LogIn Page Elements', () => {
    
    it('Should render a login form with test id `login-form`', () => {

      const loginForm = screen.queryByTestId('login-form')
      expect(loginForm).toBeInTheDocument();
      
      
    });
    
    it('Should an input field for the Branch ID`', () => {
      
      const branchIdInput = screen.getByTestId('branchId-input');
      expect(branchIdInput).toBeInTheDocument();
      
    })
    
    it('Should an input field for the Username`', () => {
      
      const usernameInput = screen.getByTestId('username-input');
      expect(usernameInput).toBeInTheDocument();
      
    })
    
    it('Should an input field for the Password and show/hide button`', () => {
      
      const passwordInput = screen.getByTestId('password-input');
      expect(passwordInput).toBeInTheDocument();
      
      const passwordButton = screen.getByTestId('show-password-button');
      expect(passwordButton).toBeInTheDocument();
    })
   })
   
   describe('LogIn Page Form Validation', () => {
    
    it('Click show/hide button show change password input type and text', async () => {
      
      const passwordInput = screen.getByTestId('password-input');
      const passwordButton = screen.getByTestId('show-password-button');
      
      await act(() => fireEvent.click(passwordButton));
      
      expect(passwordInput).toHaveAttribute('type', 'text');
      expect(passwordButton).toHaveTextContent('Hide');
    })
    
    it('Should show password, branchId, username shoudl be required', async () => {
      
      
      // Find and click the submit button
      const submitButton = screen.getByTestId('login-submit-button');
      await act(() => userEvent.click(submitButton))
      
      await waitFor(() => {
        const branchIdLabel = screen.getByTestId('branchId-label');
        expect(branchIdLabel).toHaveTextContent('Branch ID is required');
        
        const usernameLabel = screen.getByTestId('username-label');
        expect(usernameLabel).toHaveTextContent('Username is required');
        
        const passwordLabel = screen.getByTestId('password-label');
        expect(passwordLabel).toHaveTextContent('Password is required');
      })
    })
    
    it('Should show branch Id error if special characters are input', async () => {
      const user = userEvent.setup()
      const branchIdInput = screen.getByTestId('branchId-input');
      await user.type(branchIdInput, "#%^");
      
      // Find and click the submit button
      const submitButton = screen.getByTestId('login-submit-button');
      await act(() => userEvent.click(submitButton))
      
      await waitFor(() => {
        const branchIdLabel = screen.getByTestId('branchId-label');
        expect(branchIdLabel).toHaveTextContent('Branch ID should only contain letters and numbers');
      })
    })
    
    it('Should show username error if special characters are input', async () => {
      const user = userEvent.setup()
      const usernameInput = screen.getByTestId('username-input');
      await user.type(usernameInput, "#%^");
      
      // Find and click the submit button
      const submitButton = screen.getByTestId('login-submit-button');
      await act(() => userEvent.click(submitButton))
      
      await waitFor(() => {
        const usernameLabel = screen.getByTestId('username-label');
        expect(usernameLabel).toHaveTextContent('Username should only contain letters and numbers');
      })
    })
    
    it('Should show password error if special characters are input', async () => {
      const user = userEvent.setup()
      const passwordInput = screen.getByTestId('password-input');
      await user.type(passwordInput, "#%^FAFADFADF");
      
      // Find and click the submit button
      const submitButton = screen.getByTestId('login-submit-button');
      await act(() => userEvent.click(submitButton))
      
      await waitFor(() => {
        const passwordLabel = screen.getByTestId('password-label');
        expect(passwordLabel).toHaveTextContent('Password should only contain letters and numbers');
      })
    })
    
    it('Should show password error if input is less that 8 characters', async () => {
      const user = userEvent.setup()
      const passwordInput = screen.getByTestId('password-input');
      await user.type(passwordInput, "pass");
      
      // Find and click the submit button
      const submitButton = screen.getByTestId('login-submit-button');
      await act(() => userEvent.click(submitButton))
      
      await waitFor(() => {
        const passwordLabel = screen.getByTestId('password-label');
        expect(passwordLabel).toHaveTextContent('Password should be at least 8 characters');
      })
    })
    
    it('Should show password error if input does not contain at least 1 digit', async () => {
      const user = userEvent.setup()
      const passwordInput = screen.getByTestId('password-input');
      await user.type(passwordInput, "password");
      
      // Find and click the submit button
      const submitButton = screen.getByTestId('login-submit-button');
      await act(() => userEvent.click(submitButton))
      
      await waitFor(() => {
        const passwordLabel = screen.getByTestId('password-label');
        expect(passwordLabel).toHaveTextContent('Password should contain at least 1 digit');
      })
   })
   
    it('Should show error message if credentials are not correct', async () => {
      const user = userEvent.setup()
      // Arrange
      /* const utils = await import('../../../src/utils')
      const validateAuthMock = utils.validateAuth;
      validateAuthMock.mockReturnValue({
        valid: true,
        message: 'Validation successful',
        data: {},
      }); */
      
      // Enter valid password
      const passwordInput = screen.getByTestId('password-input');
      await user.type(passwordInput, "pa55w0rd001");
      
      // Enter valid username
      const usernameInput = screen.getByTestId('username-input');
      await user.type(usernameInput, "testuser01");
      
      // Enter valid branchId
      const branchIdInput = screen.getByTestId('branchId-input');
      await user.type(branchIdInput, "10001");
      
      // Find and click the submit button
      const submitButton = screen.getByTestId('login-submit-button');
      await act(() => userEvent.click(submitButton))
      
      
      vi.spyOn(utilsExports, 'validateAuth').mockImplementationOnce(
        () => ({
          valid: false,
          message: 'Validation successful',
          data: {},
        })
      )
      
      await waitFor(() => {
        const errorMessage = screen.getByTestId('error-message');
        expect(errorMessage).toHaveTextContent('Error:');
      })
    })
   
  });
});