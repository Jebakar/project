
import { Outlet } from "react-router-dom";
import Navigation from "./Admin/Navigation";
import Adminheader from "./Admin/Adminheader";
import Dashboard from "./Admin/Dashboard";

function AdminLayout() {
  return (
    <>
    <Adminheader />
    <div style={{ display: "flex" }}>
    
      <Navigation />
      <div style={{ flex: 1, padding: "20px", background: "#f8f9fa" }}>
      <Dashboard />
        <Outlet />
      </div>
    </div>
    </>
  );
}

export default AdminLayout;
