import React, { useEffect, useState } from 'react';
import connection from '../Api/ApiService';
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
        <div>
            <div>
                <input type='text'
                    value={name}
                    onChange={handleChange}
                    onKeyDown={handleChange} />
                <button>Tìm kiếm</button>
            </div>
            <div>
                {
                    (ketqua.length > 0) ?
                        ketqua.map((item) => {
                            return (
                                <button key={item.IDBaithi}>{item.Tenbaithi}</button>
                            )
                        })
                        :
                        <div>Không tìm thấy kết quả</div>
                }
            </div>
        </div>
    )
}
export default TimKiem;