import axios from 'axios';
import React, { useEffect } from 'react'

const ManageProducts = () => {

    const apiUrl = process.env.REACT_APP_API;

    // const [data, setData] = useState([]);

    // โหลดข้อมูล
    useEffect(() => {
        loadData()
    }, []);

    // ฟังก์ชันสําหรับโหลดข้อมูล
    const loadData = async () => {
        await axios.get(apiUrl + "/products/")
            .then((res) => {
                // setData(res.data)
                console.log(res.data)
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>

        </div>
    )
}

export default ManageProducts
