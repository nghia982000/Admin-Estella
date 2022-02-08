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
import {useNavigate } from "react-router-dom"

import { withTranslation, useTranslation } from "react-i18next"

const { Search } = Input
const { TabPane } = Tabs
const { Option } = Select


const NewsComponent = ({ asynGetAll,asynDelete,asynDetail,dataDetailNews,t }) => {
    const [loading,setLoading]=useState(true)
    const [page, setPage] = useState(1)
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [pagination, setPagination] = useState({})
    const [toggle, setToggle] = useState(true)
    const [payload, setPayload] = useState({
        search: "",
        paging: {
            pageIndex: 1,
            pageSize: 10
        },
        sorting: {
            field: "createdAt",
            order: "desc"
        }
    })
    useEffect(async () => {
        setLoading(true)
        const dataAll = await asynGetAll(payload)
        
        console.log(dataAll.result.data)
        
        setData(dataAll.result.data)
        console.log(dataAll.result.paging)
        setPagination(dataAll.result.paging)
        setLoading(false)
    }, [payload,toggle])
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
    const searchInp = (value) => {
        setPayload({ 
            ...payload, 
            search: value,
            paging:{
                total:pagination.total
            } })
            setPage(1)
    }   
    const handleDelete = async(id) => {
        console.log(id)
        const response= await asynDelete(id)
        console.log(response)
        setToggle(!toggle)
    }
    const handleEdit =(id) => {
            navigate(`/new/formEditNews/${id}`)
    }
    const columns = [
        { 
            title: 'Id', 
            key: 'id' ,
            render: (value, item, index) => (page - 1) * 10 + index + 1,
            width:'70px'
        },
        { title: t('news.table.title'), dataIndex: 'title', key: 'title', sorter: {} ,ellipsis: true,},
        { title: t('news.table.tag'), dataIndex: 'tag', key: 'tag', sorter: {} },
        { title: t('news.table.CreatedAt'), dataIndex: 'createdAt', key: 'createdAt', sorter: {} },
        { title: t('news.table.CreatedBy'), dataIndex: 'createdBy', key: 'createdBy', sorter: {} },
        {
            title: t('news.table.action'),
            dataIndex: '',
            key: 'x',
            render: (text, record) => (
                <Space size="middle">
                <button onClick={() => handleEdit(record.id)}  >{ t('news.table.btnEdit')}</button>
                    <Popconfirm
                        title={ t('news.table.delete')}
                    onConfirm={() => handleDelete(record.id)}
                    >
                        <button>{ t('news.table.btndelete')}</button>
                    </Popconfirm>
                </Space>

            )
        },
    ]
    return (
        <div>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>{ t('news.Breadcrumb1')}</Breadcrumb.Item>
                <Breadcrumb.Item>{ t('news.Breadcrumb2')}</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ margin: '16px 0', fontSize: '25px' }}>{ t('news.title')}</div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '20px 0'
            }}>
                <Search placeholder={ t('news.search')} enterButton style={{ width: '400px' }} onSearch={searchInp} />
                <Button type="primary" icon={<PaperClipOutlined />} onClick={()=>navigate('/new/formDataNews')}>{ t('news.create')}</Button>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={pagination}
                onChange={handleTableChange}
                loading={loading}
                scroll={{ x: 1000 }}
            />
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    dataDetailNews:selectDetailNews
})
const mapDispatchToProps = (dispatch) => ({
    asynGetAll: (payload) => actions.asyncGetAll(dispatch)(payload),
    asynDelete: (payload) => actions.asyncDelete(dispatch)(payload),
    asynDetail: (payload) => actions.asyncDetail(dispatch)(payload),
})

// const withConnect = connect(mapStateToProps, mapDispatchToProps)
// export default compose(withConnect)(News)
const News = withTranslation()(connect(mapStateToProps, mapDispatchToProps)(NewsComponent))
export default News