import { useEffect, useState } from "react";
import connection from "../Api/ApiService";
import { useNavigate } from "react-router-dom";

function TheLoai(){
    const [theloai, setTheloai] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [showmess, setShowmess] = useState(false);
    const [id, setId] = useState('');
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
    const handleThem = () => {
        navigate('/Formtheloai');
    }
    const handleShow = (e) =>{
        setShowmess(true);
        setId(e);
    }
    const handleXoa = async (e) => {
        try{
            await connection.delete(`/Xoatheloai/${e}`);
            window.location.reload();
        }
        catch{
            alert('Lỗi xóa!');
        }
    }
    if(loading === true) return(<div>Đang tải dữ liệu...</div>);
    return(
        <div style={{ textAlign: 'justify', fontSize: 'large' }}>
            {
                showmess && (
                    <div style={{
                        backgroundColor: 'white', position: 'fixed', top: '35%', left: '35%', right: '35%', bottom: '35%',
                        zIndex: '100', padding: '30px', boxShadow:'0px 4px 10px black'
                    }}>
                        <div style={{ width: '100%', height: '100%', alignContent: 'center' }}>
                            <h3 style={{ width: '100%' }}>Bạn có đồng ý?</h3>
                            <div style={{ width: '100%', bottom: '0', paddingTop: '15px' }}>
                                <button onClick={()=>setShowmess(false)} style={{ display: 'flex', float: 'left' }} className="btn btn-primary">Hủy</button>
                                <button onClick={()=>handleXoa(id)} style={{ display: 'flex', float: 'right' }} className="btn btn-success">Ok</button>
                            </div>
                        </div>
                    </div>
                )
            }
            <h1>Thể loại</h1><br/>
            <button style={{ fontSize:'large' }} className="btn btn-success" onClick={handleThem}>Thêm thể loại</button><br/><br/>
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
                                    <button className="btn btn-danger" onClick={()=>handleShow(item.IDTheloai)}>Xóa</button>
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