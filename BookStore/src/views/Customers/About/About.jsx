import { Card, Typography, Divider, List } from "antd";

const { Title, Paragraph, Text } = Typography;

const About = () => {
  const mission = [
    "Cung cấp nguồn sách chất lượng, đa dạng thể loại: học tập, văn học, kỹ năng sống, kinh doanh, công nghệ, thiếu nhi...",
    "Xây dựng môi trường mua sắm thân thiện, nhanh chóng và tiện lợi.",
    "Khuyến khích văn hóa đọc và phát triển tri thức cộng đồng.",
  ];

  const qualityPolicy = [
    "Sản phẩm được nhập khẩu chính hãng hoặc phát hành bởi các nhà xuất bản uy tín.",
    "Cam kết sách mới 100%, đóng gói cẩn thận, giao hàng nhanh trên toàn quốc.",
    "Hỗ trợ đổi trả trong vòng 7 ngày nếu sản phẩm lỗi hoặc sai sót trong vận chuyển.",
  ];

  const customerPolicy = [
    "Tư vấn chọn sách theo độ tuổi, sở thích và mục tiêu học tập.",
    "Thành viên đăng ký tài khoản nhận ưu đãi giảm giá, mã khuyến mãi định kỳ.",
    "Bảo mật tuyệt đối thông tin cá nhân của khách hàng.",
  ];

  return (
    <div className="py-10 mt-20 px-[80px] bg-blue-50 min-h-screen flex justify-center">
      <Card
        className="max-w-5xl w-full rounded-2xl shadow-md"
        bordered={false}
        style={{ backgroundColor: "#fff" }}
      >
        <Typography>
          <Title level={2} className="text-center text-blue-700 mb-6">
            Giới thiệu & Chính sách Nhà Sách ABC
          </Title>

          <Paragraph className="text-gray-700" style={{ fontSize: 16 }}>
            <Text strong>Nhà Sách ABC</Text> – Không chỉ là nơi bán sách, mà còn
            là <Text strong>không gian tri thức và cảm hứng học tập</Text> dành
            cho mọi lứa tuổi. Chúng tôi tin rằng{" "}
            <em>“một cuốn sách hay có thể thay đổi cuộc đời của một người”</em>,
            và sứ mệnh của chúng tôi là mang tri thức ấy đến gần hơn với bạn đọc
            ở khắp mọi nơi.
          </Paragraph>

          <Divider orientation="left" orientationMargin={0}>
            🌟 Sứ mệnh
          </Divider>
          <List
            dataSource={mission}
            renderItem={(item) => (
              <List.Item className="text-gray-700">{item}</List.Item>
            )}
          />

          <Divider orientation="left" orientationMargin={0}>
            📚 Chính sách chất lượng
          </Divider>
          <List
            dataSource={qualityPolicy}
            renderItem={(item) => (
              <List.Item className="text-gray-700">{item}</List.Item>
            )}
          />

          <Divider orientation="left" orientationMargin={0}>
            💬 Chính sách khách hàng
          </Divider>
          <List
            dataSource={customerPolicy}
            renderItem={(item) => (
              <List.Item className="text-gray-700">{item}</List.Item>
            )}
          />

          <Divider orientation="left" orientationMargin={0}>
            ❤️ Cam kết của chúng tôi
          </Divider>
          <Paragraph className="text-gray-700" style={{ fontSize: 16 }}>
            Với phương châm{" "}
            <Text strong>“Mỗi cuốn sách – Một người bạn đồng hành”</Text>, Nhà
            Sách ABC luôn nỗ lực mang lại trải nghiệm mua sắm tuyệt vời, đáng
            tin cậy và đầy cảm hứng cho bạn đọc trên toàn quốc.
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
};

export default About;
