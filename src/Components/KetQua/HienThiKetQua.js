import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import connection from "../Api/ApiService";

function HienThiKetQua() {
    const navigation = useNavigate();
    const location = useLocation();
    const { dataPost } = location.state || {};
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const hasPosted = useRef(false);
    const handleBack = () => {
        navigation('/');
    }
    useEffect(() => {
        if (dataPost && hasPosted.current === false) {
            hasPosted.current = true;
            const postData = async () => {
                try {
                    const res = await connection.post('/Chamdiem', dataPost);
                    setData(res.data);
                    setLoading(false);
                }
                catch {
                    alert('Thất bại!');
                }
            }
            postData();
        };

    });
    if (loading === true) return (<div>Đang tính điểm</div>)
    return (
        <div>
            <h1 style={{ fontWeight: 'bold' }}>Kết quả</h1>
            <div style={{ fontSize: '70px', color: 'red', fontWeight: 'bold' }}>{data.Diemso}</div>
            <button style={{ fontSize: 'large' }} className="btn btn-primary" onClick={handleBack}>Quay lại</button>
        </div>
    )
}
export default HienThiKetQua;