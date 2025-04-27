import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import connection from "../Api/ApiService";

function ChiTiet() {
    const location = useLocation();
    const { bthi } = location.state || {};
    const baithi = bthi.Baithi;
    const id = baithi.idbaithi;
    const chitiet = bthi.Chitiet;
    const navigate = useNavigate();
    const [showmess, setShowmess] = useState(false);
    const handleBack = () => {
        navigate(-1);
    }
    const handleThemcauhoi = () => {
        const idbthi = baithi.idbaithi;
        navigate('/Themchitiet', { state: { idbthi } });
    }
    const handleXoa = async(e)=>{
        try{
            await connection.delete(`/Xoabaithi/${e}`);
            navigate('/Dethi');
        }
        catch{
            alert('Xóa thất bại, lỗi!');
        }
    }
    const handleChinhsua = async () => {
        try{
            const response = await connection.get(`/CTBaithi/${baithi.idbaithi}`);
            const btcs = response.data;
            navigate('/Chinhsuadethi', {state:{btcs}});
        }
        catch{
            alert('Bài thi không tồn tại!');
        }
    }
    const handleXoaCH = async (e)=>{
        try{
            await connection.delete(`/Xoacauhoi/${e}`);
            const response = await connection.get(`/Chitietchinhsua/${id}`);
            const bthi = response.data;
            navigate('/Chinhsua', {state : {bthi}});
            return;
        }
        catch{
            alert('Lỗi không thể xóa!');
            return;
        }
    }
    const handleCT = async (e) =>{
        try{
            const response = await connection.get(`/Cauhoichitiet/${e}`);
            const ch = response.data;
            navigate('/Chitietcauhoi', {state:{ch}});
        }
        catch{
            alert('Lỗi không tồn tại dữ liệu!');
        }
    }
    return (
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
                                <button onClick={()=>handleXoa(baithi.idbaithi)} style={{ display: 'flex', float: 'right' }} className="btn btn-success">Ok</button>
                            </div>
                        </div>
                    </div>
                )
            }
            <button className="btn" onClick={handleBack}>
                <i className='bx bx-left-arrow-circle' style={{ fontSize: 'xx-large', scale: '1.3' }} ></i>
            </button>
            <h1>Chi tiết bài thi</h1>
            <table className="table table-bordered table-striped">
                <tbody>
                    <tr>
                        <th>Mã bài thi</th>
                        <td>{baithi.idbaithi}</td>
                    </tr>
                    <tr>
                        <th>Tên bài thi</th>
                        <td>{baithi.tenbaithi}</td>
                    </tr>
                    <tr>
                        <th>Ngày ra đề</th>
                        <td>{baithi.ngayrade}</td>
                    </tr>
                    <tr>
                        <th>Số lượng câu</th>
                        <td>{baithi.soluongcau}</td>
                    </tr>
                    <tr>
                        <th>Thể loại</th>
                        <td>{baithi.theloai}</td>
                    </tr>
                    <tr>
                        <th>Công khai</th>
                        <td>
                            {baithi.congkhai === 1 ?
                                <i className='bx bxs-check-circle' style={{ fontSize: 'xx-large', color: '#37bf13' }}  ></i>
                                :
                                <i className='bx bxs-x-circle' style={{ fontSize: 'xx-large', color: '#ea0b0f' }}  ></i>}
                        </td>
                    </tr>
                    <tr>
                        <th>Làm lại</th>
                        <td>
                            {baithi.lamlai === 1 ?
                                <i className='bx bxs-check-circle' style={{ fontSize: 'xx-large', color: '#37bf13' }}  ></i>
                                :
                                <i className='bx bxs-x-circle' style={{ fontSize: 'xx-large', color: '#ea0b0f' }}  ></i>}
                        </td>
                    </tr>
                </tbody>
            </table>
            <button style={{ fontSize: 'large' }} className="btn btn-primary form-control" onClick={handleChinhsua}>
                <i className='bx bx-edit' style={{ color: '#ffffff', fontSize: 'large' }}></i> Chỉnh sửa thông tin bài thi
            </button><br /><br />
            <button style={{ fontSize: 'large' }} className="btn btn-danger form-control"
            onClick={()=>setShowmess(true)}>
                <i className='bx bxs-minus-circle' style={{ color: '#ffffff', fontSize: 'large' }}></i> Xóa
            </button>

            <br /><hr style={{ border: '1px solid black' }} />
            <h1>Các câu hỏi</h1>
            <button style={{ fontSize: 'large' }}
                className="btn btn-success"
                onClick={handleThemcauhoi}>
                <i className='bx bx-plus-circle' style={{ color: '#ffffff', fontSize: 'large' }}></i> Thêm câu hỏi
            </button>
            <br /><br />
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th style={{ width: '85%' }}>Nội dung câu hỏi</th>
                        <th style={{ textAlign: 'center' }}>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        chitiet.map((item, index) => (
                            <tr key={index}>
                                <td style={{ alignContent: 'center' }}>{item.noidung}</td>
                                <td style={{ alignContent: 'center', textAlign: 'center' }}>
                                    <button className="btn btn-danger" onClick={()=>handleXoaCH(item.idcauhoi)}>Xóa</button><br />
                                    <button className="btn btn-warning" onClick={()=>handleCT(item.idcauhoi)}>Chi tiết</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default ChiTiet;