import React, { useState, useEffect, useMemo } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  BankOutlined,
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
  SyncOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Grid } from "antd";

import HeaderComponent from "./header/ProfileSection";
import NotificationSection from "./header/NotificationSection";
import logo from "../assets/images/techdome.svg";

const { Header, Content, Footer, Sider } = Layout;
const { useBreakpoint } = Grid;

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
    <DashboardOutlined />
  ),
  getItem("Management", "management", <UsergroupAddOutlined />, [
    getItem(
      <Link to="/management/patients">Patients</Link>,
      "patients",
      <UserOutlined />
    ),
    getItem(
      <Link to="/management/patients/merge">Merge Patients</Link>,
      "merge",
      <MergeCellsOutlined />
    ),
    getItem(
      <Link to="/management/patients/movement">Patient Movement</Link>,
      "movement",
      <InboxOutlined />
    ),
    getItem(
      <Link to="/management/patients/visits">Assign Visit</Link>,
      "visits",
      <PlusCircleOutlined />
    ),
    getItem(
      <Link to="/management/departments">Department</Link>,
      "departments",
      <ShopOutlined />
    ),
  ]),
  getItem("Treatment", "treatment", <HeartOutlined />, [
    getItem("Consultation", "consultation", <ExperimentOutlined />),
  ]),
  getItem("Pharmacy", "pharmacy", <MedicineBoxOutlined />, [
    getItem(
      <Link to="/pharmacy/prescriptions">Prescriptions</Link>,
      "prescriptions",
      <MedicineBoxOutlined />
    ),
    getItem(
      <Link to="/pharmacy/dispense-medicines">Dispense Medicines</Link>,
      "dispense",
      <MedicineBoxOutlined />
    ),
  ]),
  getItem("Tests", "tests", <MedicineBoxOutlined />, [
    getItem(
      <Link to="/tests/laboratory">Laboratory</Link>,
      "laboratory",
      <FileTextOutlined />
    ),
    getItem(
      <Link to="/tests/radiology">Radiology</Link>,
      "radiology",
      <FileTextOutlined />
    ),
  ]),
  getItem("Finance", "finance", <BankOutlined />, [
    getItem(
      <Link to="/finance/payments">Payments</Link>,
      "payments",
      <BankOutlined />
    ),
    getItem(
      <Link to="/finance/invoices">Invoices</Link>,
      "invoices",
      <FileTextOutlined />
    ),
  ]),
  getItem("Hospital Management", "hospitalManagement", <AppstoreOutlined />, [
    getItem(
      <Link to="/management/insurance-companies">Insurance Companies</Link>,
      "insuranceCompanies",
      <ShopOutlined />
    ),
    getItem(
      <Link to="/management/insurance">Insured Patients</Link>,
      "insuredPatients",
      <UserOutlined />
    ),
    getItem(
      <Link to="/management/hospital-items">Hospital Items</Link>,
      "hospitalItems",
      <ShopOutlined />
    ),
    getItem(
      <Link to="/management/item-types">Item Types</Link>,
      "itemTypes",
      <ShopOutlined />
    ),
  ]),
  getItem("Hospital Settings", "hospitalSettings", <SettingOutlined />, [
    getItem(<Link to="/users">Users</Link>, "users", <UserOutlined />),
    getItem(
      <Link to="/hospital-settings/notes-board">Notes Board</Link>,
      "notesBoard",
      <FileTextOutlined />
    ),
    getItem(
      <Link to="/hospital-settings/permissions">Permissions</Link>,
      "permissions",
      <AppstoreOutlined />
    ),
    getItem(
      <Link to="/hospital-settings/data-sync">Data Sync</Link>,
      "dataSync",
      <SyncOutlined />
    ),
  ]),
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]); // Store expanded keys
  const screens = useBreakpoint();
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const selectedKeys = useMemo(() => {
    // Extract the last segment of the path as the selected key
    const pathSegments = location.pathname.split("/").filter(Boolean);
    return pathSegments.length > 0 ? [pathSegments.join("/")] : [];
  }, [location.pathname]);

  useEffect(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    if (pathSegments.length > 1) {
      setOpenKeys([pathSegments[0]]);
    }
  }, [location.pathname]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => !openKeys.includes(key));
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  useEffect(() => {
    if (screens.md === false) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [screens]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          padding: "0 20px",
          background: "#2a4b8d",
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
            mode="inline"
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            items={items}
            className="custom-menu"
          />
        </Sider>
        <Layout>
          <Content style={{ margin: "0 4px" }}>
            <div style={{ padding: 24, background: colorBgContainer }}>
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Tech HMS 2024 - ©{new Date().getFullYear()}. Created by Techdometz
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
