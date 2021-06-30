import { useState, FormEvent } from 'react';

interface Props {
  handleUsernameChange: (username: string) => void;
}

export default function Username(props: Props) {
  const { handleUsernameChange } = props;
  const [text, setText] = useState('');

  function handleChange(e: FormEvent) {
    // designate target as an input element which is guaranteed to have a value property
    const target = e.target as HTMLInputElement;
    setText(target.value);
    handleUsernameChange(target.value);
  }

  return (
    <input name="username" value={text} onChange={handleChange} />
  );
}