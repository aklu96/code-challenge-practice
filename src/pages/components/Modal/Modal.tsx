import { useState } from 'react';
import styles from './modal.module.scss';
import Button from '../Button';

interface Props {
  show: boolean;
}

// "No" button will simply close the modal
// "Yes" will come with a passed down handler to render the next view

const Modal = (props: Props) => {
  const { show } = props;
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
    'background-color': hover ? 'rgb(138, 199, 219)' : 'lightblue'
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
            onMouseEnter={()=>setHover(true)}
            onMouseLeave={()=>setHover(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
