import { useState } from "react";
import connection from "../Api/ApiService";
import { useNavigate } from "react-router-dom";

function FormTheLoai(){
    const [tentl, setTentl] = useState([]);
    const navigate = useNavigate();
    const handleTen = (e) => {
        e.preventDefault();
        setTentl(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const formdata = new FormData();
            formdata.append('Tentheloai', tentl);
            await connection.post('/Themtheloai', formdata);
            navigate('/Theloai');
        }
        catch{
            alert('Lỗi khi thêm!');
        }
    }
    return (
        <div  style={{ textAlign:'justify', fontSize:'large' }}>
            <h1>Thêm thể loại</h1>
            <form onSubmit={handleSubmit}>
                <label>Tên thể loại</label>
                <input type="text" className="form-control" onChange={handleTen}/><br/>
                <button className="btn btn-success form-control">Thêm thể loại</button>
            </form>
        </div>
    )
}
export default FormTheLoai;