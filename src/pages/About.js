import React from 'react';
import HomeImg from '../assets/home.jpg';
import about from '../assets/aboutus.jpg';
import gallery1 from '../assets/gallery/img1.jpg';
import gallery2 from '../assets/gallery/img2.jpg';
import gallery3 from '../assets/gallery/img3.jpg';
import bg from './statusbg.jpg'

const About = () => {
    return (
        <div>
            <div className="">
                <img className='img-fluid w-100 h-80 object-fit-cover'
                    style={{
                        height: '400px',
                    }}
                    src={about} alt="รูป" />
            </div>

            <div className="container my-5">
                <div className="row">
                    <div className="col-lg-6 text-center text-lg-start">
                        <h1>ความเป็นมาของเรา</h1>
                        <p>
                            นาฏยศาลามุมมองรีพอร์ทคีตกวีไคลแมกซ์ซิมโฟนี่คอลัมน์คอนเซปตยอมรับบอร์ไทยแลนด์โปรโมทฮปคาร์เตี๊ยมชมปิยองแอคทีฟนิรันดร์ซาตานริคเตอร์คอนเซ็ปต์เห็นด้วยเอ็นเตอร์เทนฉลุยปัจฉิมนิเทศปสเตอร์ราชานุญาตคอนโทรลซิตีเอาท์ดอร์กุมภาพันธ์เอาต์แพตเทิร์นโฮปโมจิเพียบแปรสามช่าแคร์กรุ๊ปมินต์เฟิร์ม
                            <br />
                            <br />พันธกิจ (Mission) และวิสัยทัศน์ (Vision): อธิบายถึงจุดมุ่งหมายของร้านในการให้บริการที่ดีที่สุดแก่สัตว์เลี้ยงและเจ้าของ
                            <br />
                            <br />
                            จุดเด่นของร้าน: สิ่งที่ทำให้ Chocadoof Pet Shop แตกต่าง เช่น การคัดสรรอาหารสัตว์ที่มีคุณภาพบริการส่งที่รวดเร็วหรือทีมงานที่มีความเชี่ยวชาญด้านการดูแลสัตว์เลี้ยงความมุ่งมั่นในคุณภาพสินค้า:ให้ลูกค้าทราบถึงการเลือกสินค้าและมาตรฐานที่ใช้ในการคัดเลือกอาหารสัตว์


                        </p>

                    </div>
                    <div className="d-none d-lg-flex col-lg-6 text-center">
                        <img className='img-fluid rounded shadow' src={HomeImg} alt="Chocadoof Petshop" />
                    </div>
                </div>
            </div>



            <div className=" py-4 text-center shadow"
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3 justify-content-center px-4 ">
                    <div className="col">
                        <div className=" bg-white border border-dark rounded p-3 shadow-sm">
                            <h2>12</h2>
                            <p>ประสบการณ์ทำงาน</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className=" bg-white border border-dark rounded p-3 shadow-sm">
                            <h2>25</h2>
                            <p>สาขาให้บริการ</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className=" bg-white border border-dark rounded p-3 shadow-sm">
                            <h2>100+</h2>
                            <p>แบรนด์สินค้า</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className=" bg-white border border-dark rounded p-3 shadow-sm">
                            <h2>1000+</h2>
                            <p>ลูกค้าที่ใช้บริการ</p>
                        </div>
                    </div>

                </div>
            </div>


           

            <div class="container py-4 text-center">
                <h2 class="mb-4">แกลเลอรี</h2>
                <div class="d-flex flex-wrap justify-content-center gap-3">
                    <img src={gallery1} class="w-25 h-auto img-thumbnail" alt="Gallery Image" />
                    <img src={gallery2} class="w-25 h-auto img-thumbnail" alt="Gallery Image" />
                    <img src={gallery3} class="w-25 h-auto img-thumbnail" alt="Gallery Image" />
                </div>
            </div>

        </div>
    );
};

export default About;
