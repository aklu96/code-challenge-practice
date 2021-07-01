import styles from './error.module.scss';

interface Props {
  message: string;
}

const Error = (props: Props) => {
  const { message } = props;
  const { error } = styles;
  return (
    <div className={error}>{message}</div>
  );
};

export default Error;
