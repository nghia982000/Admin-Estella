import React, { useState, useEffect } from 'react'
import {
    Breadcrumb,
    Input,
    Tabs,
    Table,
    Popconfirm,
    Space,
    Modal,
    Button,
    Form,
    InputNumber,
    Spin,
    Select
} from 'antd'
import { PaperClipOutlined } from '@ant-design/icons'
import './style.scss'

import * as actions from './stores/actions'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { selectDetailNews } from './stores/selectors'
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { withTranslation, useTranslation } from "react-i18next"



const { Search } = Input
const { TabPane } = Tabs
const { Option } = Select


const AccountComponent = ({asynGetAll,t}) => {
    const [loading,setLoading]=useState(true)
    const [page, setPage] = useState(1)
    const navigate = useNavigate()
    const [data, setData] = useState([])
    useEffect(async()=>{
        setLoading(true)
        const response=await asynGetAll()
        console.log(response)
        setData(response.result.data)
        setLoading(false)
    },[])
    const handleTableChange = (pagination) => {
        setPage(pagination.current)
    }
    const columns = [
        { 
            title: 'Id', 
            key: 'id' ,
            render: (value, item, index) => (page - 1) * 10 + index + 1,
        },
        { title: t('account.table.username'), dataIndex: 'username', key: 'username', sorter: {} },
        { title: t('account.table.fullname'), dataIndex: 'fullName', key: 'fullName', sorter: {} },
        { title:  t('account.table.phoneNumber'), dataIndex: 'phoneNumber', key: 'phoneNumber', sorter: {} },
        { title:  t('account.table.email'), dataIndex: 'email', key: 'email', sorter: {} },
        { title: t('account.table.CreatedAt'), dataIndex: 'createdAt', key: 'createdAt', sorter: {} },
    ]
    return (
        <div>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>{t('account.Breadcrumb1')}</Breadcrumb.Item>
                <Breadcrumb.Item>{t('account.Breadcrumb2')}</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ margin: '16px 0', fontSize: '25px' }} >{t('account.title')}</div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding:'20px 0'
            }}>
                <Button type="primary" icon={<PaperClipOutlined />}onClick={()=>navigate('/account/createAccount')}>{t('account.create')}</Button>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                onChange={handleTableChange}
                scroll={{ x: 800 }}
            />
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
})
const mapDispatchToProps = (dispatch) => ({
    asynGetAll: () => actions.asyncGetAll(dispatch)()
})

// const withConnect = connect(mapStateToProps, mapDispatchToProps)
// export default compose(withConnect)(Account)


const Account = withTranslation()(connect(mapStateToProps, mapDispatchToProps)(AccountComponent))
export default Account
