import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Row,
  Col,
  Divider,
  Space,
  App,
  Checkbox,
} from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  ReadOutlined,
  GiftOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { HorizontalLogo } from "../../../assets";
import { useGlobalContext } from "../../../GlobalContext";
import { Link } from "react-router";

const { Title, Text } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { message } = App.useApp();

  const [agree, setAgree] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      console.log(values);
    } catch (err) {
      console.log(">>>>>>>>>>>>", err.message);
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-50">
      <div className="min-h-screen flex bg-white">
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 flex-col justify-between p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full -ml-36 -mb-36" />

          <div className="relative z-10 space-y-6">
            <div className="space-y-4">
              <Space
                align="start"
                onClick={() => navigate("/home")}
                className="cursor-pointer"
              >
                <div className="my-1">
                  <img
                    src={HorizontalLogo}
                    alt="Logo"
                    style={{
                      height: "60px",
                      width: "auto",
                      minWidth: "125px",
                      backgroundColor: "transparent",
                    }}
                  />
                </div>
              </Space>
              <h2 className="text-5xl font-bold leading-tight">
                Welcome to Your Literary Journey
              </h2>
              <p className="text-lg text-white/90">
                Discover thousands of books, connect with fellow readers, and
                explore new worlds through literature.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <ReadOutlined className="text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Curated Collections</h3>
                  <p className="text-white/80">
                    Handpicked books across all genres
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <GiftOutlined className="text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Exclusive Deals</h3>
                  <p className="text-white/80">Special discounts for members</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ThunderboltOutlined className="text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Fast Delivery</h3>
                  <p className="text-white/80">
                    Get your books delivered quickly
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 border-t border-white/20 pt-6">
            <p className="text-white/80 italic">
              "A reader lives a thousand lives before he dies. The man who never
              reads lives only one." — George R.R. Martin
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-white">
          <div className="w-full max-w-md">
            <div className="space-y-8 max-w-md mx-auto">
              {/* Header */}
              <div className="text-center space-y-1">
                <Title level={2} className="!mb-0">
                  Create Account
                </Title>
                <Text type="secondary">
                  Join BookHaven to start your reading journey
                </Text>
              </div>

              {/* Form */}
              <Form
                layout="vertical"
                onFinish={onFinish}
                className="space-y-4"
                requiredMark={false}
                autoComplete="off"
              >
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item
                      label={
                        <span className="font-medium text-gray-700">
                          First Name
                        </span>
                      }
                      name="first_name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your first name!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="John"
                        className="rounded-md border-gray-300 hover:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        autoComplete="off"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={
                        <span className="font-medium text-gray-700">
                          Last Name
                        </span>
                      }
                      name="last_name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your last name!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Doe"
                        className="rounded-md border-gray-300 hover:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        autoComplete="off"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label={
                        <span className="font-medium text-gray-700">
                          Username
                        </span>
                      }
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your username!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter your username"
                        className="rounded-md border-gray-300 hover:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        autoComplete="off"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label={
                        <span className="font-medium text-gray-700">
                          Email Address
                        </span>
                      }
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your email address!",
                        },
                        {
                          type: "email",
                          message: "Please enter a valid email!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="you@example.com"
                        className="rounded-md border-gray-300 hover:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        autoComplete="off"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label={
                        <span className="font-medium text-gray-700">
                          Password
                        </span>
                      }
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your password!",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Create a strong password"
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
                          Confirm Password
                        </span>
                      }
                      name="confirmPassword"
                      dependencies={["password"]}
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("Passwords do not match!")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        placeholder="Confirm your password"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        className="rounded-md border-gray-300 hover:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        autoComplete="new-password"
                      />
                    </Form.Item>
                  </Col>
                  <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    className="!mb-2"
                  >
                    <Checkbox
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                    >
                      I agree to the{" "}
                      <Link href="#" className="text-blue-600">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-blue-600">
                        Privacy Policy
                      </Link>
                    </Checkbox>
                  </Form.Item>

                  <Form.Item
                    name="newsletter"
                    valuePropName="checked"
                    initialValue={true}
                  >
                    <Checkbox>
                      Subscribe to our newsletter for book recommendations and
                      deals
                    </Checkbox>
                  </Form.Item>

                  {/* Submit Button */}
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-full h-11 font-semibold text-base bg-blue-600 hover:bg-blue-500"
                  >
                    Create Account
                  </Button>
                </Row>
              </Form>

              {/* Footer */}
              <Divider plain className="text-gray-400">
                ALREADY HAVE AN ACCOUNT?
              </Divider>

              <Button
                type="default"
                className="w-full h-11 border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>

              <p className="text-center text-sm text-gray-500">
                By creating an account, you agree to our{" "}
                <Link href="#" className="text-blue-600">
                  Terms of Service
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
