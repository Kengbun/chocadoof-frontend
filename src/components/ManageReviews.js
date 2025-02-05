// import axios from 'axios';
import axios from '../confix/axios';
import React, { useEffect, useState } from 'react'
import { useLoadMore, useNotificationCustom } from '../functions/functions';


const ManageReviews = () => {

  const token = localStorage.getItem('authToken');
  const [data, setData] = useState([]);
  const {visible, loadMore} = useLoadMore(5, 5);
 const { showNotification } = useNotificationCustom();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // console.log(token);
    try {
      const response = await axios.get("/review/", {
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
      const response = await axios.delete("/review/" + id, {
        headers: {
          'authToken': `Bearer ${token}`
        }
      });
      showNotification("success", "ลบข้อมูลสำเร็จ", "");
      // console.log(response.data);
      loadData();
    } catch (error) {
      console.error("Error deleting data:", error);
      showNotification("error", "เกิดข้อผิดพลาด", error.message);
    }
  }


  return (
    <div id="manage-reviews" className="container my-4">
      <h3 className=" mb-4">จัดการรีวิว</h3>

      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center align-middle">
          <thead className="table-secondary">
            <tr>
              <th>ชื่อสินค้า</th>
              <th>คะแนน</th>
              <th>รีวิว</th>
              <th>การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.slice(0, visible).map((reviews, index) => (
                <tr key={index}>
                  <td>{reviews.Product.product_name}</td>
                  <td>{reviews.rating}</td>
                  <td>{reviews.review_description}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemove(reviews.id)}
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">ไม่มีข้อมูลสินค้า</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ปุ่มเพิ่มเติม */}
      {visible < data.length && (
        <div className="d-flex justify-content-center mt-3">
          <button className="custom-btn rounded " onClick={loadMore}>
            เพิ่มเติม
          </button>
        </div>
      )}
    </div>

  )
}

export default ManageReviews


