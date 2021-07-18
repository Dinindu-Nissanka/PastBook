import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import PropTypes from 'prop-types';
import { signUp } from '../../services/auth.service';
import './sign-up.scss';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const SignUp = ({
  setToken,
  setIsLoginModalOpen,
}: {
  setToken: Function;
  setIsLoginModalOpen: Function;
}) => {
  const [form] = Form.useForm();

  const onFinish = async (values: {
    username: string;
    password: string;
    name: string;
  }): Promise<void> => {
    const { username, password, name } = values;

    if (username && password && name) {
      const tokenResponse = await signUp({ username, password, name });
      if (tokenResponse.token) {
        setToken(tokenResponse);
        notification.success({
          message: 'Successfully created a user',
        });
      } else {
        notification.error({
          message: 'User creation failed',
          description: tokenResponse.message || 'User creation failed',
        });
      }
    }
  };

  return (
    <div className="sign-up">
      <Form
        {...formItemLayout}
        form={form}
        name="sign up"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label="username"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { min: 8, message: 'Minimum length must be 8 characters' },
            { max: 12, message: 'Maximum length must be 12 characters' },
            { required: true, message: 'Please input your Password!' },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
          <Button type="link" onClick={() => setIsLoginModalOpen(true)}>
            Already have an account. Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

SignUp.propTypes = {
  setToken: PropTypes.func.isRequired,
  setIsLoginModalOpen: PropTypes.func.isRequired,
};
