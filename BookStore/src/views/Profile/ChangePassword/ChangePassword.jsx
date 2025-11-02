import { Card, Form, Input, Button, Row, Col, Select } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFinishChangePassword = () => {
    navigate("/profile/info");
  };

  return (
    <Card title="Change password" className="flex-1">
      <Form form={form} layout="vertical" onFinish={handleFinishChangePassword}>
        <Row gutter={8}>
          <Col span={24}>
            <Form.Item
              label={
                <span className="font-medium text-gray-700">Mật khẩu cũ</span>
              }
              name="old_password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu cũ của bạn!",
                },
              ]}
            >
              <Input.Password
                placeholder="Nhập mật khẩu cũ của bạn"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                className="rounded-md border-gray-300 hover:border-blue-500 focus:ring-1 focus:ring-blue-500"
                autoComplete="new-password"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={
                <span className="font-medium text-gray-700">Mật khẩu mới</span>
              }
              name="new_password"
              dependencies={["old_password"]}
              rules={[
                {
                  required: true,
                  message: "Vui lòng xác nhận mật khẩu mới của bạn!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("old_password") !== value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu mới không được trùng mật khẩu cũ!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Nhập mật khẩu mới của bạn"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                className="rounded-md border-gray-300 hover:border-blue-500 focus:ring-1 focus:ring-blue-500"
                autoComplete="new-password"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={
                <span className="font-medium text-gray-700">
                  Xác nhận mật khẩu mới
                </span>
              }
              name="confirm_new_password"
              dependencies={["new_password"]}
              rules={[
                {
                  required: true,
                  message: "Vui lòng xác nhận mật khẩu mới của bạn!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("new_password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Xác nhận mật khẩu mới của bạn"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                className="rounded-md border-gray-300 hover:border-blue-500 focus:ring-1 focus:ring-blue-500"
                autoComplete="new-password"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item className="flex justify-end gap-3 mt-6">
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ChangePassword;
