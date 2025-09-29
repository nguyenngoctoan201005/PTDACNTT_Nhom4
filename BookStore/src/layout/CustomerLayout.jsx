import { Outlet } from "react-router-dom";

const CustomerLayout = () => {
  console.log("layout");
  return (
    <>
      Layout
      <Outlet />
    </>
  );
};

export default CustomerLayout;
