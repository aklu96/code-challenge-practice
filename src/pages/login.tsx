// hooks + types
import { useState, ReactElement, FormEvent } from 'react';

// UI
import styles from 'src/styles/create_account.module.scss';
import logo from '../../public/wealthfront-logo.png';

// components
import Head from 'next/head';
import Image from 'next/image';
import Input from './components/Input';
import Button from './components/Button';

const Login = (): ReactElement => {
  // state
  // form state management
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setAccountInfo = {
    username: setUsername,
    password: setPassword
  };

  // handlers
  const handleInputChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setAccountInfo[target.id](target.value);
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
        <title>Login</title>
      </Head>
      <article className={article}>
        <form className={form}>
          <h4>Congratulations, you've successfully created an account!</h4>
          <figure className={image}>
            <Image
              src={logo}
              alt="Wealthfront logo"
              width={40}
              height={40}
            />
          </figure>
          <h1 className={title} >Login</h1>
          <Input
            id={'username'}
            type={'text'}
            name={'Username'}
            value={username}
            onChange={handleInputChange}
          />
          <Input
            id={'password'}
            type={'password'}
            name={'Password'}
            value={password}
            onChange={handleInputChange}
          />
          <Button text={'Login'} />
        </form>
      </article>
    </>
  );
};

export default Login;
