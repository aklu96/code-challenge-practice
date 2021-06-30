import Head from 'next/head';
import { useState, ChangeEventHandler, FormEvent } from 'react';
import styles from 'src/styles/create_account.module.scss';

export default function CreateAccount() {

  // state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  // handlers
  function handleInputChange(e: FormEvent) {
    // designate target as an input element which is guaranteed to have a value property
    const target = e.target as HTMLInputElement;
    setUsername(target.value);
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
          <input name="username" value={username} onChange={handleInputChange} />
          <button>Create Account</button>
        </form>
      </article>
    </>
  );
}
