import { FormEvent } from 'react';
import styles from './input.module.scss';

interface Props {
  id: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: FormEvent) => void
}

const Input = (props: Props) => {
  const {
    id,
    type,
    name,
    value,
    onChange
  } = props;

  const {
    container,
    label,
    input
  } = styles;

  return (
    <div className={container}>
      <label htmlFor={id} className={label}>{name}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={input}
      />
    </div>
  );
};

export default Input;
