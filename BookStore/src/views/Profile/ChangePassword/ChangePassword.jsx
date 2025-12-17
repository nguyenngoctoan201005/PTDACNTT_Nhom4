import { Card, Form, Input, Button, Row, Col, Select, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { updateMatKhauKhachHang } from "../../../api/khachHangService";
import { useGlobalContext } from "../../../GlobalContext";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { user } = useGlobalContext();
  const { t } = useTranslation();

  const handleFinishChangePassword = async (values) => {
    try {
      await updateMatKhauKhachHang({
        maKhachHang: user.maKH,
        matKhau: values.old_password,
        newPassWord: values.new_password,
        verifynewPassWord: values.confirm_new_password,
      });
      message.success(t("profile.change_password.error.success"));
      navigate("/profile/info");
    } catch (error) {
      console.error(error);
      message.error(
        error.response?.data?.message || t("profile.change_password.error.fail")
      );
    }
  };

  return (
    <Card title={t("profile.change_password.title")} className="flex-1">
      <Form form={form} layout="vertical" onFinish={handleFinishChangePassword}>
        <Row gutter={8}>
          <Col span={24}>
            <Form.Item
              label={
                <span className="font-medium text-gray-700">
                  {t("profile.change_password.old_password")}
                </span>
              }
              name="old_password"
              rules={[
                {
                  required: true,
                  message: t("common.validation.required_password"),
                },
              ]}
            >
              <Input.Password
                placeholder={t("profile.change_password.placeholder.old")}
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
                  {t("profile.change_password.new_password")}
                </span>
              }
              name="new_password"
              dependencies={["old_password"]}
              rules={[
                {
                  required: true,
                  message: t("common.validation.required_password_new"),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("old_password") !== value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(t("profile.change_password.error.duplicate"))
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder={t("profile.change_password.placeholder.new")}
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
                  {t("profile.change_password.confirm_new_password")}
                </span>
              }
              name="confirm_new_password"
              dependencies={["new_password"]}
              rules={[
                {
                  required: true,
                  message: t("common.validation.required", {
                    field: t("profile.change_password.confirm_new_password"),
                  }),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("new_password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(t("common.validation.password_mismatch"))
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder={t("profile.change_password.placeholder.confirm")}
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
            {t("common.button.confirm")}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ChangePassword;
