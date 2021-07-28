import { useState, useEffect, ReactElement } from 'react';
import styles from './modal.module.scss';
import Button from '../Button';

interface Props {
  show: boolean;
  closeModal: () => void;
  createAccount: () => void;
}

// Change password button will close the modal
// Proceed will render the next view

const Modal = (props: Props): ReactElement => {
  const {
    show,
    closeModal,
    createAccount
  } = props;
  if (!show) return null;

  // states for button color changes (can likely be improved via scss)
  const [hover, setHover] = useState(false);

  // handler for exiting modal when anywhere outside of the modal is clicked
  useEffect(() => {
    document.addEventListener('click', (e) => {
      // cast target as a div element which has an id property
      const target = e.target as HTMLElement;

      // if modal background is clicked, close the modal
      if (target.id === 'modalBackground') closeModal();
    });
  });

  // modal and button styling
  const {
    modalBackground,
    modal,
    title,
    buttonContainer
  } = styles;

  const changeButton = {
    margin: '5px'
  };

  const proceedButton = {
    margin: '5px',
    color: 'grey',
    backgroundColor: hover ? 'rgb(138, 199, 219)' : 'lightblue'
  }

  return (
    <div id={'modalBackground'} className={modalBackground}>
      <div className={modal}>
        <h2 className={title}>
          Your password has been found in a data breach and is exposed. We recommend creating a new password.
        </h2>
        <div className={buttonContainer}>
          <Button
            style={changeButton}
            text={'Change password (recommended)'}
            onClick={closeModal}
          />
          <Button
            style={proceedButton}
            text={'Proceed'}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={createAccount}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
