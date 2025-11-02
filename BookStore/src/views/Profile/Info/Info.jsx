import { Card, Typography } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useGlobalContext } from "../../../GlobalContext";
import { useNavigate } from "react-router";

const PersonalInfoCard = () => {
  const { user } = useGlobalContext();
  const navigate = useNavigate();
  if (!user) navigate("/login");
  return (
    <Card className="p-4 shadow rounded-lg">
      <h3 className="text-lg font-semibold mb-1">Thông tin cơ bản</h3>
      <p className="text-gray-500 mb-4 text-sm">
        Quản lý thông tin tài khoản của bạn
      </p>

      <div className="flex items-center gap-3 py-4 border-b">
        <MailOutlined style={{ fontSize: 20, color: "#1677ff" }} />
        <div className="flex flex-col">
          <Typography.Text type="secondary" className="text-gray-500 text-sm">
            Email
          </Typography.Text>
          <Typography.Text className="font-medium">
            {user.email}
          </Typography.Text>
        </div>
      </div>

      <div className="flex items-center gap-3 py-4 border-b">
        <PhoneOutlined style={{ fontSize: 20, color: "#1677ff" }} />
        <div className="flex flex-col">
          <Typography.Text type="secondary" className="text-gray-500 text-sm">
            Số điện thoại
          </Typography.Text>
          <Typography.Text className="font-medium">
            {user.phone_number}
          </Typography.Text>
        </div>
      </div>

      <div className="flex items-center gap-3 py-4">
        <EnvironmentOutlined style={{ fontSize: 20, color: "#1677ff" }} />
        <div className="flex flex-col">
          <Typography.Text type="secondary" className="text-gray-500 text-sm">
            Địa chỉ
          </Typography.Text>
          <Typography.Text className="font-medium">
            {user.address}
          </Typography.Text>
        </div>
      </div>
    </Card>
  );
};

export default PersonalInfoCard;
