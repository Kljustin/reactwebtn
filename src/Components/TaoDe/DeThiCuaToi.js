import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import connection from "../Api/ApiService";

function DeThiCuaToi() {
    const [baithi, setBaithi] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await connection.get(`/BaithiNgD/${sessionStorage.getItem('id')}`);
                setBaithi(response.data);
                setLoading(false);
            }
            catch {
                alert('Đọc danh sách bài thi thất bại!');
            }
        }
        getData();
    }, [])
    if (loading === true) return (<div>Đang tải dữ liệu...</div>)
    const handleThem = () => {
        navigate('/Taode');
    }
    const handleChitiet = async (e) => {
        try{
            const response = await connection.get(`/Chitietchinhsua/${e}`);
            const bthi = response.data;
            navigate('/Chinhsua', {state : {bthi}});
        }
        catch{
            alert('Bài thi không tồn tại!');
        }
    }
    return (
        <div style={{ textAlign: 'justify', fontSize: 'large' }}>
            <h1>Danh sách đề thi đã tạo</h1><br />
            <button className="btn btn-success" style={{ fontSize: 'large' }} onClick={handleThem}>Thêm đề thi</button><br /><br />
            <table className="table table-striped">
                <thead className="table-dark" style={{ textAlign: 'center' }}>
                    <tr>
                        <th>ID bài thi</th>
                        <th style={{ width: '20%' }}>Tên bài thi</th>
                        <th style={{ width: '13%' }}>Ngày ra đề</th>
                        <th style={{ width: '12%' }}>Số lượng câu</th>
                        <th>Công khai</th>
                        <th>Làm lại</th>
                        <th>Thể loại</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody className="table-bordered">
                    {
                        baithi.map((item, index) => (
                            <tr key={index}>
                                <td style={{ alignContent: 'center' }}>{item.idbaithi}</td>
                                <td style={{ alignContent: 'center' }}>{item.tenbaithi}</td>
                                <td style={{ alignContent: 'center' }}>{item.ngayrade}</td>
                                <td style={{ alignContent: 'center', textAlign: 'center' }}>{item.soluongcau}</td>
                                <td style={{ alignContent: 'center', textAlign: 'center' }}>
                                    {item.congkhai === 1 ?
                                        <i className='bx bxs-check-circle' style={{ fontSize: 'xx-large', color: '#37bf13' }}  ></i>
                                        :
                                        <i className='bx bxs-x-circle' style={{ fontSize: 'xx-large', color: '#ea0b0f' }}  ></i>}
                                </td>
                                <td style={{ alignContent: 'center', textAlign: 'center' }}>
                                    {item.lamlai === 1 ?
                                        <i className='bx bxs-check-circle' style={{ fontSize: 'xx-large', color: '#37bf13' }}  ></i>
                                        :
                                        <i className='bx bxs-x-circle' style={{ fontSize: 'xx-large', color: '#ea0b0f' }}  ></i>}
                                </td>
                                <td style={{ alignContent: 'center' }}>{item.theloai}</td>
                                <td style={{ alignContent: 'center', textAlign: 'center' }}>
                                    <button className="btn btn-warning" onClick={()=>handleChitiet(item.idbaithi)}>Chi tiết</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default DeThiCuaToi;