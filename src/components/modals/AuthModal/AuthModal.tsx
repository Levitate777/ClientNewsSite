import { useDispatch } from 'react-redux';
import type { FormProps } from 'antd';
import { Modal, Form, Input } from 'antd'

import { AppDispatch } from '../../../redux/store';
import { fetchAuth } from '../../../redux/actionCreators/auth';
import { useTypeSelector } from '../../../redux/hooks/useTypeSelector';

interface IAuthModal {
  typeModal: string | 'login' | 'registration',
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
  typeModal,
  modalOpen,
  closeModal,
  confirmLoading,
  changeConfirmLoading,
}: IAuthModal) => {
  const [form] = Form.useForm();

  const dispatch: AppDispatch = useDispatch();
  const isLoading: boolean = useTypeSelector((state) => state.auth.isLoading);

  const handleCancel = () => {
    closeModal();
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      changeConfirmLoading(true);
      dispatch(fetchAuth({user: values, route: typeModal}));
      form.resetFields();
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

  if (!isLoading && confirmLoading) {
    handleCancel();
    changeConfirmLoading(false);
  }

  return (
    <>
      <Modal
        title={typeModal === 'login' ? 'Login' : 'Register'}
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
          {typeModal === 'registration' && 
            <Form.Item<FieldType>
              label="Login"
              name="login"
              rules={[{ required: true, message: 'Please input your login!' }]}
            >
              <Input />
            </Form.Item>
          }
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ type: 'email', required: true, message: 'Please input your email!' }]}
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
