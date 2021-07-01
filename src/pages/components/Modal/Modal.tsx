import { ReactElement, useState } from 'react';
import styles from './modal.module.scss';
import Button from '../Button';

interface Props {
  show: boolean;
  createAccount: () => void;
}

// Change password button will close the modal
// Proceed will render the next view

const Modal = (props: Props): ReactElement => {
  const {
    show,
    createAccount
  } = props;
  if (!show) return null;

  const [hover, setHover] = useState(false);

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
    <div className={modalBackground}>
      <div className={modal}>
        <h2 className={title}>
          Your password has been found in a data breach and is exposed. We recommend creating a new password.
        </h2>
        <div className={buttonContainer}>
          <Button style={changeButton} text={'Change password (recommended)'} />
          <Button
            style={proceedButton}
            text={'Proceed with unsafe password'}
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
