import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

interface IAvatarProps {
  url?: string | null;
  size?: number | 'large' | 'small' | 'default';
  shape?: 'circle' | 'square';
  className?: string;
}

const CustomerAvatar = ({ url, shape = 'circle', size = 'default', className }: IAvatarProps) => {
  return (
    <Avatar
      className={className}
      shape={shape}
      size={size}
      icon={!url && <UserOutlined />}
    />
  );
};

export default CustomerAvatar;
