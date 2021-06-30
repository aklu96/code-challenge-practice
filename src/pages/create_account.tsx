import Head from 'next/head';
import Image from 'next/image';
import { useState, FormEvent } from 'react';
import styles from 'src/styles/create_account.module.scss';
import logo from '../../public/wealthfront_logo.png';

export default function CreateAccount() {

  // state management
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setCredentials = {
    username: setUsername,
    password: setPassword
  }

  // handlers
  function handleInputChange(e: FormEvent) {
    // designate target as an input element which is guaranteed to have
    // name & value properties
    const target = e.target as HTMLInputElement;
    setCredentials[target.name](target.value);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    console.log(await response.json());
  }

  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>
      <article className={styles.article}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <figure className={styles.figure}>
            <Image
              className={styles.image}
              src={logo}
              alt="Wealthfront logo"
              width={40}
              height={40}
            />
          </figure>
          <h1>Create New Account</h1>
          <input name="username" value={username} onChange={handleInputChange} />
          <input name="password" value={password} onChange={handleInputChange} />
          <button>Create Account</button>
        </form>
      </article>
    </>
  );
}
