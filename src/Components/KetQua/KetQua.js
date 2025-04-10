import { useEffect, useState } from "react";
import connection from "../Api/ApiService";

function KetQua(){
    const[kq, setKq] = useState([]);
    const[loading, setLoading] = useState(true);
    useEffect(()=>{
        const getData = async () => {
            try{
                const response = await connection.get(`/Ketqua/${sessionStorage.getItem('id')}`);
                setKq(response.data);
                setLoading(false);
            }
            catch{
                alert('Đọc dữ liệu không thành công!');
            }
        }
        getData();
    });
    if(loading === true) return(<div>Đang tải dữ liệu...</div>) ;
    return(
        <div style={{ fontSize : 'large' }}>
            <h1 style={{ textAlign : 'justify' }}>Lịch sử kết quả thi</h1><br/>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Ngày thi</th>
                        <th>Số lượng câu đúng</th>
                        <th>Tổng số câu</th>
                        <th>Điểm số</th>
                        <th>Tên bài thi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        kq.map((item, index)=>(
                            <tr key={index}>
                                <td>{item.ngaythi}</td>
                                <td>{item.socaudung}</td>
                                <td>{item.soluongcau}</td>
                                <td>{item.diemso}</td>
                                <td style={{ textAlign : 'justify' }}>{item.tenbaithi}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default KetQua;