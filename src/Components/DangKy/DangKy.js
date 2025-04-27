import { useState } from "react";
import connection from "../Api/ApiService";
import { useNavigate } from "react-router-dom";

function DangKy(){
    const [hoten, setHoten] = useState('');
    const [tendn, setTendn] = useState('');
    const [matkhau, setMatkhau] = useState('');
    const [phanquyen, setPhanquyen] = useState('');
    const navigate = useNavigate();
    const handleTen = (e) => {
        e.preventDefault();
        setHoten(e.target.value);
    }
    const handleTendn = (e) => {
        e.preventDefault();
        setTendn(e.target.value);
    }
    const handleMatkhau = (e) => {
        e.preventDefault();
        setMatkhau(e.target.value);
    }
    const handlePhanquyen = (e) => {
        e.preventDefault();
        setPhanquyen(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(phanquyen === ''){
            alert('Vui lòng chọn vai trò!');
            return;
        }
        try{
            const formdata = new FormData();
            formdata.append('Hoten', hoten);
            formdata.append('Tendn', tendn);
            formdata.append('Matkhau', matkhau);
            formdata.append('Phanquyen', phanquyen);
            await connection.post('/Dangky', formdata);
            navigate('/');
        }
        catch{
            alert('Lỗi đăng ký, kiểm tra trùng tên đăng nhập!');
        }
    }
    return(
        <div style={{ textAlign:'justify', fontSize:'large' }}>
            <h1>Đăng ký</h1>
            <form onSubmit={handleSubmit}>
                <label>Họ tên</label>
                <input type="text" className="form-control" onChange={handleTen}/>
                <label>Tên đăng nhập</label>
                <input type="text" className="form-control" onChange={handleTendn}/>
                <label>Mật khẩu</label>
                <input type="password" className="form-control" onChange={handleMatkhau}/>
                <label>Vai trò</label>
                <select value={phanquyen} onChange={handlePhanquyen} className="form-control">
                    <option value=''>--Chọn vai trò--</option>
                    <option value='1'>Người ra đề</option>
                    <option value='0'>Người dự thi</option>
                </select><br/>
                <button className="btn btn-success form-control">Đăng ký</button>
            </form>
        </div>
    )
}
export default DangKy;