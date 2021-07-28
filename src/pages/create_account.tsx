/**
 *                          ---   NOTE   ---
 * Please use this password for testing exposed passwords workflow:
 * weakpassweakpassweakpass2021!
 * It's an exposed password that passes validation
 *
*/

// hooks + types
import { useState, useEffect, FormEvent, ReactElement } from 'react';
import { useRouter } from 'next/router';

// UI
import styles from 'src/styles/create_account.module.scss';
import logo from '../../public/wealthfront-logo.png';

// components
import Head from 'next/head';
import Image from 'next/image';
import Input from './components/Input';
import Error from './components/Error';
import Button from './components/Button';
import Modal from './components/Modal';

interface Errors {
  username_too_short?: boolean;
  username_too_long?: boolean;
  password_too_short?: boolean;
  password_too_long?: boolean;
  password_no_letter?: boolean;
  password_no_number?: boolean;
  password_no_symbol?: boolean;
}

const CreateAccount = (): ReactElement => {
  // state
  // form state management
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setAccountInfo = {
    username: setUsername,
    password: setPassword
  };

  // errors objects will match the response returned from the api
  const [usernameErrs, setUserErrs] = useState<Errors>({});
  const [passwordErrs, setPassErrs] = useState<Errors>({});

  // modal state corresponding to password exposed flow
  const [showModal, setModal] = useState(false);

  // for successful account creation, redirect to the login page
  const router = useRouter();


  // API requests & page routing

  // returns an object specifying whether the credentials pass validation
  // and if not, what the specific errors are
  const createAccountRequest = async () => {
    const response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
    });

    return await response.json();
  };

  // returns an object specifying whether the password is exposed or not
  const passwordExposedRequest = async () => {
    const response = await fetch('/api/password_exposed', {
      method: 'POST',
      body: JSON.stringify({
        password
      })
    });

    return await response.json();
  };

  // this function will be called upon successful account creation
  // and redirect the user to the login page
  const createdAccountRedirect = () => {
    router.push('/login');
  }


  // handlers
  const handleInputChange = (e: FormEvent) => {
    // designate target as an input element which is guaranteed to have
    // name & value properties
    const target = e.target as HTMLInputElement;
    setAccountInfo[target.id](target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await createAccountRequest();

    // if response succeeds, we want to clear any existing errors
    // and make an API call to password_exposed
    if (response.result) {
      setUserErrs({});
      setPassErrs({});

      const passwordExposed = await passwordExposedRequest();

      // if it is exposed, we want to render a modal to ask user whether they
      // would like to proceed or not

      // use this password for testing: weakpassweakpassweakpass2021!
      // exposed password that passes validation
      if (passwordExposed.result) {
        setModal(true);
      } else {
        // if password is not exposed, we want to finish creating the account
        // (would be another request if we had data persistence) and
        // redirect the user to the login page
        createdAccountRedirect();
      }

    } else {
      // if response fails, update the error state variables
      // which will render the error messages
      const {
        username_too_short,
        username_too_long,
        password_too_short,
        password_too_long,
        password_no_letter,
        password_no_number,
        password_no_symbol
      } = response.errors;

      // all properties will be copied with either the
      // corresponding message or undefined as a value
      setUserErrs({
        username_too_short,
        username_too_long
      });
      setPassErrs({
        password_too_short,
        password_too_long,
        password_no_letter,
        password_no_number,
        password_no_symbol
      });
    }
  };

  // render methods
  const renderUsernameErrors = (): ReactElement => {
    return (
      <div>
        {Object.entries(usernameErrs).map(([errorID, message]) => {
          // value will either be undefined or the error message
          // if value exists, render an Error element and pass the message to it
          if (message) {
            return <Error key={errorID} message={message} />
          }
        })}
      </div>
    );
  };

  const renderPasswordErrors = (): ReactElement => {
    return (
      <div>
        {Object.entries(passwordErrs).map(([errorID, message]) => {
          // value will either be undefined or the error message
          // if value exists, render an Error element and pass the message to it
          if (message) {
            return <Error key={errorID} message={message} />
          }
        })}
      </div>
    );
  };

  const closeModal = () => {
    setModal(false);
  };

  // style classes
  const {
    article,
    form,
    image,
    title
  } = styles;

  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>
      <article className={article}>
        <form className={form} onSubmit={handleSubmit}>
          <figure className={image}>
            <Image
              src={logo}
              alt="Wealthfront logo"
              width={40}
              height={40}
            />
          </figure>
          <h1 className={title} >Create New Account</h1>
          <Input
            id={'username'}
            type={'text'}
            name={'Username'}
            value={username}
            onChange={handleInputChange}
          />
          {renderUsernameErrors()}
          <Input
            id={'password'}
            type={'password'}
            name={'Password'}
            value={password}
            onChange={handleInputChange}
          />
          {renderPasswordErrors()}
          <Button text={'Create Account'} />
        </form>
      </article>
      <Modal
        show={showModal}
        createAccount={createdAccountRedirect}
        closeModal={closeModal}
      />
    </>
  );
};

export default CreateAccount;
