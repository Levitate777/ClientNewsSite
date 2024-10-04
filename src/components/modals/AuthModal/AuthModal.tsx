import type { FormProps } from 'antd';
import { Modal, Button, Form, Input } from 'antd'

interface IAuthModal {
  type: string | 'LOG' | 'REG',
  modalOpen: boolean,
  closeModal: () => void,
  confirmLoading: boolean,
  changeConfirmLoading: (arg: boolean) => void,
}

type FieldType = {
  login?: string;
  password?: string;
  email?: string;
};

const AuthModal = ({
  type,
  modalOpen,
  closeModal,
  confirmLoading,
  changeConfirmLoading,
}: IAuthModal) => {

  const handleOk = () => {
    changeConfirmLoading(true);
    setTimeout(() => {
      closeModal();
      changeConfirmLoading(false);
    }, 2000);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Modal
        title={type === 'LOG' ? 'Login' : 'Register'}
        open={modalOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={closeModal}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {type === 'REG' && 
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[{ type: 'email', required: true, message: 'Please input your email!' }]}
            >
              <Input />
            </Form.Item>
          }
          <Form.Item<FieldType>
            label="Login"
            name="login"
            rules={[{ required: true, message: 'Please input your login!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AuthModal;
