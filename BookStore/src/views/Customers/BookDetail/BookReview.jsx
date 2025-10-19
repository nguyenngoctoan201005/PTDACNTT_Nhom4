import { useState } from "react";
import {
  Card,
  Typography,
  Rate,
  Input,
  Button,
  Divider,
  Space,
  Avatar,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const formatReviewDate = (isoString) => {
  if (!isoString) return "";
  return "on " + dayjs(isoString).format("MMMM D, YYYY");
};

const BookReview = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    console.log("Rating:", rating);
    console.log("Review:", review);
  };

  const userReview = [
    {
      id: 1,
      full_name: "Harry",
      description:
        "This book completely changed my perspective. Highly recommended for anyone looking for a thought-provoking read.",
      sent_time: "2025-01-10T09:10:00",
    },
    {
      id: 2,
      full_name: "Harry",
      description:
        "This book completely changed my perspective. Highly recommended for anyone looking for a thought-provoking read.",
      sent_time: "2025-01-10T09:10:00",
    },
    {
      id: 3,
      full_name: "Harry",
      description:
        "This book completely changed my perspective. Highly recommended for anyone looking for a thought-provoking read.",
      sent_time: "2025-01-10T09:10:00",
    },
    {
      id: 4,
      full_name: "Harry",
      description:
        "This book completely changed my perspective. Highly recommended for anyone looking for a thought-provoking read.",
      sent_time: "2025-01-10T09:10:00",
    },
  ];

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
        <Title level={5}>Customer Reviews</Title>
        <Text type="secondary">
          2,847 reviews with an average rating of{" "}
          <Text strong style={{ color: "#faad14" }}>
            4.8
          </Text>{" "}
          stars
        </Text>
        <Divider />

        <div
          style={{ overflowY: "auto", scrollbarWidth: "1px", maxHeight: 400 }}
        >
          {userReview.map((review) => {
            const reviewDate = formatReviewDate(review.sent_time);
            return (
              <div style={{ marginTop: 12 }} key={review.id}>
                <Avatar
                  size={32}
                  icon={<UserOutlined />}
                  style={{ marginRight: 10 }}
                />
                <Text type="secondary" style={{ marginRight: 10 }}>
                  - {review.full_name} -
                </Text>
                <Rate disabled defaultValue={5} />
                <Paragraph style={{ margin: "8px 8px 4px" }}>
                  {review.description}
                </Paragraph>
                <Text type="secondary">- {reviewDate}</Text>
                <Divider />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-2">
        <Title level={5}>Write a Review</Title>

        <div style={{ marginBottom: 12 }}>
          <Text strong>Rating</Text>
          <br />
          <Rate value={rating} onChange={setRating} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <Text strong>Your Review</Text>
          <TextArea
            rows={4}
            placeholder="Share your thoughts about this book..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>

        <Space>
          <Button type="primary" onClick={handleSubmit}>
            Submit Review
          </Button>
        </Space>
      </div>
    </Card>
  );
};

export default BookReview;
