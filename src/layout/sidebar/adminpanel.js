import {
  DashboardOutlined,
  SettingOutlined,
  FileTextOutlined,
  DatabaseOutlined,
  TeamOutlined,
  ToolOutlined,
  SyncOutlined,
} from "@ant-design/icons";

const icons = {
  IconDashboard: DashboardOutlined,
  IconSettings: SettingOutlined,
  IconFile: FileTextOutlined,
  IconDatabase: DatabaseOutlined,
  IconTeam: TeamOutlined,
  IconTools: ToolOutlined,
  IconSync: SyncOutlined,
};

const home = {
  id: "home",
  title: "Home",
  type: "group",
  children: [
    {
      id: "homePage",
      title: "Home",
      type: "item",
      url: "/home",
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
  ],
};

const customerCenter = {
  id: "customer-center",
  title: "Customer Center",
  type: "group",
  children: [
    {
      id: "customerCenter",
      title: "Customer Center",
      type: "item",
      url: "/customer-center",
      icon: icons.IconTeam,
    },
  ],
};

const claimControl = {
  id: "claim-control",
  title: "Claim Control",
  type: "group",
  children: [
    {
      id: "nhif-price-updates",
      title: "NHIF Price Updates",
      type: "item",
      url: "/claim-control/nhif-price-updates",
      icon: icons.IconFile,
    },
    {
      id: "bind-item",
      title: "Bind Item",
      type: "item",
      url: "/claim-control/bind-item",
      icon: icons.IconFile,
    },
    {
      id: "binded-items",
      title: "Binded Items",
      type: "item",
      url: "/claim-control/binded-items",
      icon: icons.IconFile,
    },
    {
      id: "claim-submission",
      title: "Claim Submission",
      type: "item",
      url: "/claim-control/claim-submission",
      icon: icons.IconFile,
    },
    {
      id: "claim-reconciliation",
      title: "Claim Reconciliation",
      type: "item",
      url: "/claim-control/claim-reconciliation",
      icon: icons.IconFile,
    },
  ],
};

const itemList = {
  id: "item-list",
  title: "Item List",
  type: "group",
  children: [
    {
      id: "all-items",
      title: "All Items",
      type: "item",
      url: "/item-list/all-items",
      icon: icons.IconDatabase,
    },
    {
      id: "item-sub-category",
      title: "Item Sub Category",
      type: "item",
      url: "/item-list/item-sub-category",
      icon: icons.IconDatabase,
    },
  ],
};

const management = {
  id: "management",
  title: "Management",
  type: "group",
  children: [
    {
      id: "managementPage",
      title: "Management",
      type: "item",
      url: "/management",
      icon: icons.IconTools,
    },
  ],
};

const utilitiesRequisition = {
  id: "utilities-requisition",
  title: "Utilities Requisition",
  type: "group",
  children: [
    {
      id: "utilitiesRequisitionPage",
      title: "Utilities Requisition",
      type: "item",
      url: "/utilities-requisition",
      icon: icons.IconTools,
    },
  ],
};

const hospitalSettings = {
  id: "hospital-settings",
  title: "Hospital Settings",
  type: "group",
  children: [
    {
      id: "all-users",
      title: "All Users",
      type: "item",
      url: "/hospital-settings/all-users",
      icon: icons.IconTeam,
    },
    {
      id: "department",
      title: "Department",
      type: "item",
      url: "/hospital-settings/department",
      icon: icons.IconSettings,
    },
    {
      id: "permissions",
      title: "Permissions",
      type: "item",
      url: "/hospital-settings/permissions",
      icon: icons.IconKey,
    },
    {
      id: "user-serviceworker",
      title: "User ServiceWorker",
      type: "item",
      url: "/hospital-settings/user-serviceworker",
      icon: icons.IconSync,
    },
    {
      id: "insurance-setting",
      title: "Insurance Setting",
      type: "item",
      url: "/hospital-settings/insurance-setting",
      icon: icons.IconSettings,
    },
    {
      id: "department-serviceworker",
      title: "Department ServiceWorker",
      type: "item",
      url: "/hospital-settings/department-serviceworker",
      icon: icons.IconSync,
    },
    {
      id: "notes-board",
      title: "Notes Board",
      type: "item",
      url: "/hospital-settings/notes-board",
      icon: icons.IconFile,
    },
    {
      id: "data-sync",
      title: "Data Sync",
      type: "item",
      url: "/hospital-settings/data-sync",
      icon: icons.IconSync,
    },
  ],
};

const menuItems = {
  items: [
    home,
    customerCenter,
    claimControl,
    itemList,
    management,
    utilitiesRequisition,
    hospitalSettings,
  ],
};

export default menuItems;
