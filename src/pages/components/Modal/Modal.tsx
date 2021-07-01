import styles from './modal.module.scss';

interface Props {
  show: boolean;
}

// "No" button will simply close the modal
// "Yes" will come with a passed down handler to render the next view

const Modal = (props: Props) => {
  const { show } = props;
  const {
    modal,
    title
  } = styles;

  console.log(show);

  if (!show) return null;

  return (
    <article className={modal}>
      <h2 className={title}>
        Your password has been found in a data breach and is exposed. We recommend creating a new password.
      </h2>
    </article>
  );
};

export default Modal;
