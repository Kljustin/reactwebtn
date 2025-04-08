import React from 'react';
import './GioiThieu.css'
function GioiThieu() {
    return (
        <div className='content_TC'>
            <h1>
                Giới thiệu
            </h1>
            <div className='intro_content'>
                <div>
                    Chào mừng bạn đến với [Tên website] - nền tảng thi trắc nghiệm trực tuyến hàng đầu,
                    nơi cung cấp các bài kiểm tra đa dạng giúp bạn rèn luyện kiến thức, đánh giá năng lực và nâng cao kỹ năng một cách hiệu quả.
                </div>
                <div>
                    Với giao diện thân thiện, dễ sử dụng cùng hệ thống đề thi phong phú, chúng tôi cam kết mang lại trải nghiệm học tập tốt nhất cho người dùng ở mọi cấp độ.
                </div>
                <h3>Tính năng nổi bật</h3>
                <ol>
                    <li>Đa dạng chủ đề: Cung cấp bài thi từ nhiều lĩnh vực như Toán học, Vật lý, Hóa học, Tiếng Anh, Tin học và các môn chuyên ngành khác.</li>
                    <li>Giao diện thân thiện: Thiết kế trực quan, dễ sử dụng trên cả máy tính và thiết bị di động.</li>
                    <li>Hệ thống đánh giá thông minh: Kết quả được chấm điểm tự động, hiển thị chi tiết các câu trả lời đúng/sai kèm lời giải thích rõ ràng.</li>
                    <li>Kho đề thi phong phú: Được cập nhật thường xuyên với các bộ đề mới nhất, bám sát chương trình học và các kỳ thi thực tế.</li>
                    <li>Luyện tập không giới hạn: Người dùng có thể làm bài thi thử không giới hạn số lần, giúp cải thiện kết quả nhanh chóng.</li>
                </ol>
                <h3>Đối tượng sử dụng</h3>
                <ul>
                    <li>Học sinh, sinh viên chuẩn bị cho các kỳ thi.</li>
                    <li>Giáo viên, giảng viên muốn tạo bài kiểm tra cho học viên.</li>
                    <li>Người đi làm muốn kiểm tra và nâng cao kiến thức chuyên môn.</li>
                </ul>
            </div>
        </div>
    )
}
export default GioiThieu;