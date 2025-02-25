import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div>
      <main className="pt-[12px] p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
