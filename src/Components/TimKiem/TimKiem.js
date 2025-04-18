import React, { useEffect, useState } from 'react';
import connection from '../Api/ApiService';
import './TimKiem.css';
function TimKiem() {
    const [name, setName] = useState('');
    const [ketqua, setKetqua] = useState([]);

    useEffect(() => {
        if (!name.trim()) {
            setKetqua([]);  // Nếu không có từ khóa thì không tìm kiếm
            return;
        }
        const timer = setTimeout(() => {
            const getData = async () => {
                try {
                    const response = await connection.get('/BaithiTimkiem', {
                        params: {
                            name: name
                        }
                    });
                    setKetqua(response.data);
                }
                catch {
                    setKetqua([]);
                }
            }
            getData();
        }, 300);

        return () => clearTimeout(timer);  // Dọn dẹp nếu người dùng nhập tiếp
    }, [name]);

    const handleChange = (e) => {
        setName(e.target.value)
    }
    return (
        <div style={{ height: '100%', width: '100%' }}>
            <table style={{ height: '100%', width: '100%' }}>
                <tbody>
                    <tr style={{ height:'20%' }}>
                        <td><div>
                            <table className='table table-borderless'>
                                <tbody>
                                    <tr style={{ height: '20%' }}>
                                        <td style={{ width: '80%' }}>
                                            <input type='text'
                                                value={name}
                                                className='form-control'
                                                style={{ border: '1px solid black', height: '50px', fontSize: 'large', borderRadius: '10px' }}
                                                onChange={handleChange}
                                                onKeyDown={handleChange} />
                                        </td>
                                        <td style={{ width: '20%' }}><button className='btn btn-success form-control' style={{ height: '50px', borderRadius: '10px' }}>
                                            <i className='bx bx-search-alt-2' style={{ color: '#ffffff', fontSize: 'x-large' }}  ></i>
                                        </button></td>
                                    </tr>
                                    <tr style={{ height: '80%' }}>

                                    </tr>
                                </tbody>
                            </table>
                        </div></td>

                    </tr>
                    <tr>
                        <td>
                            <div style={{ paddingTop: '20px', paddingBottom: '20px', 
                                paddingLeft:'20px', paddingRight:'20px', height:'100%', overflowY:'auto', overflowX:'hidden' }}>
                                {
                                    (ketqua.length > 0) ?
                                        ketqua.map((item) => {
                                            return (
                                                <button key={item.IDBaithi}
                                                    style={{
                                                        width: '100%',
                                                        textAlign: 'justify',
                                                        border: '1px solid black',
                                                        borderRadius: '20px',
                                                        boxShadow: '0px 1px 3px black',
                                                        fill: 'white',
                                                        padding: '20px',
                                                        transition: '0.3s'
                                                    }}
                                                    className='btn btn_baithi'>
                                                    <h5>{item.Tenbaithi}</h5>
                                                    <div>{item.Ngayrade}</div>
                                                    <div>Số lượng câu: {item.Soluongcau}</div>
                                                </button>
                                            )
                                        })
                                        :
                                        <div style={{ fontSize: 'large' }}>Không tìm thấy kết quả</div>
                                }
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>


        </div>
    )
}
export default TimKiem;