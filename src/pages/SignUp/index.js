import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'antd/dist/antd.min.css';
import { Input, Button, Form, Checkbox, message } from 'antd';
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from '@ant-design/icons';
import { Typography } from 'antd';

import './SignUp.css';
import { AuthActions } from '../../redux/rootAction';

export default function SignUp() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.AuthReducer.userData);
  const [localData, setLocalData] = useState([]);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setLocalData(userData);
    }
  }, [setLocalData]);
  console.log(localData);
  const dispatch = useDispatch();
  const handlecreateAcount = (values) => {
    const corectUsername = userData.find(
      (user) => user.username === values.username
    );
    if (corectUsername) {
      message.error('Username already taken by another user!');
    } else {
      if (localData) {
        localStorage.setItem('user', JSON.stringify([...localData, values]));
      } else {
        localStorage.setItem('user', JSON.stringify(values));
      }

      dispatch(AuthActions.setUserData(values));
      message.success('sign up successfully');
      navigate('/signin');
    }
  };
  const { Title } = Typography;
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, 'Must be 15 charaters or less')
        .required('required'),
      password: Yup.string()
        .min(3, 'Password must be 3 charater or more')
        .max(8, 'Must be 8 charaters or less')
        .required('required'),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password')], "Password's not match")
        .required('Required!'),
    }),
    onSubmit: (values) => {
      handlecreateAcount({
        username: values.username,
        password: values.password,
      });
    },
  });
  const showSignIn = () => {
    navigate('/signin');
  };
  return (
    <div className='signup-container'>
      <div className='row'>
        <div className='col-10 col-md-7 col-lg-5 mx-auto'>
          <div className='formik-signup my-5 py-5'>
            <Title className='text-primary text-center mr-5' level={2}>
              SIGN UP
            </Title>
            <Form
              layout='vertical'
              name='basic'
              labelCol={{ span: 8, offset: 2 }}
              wrapperCol={{ span: 20, offset: 2 }}
              initialValues={{ remember: true }}
              onFinish={formik.handleSubmit}
            >
              <Form.Item wrapperCol={{ offset: 14, span: 16 }}>
                <div className='d-flex align-items-baseline'>
                  <span className='text-dark'>Already Have account?</span>
                  <Button
                    className='text-primaty'
                    type='link'
                    onClick={showSignIn}
                  >
                    {' '}
                    Login{' '}
                  </Button>
                </div>
              </Form.Item>
              <Form.Item>
                <Input
                  className='input'
                  bordered={false}
                  placeholder='Username'
                  size='small'
                  type='text'
                  name='username'
                  prefix={<UserOutlined />}
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
                {formik.errors.username && formik.touched.username && (
                  <p style={{ color: 'red' }}>{formik.errors.username}</p>
                )}
              </Form.Item>
              <Form.Item>
                <Input.Password
                  className='input'
                  bordered={false}
                  placeholder='Password'
                  size='small'
                  type='password'
                  name='password'
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.errors.password && formik.touched.password && (
                  <p style={{ color: 'red' }}>{formik.errors.password}</p>
                )}
              </Form.Item>
              <Form.Item>
                <Input.Password
                  className='input'
                  bordered={false}
                  placeholder='Confirm password'
                  size='small'
                  type='password'
                  name='confirm_password'
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  value={formik.values.confirm_password}
                  onChange={formik.handleChange}
                />
                {formik.errors.confirm_password &&
                  formik.touched.confirm_password && (
                    <p style={{ color: 'red' }}>
                      {formik.errors.confirm_password}
                    </p>
                  )}
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 2, span: 20 }}>
                <Button
                  className='signup-button'
                  type='primary'
                  htmlType='submit'
                >
                  Sign Up{' '}
                </Button>
              </Form.Item>
              <Form.Item
                name='remember'
                valuePropName=''
                wrapperCol={{ offset: 2, span: 16 }}
              >
                <Checkbox>
                  I agree all statements in{' '}
                  <Button type='link'>Term & Conditions</Button>
                </Checkbox>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
