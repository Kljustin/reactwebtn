import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import connection from '../Api/ApiService';
import './ChiTietBaiThi.css';
function ChiTietBaiThi() {
    const location = useLocation();
    const { id } = location.state || {};
    const [chitiet, setChitiet] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await connection.get(`/Baithi/${id}`);
                setChitiet(response.data);
                setIsLoading(false);
            }
            catch {
                alert('Đọc dữ liệu không thành công!');
                setIsLoading(false);
            }
        }
        getData();
    }, [id]);
    const handleHuy = () => {
        navigation('/');
    }
    const handleTai = (id) => {
        navigation('/Loadbaithi', { state: { id } });
    }
    if (isLoading === true) return (<div>Đang tải dữ liệu ... </div>)
    return (
        <div key={chitiet.IDBaithi} style={{ fontSize: 'large' }}>
            <h1 style={{ fontWeight: 'bold' }}>{chitiet.Tenbaithi}</h1>
            <div>Ngày ra đề: {chitiet.Ngayrade}</div>
            <div>Số lượng câu: {chitiet.Soluongcau}</div>
            <div className='btn_chnang'>
                <button className='btnLam btn btn-success' onClick={()=>handleTai(chitiet.IDBaithi)}>Làm bài thi</button>
                <button className='btnVe btn btn-danger' onClick={handleHuy}>Về trang chủ</button>
            </div>
        </div>
    )
}
export default ChiTietBaiThi;