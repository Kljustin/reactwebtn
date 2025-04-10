import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import DangNhap from './Components/DangNhap/DangNhap';
import Layout from './Components/Layout/Layout';
import TrangChu from './Components/TrangChu/TrangChu';
import GioiThieu from './Components/GioiThieu/GioiThieu';
import TimKiem from './Components/TimKiem/TimKiem';
import ChiTietBaiThi from './Components/ChiTietBaiThi/ChiTietBaiThi';
import CacCauBaiThi from './Components/ChiTietBaiThi/CacCauBaiThi';
import HienThiKetQua from './Components/KetQua/HienThiKetQua';
import KetQua from './Components/KetQua/KetQua';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<TrangChu/>} />
            <Route path="/Gioithieu" element={<GioiThieu />} />
            <Route path="/Dangnhap" element={<DangNhap />} />
            <Route path="/Timkiem" element={<TimKiem />} />
            <Route path="/Chitietbaithi" element={<ChiTietBaiThi />} />
            <Route path="/Loadbaithi" element={<CacCauBaiThi />} />
            <Route path="/Hienthiketqua" element={<HienThiKetQua />} />
            <Route path="/Ketqua" element={<KetQua />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
