import React, { useState, useEffect, useMemo } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  BankOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  AppstoreOutlined,
  HeartOutlined,
  ExperimentOutlined,
  MedicineBoxOutlined,
  FileTextOutlined,
  UsergroupAddOutlined,
  MergeCellsOutlined,
  InboxOutlined,
  ShopOutlined,
} from "@ant-design/icons";

import { Layout, Menu, theme, Grid } from "antd";

import HeaderComponent from "./header/ProfileSection";
import NotificationSection from "./header/NotificationSection";
import logo from "../assets/images/techdome.svg";

const icons = {
  DashboardIcon: DashboardOutlined,
  ManagementIcon: UsergroupAddOutlined,
  MergeIcon: MergeCellsOutlined,
  MovementIcon: InboxOutlined,
  UserIcon: UserOutlined,
  FinanceIcon: BankOutlined,
  LogoutIcon: LogoutOutlined,
  RegisterIcon: PlusCircleOutlined,
  ManagementMainIcon: AppstoreOutlined,
  MedicalIcon: HeartOutlined,
  TreatmentIcon: ExperimentOutlined,
  PharmacyIcon: MedicineBoxOutlined,
  ReportIcon: FileTextOutlined,
  DepartmentIcon: ShopOutlined,
};

const { Header, Content, Footer, Sider } = Layout;
const { useBreakpoint } = Grid; // For responsive behavior

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(
    <Link to="/dashboard">Dashboard</Link>,
    "dashboard",
    <icons.DashboardIcon />
  ),
  getItem("Management", "management", <icons.ManagementIcon />, [
    getItem(
      <Link to="/management/patients">Patients</Link>,
      "patients",
      <icons.UserIcon />
    ),
    getItem(
      <Link to="/management/patients/merge">Merge Patients</Link>,
      "merge",
      <icons.MergeIcon />
    ),
    getItem(
      <Link to="/management/patients/movement">Patient Movement</Link>,
      "movement",
      <icons.MovementIcon />
    ),
    getItem(
      <Link to="/management/patients/visits">Assign Visit</Link>,
      "visits",
      <icons.RegisterIcon />
    ),
    getItem(
      <Link to="/management/departments">Department</Link>,
      "departments",
      <icons.DepartmentIcon />
    ),
  ]),
  getItem("Team", "sub2", <icons.MedicalIcon />, [
    getItem("Team 1", "team1"),
    getItem("Team 2", "team2"),
  ]),
  getItem(
    "Hospital Management",
    "hospitalManagement",
    <icons.ManagementMainIcon />,
    [getItem("Team 1", "6"), getItem("Team 2", "8")]
  ),
  getItem("Files", "9", <icons.UserIcon />),
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const screens = useBreakpoint();
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const selectedKeys = useMemo(() => [location.pathname], [location.pathname]);

  // Automatically open the parent menu of the active menu item
  useEffect(() => {
    const parentKeys = selectedKeys[0].split("/").slice(1, -1).join("/");
    setOpenKeys([parentKeys || ""]);
  }, [selectedKeys]);

  // Handle submenu open/close events to allow only one open submenu
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => !openKeys.includes(key));
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  // Automatically collapse sidebar on small screens
  useEffect(() => {
    if (screens.md === false) {
      setCollapsed(true); // Collapse only on small screens
    } else {
      setCollapsed(false); // Ensure it stays open on larger screens
    }
  }, [screens]);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Header
        style={{
          padding: "0 20px",
          background: colorBgContainer,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <img
            src={logo}
            alt="techdometz"
            style={{ height: 40, marginRight: 10 }}
          />
          <h1 style={{ color: "#fff", fontSize: "20px", margin: 0 }}>
            Tech HMS
          </h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <NotificationSection />
          <HeaderComponent />
        </div>
      </Header>

      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          breakpoint="md"
          collapsedWidth={80}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            items={items}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              margin: "0 4px",
            }}
          >
            <div
              style={{
                padding: 24,
                background: colorBgContainer,
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
