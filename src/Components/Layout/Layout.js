import { Outlet, Link, useNavigate } from "react-router-dom";
import './Layout.css'
import BaiThi from "../BaiThi/BaiThi";
function Layout() {
    const navigate = useNavigate();
    const handleDX = () => {
        sessionStorage.clear();
        alert("Đăng xuất thành công!");
        navigate('/');
        window.location.reload();

    }
    return (
        <div>
            <nav className="topnav">
                <Link to="/">Trang chủ</Link>
                <Link to="/Gioithieu">Giới thiệu</Link>
                {
                    sessionStorage.getItem('id') ?
                        <Link to="/Timkiem">Tìm kiếm</Link>
                        :
                        null
                }
                {
                    sessionStorage.getItem('id') ?
                        <Link to="/Thitheoma">Thi theo mã</Link>
                        :
                        null
                }
                {
                    sessionStorage.getItem('id') ?
                        <Link to="/Ketqua">Kết quả</Link>
                        :
                        null
                }
                {
                    sessionStorage.getItem('id') && sessionStorage.getItem('quyen') === '1' ?
                        <Link to="/Dethi">Đề thi của tôi</Link>
                        :
                        null
                }
                {
                    sessionStorage.getItem('id') && sessionStorage.getItem('quyen') === '1' ?
                        <Link to="/Taode">Tạo đề</Link>
                        :
                        null
                }
                {
                    sessionStorage.getItem('id') ?
                        <Link to="/Thongtin">{sessionStorage.getItem('ten')}</Link>
                        :
                        <Link to="/Dangnhap">Đăng nhập</Link>
                }
                {
                    sessionStorage.getItem('id') ?
                        <Link onClick={handleDX}>Đăng xuất</Link>
                        :
                        <Link to="/Dangky">Đăng ký</Link>
                }
            </nav>
            <div className="w-3/4 p-4 lay_body">
                <div className="content_lay">
                    <div className="container-fluid content_blank">
                        <div className="row content_row">
                            <div className="col-lg-8 content_area">
                                <Outlet />
                            </div><br />
                            <div className="col-lg-4 sidebar_area">
                                <div className="weather_area">
                                    <iframe src="https://thoitiet247.vn/widget/embed/ho-chi-minh?style=1&day=5&td=%23003870&ntd=%23ff0000&mvb=%23959dad&mv=%23ff0000&mdk=%23dddddd&htd=true"
                                        id="widgeturl"
                                        width="100%"
                                        height="50%"
                                        allowtransparency="true"
                                        title="thoitiet"
                                        className="thoitiet_widget"></iframe>
                                </div>
                                <div className="sidebar_content">
                                    <BaiThi />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer_body">
                Website luyện thi trắc nghiệm
            </div>
        </div>
    )
}
export default Layout;