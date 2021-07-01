import styles from './button.module.scss';

interface Props {
  name: string;
  onClick?: () => void;
}

const Button = (props: Props) => {
  const {
    name,
    onClick
  } = props;

  const { button } = styles;

  return (
    <button className={button} onClick={onClick}>{name}</button>
  );
};

export default Button;
