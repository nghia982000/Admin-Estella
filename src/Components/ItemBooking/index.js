import React, { useState, useEffect } from 'react'
import './style.scss'
import {
    Modal,
    Button,
    Form,
    Input,
    Calendar,
    Select,
    notification
} from 'antd'
import {CloseCircleOutlined } from '@ant-design/icons';
const { Option } = Select
const ItemBooking = ({ name, imageUrl, description, id,asynBookingDetail,asynBookingSubmit }) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [formModal] = Form.useForm()
    const [ServiceTimeId,SetServiceTimeId]=useState([])
    const handleCancel = () => {
        setIsModalVisible(false)
    }
    const onFinish = async (values) => {
        const  today = new Date()
        const date =today.getFullYear()+'-'+(today.getMonth()+1)+'-'+ today.getDate()
        const payload={
            ChooseDate:date,
            ServiceId:id,
            ServiceTimeId:values.ServiceTimeId
        }
        const response= await asynBookingSubmit(payload)
        console.log(response)
        if(response.code!==200){
            notification.open({
              message: `Lỗi ${response.code}`,
              description: `${response.message}`,
              icon: <CloseCircleOutlined style={{ color: "red" }} />,
          })
          }
    }
    const showModal = async() => {
        const  today = new Date()
        const date =today.getFullYear()+'-'+(today.getMonth()+1)+'-'+ today.getDate()
        console.log(date)
        console.log(id)
        const payload={
            ChooseDate:date,
            ServiceId:id
        }
        const response = await asynBookingDetail(payload)
        console.log(response.result)
        SetServiceTimeId(response.result)
        setIsModalVisible(true)
    }
    return (
        <>
            <div className="itemBooking" onClick={showModal}>
                <div className="itemBookingContainer">
                    <img className="itemBookingImg" src={imageUrl} alt="" />
                    <div className="itemBookingContent">
                        <div className="itemBookingTitle">
                            {name}
                        </div>
                        <div className="itemBookingDescription">
                            {description}
                        </div>
                    </div>
                </div>
                <div className="itemBookingFooter">
                    Booking
                </div>
            </div>
            <Modal
                width={600}
                title='Đăng ký tiện ích'
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 17 }}
                    form={formModal}
                    name="formModal"
                    onFinish={onFinish}

                >
                    <Form.Item name='schedule' style={{ justifyContent: 'center' }} >
                        <div className="site-calendar-demo-card">
                            <Calendar fullscreen={false}  />
                        </div>
                    </Form.Item>

                    <Form.Item name="ServiceTimeId" label="Time" rules={[{ required: true, message: 'Time is required' }]}>
                        <Select >
                            {
                               ServiceTimeId&&ServiceTimeId.map((item, index)=>(
                                    <Option value={item.id}>{`${item.startTime}-${item.endTime}`}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="description" label="Ghi chú" >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 17,
                        }}
                    >
                        <Button type="primary" htmlType="submit" form="formModal">
                           Nộp
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ItemBooking
