import { useEffect, useState } from "react";
import connection from "../Api/ApiService";
import { useLocation, useNavigate } from "react-router-dom";

function ChinhSuaForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const { btcs } = location.state || {};
    const id = btcs.IDBaithi;
    const [tenbt, setTenbt] = useState(btcs.Tenbaithi);
    const [quan, setQuan] = useState(btcs.Soluongcau);
    const [opt, setOpt] = useState(btcs.IDTheloai);
    const [states, setStates] = useState({
        congkhai: btcs.Congkhai,
        lamlai: btcs.Lamlai
    });
    const [tl, setTl] = useState([]);
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await connection.get('/Theloai');
                setTl(response.data);
            }
            catch {
                alert('Đọc danh sách thể loại không thành công!');
            }
        }
        getData();
    }, []);
    const handleName = (e) => {
        setTenbt(e.target.value);
    }
    const handleQuantity = (e) => {
        if (e.target.value < 0)
            setQuan(0);
        else
            setQuan(e.target.value);
    }
    const handleSelect = (e)=>{
        setOpt(e.target.value);
    }
    const handleChoose = (e) => {
        const { name, checked } = e.target;
        setStates(prev => ({
            ...prev,
            [name]: checked ? 1 : 0
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const formdata = new FormData();
            formdata.append('Tenbaithi', tenbt);
            formdata.append('Soluongcau', quan);
            formdata.append('Congkhai', states.congkhai);
            formdata.append('Lamlai', states.lamlai);
            formdata.append('IDTheloai', opt);
            await connection.put(`/Chinhsua/${id}`, formdata);
            navigate('/Dethi');
        }
        catch{
            alert('Lỗi chỉnh sửa!');
        }
    }
    return (
        <div style={{ textAlign:'justify', fontSize:'large' }}>
            <h1>Chỉnh sửa thông tin đề thi</h1>
            <form onSubmit={handleSubmit}>
                <label>Tên bài thi</label>
                <input type="text" value={tenbt} className="form-control" onChange={handleName} style={{ fontSize:'large' }} /><br />
                <label>Số lượng câu</label>
                <input type="number" min={0} value={quan} onChange={handleQuantity} className="form-control" style={{ fontSize:'large' }} /><br/>
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <td><label>Đề thi công khai?</label><input type="checkbox" checked={states.congkhai === 1}
                                onChange={handleChoose} name="congkhai" style={{ scale: '2', marginLeft: '3%' }} /></td>
                            <td><label>Được làm lại?</label> <input type="checkbox" checked={states.lamlai === 1}
                                onChange={handleChoose} name="lamlai" style={{ scale: '2', marginLeft: '3%' }} /></td>
                        </tr>
                    </tbody>
                </table>
                <label>Thể loại</label>
                <select value={opt} onChange={handleSelect} className="form-control" style={{ fontSize: 'large' }}>
                    <option>--chọn chủ đề--</option>
                    {
                        tl.map((item, index) => (
                            <option key={index} value={item.IDTheloai}>{item.Tentheloai}</option>
                        ))
                    }
                </select><br />
                <button className="btn btn-success form-control" style={{ fontSize:'large' }}>Xác nhận chỉnh sửa</button>
            </form>
        </div>
    )
}
export default ChinhSuaForm;