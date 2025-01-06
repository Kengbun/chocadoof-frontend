import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ManageReviews = () => {

  const token = localStorage.getItem('authToken');
  const apiUrl = process.env.REACT_APP_API;
  const [data, setData] = useState([]);
  const [visibleReviwes, setVisibleReviwes] = useState(5);


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // console.log(token);
    try {
      const response = await axios.get(apiUrl + "/review/", {
        headers: {
          'authToken': `Bearer ${token}`
        }
      });
      // console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }
  // ฟังก์ชันสำหรับลบรีวิว
  const handleRemove = async (id) => {
    // console.log(id);
    try {
      const response = await axios.delete(apiUrl + "/review/" + id, {
        headers: {
          'authToken': `Bearer ${token}`
        }
      });
      // console.log(response.data);
      loadData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }

  // ฟังก์ชันสำหรับโหลดสินค้าเพิ่มเติม
  const loadMoreReviwes = () => {
    setVisibleReviwes((prev) => prev + 5); // เพิ่ม 5 ชิ้นต่อการกดครั้งหนึ่ง
  };

  return (
    <div>
      <h3>จัดการรีวิว</h3>

      <table className="article-table">
        <thead>
          <tr>
            <th>ชื่อสินค้า</th>
            <th>คะแนน</th>
            <th>รีวิว</th>
            {/* <th>วันที</th> */}
            {/* <th>id</th> */}
            <th>การจัดการ</th>
          </tr>
        </thead>
        { // ตรวจสอบว่ามีข้อมูลหรือไม่
          data.length > 0 ? (
            // แสดงข้อมูล
            data.slice(0, visibleReviwes).map((reviews, index) => (
              <tr key={index}> {/* ใช้ key สำหรับแต่ละแถว */}
                {/* <td>{index + 1}</td> */}
                <td>{reviews.Product.product_name}</td>
                <td>{reviews.rating}</td>
                <td>{reviews.review_description}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleRemove(reviews.id)}
                  >ลบ</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">ไม่มีข้อมูลสินค้า</td>
            </tr>
          )
        }

      </table>
      {/* แสดงปุ่มเพิ่มเติม */}
      {visibleReviwes < data.length && (
        <div className="load-more">
          <button onClick={loadMoreReviwes}>เพิ่มเติม</button>
        </div>
      )}
    </div>
  )
}

export default ManageReviews
