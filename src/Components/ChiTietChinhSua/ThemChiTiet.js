import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import connection from "../Api/ApiService";

function ThemChiTiet() {
    const location = useLocation();
    const { idbthi } = location.state || {};
    const navigate = useNavigate();
    const [ndch, setNdch] = useState('');
    const [pa1, setPa1] = useState('');
    const [pa2, setPa2] = useState('');
    const [pa3, setPa3] = useState('');
    const [pa4, setPa4] = useState('');
    const [lada, setLada] = useState('');
    const handleBack = () => {
        navigate(-1);
    }
    const handleCauhoi = (e) => {
        e.preventDefault();
        setNdch(e.target.value);
    }
    const handlePA1 = (e) => {
        e.preventDefault();
        setPa1(e.target.value);
    }
    const handlePA2 = (e) => {
        e.preventDefault();
        setPa2(e.target.value);
    }
    const handlePA3 = (e) => {
        e.preventDefault();
        setPa3(e.target.value);
    }
    const handlePA4 = (e) => {
        e.preventDefault();
        setPa4(e.target.value);
    }
    const handleDA = (e) => {
        setLada(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(lada === ''){
            alert('Vui lòng chọn đáp án cho câu hỏi!');
            return;
        }
        const ctkq = {
            'IDBaithi':idbthi,
            'Noidung':ndch,
            'Dapan':lada,
            'NDPA':[
                {'Noidungpa':pa1},
                {'Noidungpa':pa2},
                {'Noidungpa':pa3},
                {'Noidungpa':pa4}
            ]
        }
        try{
            await connection.post('/Themchitiet', ctkq);
            alert('Thêm thành công!');
            const btqv = await connection.get(`/Chitietchinhsua/${idbthi}`);
            const bthi = btqv.data;
            navigate('/Chinhsua', {state : {bthi}});
        }
        catch{
            alert('Thêm thất bại! Lỗi!');
        }
    }
    return (
        <div style={{ textAlign: 'justify', fontSize: 'large' }}>
            <button className="btn" onClick={handleBack}>
                <i className='bx bx-left-arrow-circle' style={{ fontSize: 'xx-large', scale: '1.3' }} ></i>
            </button>
            <h1>Thêm câu hỏi mới</h1>
            <div>
                <strong>ID bài thi: </strong>{idbthi}
            </div>
            <form onSubmit={handleSubmit}>
                <label>Nội dung câu hỏi</label>
                <input type="text" required style={{ border: '1px solid black' }} className="form-control" onChange={handleCauhoi}/><br />
                <h4>Các phương án</h4>
                <div style={{ width:'100%', border:'1px solid lightgrey', borderRadius: '20px', padding: '10px' }}>
                    <label>Phương án 1</label>
                    <input type="text" style={{ border: '1px solid black' }} className="form-control" onChange={handlePA1}/>
                    <div style={{ paddingTop: '10px' }}>
                        <label>Đáp án trả lời?</label>
                        <input type="radio" value={'0'} checked={lada === '0'} onChange={handleDA} name="patl" style={{ scale: '2', marginLeft: '3%' }} />
                    </div>
                </div><br/>
                <div style={{ width:'100%', border:'1px solid lightgrey', borderRadius: '20px', padding: '10px' }}>
                    <label>Phương án 2</label>
                    <input type="text" style={{ border: '1px solid black' }} className="form-control" onChange={handlePA2}/>
                    <div style={{ paddingTop: '10px' }}>
                        <label>Đáp án trả lời?</label>
                        <input type="radio" value={'1'} checked={lada === '1'} onChange={handleDA} name="patl" style={{ scale: '2', marginLeft: '3%' }} />
                    </div>
                </div><br/>
                <div style={{ width:'100%', border:'1px solid lightgrey', borderRadius: '20px', padding: '10px' }}>
                    <label>Phương án 3</label>
                    <input type="text" style={{ border: '1px solid black' }} className="form-control" onChange={handlePA3}/>
                    <div style={{ paddingTop: '10px' }}>
                        <label>Đáp án trả lời?</label>
                        <input type="radio" value={'2'} checked={lada === '2'} onChange={handleDA} name="patl" style={{ scale: '2', marginLeft: '3%' }} />
                    </div>
                </div><br/>
                <div style={{ width:'100%', border:'1px solid lightgrey', borderRadius: '20px', padding: '10px' }}>
                    <label>Phương án 4</label>
                    <input type="text" style={{ border: '1px solid black' }} className="form-control" onChange={handlePA4}/>
                    <div style={{ paddingTop: '10px' }}>
                        <label>Đáp án trả lời?</label>
                        <input type="radio" value={'3'} checked={lada === '3'} onChange={handleDA} name="patl" style={{ scale: '2', marginLeft: '3%' }} />
                    </div>
                </div><br/>
                <button style={{ fontSize:'large', marginBottom:'20px' }} className="btn btn-success form-control">
                    Thêm câu hỏi
                </button>
            </form>
        </div>
    )
}
export default ThemChiTiet;