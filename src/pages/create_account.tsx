// hooks + types
import { useState, FormEvent, ReactElement } from 'react';

// UI
import styles from 'src/styles/create_account.module.scss';
import logo from '../../public/wealthfront_logo.png';

// components
import Head from 'next/head';
import Image from 'next/image';
import Input from './components/Input';
import Error from './components/Error';
import Button from './components/Button';

interface Errors {
  username_too_short?: string;
  username_too_long?: string;
  password_too_short?: string;
  password_too_long?: string;
  password_no_letter?: string;
  password_no_number?: string;
  password_no_symbol?: string
}

const CreateAccount = () => {

  // state management
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setAccountInfo = {
    username: setUsername,
    password: setPassword
  }

  // errors objects will match the response returned from the api
  const [usernameErrs, setUserErrs] = useState <Errors> ({});
  const [passwordErrs, setPassErrs] = useState <Errors> ({});

  // handlers
  const handleInputChange = (e: FormEvent) => {
    // designate target as an input element which is guaranteed to have
    // name & value properties
    const target = e.target as HTMLInputElement;
    setAccountInfo[target.id](target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const serverRes = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
    });

    const response = await serverRes.json();

    // if response succeeds, we want to clear any existing errors
    // and make an API call to password_exposed
    if (response.result) {
      setUserErrs({});
      setPassErrs({});

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
          // if value exists, render an Error element and pass it the message
          if (message) {
            return <Error key={errorID} message={message} />
          }
        })}
      </div>
    );
  };

  const renderPasswordErrors = () => {
    return (
      <div>
        {Object.entries(passwordErrs).map(([errorID, message]) => {
          // value will either be undefined or the error message
          // if value exists, render an Error element and pass it the message
          if (message) {
            return <Error key={errorID} message={message} />
          }
        })}
      </div>
    );
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
          <Button name={'Create Account'} />
        </form>
      </article>
    </>
  );
};

export default CreateAccount;
