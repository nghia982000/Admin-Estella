import React from 'react'
import {
    Table,
    Popconfirm,
    Space,
    Modal,
    Button,
    Form,
    Input,
    Spin,
    Breadcrumb,
    Select,
    notification,
    Radio
} from 'antd'
import { NavLink, useNavigate } from "react-router-dom"
import 'antd/dist/antd.min.css'
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons"

import * as actions from '../stores/actions'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import { withTranslation, useTranslation } from "react-i18next"

const { Option } = Select

const CreateUserComponent = ({asynCreate,t}) => {
    const [formModal] = Form.useForm()
    const navigate = useNavigate()
    const onFinish = async (values) => {
        console.log(values)
        const response=await asynCreate(values)
        if (response.status === 200) {
            notification.open({
                message: 'Tạo tài khoản thành công',
                icon: <CheckCircleOutlined style={{ color: "green" }} />,
            })
            navigate("/")
        }
        else {
            notification.open({
                message: `Lỗi ${response.data.code}`,
                description: `${response.data.message}`,
                icon: <CloseCircleOutlined style={{ color: "red" }} />,
            })
        }

    }
    return <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>{t('userCreate.Breadcrumb1')}</Breadcrumb.Item>
            <Breadcrumb.Item>{t('userCreate.Breadcrumb2')}</Breadcrumb.Item>
            <Breadcrumb.Item>{t('userCreate.Breadcrumb3')}</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ margin: '16px 0', fontSize: '25px' }}>{t('userCreate.title')}</div>
        <Form
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 20 }}
            form={formModal}
            name="formModal"
            onFinish={onFinish}
        >
            <Form.Item name="username" label={t('userCreate.form.username')} rules={[
                {
                    required: true,
                    message: t('message.username')
                }
            ]}
                hasFeedback>
                <Input />
            </Form.Item>
            <Form.Item name="fullName" label={t('userCreate.form.fullname')} rules={[
                {
                    required: true,
                    message: t('message.fullname')
                }
            ]}
                hasFeedback
            >
                <Input />
            </Form.Item>
            <Form.Item name="email" label={t('userCreate.form.email')} rules={[
                {
                    required: true,
                    message: t('message.email')
                },
                {
                    type: 'email',
                    message: t('message.errorEmail')
                }
            ]}
                hasFeedback>
                <Input />
            </Form.Item>
            <Form.Item name="phoneNumber" label={t('userCreate.form.phoneNumber')} rules={[
                {
                    required: true,
                    message: t('message.phoneNumber')
                }
            ]}
                hasFeedback
            >
                <Input />
            </Form.Item>
            <Form.Item name="address" label={t('userCreate.form.address')} rules={[
                {
                    required: true,
                    message: t('message.address')
                }
            ]}
                hasFeedback
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="gender"
                label={t('userCreate.form.gender')}
                rules={[{ required: true, message: t('message.gender') }]}
                hasFeedback
            >
                <Select placeholder={t('userCreate.form.selectGender')}>
                    <Option value="MALE">{t('userCreate.form.gender.male')}</Option>
                    <Option value="FEMALE">{t('userCreate.form.gender.female')}</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="roomID"
                label={t('userCreate.form.rooms')}
                rules={[{ required: true, message:t('message.username')}]}
                hasFeedback
            >
                <Select placeholder={t('userCreate.form.rooms')}>
                    <Option value="T4-3301">T4-3301</Option>
                    <Option value="T4-3302">T4-3302</Option>
                    <Option value="T4-3303">T4-3303</Option>
                    <Option value="T4-3304">T4-3304</Option>
                    <Option value="T4-3305">T4-3305</Option>
                    <Option value="T4-3306">T4-3306</Option>
                    <Option value="T4-3307">T4-3307</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="roleId"
                label={t('userCreate.form.roles')}
                rules={[{ required: true, message: t('message.roles') }]}
                hasFeedback
            >
                <Select placeholder={t('userCreate.form.selectRoles')} >
                    <Option value="Tenant">{t('user.tab.Tenant')}</Option>
                    <Option value="Admin">{t('user.tab.Admin')}</Option>
                    <Option value="Reception">{t('user.tab.Reception')}</Option>
                    <Option value="Accountant">{t('user.tab.Accountant')}</Option>
                    <Option value="Security">{t('user.tab.Security')}</Option>
                    <Option value="Guest">{t('user.tab.Guest')}</Option>
                </Select>
            </Form.Item>
            <Form.Item wrapperCol={{
                offset: 3,
                span: 20,
            }} >
                <Button type="primary" htmlType="submit">{t('userCreate.form.btnSubmit')}</Button>
            </Form.Item>

        </Form>
    </div>
}

const mapStateToProps = createStructuredSelector({
})

const mapDispatchToProps = (dispatch) => ({
    asynCreate: (payload) => actions.asyncCreate(dispatch)(payload),
})

// const withConnect = connect(mapStateToProps, mapDispatchToProps)
// export default compose(withConnect)(CreateUser)

const CreateUser = withTranslation()(connect(mapStateToProps, mapDispatchToProps)(CreateUserComponent))
export default CreateUser