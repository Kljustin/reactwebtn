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
                                <td>{item.idbaithi}</td>
                                <td>{item.tenbaithi}</td>
                                <td>{item.ngayrade}</td>
                                <td style={{ textAlign: 'center' }}>{item.soluongcau}</td>
                                <td style={{ textAlign: 'center' }}>
                                    {item.congkhai === 1 ?
                                        <i className='bx bxs-check-circle' style={{ fontSize:'xx-large', color: '#37bf13' }}  ></i>
                                        :
                                        <i className='bx bxs-x-circle' style={{ fontSize:'xx-large', color: '#ea0b0f' }}  ></i>}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    {item.lamlai === 1 ?
                                        <i className='bx bxs-check-circle' style={{ fontSize:'xx-large', color: '#37bf13' }}  ></i>
                                        :
                                        <i className='bx bxs-x-circle' style={{ fontSize:'xx-large', color: '#ea0b0f' }}  ></i>}
                                </td>
                                <td>{item.theloai}</td>
                                <td style={{ textAlign:'center' }}>
                                    <button className="btn btn-danger">Xóa</button><br/>
                                    <button className="btn btn-primary">Sửa</button>
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