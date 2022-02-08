import React, { useState, useEffect } from 'react'
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
    InputNumber,
    Radio
} from 'antd'
import { NavLink, useNavigate } from "react-router-dom"
import 'antd/dist/antd.min.css'
import { CloseCircleOutlined, CheckCircleOutlined, UploadOutlined } from "@ant-design/icons"

import * as actions from '../stores/actions'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
const { Option } = Select

const CreateService = ({ asynCreate }) => {
    const [formModal] = Form.useForm()
    const [avatar, setAvatar] = useState()
    const [imgBase64, setImgBase64] = useState()
    const navigate = useNavigate()
    const getBase64 = file => {
        return new Promise(resolve => {
            let baseURL = ""
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                baseURL = reader.result
                resolve(baseURL)
            }
        })
    }
    const onFinish = async (values) => {
        console.log(values,imgBase64)
        const response = await asynCreate({...values,rules:imgBase64})
        console.log(response)
        if (response.status === 200) {
            notification.open({
                message: 'Tạo thành công',
                icon: <CheckCircleOutlined style={{ color: "green" }} />,
            })
            navigate("/services/system")
        }
        else {
            notification.open({
                message: `Lỗi ${response.data.code}`,
                description: `${response.data.message}`,
                icon: <CloseCircleOutlined style={{ color: "red" }} />,
            })
        }
    }
    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview)
        }
    }, [avatar])
    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)
        setAvatar(file)
        getBase64(file)
                .then(result => {
                    setImgBase64(result)
                })
                .catch(err => {
                    console.log(err)
                })
    }
    return (
        <div>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>Dịch vụ hệ thống </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ margin: '16px 0', fontSize: '25px' }}>Tạo dịch vụ mới</div>
            <Form
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 20 }}
                form={formModal}
                name="formModal"
                onFinish={onFinish}
            >
                <Form.Item name="name" label="Name" rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập tên đăng nhập'
                    }
                ]}
                    hasFeedback>
                    <Input />
                </Form.Item>
                <Form.Item name="type" label="Type" rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập loại'
                    }
                ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item name="status" label="Status" rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập trạng thái'
                    },
                ]}
                    hasFeedback>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description" rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mô tả'
                    },
                ]}
                    hasFeedback>
                    <Input />
                </Form.Item>
                <Form.Item name="contact" label="Contact" rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập contact'
                    },
                ]}
                    hasFeedback>
                    <Input />
                </Form.Item>
                <Form.Item name="phoneNumber" label="PhoneNumber" rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập số diện thoại'
                    }
                ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập email'
                    },
                    {
                        type: 'email',
                        message: 'Đây không phải email'
                    }
                ]}
                    hasFeedback>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="isQR"
                    label="Is QR"
                    rules={[{ required: true, message: 'Vui lòng chọn' }]}
                    hasFeedback
                >
                    <Select placeholder="Chọn ">
                        <Option value={1}>Yes</Option>
                        <Option value={0}>No</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="capicity"
                    label="Capicity"
                    rules={[{ required: true, message: 'Vui lòng điền' }]}
                    hasFeedback
                >
                    <InputNumber min={1} max={10} defaultValue={0} />
                </Form.Item>
                <Form.Item
                    name="minReorderDate"
                    label="Min Reorder Date"
                    rules={[{ required: true, message: 'Vui lòng điền thời gian' }]}
                    hasFeedback
                >
                    <InputNumber min={1} max={10} defaultValue={0} />
                </Form.Item>
                <Form.Item
                    name="maxReorderDate"
                    label="Max Reorder Date"
                    rules={[{ required: true, message: 'Vui lòng điền thời gian' }]}
                    hasFeedback
                >
                    <InputNumber min={1} max={10} defaultValue={0} />
                </Form.Item>
                <Form.Item
                    name="cancelReorderDate"
                    label="Cancel Reorder Date"
                    rules={[{ required: true, message: 'Vui lòng điền thời gian hủy' }]}
                    hasFeedback
                >
                    <InputNumber min={1} max={10} defaultValue={0} />
                </Form.Item>
                <Form.Item name="imageUrl" label="Image Url" rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập url'
                    }
                ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Information" rules={[{ required: true }]}>
                    <input type="file" name="file" id="file" onChange={handlePreviewAvatar} hidden />
                    <label htmlFor="file" style={{ border: '1px solid #dddddd', padding: '5px', cursor: 'pointer' }}>
                        <UploadOutlined />
                        Upload image
                    </label>
                </Form.Item>
                <Form.Item wrapperCol={{
                    offset: 5,
                    span: 20,
                }}>
                    {avatar && <img src={avatar.preview} alt="" width="100px" />}
                </Form.Item>
                {/* <Form.Item label="Information" rules={[{ required: true }]}>

                </Form.Item> */}
                <Form.Item wrapperCol={{
                    offset: 5,
                    span: 20,
                }} >

                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({
    asynCreate: (payload) => actions.asyncCreate(dispatch)(payload),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(CreateService)
