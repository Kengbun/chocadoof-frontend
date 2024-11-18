import React from "react";
import img from '../assets/imgProduct/img.jpg'
const Product = () => {
    const products = [
        { id: 1, name: "อาหารสุนัข พันธุ์ใหญ่ (MAXI PUPPY)", image: img, rating: 5 },
        { id: 2, name: "อาหารสุนัข พันธุ์กลาง (MEDIUM PUPPY)", image: img, rating: 4 },
        { id: 3, name: "อาหารสุนัข พันธุ์กลาง (MEDIUM PUPPY)", image: img, rating: 3 },
        { id: 4, name: "อาหารสุนัข พันธุ์กลาง (MEDIUM PUPPY)", image: img, rating: 2 },
        { id: 4, name: "อาหารสุนัข พันธุ์กลาง (MEDIUM PUPPY)", image: img, rating: 1 },
        { id: 4, name: "อาหารสุนัข พันธุ์กลาง (MEDIUM PUPPY)", image: img, rating: 0 },
        // { id: 4, name: "อาหารสุนัข พันธุ์กลาง (MEDIUM PUPPY)", image: img, rating: 0 },
        // เพิ่มข้อมูลสินค้าเพิ่มเติมตามต้องการ
    ];

    return (
        <section className="section">
            <div className="section-header">
                <h2>สินค้ารีวิว</h2>
                <a href="#" className="see-more">ดูทั้งหมด &gt;</a>
            </div>
            <div className="list">
                {products.map((product) => (
                    <div className="card" key={product.id}>
                        <div className=" img">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <h3>{product.name}</h3>
                        <div className="rating">
                            {"⭐".repeat(product.rating)}
                        </div>
                        <button className="product-btn">ดูสินค้า</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Product;
