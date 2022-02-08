import React, { useState, useEffect } from 'react'
import './style.scss'
import 'antd/dist/antd.css'
import EmptyPage from './EmptyPage'
import logoAd from '../../Assets/img/logo.png'
import User from './User'
import CreateUser from './User/CreateUser'
import News from './News'
import FormDataNews from './News/FormDataNews'
import FormEditNews from './News/FormEditNews'
import Booking from './Services/Booking'
import System from './Services/System'
import Account from './Account'
import CreateAccount from './Account/CreateAccount'
import CreateService from './Services/System/Services'
import logo from '../../Assets/img/logo192.png'
import { Layout, Menu, Drawer } from 'antd'
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DashboardOutlined,
    UserOutlined,
    CoffeeOutlined,
    SolutionOutlined,
    FormOutlined,
    ContactsOutlined,
    DollarOutlined,
    ApiOutlined,
    CustomerServiceOutlined,
    LogoutOutlined,
    SettingOutlined,
    GlobalOutlined,
    TableOutlined,
    CheckCircleOutlined,
    CodepenCircleOutlined,
    CloseCircleOutlined

} from '@ant-design/icons'
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
    notification
} from 'antd'


import * as actions from './stores/actions'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import { withTranslation, useTranslation } from "react-i18next"

const { Header, Sider, Content } = Layout
const { SubMenu } = Menu

