import Head from 'next/head';
import { FormEvent, useState, useEffect } from 'react';
import styles from 'src/styles/create_account.module.scss';

export default function CreateAccount() {
  const [count, setCount] = useState(0);

  function handleSubmit(evt: FormEvent) {
    evt.preventDefault();

    // experimenting with hooks
    setCount(count + 1);



    /* const response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify({}),
    }); */

    console.log(/*await response.json(),*/ count);
  }



  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>
      <article className={styles.article}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <button>Create Account</button>
          <p>You clicked me {count} times</p>
        </form>
      </article>
    </>
  );
}
