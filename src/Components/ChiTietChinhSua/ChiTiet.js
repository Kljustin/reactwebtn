import { useLocation, useNavigate } from "react-router-dom";

function ChiTiet() {
    const location = useLocation();
    const { bthi } = location.state || {};
    const baithi = bthi.Baithi;
    const chitiet = bthi.Chitiet;
    const navigate = useNavigate();
    const handleBack = ()=>{
        navigate(-1);
    }
    const handleThemcauhoi = () =>{
        const idbthi = baithi.idbaithi;
        navigate('/Themchitiet', {state: {idbthi}});
    }
    return (
        <div style={{ textAlign: 'justify', fontSize: 'large' }}>
            <button className="btn" onClick={handleBack}>
                <i className='bx bx-left-arrow-circle' style={{ fontSize:'xx-large', scale:'1.3' }} ></i>
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
            <button style={{ fontSize: 'large' }} className="btn btn-primary form-control">
                <i className='bx bx-edit' style={{ color: '#ffffff', fontSize: 'large' }}></i> Chỉnh sửa thông tin bài thi
            </button>
            <br/><hr style={{border:'1px solid black' }}/>
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
                                    <button className="btn btn-danger">Xóa</button><br />
                                    <button className="btn btn-warning">Chi tiết</button>
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