const DefaultLayoutComponent = ({ asynChangePassword, t }) => {
    const { i18n } = useTranslation()
    const [colapsed, setColapsed] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [userName, setUserName] = useState()
    const [formModal] = Form.useForm()
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false)
    const toggle = () => {
        setCollapsed(!collapsed)
    }
    const [toggleAccount, setToggleAccount] = useState(false)
    const [toggleLanguage, setToggleLanguage] = useState(false)
    const SignOut = () => {
        setToggleAccount(!toggleAccount)
        sessionStorage.removeItem('User')
        navigate("/login")
        notification.open({
            message: 'Đăng xuất thành công',
            icon: <CheckCircleOutlined style={{ color: "green" }} />,
        })
    }
    useEffect(() => {
        var loggedInUser = sessionStorage.getItem("User")
        setUserName(sessionStorage.getItem("UserName"))
        if (loggedInUser === null) {
            navigate("/login")
        }
    }, [])
    const onFinish = async (values) => {
        const response = await asynChangePassword(values)
        if (response.code === 200) {
            notification.open({
                message: 'Đổi mật khẩu thành công',
                icon: <CheckCircleOutlined style={{ color: "green" }} />,
            })
            navigate("/")
            setIsModalVisible(false)
        }
        else {
            notification.open({
                message: `Lỗi ${response.code}`,
                description: `${response.message}`,
                icon: <CloseCircleOutlined style={{ color: "red" }} />,
            })
        }
    }
    const showModal = () => {
        setToggleAccount(!toggleAccount)
        formModal.resetFields()
        setIsModalVisible(true)
    }
    const handleCancel = () => {
        setIsModalVisible(false)
    }
    const changeLanguage = (lang) => {
        setToggleLanguage(!toggleLanguage)
        i18n.changeLanguage(lang)
    }
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    return (
        <>
            <Layout>
                <Sider className="site-layout-background" width={260} trigger={null} collapsed={collapsed} breakpoint="lg" collapsedWidth={(colapsed) ? '0' : '80'}
                    onCollapse={() => {
                        setCollapsed(!collapsed)
                        setColapsed(!colapsed)
                    }}
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    style={{
                        height: '100vh',
                    }}>

                    <div className="logo" onClick={() => navigate("/resident/facilitybooking")}>
                        <img src={logoAd} alt='' />
                    </div>
                    <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} className="SiderMenu"
                    >
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <Link to="/">{t("menu.userManagement")}</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<CoffeeOutlined />}>
                            <Link to="/news">{t("menu.news")}</Link>
                        </Menu.Item>
                        <SubMenu key="sub4" icon={<CustomerServiceOutlined />} title={t("menu.services")}>
                            <Menu.Item key="3" icon={<TableOutlined />}>
                                <Link to="/services/booking">{t("menu.services.booking")}</Link>
                            </Menu.Item>
                            <Menu.Item key="4" icon={<CodepenCircleOutlined />}>
                                <Link to="/services/system">{t("menu.services.system")}</Link>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="5" icon={<ContactsOutlined />}>
                            <Link to="/account">{t("menu.createAccount")}</Link>
                        </Menu.Item>
                    </Menu>

                </Sider>
                <Layout className="site-layout">
                    <Header className="headerContent site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                        })}
                        <MenuUnfoldOutlined className='triggerResponsive' onClick={showDrawer} style={{
                            padding: '0 24px',
                            fontSize: '18px',
                            lineHeight: '64px',
                            cursor: 'pointer',
                            transition: 'color 0.3s',
                        }} />
                        <div className="account">
                            <img src={logo} alt='' onClick={() => setToggleAccount(!toggleAccount)} />
                            <p>{userName}</p>
                            {toggleAccount &&
                                <div className='selectionItem'>
                                    <p onClick={SignOut} ><LogoutOutlined />  Đăng xuất</p>
                                    <p onClick={showModal}><SettingOutlined />  Đổi mật khẩu</p>
                                </div>
                            }
                            <div className='language' onClick={() => setToggleLanguage(!toggleLanguage)}>
                                <GlobalOutlined />
                            </div>
                            {toggleLanguage &&
                                <div className='selectionItem'>
                                    <p onClick={() => changeLanguage("vi")} >Vn Tiếng việt</p>
                                    <p onClick={() => changeLanguage("en")}>En English</p>
                                </div>
                            }
                        </div>

                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            height: '500px',
                            overflow: 'auto'
                        }}
                    >
                        <Routes>
                            <Route path="/" element={<User />} />
                            <Route path="/news" element={<News />} />
                            <Route path="/services/booking" element={<Booking />} />
                            <Route path="/services/system" element={<System />} />
                            <Route path="/account" element={<Account />} />
                            <Route path="/user/createUser" element={<CreateUser />} />
                            <Route path="/new/formDataNews" element={<FormDataNews />} />
                            <Route path="/new/formEditNews/:id" element={<FormEditNews />} />
                            <Route path="/account/createAccount" element={<CreateAccount />} />
                            <Route path="/system/createSystem" element={<CreateService />} />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
            <Modal
                width={500}
                title='Đổi mật khẩu'
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 17 }}
                    form={formModal}
                    name="formModal"
                    onFinish={onFinish}

                >
                    <Form.Item name="oldPassword" label="Mật khẩu cũ" rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu cũ'
                        }
                    ]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="NewPassword" label="Mật khẩu mới" rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu mới'
                        }
                    ]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="confirmPassword" label="Nhập lại mật khẩu" rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập lại mật khẩu'
                        }
                    ]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 18,
                        }}
                    >
                        <Button type="primary" htmlType="submit" form="formModal">
                            Đổi mật khẩu
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Drawer placement="left" closable={false} onClose={onClose} visible={visible}
                className='drawerMenu'
            >
                <div className="logo" onClick={() => navigate("/resident/facilitybooking")}>
                    <img src={logoAd} alt='' />
                </div>
                <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} className="SiderMenu"
                >
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Link to="/">{t("menu.userManagement")}</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<CoffeeOutlined />}>
                        <Link to="/news">{t("menu.news")}</Link>
                    </Menu.Item>
                    <SubMenu key="sub4" icon={<CustomerServiceOutlined />} title={t("menu.services")}>
                        <Menu.Item key="3" icon={<TableOutlined />}>
                            <Link to="/services/booking">{t("menu.services.booking")}</Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<CodepenCircleOutlined />}>
                            <Link to="/services/system">{t("menu.services.system")}</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="5" icon={<ContactsOutlined />}>
                        <Link to="/account">{t("menu.createAccount")}</Link>
                    </Menu.Item>
                </Menu>
            </Drawer>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
})

const mapDispatchToProps = (dispatch) => ({
    asynChangePassword: (payload) => actions.asyncChangePassword(dispatch)(payload),
})

// const withConnect = connect(mapStateToProps, mapDispatchToProps)
// export default compose(withConnect)(DefaultLayout)
const DefaultLayout = withTranslation()(connect(mapStateToProps, mapDispatchToProps)(DefaultLayoutComponent))
export default DefaultLayout
