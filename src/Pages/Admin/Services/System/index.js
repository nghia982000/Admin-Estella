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
  notification,
  Spin,
  Select,
  DatePicker,
  Drawer
} from 'antd'
import { AppstoreAddOutlined, UserAddOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom"
import * as actions from "./stores/actions";
import { connect, connectAdvanced } from "react-redux";
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withTranslation, useTranslation } from "react-i18next"

const { Search } = Input;
const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;

const SystemComponent = ({ asynGetAllSystem, asynDeleteSystem, t }) => {
  const [loading, setLoading] = useState(true)
  const [toggle, setToggle] = useState(true)
  const [dataSystem, setDataSystem] = useState([])
  const [page, setPage] = React.useState(1)
  const navigate = useNavigate()
  const [pagination, setPagination] = useState({})
  const [systemDetail, setSystemDetail] = useState({});
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
    const data = await asynGetAllSystem(payload)
    console.log(data.result.paging)
    setPagination(data.result.paging)
    setDataSystem(data.result.data)
    setLoading(false)
  }, [payload,toggle])

  const handleDelete = async (id) => {
    const response = await asynDeleteSystem(id)
    console.log(response)
    if (response.status === 200) {
      notification.open({
        message: 'Xóa thành công',
        icon: <CheckCircleOutlined style={{ color: "green" }} />,
      })
    }
    else {
      notification.open({
        message: `Lỗi ${response.data.code}`,
        description: `${response.data.message}`,
        icon: <CloseCircleOutlined style={{ color: "red" }} />,
      })
    }
    setToggle(!toggle)
  }
  const handleTableChange = (pagination, filter, sorter) => {
    console.log(sorter)
    const order = (sorter.order === 'descend') ? 'desc' : 'asc'
    const field = sorter.field
    console.log(order, field)
    setPayload({
      ...payload,
      paging: {
        pageIndex: pagination.current
      },
      sorting: {
        field,
        order
      }
    })
    setPage(pagination.current)
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
  const columns = [
    {
      title: "Id",
      key: "id",
      dataIndex: "id",
      render: (value, item, index) => (page - 1) * 10 + index + 1,
    },
    {
      title: t("system.title"),
      dataIndex: "name",
      key: "name",
      sorter: {},
    },
    {
      title: t("system.type"),
      dataIndex: "type",
      key: "type",
      sorter: {},
    },
    {
      title: t("system.status"),
      dataIndex: "status",
      key: "status",
      sorter: {},
    },
    {
      title: t("system.action"),
      dataIndex: '',
      key: 'x',
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="User này sẽ bị xóa vĩnh viễn"
            onConfirm={() => handleDelete(record.id)}
          >
            <button>Delete</button>
          </Popconfirm>
        </Space>

      )
    },
  ];
  return (
    <div>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>{t("system.Breadcrumb1")}</Breadcrumb.Item>
        <Breadcrumb.Item>{t("system.Breadcrumb2")}</Breadcrumb.Item>
        <Breadcrumb.Item>{t("system.Breadcrumb3")}</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ margin: "16px 0", fontSize: "25px" }}>{t("system.name")}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 0",
        }}
      >
        <form>
          <Search placeholder={t("system.search")} enterButton style={{ width: '400px' }} onSearch={searchInp} /></form>
        <Button type="primary" icon={<UserAddOutlined />} onClick={() => navigate('/system/createSystem')}>{t("systemcreate.title")}</Button>
        {/* <Space direction="vertical" size={12}>
          <RangePicker />
        </Space> */}
      </div>
      <Table
        columns={columns}
        dataSource={dataSystem}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: 800 }}
      />
    </div>
  );
}




const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({
  asynGetAllSystem: (payload) => actions.asyncGetAll(dispatch)(payload),
  asynDeleteSystem: (payload) => actions.asyncDelete(dispatch)(payload),
})

// const withConnect = connect(mapStateToProps, mapDispatchToProps);
// export default compose(withConnect)(System);
const System = withTranslation()(connect(mapStateToProps, mapDispatchToProps)(SystemComponent))
export default System
