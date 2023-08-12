import React, { useEffect, useState } from "react";
import BoxArt from "../BoxArt";
import { getProductsByCount } from "../../../../functions/product";
const GeneralStat = ({ dataRevenue, seriesOrder }) => {
  console.log("dat box :", dataRevenue);
  const [product, setProduct] = useState();

  useEffect(() => {
    getProductsByCount(1000).then((res) => {
      console.log(res?.data);
      setProduct(res?.data);
    });
  }, []);
  return (
    <div style={{ marginTop: "24px" }}>
      <h5>Thống kê chung</h5>
      <div style={{ marginTop: "12px", marginBottom: "24px" }}>
        <BoxArt
          title="Tổng doanh thu"
          backColor="#ff4d4d"
          text={dataRevenue?.series?.reduce((acc, cur) => acc + cur, 0) + "$"}
          percent={0}
        />
        <BoxArt
          title="Số đơn hàng"
          backColor="#00e682"
          text={seriesOrder.reduce((acc, cur) => acc + cur, 0)}
          percent={0}
        />
        <BoxArt
          title="Số người dùng"
          backColor="#583de1"
          text="2"
          percent={0}
        />
        <BoxArt
          title="Tổng sản phẩm"
          backColor="#e2d650"
          text={product?.length}
          percent={0}
        />
      </div>
    </div>
  );
};

export default GeneralStat;
