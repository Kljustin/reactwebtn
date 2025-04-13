import { useEffect, useState } from "react";
import connection from "../Api/ApiService";
import { useNavigate } from "react-router-dom";

function TaoDeThi() {
    const [tl, setTl] = useState([]);
    const [quan, setQuan] = useState(0);
    const [states, setStates] = useState({
        congkhai: 0,
        lamlai: 0
    })
    const [tenbt, setTenbt] = useState('');
    const [opt, setOpt] = useState('');
    const navigate = useNavigate();
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
    const handleQuantity = (e) => {
        e.preventDefault();
        if (e.target.value < 0)
            setQuan(0);
        else
            setQuan(e.target.value);
    }
    const handleChoose = (e) => {
        const { name, checked } = e.target;
        setStates(prev => ({
            ...prev,
            [name]: checked ? 1 : 0
        }));
    }
    const handleName = (e) => {
        e.preventDefault();
        setTenbt(e.target.value);
    }
    const handleSelect = (e) => {
        e.preventDefault();
        setOpt(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(opt === ''){
            alert('Vui lòng chọn thể loại');
            return;
        }
        const bt = {
            tenbaithi: tenbt,
            soluongcau: quan,
            congkhai: states.congkhai,
            lamlai: states.lamlai,
            theloai: opt,
            nguoidung: sessionStorage.getItem('id')
        }
        try{
            await connection.post('/Thembaithi', bt);
            alert('Thêm bài thi mới thành công!');
            navigate('/Dethi');
        }
        catch{
            alert('Thêm thất bại, lỗi!');
        }
    }
    return (
        <div style={{ textAlign: 'justify', fontSize: 'large' }}>
            <h1>Tạo đề thi</h1>
            <form onSubmit={handleSubmit}>
                <label>Tên bài thi</label>
                <input type="text" className="form-control" onChange={handleName} /><br />
                <label>Số lượng câu</label>
                <input type="number" min={0} value={quan} onChange={handleQuantity} className="form-control" />
                <br />
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
                <label>Chủ đề</label>
                <select value={opt} onChange={handleSelect} className="form-control" style={{ fontSize: 'large' }}>
                    <option>--chọn chủ đề--</option>
                    {
                        tl.map((item, index) => (
                            <option key={index} value={item.IDTheloai}>{item.Tentheloai}</option>
                        ))
                    }
                </select><br />
                <button className="btn btn-success form-control" style={{ fontSize: 'large' }}>Tạo đề thi</button>
            </form>
        </div>
    )
}
export default TaoDeThi;