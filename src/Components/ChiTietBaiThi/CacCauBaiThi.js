import React, { useEffect, useState } from 'react';
import connection from '../Api/ApiService';
import { useLocation, useNavigate } from 'react-router-dom';
import './CacCauBaiThi.css';
function CacCauBaiThi() {
    const [bt, setBt] = useState([]);
    const [ttl, setTtl] = useState([]);
    const [ans, setAns] = useState({});
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { id } = location.state || {};
    const navigation = useNavigate();
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await connection.get(`/Chitietbaithi/${id}`);
                const responset = await connection.get(`/Baithi/${id}`);
                setBt(response.data);
                setTtl(responset.data);
                setLoading(false);
            }
            catch {
                alert('Lấy bài thi không thành công!');
                setLoading(false);
            }
        }
        getData();
    }, [id]);
    const handleAnswerChange = (questionId, optionId) => {
        setAns(prev => ({ ...prev, [questionId]: optionId }));
    };
    const handleSubmit = () => {
        const kqgui = Object.entries(ans).map(([qid, optid]) => ({
            'IDCauhoi': qid,
            'IDCautrl': optid
        }));
        const dataPost = {
            IDBaithi: ttl.IDBaithi,
            IDNguoidung: sessionStorage.getItem('id'),
            Soluongcau: ttl.Soluongcau,
            Ketqua: kqgui
        };
        
        navigation('/Hienthiketqua', { state: { dataPost } });
    }
    if (loading === true) return (<div>Đang tải dữ liệu...</div>)
    return (
        <div className='ndcc'>
            <div>
                <div key={ttl.IDBaithi} style={{ fontSize: 'large' }}>
                    <h1 style={{ fontWeight: 'bold' }}>{ttl.Tenbaithi}</h1>
                    <div style={{ fontSize: 'x-large' }}>Số lượng câu: {ttl.Soluongcau}</div>
                </div><br />
                {
                    bt.map((ch) => (
                        <div key={ch.idcauhoi}>
                            <h5>{ch.noidung}</h5>
                            {
                                ch.listctrl.map((pa) => (
                                    <div key={pa.IDCautrl}>
                                        <input type='radio'
                                            name={`question-${ch.idcauhoi}`}
                                            value={pa.IDCautrl}
                                            checked={ans[ch.idcauhoi] === pa.IDCautrl}
                                            onChange={() => handleAnswerChange(ch.idcauhoi, pa.IDCautrl)} /> {pa.Noidung}
                                    </div>
                                ))
                            }
                            <br />
                        </div>
                    ))
                }
                <button style={{ fontSize: 'large', marginBottom: '20px' }} className='btn btn-danger form-control'
                onClick={handleSubmit}>Nộp bài</button>
            </div>
        </div>
    )
}
export default CacCauBaiThi;