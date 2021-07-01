import Head from 'next/head';
import Image from 'next/image';
import { useState, FormEvent } from 'react';
import styles from 'src/styles/create_account.module.scss';
import logo from '../../public/wealthfront_logo.png';
import Input from './components/Input';
import Button from './components/Button';

const CreateAccount = () => {

  // state management
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setCredentials = {
    username: setUsername,
    password: setPassword
  }

  // handlers
  const handleInputChange = (e: FormEvent) => {
    // designate target as an input element which is guaranteed to have
    // name & value properties
    const target = e.target as HTMLInputElement;
    setCredentials[target.id](target.value);
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    console.log(await response.json());
  }

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
          <Input id={'username'} type={'text'} name={'Username'} value={username} onChange={handleInputChange} />
          <Input id={'password'} type={'password'} name={'Password'} value={password} onChange={handleInputChange} />
          <Button name={'Create Account'} />
        </form>
      </article>
    </>
  );
};

export default CreateAccount;
