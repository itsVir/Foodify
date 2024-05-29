import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminNav from "./Component/AdminNav/AdminNav";
import Dashboard from "./Component/Dashboard/Dashboard";
import AdminMenu from "./Component/AdminMenu/AdminMenu";
import AdminMenuItem from "./Component/AdminMenuItem/AdminMenuItem";
import AdminOrder from "./Component/AdminOrder/AdminOrder";
import Error404 from "./Component/Error/Error404";
import AdminUser from "./Component/AdminUser/AdminUser";
import AdminPayment from "./Component/AdminPayment/AdminPayment";
import AdminReview from "./Component/AdminReview/AdminReview";
import AdminSetting from "./Component/AdminSetting/AdminSetting";

function App2() {
  return (
    <div>
      <BrowserRouter>

        <AdminNav />
        <Routes>

          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/adminmenu" element={<AdminMenu />} />
          <Route path="/adminmenuitem" element={<AdminMenuItem />}   />
          <Route path="/adminorder" element={<AdminOrder />}   />
          <Route path="/adminuser" element={<AdminUser />} />
          <Route path="/adminpayment" element={<AdminPayment />} />
          <Route path="/adminreview" element={<AdminReview />} />
          <Route path="/adminsetting" element={<AdminSetting />} />

          <Route path="/*" element={<Error404 />} />
          
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App2;