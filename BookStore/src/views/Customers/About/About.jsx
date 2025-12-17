import { Card, Typography, Divider, List } from "antd";
import { useTranslation } from "react-i18next";

const { Title, Paragraph, Text } = Typography;

const About = () => {
  const { t } = useTranslation();
  const mission = t("about.mission.items", { returnObjects: true });
  const qualityPolicy = t("about.quality.items", { returnObjects: true });
  const customerPolicy = t("about.customer.items", { returnObjects: true });

  return (
    <div className="py-10 mt-20 px-[80px] bg-blue-50 min-h-screen flex justify-center">
      <Card
        className="max-w-5xl w-full rounded-2xl shadow-md"
        bordered={false}
        style={{ backgroundColor: "#fff" }}
      >
        <Typography>
          <Title level={2} className="text-center text-blue-700 mb-6">
            {t("about.title")}
          </Title>

          <Paragraph className="text-gray-700" style={{ fontSize: 16 }}>
            <Text strong>{t("about.intro_1")}</Text>
            {t("about.intro_2")}
            <Text strong>{t("about.intro_3")}</Text>
            {t("about.intro_4")}
            <em>{t("about.intro_5")}</em>
            {t("about.intro_6")}
          </Paragraph>

          <Divider orientation="left" orientationMargin={0}>
            {t("about.mission.title")}
          </Divider>
          <List
            dataSource={mission}
            renderItem={(item) => (
              <List.Item className="text-gray-700">{item}</List.Item>
            )}
          />

          <Divider orientation="left" orientationMargin={0}>
            {t("about.quality.title")}
          </Divider>
          <List
            dataSource={qualityPolicy}
            renderItem={(item) => (
              <List.Item className="text-gray-700">{item}</List.Item>
            )}
          />

          <Divider orientation="left" orientationMargin={0}>
            {t("about.customer.title")}
          </Divider>
          <List
            dataSource={customerPolicy}
            renderItem={(item) => (
              <List.Item className="text-gray-700">{item}</List.Item>
            )}
          />

          <Divider orientation="left" orientationMargin={0}>
            {t("about.commitment.title")}
          </Divider>
          <Paragraph className="text-gray-700" style={{ fontSize: 16 }}>
            {t("about.commitment.text_1")}
            <Text strong>{t("about.commitment.text_2")}</Text>
            {t("about.commitment.text_3")}
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
};

export default About;
