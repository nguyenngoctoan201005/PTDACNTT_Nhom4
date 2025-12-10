import { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Rate,
  Input,
  Button,
  Divider,
  Space,
  Avatar,
  message,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { formatDate } from "../../../hooks/formatDate";
import {
  getListDanhGiaByMaSach,
  insertListDanhGia,
} from "../../../api/danhGiaService";
import { useGlobalContext } from "../../../GlobalContext";
import { useParams } from "react-router";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const formatReviewDate = (isoString) => {
  if (!isoString) return "";
  return "vào lúc " + formatDate(isoString);
};

const BookReview = () => {
  const { user } = useGlobalContext();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { bookId } = useParams();

  const [listDanhGia, setListDanhGia] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDanhGia = async () => {
    try {
      const data = await getListDanhGiaByMaSach({
        maSach: bookId,
      });
      const sorted = [...data.result].sort(
        (a, b) => dayjs(b.ngayBL).valueOf() - dayjs(a.ngayBL).valueOf()
      );

      setListDanhGia(sorted);
    } catch (error) {
      message.error("Lỗi khi lấy danh sách đánh giá");
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await insertListDanhGia({
        maKH: user.maKH,
        maSach: bookId,
        soSao: rating,
        binhLuan: review,
      });

      message.success("Gửi đánh giá thành công");

      await fetchDanhGia();

      setRating(0);
      setReview("");
    } catch (err) {
      console.log("error >>>", err);
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDanhGia();
  }, []);

  console.log("listDanhGia", listDanhGia);

  return (
    <Card
      style={{
        borderRadius: 10,
        padding: "10px 12px",
        margin: "0 auto",
        maxHeight: 900,
        height: "100%",
      }}
    >
      <div>
        <Title level={5}>Đánh giá của khách hàng</Title>
        <Text type="secondary">
          2,847 lượt đánh giá với trung bình{" "}
          <Text strong style={{ color: "#faad14" }}>
            4.8
          </Text>{" "}
          sao
        </Text>
        <Divider />

        <div
          style={{ overflowY: "auto", scrollbarWidth: "none", maxHeight: 400 }}
        >
          {listDanhGia.map((review, index) => {
            const reviewDate = formatReviewDate(review.ngayBL);
            return (
              <div style={{ marginTop: 12 }} key={index}>
                <Avatar
                  size={32}
                  icon={<UserOutlined />}
                  style={{ marginRight: 10 }}
                />
                <Text type="secondary" style={{ marginRight: 10 }}>
                  - {review.hoTen} -
                </Text>
                <Rate disabled defaultValue={review.soSao} />
                <Paragraph style={{ margin: "8px 8px 4px" }}>
                  {review.binhLuan}
                </Paragraph>
                <Text type="secondary">- {reviewDate}</Text>
                <Divider />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-2">
        <Title level={5}>Viết đánh giá của bạn</Title>

        <div style={{ marginBottom: 12 }}>
          <Text strong>Rating</Text>
          <br />
          <Rate value={rating} onChange={setRating} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <Text strong>Đánh giá của bạn</Text>
          <TextArea
            rows={4}
            placeholder="Chia sẻ suy nghĩ của bạn về cuốn sách này."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>

        <Space>
          <Button type="primary" onClick={handleSubmit} loading={loading}>
            Gửi
          </Button>
        </Space>
      </div>
    </Card>
  );
};

export default BookReview;
