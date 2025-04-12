import { useEffect, useState } from "react";
import connection from "../Api/ApiService";

function TheLoai(){
    const [theloai, setTheloai] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const getData = async () => {
            try{
                const response = await connection.get('/Theloai');
                setTheloai(response.data);
                setLoading(false);
            }
            catch{
                alert('Đọc dữ liệu không thành công')
            }
        }
        getData();
    }, [])
    if(loading === true) return(<div>Đang tải dữ liệu...</div>);
    return(
        <div style={{ textAlign: 'justify', fontSize: 'large' }}>
            <h1>Thể loại</h1><br/>
            <button style={{ fontSize:'large' }} className="btn btn-success">Thêm thể loại</button><br/><br/>
            <table className="table table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID thể loại</th>
                        <th>Tên thể loại</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        theloai.map((item, index)=>(
                            <tr key={index}>
                                <td>{item.IDTheloai}</td>
                                <td>{item.Tentheloai}</td>
                                <td>
                                    <button className="btn btn-danger">Xóa</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default TheLoai;