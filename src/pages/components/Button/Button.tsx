import { Dispatch, ReactElement, SetStateAction } from 'react';
import styles from './button.module.scss';

interface Props {
  text: string;
  // use to override scss module styling
  style?: Record<string, string> | undefined;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const Button = (props: Props): ReactElement => {
  const {
    text,
    style,
    onClick,
    onMouseEnter,
    onMouseLeave
  } = props;

  const { button } = styles;

  return (
    <button
      style={style}
      className={button}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >{text}</button>
  );
};

export default Button;
