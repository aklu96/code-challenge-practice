import { FormEvent } from 'react';

interface Props {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: FormEvent) => void
}

const Input = (props: Props) => {
  const {
    id,
    type,
    label,
    value,
    onChange
  } = props;

  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
