import Head from 'next/head';
import { ChangeEventHandler, FormEvent, useState } from 'react';
import styles from 'src/styles/create_account.module.scss';

export default function CreateAccount() {

  // state
  const [text, setText] = useState('');

  // handlers
  function handleChange(e: FormEvent) {
    // designate target as an input element which is guaranteed to have a value property
    const target = e.target as HTMLInputElement;
    console.log(target.value);
    setText(target.value);
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
          <input name="username" value={text} onChange={handleChange} />
          <button>Create Account</button>
        </form>
      </article>
    </>
  );
}
