import React, { useState } from 'react';
import './DangNhap.css';
import connection from '../Api/ApiService';
import { useNavigate } from 'react-router-dom';
function DangNhap() {
    const[tendn, setTendn] = useState('');
    const[matkhau, setMatkhau] = useState('');
    const navigation = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const user = await connection.post('/Dangnhap',{
                tendn : tendn,
                matkhau : matkhau
            });
            if (typeof user.data.IDNguoidung === 'undefined'){
                alert('Đăng nhập thất bại!');
            }
            else{
                sessionStorage.setItem('id', user.data.IDNguoidung);
                sessionStorage.setItem('ten', user.data.Hoten);
                sessionStorage.setItem('quyen', user.data.Phanquyen);
                alert('Đăng nhập thành công!');
                navigation('/');
                window.location.reload();
            }
        }
        catch (error) {
            alert('Đăng nhập thất bại!');
        }
    }
    return (
        <div className='div_form'>
            <form className='form_edit' onSubmit={handleSubmit}>
                <label className='form-label'>Tên đăng nhập</label>
                <input type='text' className='form-control' onChange={(e)=>{setTendn(e.target.value)}}/>
                <label className='form-label'>Mật khẩu</label>
                <input type='password' className='form-control' onChange={(e)=>{setMatkhau(e.target.value)}}/><br/>
                <button className='form-control btn btn-success'>Đăng nhập</button>
            </form>
        </div>
    )
}
export default DangNhap;