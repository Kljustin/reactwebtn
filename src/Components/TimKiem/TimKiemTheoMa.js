import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TimKiemTheoMa() {
    const [id, setId] = useState('');
    const navigate = useNavigate();
    const handleChange = (e)=>{
        e.preventDefault();
        setId(e.target.value);
    }
    const handleClick = (e)=>{
        e.preventDefault();
        if(id === ''){
            alert('Vui lòng nhập mã!');
            return;
        }
        navigate('/Chitietbaithi', {state:{id}});
    }
    return (
        <div>
            <form onSubmit={handleClick}>
                <input type="text" onChange={handleChange}/><button onClick={handleClick}>Thi</button>
            </form>
        </div>
    )
}
export default TimKiemTheoMa;