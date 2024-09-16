import { Modal } from 'antd';

interface IErrorModalProps {
  error: string
}

const ErrorModal = ({ error }: IErrorModalProps) => {
  const showErrorModal = () => {
    Modal.error({
      title: 'Error',
      content: (
        <>
          <div>{error}</div>
        </>
      ),
    });
  };

  return (
    <>
      {showErrorModal()}
    </>
  );
};

export default ErrorModal;
