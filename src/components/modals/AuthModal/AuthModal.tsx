import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../../redux/store';
import { fetchAuth } from '../../../redux/actionCreators/auth';
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
  const [form] = Form.useForm();

  const dispatch: AppDispatch = useDispatch();

  const handleCancel = () => {
    closeModal();
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      changeConfirmLoading(true);
      dispatch(fetchAuth(values));
      setTimeout(() => {
        closeModal();
        changeConfirmLoading(false);
      }, 2000);
    } catch (error) {
      console.log('Failed to submit data');   
    }
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
        onCancel={handleCancel}
      >
        <Form
          form={form}
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
        </Form>
      </Modal>
    </>
  );
};

export default AuthModal;
