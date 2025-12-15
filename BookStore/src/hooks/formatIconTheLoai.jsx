import {
  BookOutlined,
  ReadOutlined,
  ThunderboltOutlined,
  FileTextOutlined,
  CoffeeOutlined,
  ExperimentOutlined,
  TeamOutlined,
  BulbOutlined,
  HistoryOutlined,
  SmileOutlined,
  GlobalOutlined,
  CodeOutlined,
  MedicineBoxOutlined,
  SearchOutlined,
  RocketOutlined,
  CrownOutlined,
  ShoppingOutlined,
  TrophyOutlined,
  SafetyOutlined,
  HomeOutlined,
  HeartOutlined,
  LaptopOutlined,
  UserOutlined,
  FireOutlined,
} from "@ant-design/icons";

export const categoryIconMap = {
  1: <BookOutlined />, // Tiểu Thuyết
  2: <ThunderboltOutlined />, // Hành Động
  3: <ReadOutlined />, // Truyện Ngắn
  4: <FileTextOutlined />, // Thơ
  5: <FireOutlined />, // Kịch / Drama
  6: <CrownOutlined />, // Văn học cổ điển
  7: <ExperimentOutlined />, // Khoa học tự nhiên
  8: <TeamOutlined />, // Khoa học xã hội
  9: <BulbOutlined />, // Triết học
  10: <HistoryOutlined />, // Lịch sử
  11: <SmileOutlined />, // Tâm lý học
  12: <ShoppingOutlined />, // Kinh tế
  13: <TrophyOutlined />, // Marketing – bán hàng
  14: <SafetyOutlined />, // Kỹ năng sống
  15: <UserOutlined />, // Lãnh đạo – quản trị
  16: <CodeOutlined />, // CNTT – lập trình
  17: <LaptopOutlined />, // Giáo khoa – tham khảo
  18: <MedicineBoxOutlined />, // Y học – sức khỏe
  19: <SearchOutlined />, // Trinh thám – hình sự
  20: <RocketOutlined />, // Khoa học viễn tưởng
  21: <CrownOutlined />, // Giả tưởng – Fantasy
  22: <SmileOutlined />, // Hài hước
  23: <GlobalOutlined />, // Du ký – Travel
  24: <CoffeeOutlined />, // Ẩm thực – nấu ăn
  25: <HomeOutlined />, // Nuôi dạy con
};

export function getCategoryIcon(maLoai) {
  return categoryIconMap[maLoai] || <BookOutlined />;
}
