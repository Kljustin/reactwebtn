import { useLocation } from "react-router-dom";

function ChiTietCauHoi() {
    const location = useLocation();
    const { ch } = location.state || {};
    const cauhoi = ch.cauhoi;
    const cautraloi = ch.cautraloi;
    return (
        <div style={{ fontSize:'large', textAlign:'justify' }}>
            <h1>Nội dung câu hỏi</h1><br/>
            <h4>Câu hỏi: {cauhoi.Noidung}</h4><br/>
            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Nội dung phương án</th>
                        <th>Là đáp án?</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cautraloi.map((item) => (
                            <tr key={item.IDCautrl}>
                                <td>{item.Noidung}</td>
                                <td>
                                    {
                                        item.IDCautrl === cauhoi.IDPhuongan ?
                                        <i className='bx bxs-check-circle' style={{ fontSize: 'xx-large', color: '#37bf13' }}  ></i>
                                        :
                                        null
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default ChiTietCauHoi;