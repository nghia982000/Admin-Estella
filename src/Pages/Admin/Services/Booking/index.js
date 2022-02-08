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
  DatePicker,
  Drawer,
  Row,
  Col,
  Tag,
} from "antd";
import * as actions from "./stores/actions";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import "./style.css";
import { t } from "i18next";
import { withTranslation, useTranslation } from "react-i18next";

const { Search } = Input;
const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;

const BookingServices = ({ asynGetAllBooking, asyncGetDetail }) => {
  const [dataBooking, setDataBooking] = useState([]);
  const [loading, setLoading] = useState(true)
  const [page, setPage] = React.useState(1);
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState()
  const [payload, setPayload] = useState({
    search: "",
    paging: {
      pageIndex: 1,
      pageSize: 10,
    },
    sorting: {
      field: "Service Name",
      order: "asc",
    },
    endAt: null,
    startAt:null
  })
  const [bookingDetail, setBookingDetail] = useState({
    createdBy: "",
    phoneNumber: "",
    email: "",
    room: "",
    debtAmount: "",
    createdAt: "",
    description: "",
    serviceName: "",
    chooseDate: "",
    startTime: "",
    endTime: "",
  });

  const showDrawer = async (id) => {
    const detail = await asyncGetDetail(id);
    setBookingDetail(detail.data.result);
    console.log(detail.data.result);
    setVisible(true);

    console.log(bookingDetail);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(async () => {
    setLoading(true)
    const data = await asynGetAllBooking(payload);
    console.log(data.result);
    setDataBooking(data.result.data);
    setLoading(false)
  }, [payload]);
  const onchangeSchedule = (dateString) => {
    console.log(dateString)
    if(dateString){
      setDate({
        endAt: dateString[0],
        startAt: dateString[1]
      })
    }else{
      setDate({
        endAt: null,
        startAt: null
      })
    }
  }
  const searchInp = (value) => {
    console.log(value,date)
    if(date){
      setPayload({ 
        ...payload, 
        search: value,
        endAt:date.endAt,
        startAt:date.startAt 
      })
    }else{
      setPayload({ 
        ...payload, 
        search: value
      })
    }
  }
  const columns = [
    {
      title: "Id",
      key: "id",
      render: (value, item, index) => (page - 1) * 10 + index + 1,
    },
    {
      title: t("booking.table.serviceName"),
      dataIndex: "serviceName",
      key: "title",
      sorter: (a, b) => a.serviceName.localeCompare(b.serviceName),
      render: (text, record) => (
        <a onClick={() => showDrawer(record.id)}>{text}</a>
      ),
    },
    {
      title: t("booking.table.status"),
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status) => (
        <>
          {status === "REJECTED" ? (
            <Tag color="red" key={status}>
              {status}
            </Tag>
          ) : (
            <Tag color="green" key={status}>
              {status}
            </Tag>
          )}
        </>
      ),
    },
    {
      title: t("booking.table.createdBy"),
      dataIndex: "createdBy",
      key: "createdBy",
      sorter: (a, b) => a.createdBy.localeCompare(b.createdBy),
    },
    {
      title: t("booking.table.bookDate"),
      dataIndex: "chooseDate",
      key: "chooseDate",
      sorter: (a, b) => a.chooseDate.localeCompare(b.chooseDate),
    },
    {
      title: t("booking.table.bookTime"),
      dataIndex: "bookingTime",
      key: "bookingTime",
      sorter: (a, b) => a.bookingTime.localeCompare(b.bookingTime),
    },
  ];
  return (
    <div>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>{t("booking.breadscrumb.home")}</Breadcrumb.Item>
        <Breadcrumb.Item>{t("booking.breadscrumb.service")}</Breadcrumb.Item>
        <Breadcrumb.Item>
          {t("booking.breadscrumb.serviceOnBook")}
        </Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ margin: "16px 0", fontSize: "25px" }}>
        {t("booking.breadscrumb.serviceOnBook")}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 0",
        }}
      >
        <Search
          placeholder={t("booking.search.input")}
          enterButton
          style={{ width: "400px" }}
          onSearch={searchInp}
        />
        <Space direction="vertical" size={12}>
          <RangePicker onChange={onchangeSchedule} />
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={dataBooking}
        loading={loading}
        scroll={{ x: 1000 }}
        pagination={{
          onChange(current) {
            setPage(current);
          },
        }}
      />
      <Drawer
        title="Booking Details"
        placement="right"
        onClose={onClose}
        visible={visible}
        width={640}
      >
        <h3 id="header">{t("booking.detail.information")}</h3>

        {bookingDetail.status === "APPROVED" ? (
          <Tag color="green">{bookingDetail.status}</Tag>
        ) : (
          <Tag color="red">{bookingDetail.status}</Tag>
        )}

        <Row className="first-wrapper"> 
          <Col span={12}>
            <p>
              {t("booking.detail.createdBy")} {bookingDetail.createdBy}
            </p>
            <p>
              {t("booking.detail.email")} {bookingDetail.email}
            </p>
            <p>
              {t("booking.detail.room")} {bookingDetail.room}
            </p>
            <p>
              {t("booking.detail.createdAt")} {bookingDetail.createdAt}
            </p>
          </Col>
          <Col span={12}>
            <p>
              {t("booking.detail.phoneNumber")} {bookingDetail.phoneNumber}
            </p>
            <p>
              {t("booking.detail.debtAmount")} {bookingDetail.debtAmount}
            </p>
            <p>
              {t("booking.detail.description")} {bookingDetail.description}
            </p>
          </Col>
        </Row>
        <Row className="second-wrapper">
          <Col span={12}>
            <p>
              {t("booking.detail.serviceName")} {bookingDetail.serviceName}
            </p>
            <p>
              {t("booking.detail.chooseDate")} {bookingDetail.chooseDate}
            </p>
            <p>
              {t("booking.detail.startTime")} {bookingDetail.startTime}
            </p>
          </Col>
          <Col span={12}>
            <p>
              {t("booking.detail.endTime")} {bookingDetail.endTime}
            </p>
          </Col>
        </Row>
      </Drawer>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({
  asynGetAllBooking: (payload) => actions.asyncGetAllBooking(dispatch)(payload),

  asyncGetDetail: (payload) => actions.asyncGetDetail(dispatch)(payload),
});

const Booking = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(BookingServices)
);
export default Booking;
