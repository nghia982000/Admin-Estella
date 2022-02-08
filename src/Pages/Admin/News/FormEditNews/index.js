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
    Radio
} from 'antd'
import { NavLink, useNavigate } from "react-router-dom"
import 'antd/dist/antd.min.css'
import { CloseCircleOutlined, CheckCircleOutlined, UploadOutlined } from "@ant-design/icons"

import * as actions from '../stores/actions'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { withTranslation, useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

const { Option } = Select
const { TextArea } = Input
const FormEditNewsComponent = ({asynDetail,asynUpdate,t}) => {
    const [avatar, setAvatar] = useState()
    const [fileImg,setFileImg]=useState()
    const [urlImg,setUrlImg]= useState()
    const [formModal] = Form.useForm()
    let { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview)
        }
    }, [avatar])
    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0]
        setFileImg(file)
        file.preview = URL.createObjectURL(file)
        setAvatar(file)
    }
    const onFinish =async (values) => {
        console.log(values,fileImg,id)
        let formData=new FormData()

        formData.append('file',fileImg)
        formData.append('title',values.title)
        formData.append('tag',values.tag)
        formData.append('description',values.description)

        const form={
            formData,
            id
        }
        const response=await asynUpdate(form)
        if (response.status === 200) {
            notification.open({
                message: 'chỉnh sửa tin tức thành công',
                icon: <CheckCircleOutlined style={{ color: "green" }} />,
            })
            navigate("/news")
        }
        else {
            notification.open({
                message: `Lỗi ${response.data.code}`,
                description: `${response.data.message}`,
                icon: <CloseCircleOutlined style={{ color: "red" }} />,
            })
        }
        
    }
    useEffect(async() => {
       const response=await asynDetail(id)
       console.log(response.data.result)
       if (response) {
        formModal.setFieldsValue({
            title: response.data.result.title,
            tag:response.data.result.tag,
            description: response.data.result.description
        })
        setUrlImg(response.data.result.imageUrl)
    }
    }, [])
    return <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>{t('newsCreate.Breadcrumb1')}</Breadcrumb.Item>
            <Breadcrumb.Item>{t('newsCreate.Breadcrumb2')}</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ margin: '16px 0', fontSize: '25px' }}>{t('newsCreate.title')}</div>
        <Form
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 20 }}
            form={formModal}
            name="formModal"
            onFinish={onFinish}
        >
            <Form.Item label={t('newsCreate.form.upload')}>
                {/* <Input type="file" name="file" id="file" onChange={(e) => handleFileInputChange(e)} hidden /> */}
                <input type="file" name="file" id="file" onChange={handlePreviewAvatar} hidden />
                <label htmlFor="file" style={{ border: '1px solid #dddddd', padding: '5px', cursor: 'pointer' }}>
                    <UploadOutlined />
                    {t('newsCreate.form.uploadImage')}
                </label>
            </Form.Item>
            <Form.Item  wrapperCol={{
                offset: 3,
                span: 20,
            }}>
                {avatar && <img src={avatar.preview } alt="" width="100px" />||<img src={`data:image/png;base64,${urlImg}`} alt="" width="100px" />}
            </Form.Item>
            
            <Form.Item name="title" label={t('newsCreate.form.title')} >
                <Input />
            </Form.Item>
            <Form.Item name="tag" label={t('newsCreate.form.tag')}>
                <Input />
            </Form.Item>
            <Form.Item name="description" label={t('newsCreate.form.content')} >
                <TextArea rows={10} />
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
    asynDetail: (payload) => actions.asyncDetail(dispatch)(payload),
    asynUpdate: (payload) => actions.asyncUpdate(dispatch)(payload),
})

// const withConnect = connect(mapStateToProps, mapDispatchToProps)
// export default compose(withConnect)(FormEditNews)
const FormEditNews = withTranslation()(connect(mapStateToProps, mapDispatchToProps)(FormEditNewsComponent))
export default FormEditNews
