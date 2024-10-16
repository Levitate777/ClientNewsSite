import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import type { FormProps, UploadProps, UploadFile } from 'antd';
import { Modal, Form, Input, Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

import { AppDispatch } from '../../../redux/store';
import { fetchUserUpdate } from '../../../redux/actionCreators/user';
import { useTypeSelector } from '../../../redux/hooks/useTypeSelector';
import { UpdateUserModal, AddPostModal } from './UserModalContent';

interface IUserPageModal {
  typeModal: 'update' | 'add',
  modalOpen: boolean,
  closeModal: () => void,
  confirmLoading: boolean,
  changeConfirmLoading: (arg: boolean) => void,
};

type UpdateFieldType = {
  login?: string;
  avatar?: File;
};

type AddPostFieldType = {
  title: string;
  description: string,
  tags: string,
  image: File;
};

type FieldType = UpdateFieldType | AddPostFieldType;

const UserPageModal = ({
	typeModal,
  modalOpen,
  closeModal,
  confirmLoading,
  changeConfirmLoading,
}: IUserPageModal) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<UploadFile[]>([]);

  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const isLoading: boolean = useTypeSelector((state) => state.user.isLoading);

  const handleCancel = () => {
    closeModal();
    form.resetFields();
  };

  const handleUploadChange: UploadProps['onChange'] = ({ fileList: newFile }) => {
    setFile(newFile);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();   
      console.log(values);
      const isAllFieldsUndefined = Object.values(values).every(value => value === undefined);
      if (isAllFieldsUndefined) {
        handleCancel();
        return;
      }
      const selectedFile: File | null = file?.length && file[0].originFileObj ? (file[0].originFileObj as File) : null;
      changeConfirmLoading(true);
      dispatch(fetchUserUpdate({
        id: String(id),
        login: values.login ? values.login : null,
        avatar: selectedFile,
      }));
      form.resetFields();
      setFile([]);
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

  useEffect(() => {
    if (!isLoading && confirmLoading) {
      handleCancel();
      changeConfirmLoading(false);
    }
  }, [isLoading, confirmLoading]);

	return (
		<>
      <Modal
        title={typeModal === 'update' ? 'Edit profile' : 'Add post'}
        open={modalOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={typeModal === 'update' ? 520 : 700}
      >
        <Form
          form={form}
          layout='vertical'
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {typeModal === 'update' ? (
            UpdateUserModal.map((input, index) => 
              <Form.Item<UpdateFieldType>
                key={index}
                label={input.label}
                name={input.name}
                validateTrigger={input.type === 'file' ? 'onChange' : 'onBlur'}
              >
                {input.type === 'file' ? (
                  <Upload
                    beforeUpload={() => false}
                    listType="picture"
                    maxCount={1}
                    accept='image/png, image/jpeg'
                    fileList={file}
                    onChange={handleUploadChange}
                  >
                    <Button type='primary' icon={<UploadOutlined />}>Upload avatar</Button>
                  </Upload>
                ) : (
                  <Input allowClear/>
                )}
              </Form.Item>
            )
          ) : (
            AddPostModal.map((input, index) => 
              <Form.Item<AddPostFieldType>
                key={index}
                label={input.label}
                name={input.name}
                rules={input.rules}
                validateTrigger={input.type === 'file' ? 'onChange' : 'onBlur'}
              >
                {input.type === 'file' &&
                  <Upload
                    beforeUpload={() => false}
                    listType="picture"
                    maxCount={1}
                    accept='image/png, image/jpeg'
                    fileList={file}
                    onChange={handleUploadChange}
                  >
                    <Button type='primary' icon={<UploadOutlined />}>Upload image</Button>
                  </Upload>
                }
                {input.type === 'textarea' &&
                  <TextArea autoSize={{ minRows: 3, maxRows: 5 }} allowClear/>
                }
                {input.type === 'text' &&
                  <Input allowClear/>
                }
              </Form.Item>
            )
          )}
        </Form>
      </Modal>
    </>
	)
}

export default UserPageModal;