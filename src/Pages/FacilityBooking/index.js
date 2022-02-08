import React, { useState, useEffect } from 'react'
import logo from '../../Assets/img/logoEstella.png'
import {
  UndoOutlined
} from '@ant-design/icons'
import { Carousel, Tabs, Table, Tag } from 'antd'
import './style.scss'
import { useNavigate } from "react-router-dom"
import ItemBooking from '../../Components/ItemBooking'

import * as actions from './stores/actions'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { selectFacilityBooking, selectBooking } from './stores/selectors'
import { withTranslation, useTranslation } from "react-i18next"

const { TabPane } = Tabs
const FacilityBookingComponent = ({ t, listData, getAll, listDataBooking, getAllBooking, asynBookingDetail, asynBookingSubmit }) => {
  const [page, setPage] = useState(1)
  // const [data, setData] = useState([])
  const navigate = useNavigate()
  const [pagination, setPagination] = useState({})
  const [payload, setPayload] = useState({
    search: "",
    paging: {
      pageIndex: 1,
      pageSize: 20
    },
    sorting: {
      field: "createdAt",
      order: "desc"
    }
  })
  useEffect(() => {
    var loggedInUser = sessionStorage.getItem("User")
    if (loggedInUser === null) {
      navigate("/login")
    }
  }, [])
  useEffect(() => {
    getAll(payload)
  }, [])
  useEffect(() => {
    getAllBooking(payload)
  }, [payload])
  const handleTableChange = (pagination, filters, sorter) => {
    const order = (sorter.order === 'descend') ? 'desc' : 'asc'
    const field = sorter.field
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
  const columns = [
    {
      title: 'Id',
      key: 'id',
      render: (value, item, index) => (page - 1) * 10 + index + 1,
    },
    { title: t('FacilityBooking.table.tilte'), dataIndex: 'serviceName', key: 'serviceName', sorter: {} },
    {
      title: t('FacilityBooking.table.status'),
      dataIndex: 'status',
      key: 'Status',
      sorter: {},
      render: (text, record) => {
        let active = 'red'
        if (text === 'APPROVED') {
          active = 'green'
        }
        return (
          <Tag color={active}>
            {text || 'null'}
          </Tag>
        )
      },
    },
    { title: t('FacilityBooking.table.bookingTime'), dataIndex: 'bookingTime', key: 'bookingTime', sorter: {} },
    { title: t('FacilityBooking.table.bookingDate'), dataIndex: 'chooseDate', key: 'chooseDate', sorter: {} },
    { title: t('FacilityBooking.table.createdAt'), dataIndex: 'createdAt', key: 'createdAt', sorter: {} },
  ]
  return (
    <div style={{ background: ' #f0f2f5' }}>
      <div className='facilityBookingHeader'>
        <div className="facilityBookingHeaderLogo">
          <img src={logo} alt='' />
        </div>
        <div className="facilityBookingHeaderTitle">
          {t("FacilityBooking.title")}
        </div>
        <div className="facilityBookingHeaderAction">
          <UndoOutlined onClick={() => navigate('/')} />
        </div>
      </div>
      <div className='sliderPageFacility'>
        <Carousel autoplay >
          <div>
            <div className='imgSlider' style={{ backgroundImage: 'url(https://wallpaperaccess.com/full/2026601.jpg)' }}></div>
          </div>
          <div>
            <div className='imgSlider' style={{ backgroundImage: 'url(https://wallpaperaccess.com/full/1615493.jpg)' }}></div>
          </div>
          <div>
            <div className='imgSlider' style={{ backgroundImage: 'url(https://wallbox.ru/resize/1680x1050/wallpapers/main/201336/anime-panorama-priroda-5d1a803.jpg)' }}></div>
          </div>
        </Carousel>
      </div>
      <div className="PageFacilityContent">
        <Tabs defaultActiveKey="1" >
          <TabPane tab={t("FacilityBooking.booking")} key="Booking" >
            <div className="listBooking">
              {
                listData.map((item, index) => (
                  <ItemBooking
                    key={index}
                    name={item.name}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    id={item.id}
                    asynBookingDetail={asynBookingDetail}
                    asynBookingSubmit={asynBookingSubmit}
                  />
                ))
              }
            </div>
          </TabPane>
          <TabPane tab={t("FacilityBooking.history")} key="History" >
            <div className="tableFacilityBooking">
              <Table
                columns={columns}
                dataSource={listDataBooking}
                onChange={handleTableChange}
                pagination={pagination}
                className="tableBooking"
                scroll={{ x: 1000 }}
              />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}
const mapStateToProps = createStructuredSelector({
  listData: selectFacilityBooking,
  listDataBooking: selectBooking,
})
const mapDispatchToProps = (dispatch) => ({
  getAll: (payload) => dispatch(actions.getAll(payload)),
  getAllBooking: (payload) => dispatch(actions.getAllBooking(payload)),
  asynBookingDetail: (payload) => actions.asyncGetBookingDetail(dispatch)(payload),
  asynBookingSubmit: (payload) => actions.asyncBookingSubmit(dispatch)(payload),
})

// const withConnect = connect(mapStateToProps, mapDispatchToProps)
// export default compose(withConnect)(FacilityBooking)
const FacilityBooking = withTranslation()(connect(mapStateToProps, mapDispatchToProps)(FacilityBookingComponent))
export default FacilityBooking