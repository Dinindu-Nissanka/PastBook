import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { login } from '../../services/auth.service';
import './login.scss';

export const Login = ({
  setToken,
  setIsLoginModalOpen,
}: {
  setToken: Function;
  setIsLoginModalOpen: Function;
}) => {
  const onFinish = async (values: {
    username: string;
    password: string;
  }): Promise<void> => {
    const { username, password } = values;

    if (username && password) {
      const tokenResponse = await login({ username, password });
      if (tokenResponse.token) {
        setToken(tokenResponse);
        notification.success({
          message: 'Login success',
        });
      } else {
        notification.error({
          message: 'Login failed',
          description: tokenResponse.message || 'Login failed',
        });
      }
    }
  };

  return (
    <div className="login">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            { required: true, message: 'Please input your Username!' },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { min: 8, message: 'Minimum length must be 8 characters' },
            { max: 12, message: 'Maximum length must be 12 characters' },
            { required: true, message: 'Please input your Password!' },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <Button type="link" onClick={() => setIsLoginModalOpen(false)}>
            Don't have an account. Register !!!
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setIsLoginModalOpen: PropTypes.func.isRequired,
};
