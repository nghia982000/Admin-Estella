import React, { useState, useEffect } from "react";
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
    Select,
    Tag
} from 'antd'
import './style.scss'
import { UserAddOutlined } from '@ant-design/icons'
import { useNavigate} from "react-router-dom"

import * as actions from './stores/actions'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import { withTranslation, useTranslation } from "react-i18next"

const { Search } = Input
const { Option } = Select
const { TabPane } = Tabs

const UserComponent = ({
    asynGetAll,
    asynGetResident,
    asynGetTenant,
    asynGetAdmin,
    asynGetReception,
    asynGetAccountant,
    asynGetSecurity,
    asynGetGuest,
    asynDelete,
    t

}) => {
    const [loading,setLoading]=useState(true)
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [tab, setTab] = useState('all')
    const [pagination, setPagination] = useState({})
    const [toggle, setToggle] = useState(true)
    const navigate = useNavigate()
    const payloadDefault={
        search: "",
        paging: {
            pageIndex: 1,
            pageSize: 10
        },
        sorting: {
            field: "username",
            order: "asc"
        }
    }
    const [payload, setPayload] = useState(payloadDefault)
    useEffect(async () => {
        setLoading(true)
        switch (tab) {
            case "all":
                const dataAll = await asynGetAll(payload)
                console.log(dataAll.result.data)
                setData(dataAll.result.data)
                console.log(dataAll.result.paging)
                setPagination(dataAll.result.paging)
                break
            case "resident":
                const dataResident = await asynGetResident(payload)
                console.log(dataResident.result.data)
                setData(dataResident.result.data)
                setPagination(dataResident.result.paging)
                break
            case "tenant":
                const dataTenant = await asynGetTenant(payload)
                console.log(dataTenant.result.data)
                setData(dataTenant.result.data)
                setPagination(dataTenant.result.paging)
                break
            case "admin":
                const dataAdmin = await asynGetAdmin(payload)
                console.log(dataAdmin.result.data)
                setData(dataAdmin.result.data)
                setPagination(dataAdmin.result.paging)
                break
            case "reception":
                const dataReception = await asynGetReception(payload)
                console.log(dataReception.result.data)
                setData(dataReception.result.data)
                setPagination(dataReception.result.paging)
                break
            case "accountant":
                const dataAccountant = await asynGetAccountant(payload)
                console.log(dataAccountant.result.data)
                setData(dataAccountant.result.data)
                setPagination(dataAccountant.result.paging)
                break
            case "security":
                const dataSecurity = await asynGetSecurity(payload)
                console.log(dataSecurity.result.data)
                setData(dataSecurity.result.data)
                setPagination(dataSecurity.result.paging)
                break
            case "guest":
                const dataGuest = await asynGetGuest(payload)
                console.log(dataGuest.result.data)
                setData(dataGuest.result.data)
                setPagination(dataGuest.result.paging)
                break
            default:
                return

        }
        // setPagination({...pagination,pageIndex: 1})
        setLoading(false)
    }, [tab, payload,toggle])
    const searchInp = (value) => {
        setPayload({ 
            ...payload, 
            search: value,
            paging:{
                total:pagination.total
            } })
            setPage(1)
    }
    const TabOnchange = (key) => {
        setPage(1)
        setPayload(payloadDefault)
        setTab(key)
    }
    const handleTableChange = (pagination, filters, sorter) => {
        console.log(sorter)
        const order = (sorter.order === 'descend') ? 'desc' : 'asc'
        const field = sorter.field
        console.log(order, field)
        setPage(pagination.current)
        setPayload({
            ...payload,
            paging: {
                pageIndex: pagination.current,
                pageSize: pagination.pageSize
            },
            sorting: {
                field,
                order
            }
        })
    }
    const handleDelete = async(username) => {
        console.log(username)
        const response= await asynDelete(username)
        console.log(response)
        setToggle(!toggle)
    }
    const columns = [
        { 
            title: 'Id', 
            key: 'id' ,
            render: (value, item, index) => (page - 1) * 10 + index + 1,
        },
        { title: t('user.table.username'), dataIndex: 'username', key: 'username', sorter: {} },
        { 
            title:  t('user.table.status'), 
            dataIndex: 'status', 
            key: 'status', 
            sorter: {} ,
            render: (text, record) => {
                    let active='red'
                    if(text==='Deactivated'){
                        active='green'
                    }
                    return (
                        <Tag color={active}>
                        {text||'null'}
                      </Tag>
                    )
              },
        },
        { title:  t('user.table.fullname'), dataIndex: 'fullName', key: 'fullName', sorter: {} },
        { title:  t('user.table.debtAmount'), dataIndex: 'debtAmount', key: 'debtAmount', sorter: {} },
        {
            title:  t('user.table.action'),
            dataIndex: '',
            key: 'x',
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm
                        title={t('user.table.delete')}
                        onConfirm={() => handleDelete(record.username)}
                    >
                        <button>{t('user.table.btndelete')}</button>
                    </Popconfirm>
                </Space>

            )
        },
    ]
    return (
        <div>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>{t("user.Breadcrumb1")}</Breadcrumb.Item>
                <Breadcrumb.Item>{t("user.Breadcrumb2")}</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ margin: '16px 0', fontSize: '25px' }}>{t("user.title")}</div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Search placeholder={t("user.search")} enterButton style={{ width: '400px' }} onSearch={searchInp} />
                <Button type="primary" icon={<UserAddOutlined />} onClick={()=>navigate('/user/createUser')}>{t("user.create")}</Button>
            </div>
            <Tabs defaultActiveKey="1" onChange={TabOnchange} >
                <TabPane tab={t("user.tab.all")} key="all" >
                </TabPane>
                <TabPane tab={t("user.tab.Residence")} key="resident" >
                </TabPane>
                <TabPane tab={t("user.tab.Tenant")} key="tenant" >
                </TabPane>
                <TabPane tab={t("user.tab.Admin")} key="admin" >
                </TabPane>
                <TabPane tab={t("user.tab.Reception")} key="reception" >
                </TabPane>
                <TabPane tab={t("user.tab.Accountant")} key="accountant" >
                </TabPane>
                <TabPane tab={t("user.tab.Security")} key="security" >
                </TabPane>
                <TabPane tab={t("user.tab.Guest")} key="guest" >
                </TabPane>
            </Tabs>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={pagination}
                onChange={handleTableChange}
                scroll={{ x: 800 }}
            />,
        </div>
    )
}


const mapStateToProps = createStructuredSelector({
})

const mapDispatchToProps = (dispatch) => ({
    asynGetAll: (payload) => actions.asyncGetAll(dispatch)(payload),
    asynGetResident: (payload) => actions.asyncGetResident(dispatch)(payload),
    asynGetTenant: (payload) => actions.asyncGetTenant(dispatch)(payload),
    asynGetAdmin: (payload) => actions.asyncGetAdmin(dispatch)(payload),
    asynGetReception: (payload) => actions.asyncGetReception(dispatch)(payload),
    asynGetAccountant: (payload) => actions.asyncGetAccountant(dispatch)(payload),
    asynGetSecurity: (payload) => actions.asyncGetSecurity(dispatch)(payload),
    asynGetGuest: (payload) => actions.asyncGetGuest(dispatch)(payload),
    asynDelete: (payload) => actions.asyncDelete(dispatch)(payload),
})

// const withConnect = connect(mapStateToProps, mapDispatchToProps)
// export default compose(withConnect)(User)

const User = withTranslation()(connect(mapStateToProps, mapDispatchToProps)(UserComponent))
export default User
