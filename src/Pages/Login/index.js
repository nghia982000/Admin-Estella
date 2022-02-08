import React, { useEffect } from 'react'
import './style.scss'
import { NavLink, useNavigate } from "react-router-dom"
import 'antd/dist/antd.min.css'
import {
    Input,
    Button,
    Form,
} from 'antd'

import * as actions from './stores/actions'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import { notification } from 'antd'
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons"

const Login = ({ asynLogin }) => {
    const navigate = useNavigate()
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }
    const onFinish = async (values) => {
        console.log(values)
        const data = await asynLogin(values)
        console.log(data)
        if (data.code === 200) {
            sessionStorage.setItem("User",data.result.token)
            sessionStorage.setItem("UserName",data.result.username)
            notification.open({
                message: 'Đăng nhập thành công',
                icon: <CheckCircleOutlined style={{ color: "green" }} />,
            })
            navigate("/")
        }
        else {
            notification.open({
                message: 'Đăng nhập thất bại',
                description: 'Sai tài khoản hoặc mật khẩu',
                icon: <CloseCircleOutlined style={{ color: "red" }} />,
            })
        }
    }
    useEffect(()=>{
        var loggedInUser = sessionStorage.getItem("User")
        console.log(loggedInUser)
        if (loggedInUser !== null) {
            window.location.href='/'
        }
    },[])

    return (
        <div className='formLogin'>
            <div style={{ textAlign: 'center', fontSize: '30px', padding: '20px 0', fontWeight: 'bold', textTransform: 'uppercase' }}>
                Đăng nhập
            </div>
            <Form
                name="basic"
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 18,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 6,
                        span: 18,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
})

const mapDispatchToProps = (dispatch) => ({
    asynLogin: (payload) => actions.asyncLogin(dispatch)(payload),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Login)