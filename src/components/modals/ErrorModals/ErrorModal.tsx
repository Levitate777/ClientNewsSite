import { Modal } from 'antd';

const ErrorModal = ({ error }: { error: string | null }) => {
  const strError = error ? error : '';

  const config = {
    title: 'EEERROOOOOOORRR',
    content: (
      <>
        <div>{strError}</div>
      </>
    ),
  };

  return (
    <>
      {Modal.error(config)}
    </>
  );
};

export default ErrorModal;