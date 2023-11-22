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
  
   describe('Add new user form', () => {
    
    it('Should render an add-new-user form with test id `login-form`', () => {

      const addNewUserForm = screen.queryByTestId('add-new-user-form')
      expect(addNewUserForm).toBeInTheDocument();
      
      
    });
    
    it('Should an input field for the Branch ID`', () => {
      
      const branchIdInput = screen.getByTestId('branchId-input');
      expect(branchIdInput).toBeInTheDocument();
      
    })
    
    it('Should an input field for the Username`', () => {
      
      const usernameInput = screen.getByTestId('username-input');
      expect(usernameInput).toBeInTheDocument();
      
    })
    
    it('Should an input field for the first name`', () => {
      
      const firstnameInput = screen.getByTestId('firstname-input');
      expect(firstnameInput).toBeInTheDocument();
      
    })
    
    it('Should an input field for the first name`', () => {
      
      const middlenameInput = screen.getByTestId('middlename-input');
      expect(middlenameInput).toBeInTheDocument();
      
    })
    
    it('Should an input field for the first name`', () => {
      
      const lastnameInput = screen.getByTestId('lastname-input');
      expect(lastnameInput).toBeInTheDocument();
      
    })
    
    it('Should an input field for the first name`', () => {
      
      const positionInput = screen.getByTestId('position-input');
      expect(positionInput).toBeInTheDocument();
      
    })
    
    it('Should an input field for the Password and show/hide button`', () => {
      
      const passwordInput = screen.getByTestId('password-input');
      expect(passwordInput).toBeInTheDocument();
      
      const passwordButton = screen.getByTestId('show-password-button');
      expect(passwordButton).toBeInTheDocument();
    })
   })
   
   describe('Add new user form Validation', () => {
    
    it('Click show/hide button show change password input type and text', async () => {
      
      const passwordInput = screen.getByTestId('password-input');
      const passwordButton = screen.getByTestId('show-password-button');
      
      await act(() => fireEvent.click(passwordButton));
      
      expect(passwordInput).toHaveAttribute('type', 'text');
      expect(passwordButton).toHaveTextContent('Hide');
    })
    
    it('Should show all fields except middlename should be required', async () => {
      
      
      // Find and click the submit button
      const submitButton = screen.getByTestId('add-user-button');
      await act(() => userEvent.click(submitButton))
      
      await waitFor(() => {
        const branchIdLabel = screen.getByTestId('branchId-label');
        expect(branchIdLabel).toHaveTextContent('Branch ID is required');
        
        const usernameLabel = screen.getByTestId('username-label');
        expect(usernameLabel).toHaveTextContent('Username is required');
        
        const passwordLabel = screen.getByTestId('password-label');
        expect(passwordLabel).toHaveTextContent('Password is required');
        
        const firstnameLabel = screen.getByTestId('firstname-label');
        expect(firstnameLabel).toHaveTextContent('First name is required');
        
        const positionLabel = screen.getByTestId('position-label');
        expect(positionLabel).toHaveTextContent('Position is required');
        
        const lastnameLabel = screen.getByTestId('lastname-label');
        expect(lastnameLabel).toHaveTextContent('Last name is required');
      })
    })
    
    it('Should show branch Id error if special characters are input', async () => {
      const user = userEvent.setup()
      const branchIdInput = screen.getByTestId('branchId-input');
      await user.type(branchIdInput, "#%^");
      
      // Find and click the submit button
      const submitButton = screen.getByTestId('add-user-button');
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
      const submitButton = screen.getByTestId('add-user-button');
      await act(() => userEvent.click(submitButton))
      
      await waitFor(() => {
        const usernameLabel = screen.getByTestId('username-label');
        expect(usernameLabel).toHaveTextContent('Username should only contain letters and numbers');
      })
    })
    
    it('Should show password error if special characters are input', async () => {
      const user = userEvent.setup()
      const passwordInput = screen.getByTestId('password-input');
      await user.type(passwordInput, "#%^FAFADF8DF");
      
      // Find and click the submit button
      const submitButton = screen.getByTestId('add-user-button');
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
      const submitButton = screen.getByTestId('add-user-button');
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
      const submitButton = screen.getByTestId('add-user-button');
      await act(() => userEvent.click(submitButton))
      
      await waitFor(() => {
        const passwordLabel = screen.getByTestId('password-label');
        expect(passwordLabel).toHaveTextContent('Password should contain at least 1 digit');
      })
   })
   
   it('Should show firstname error if special characters are input', async () => {
    const user = userEvent.setup()
    const firstnameInput = screen.getByTestId('firstname-input');
    await user.type(firstnameInput, "#%^");
    
    // Find and click the submit button
    const submitButton = screen.getByTestId('add-user-button');
    await act(() => userEvent.click(submitButton))
    
    await waitFor(() => {
      const firstnameLabel = screen.getByTestId('firstname-label');
      expect(firstnameLabel).toHaveTextContent('First name should only contain letters');
    })
  })
  
  it('Should show lastname error if special characters are input', async () => {
    const user = userEvent.setup()
    const lastnameInput = screen.getByTestId('lastname-input');
    await user.type(lastnameInput, "#%^");
    
    // Find and click the submit button
    const submitButton = screen.getByTestId('add-user-button');
    await act(() => userEvent.click(submitButton))
    
    await waitFor(() => {
      const lastnameLabel = screen.getByTestId('lastname-label');
      expect(lastnameLabel).toHaveTextContent('Last name should only contain letters');
    })
  })
  
  it('Should show middlename error if special characters are input', async () => {
    const user = userEvent.setup()
    const middlenameInput = screen.getByTestId('middlename-input');
    await user.type(middlenameInput, "#%^");
    
    // Find and click the submit button
    const submitButton = screen.getByTestId('add-user-button');
    await act(() => userEvent.click(submitButton))
    
    await waitFor(() => {
      const middlenameLabel = screen.getByTestId('middlename-label');
      expect(middlenameLabel).toHaveTextContent('Middle name should only contain letters');
    })
  })
   
   
  });
  
  describe('Add new user form actions', () => {
    
    it('Should reset the entire form when reset button is clicked', async () => {
      // User type to all fields
      const user = userEvent.setup()
      const branchIdInput = screen.getByTestId('branchId-input');
      const usernameInput = screen.getByTestId('username-input');
      const passwordInput = screen.getByTestId('password-input');
      const firstnameInput = screen.getByTestId('firstname-input');
      const middlenameInput = screen.getByTestId('middlename-input');
      const lastnameInput = screen.getByTestId('lastname-input');
      const positionInput = screen.getByTestId('position-input');
      
      await user.type(branchIdInput, "123");
      await user.type(usernameInput, "username");
      await user.type(passwordInput, "pa55w0rd");
      await user.type(firstnameInput, "firstname");
      await user.type(middlenameInput, "middlename");
      await user.type(lastnameInput, "lastname");
      await user.type(positionInput, "position");
      
      // Find and click the reset button
      const resetButton = screen.getByTestId('reset-button');
      await act(() => userEvent.click(resetButton))
      
      waitFor(() => {
        // Check if all fields are reset
        const branchIdInput = screen.getByTestId('branchId-input');
        const usernameInput = screen.getByTestId('username-input');
        const passwordInput = screen.getByTestId('password-input');
        const firstnameInput = screen.getByTestId('firstname-input');
        const middlenameInput = screen.getByTestId('middlename-input');
        const lastnameInput = screen.getByTestId('lastname-input');
        const positionInput = screen.getByTestId('position-input');
        
        expect(branchIdInput).toHaveValue('');
        expect(usernameInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');
        expect(firstnameInput).toHaveValue('');
        expect(middlenameInput).toHaveValue('');
        expect(lastnameInput).toHaveValue('');
        expect(positionInput).toHaveValue('');
      })
    })
    
    it('Should submit the form when submit button is clicked', async () => {
      // User type to all fields
      const user = userEvent.setup();
      const branchIdInput = screen.getByTestId('branchId-input');
      const usernameInput = screen.getByTestId('username-input');
      const passwordInput = screen.getByTestId('password-input');
      const firstnameInput = screen.getByTestId('firstname-input');
      const middlenameInput = screen.getByTestId('middlename-input');
      const lastnameInput = screen.getByTestId('lastname-input');
      const positionInput = screen.getByTestId('position-input');
      
      await user.type(branchIdInput, "123");
      await user.type(usernameInput, "username");
      await user.type(passwordInput, "pa55w0rd0023");
      await user.type(firstnameInput, "firstname1");
      await user.type(middlenameInput, "middlename1");
      await user.type(lastnameInput, "lastname1");
      await user.type(positionInput, "position1");
      
      // Find and click the submit button
      const submitButton = screen.getByTestId('add-user-button');
      await act(() => userEvent.click(submitButton))
      
      waitFor(() => {
        // Check if all fields are reset
        const branchIdInput = screen.getByTestId('branchId-input');
        const usernameInput = screen.getByTestId('username-input');
        const passwordInput = screen.getByTestId('password-input');
        const firstnameInput = screen.getByTestId('firstname-input');
        const middlenameInput = screen.getByTestId('middlename-input');
        const lastnameInput = screen.getByTestId('lastname-input');
        const positionInput = screen.getByTestId('position-input');
        
        expect(branchIdInput).toHaveValue('');
        expect(usernameInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');
        expect(firstnameInput).toHaveValue('');
        expect(middlenameInput).toHaveValue('');
        expect(lastnameInput).toHaveValue('');
        expect(positionInput).toHaveValue('');
        
      })
      
      
    })
    
  })
  
  describe('Table actions', () => {
    
    /* it('Should delete a user when remove button is clicked', async () => {
      const user = userEvent.setup();
      const allRemoveButtons = screen.getAllByText('Remove');
      
      // Check if one of the buttons has an attribute disabled
      // This means that one user can't be removed
      const diabledButton = allRemoveButtons.filter((button) => button.hasAttribute('disabled'));
      expect(diabledButton.length).toBe(1);
      
      
    }) */
    
    it('Should delete the row when remove button is clicked', async () => {
      const user = userEvent.setup();
      const allRemoveButtons = screen.getAllByText('Remove');
      
      const notDisabledButton = allRemoveButtons.filter((button) => !button.hasAttribute('disabled'));
      const buttonsInitialLength = notDisabledButton.length;
      
      // Find and click the remove button
      const removeButton = notDisabledButton[0];
      await act(() => userEvent.click(removeButton))
      
      waitFor(() => {
        // Check if the row is removed
        const allRemoveButtons = screen.getAllByText('Remove');
        const notDisabledButton = allRemoveButtons.filter((button) => !button.hasAttribute('disabled'));
        const buttonsNewLegnth = notDisabledButton.length;
        expect(buttonsNewLegnth).toBeLessThan(buttonsInitialLength);
      })
    })
    
  })
});