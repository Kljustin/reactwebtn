import React, { useState, useEffect } from 'react';
import connection from '../Api/ApiService';
import './BaiThi.css';
import { useNavigate } from 'react-router-dom';
function BaiThi() {
    const [baithi, setBaithi] = useState([]);
    const navigate = useNavigate();
    useEffect(
        () => {
            const getData = async () => {
                try {
                    const response = await connection.get('/Baithi');
                    setBaithi(response.data);
                }
                catch {
                    alert('Đọc danh sách bài thi không thành công');
                }
            }
            getData();
        }, [baithi]
    );
    const handleNavi = (id) => {
        navigate('/Chitietbaithi', { state: { id } });
    }
    return (
        <div>
            {
                Array.isArray(baithi) && baithi.map((item) => (
                    <div key={item.IDBaithi} className='opt_baithi' onClick={()=>{handleNavi(item.IDBaithi)}}>
                        <div className='opt_content'>
                            <div>{item.Tenbaithi}</div>
                            <div className='lb'> &gt;&gt;&gt; Làm bài</div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
export default BaiThi;