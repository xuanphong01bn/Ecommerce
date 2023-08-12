import React, { useEffect, useState } from "react";
import BarChartBasic from "../../../components/charts/BarChartBasic";
import ContainerPage from "../../../core/ContainerPage";
import { CaretUpOutlined } from "@ant-design/icons";
import BoxArt from "./BoxArt";
import LineChartBasic from "../../../components/charts/LineChartBasic";
import { Select, Row, Col } from "antd";
import "./styles.css";
import { WordCloudBasic } from "../../../components/charts/WordCloudBasic";
import AdminNav from "../../../components/nav/AdminNav";
import { orderByDay, revenueStatic } from "../../../functions/admin";
import GeneralStat from "./GeneralStat";
const SalesManagement = () => {
  const [time, setTime] = useState(0);
  const [seriesOrder, setSeriesOrder] = useState([]);
  const [categoriesOrder, setCategoriesOrder] = useState([]);
  const [dataRevenue, setDataRevenue] = useState({
    series: [],
    categories: [],
  });

  useEffect(() => {
    if (time > 0) {
      orderByDay(time).then((res) => {
        console.log(res?.data);
        setSeriesOrder(res?.data?.count?.map((item) => item?.numOrder));
        setCategoriesOrder(res?.data?.count?.map((item) => item?._id));
      });
    }
  }, [time]);
  useEffect(() => {
    orderByDay(7).then((res) => {
      console.log(res?.data);
      setSeriesOrder(res?.data?.count?.map((item) => item?.numOrder));
      setCategoriesOrder(res?.data?.count?.map((item) => item?._id));
    });
  }, []);
  useEffect(() => {
    revenueStatic().then((res) => {
      console.log("revenue :", res?.data);
      setDataRevenue({
        series: res?.data?.reve?.map((item) => item.totalAmount),
        categories: res?.data?.reve?.map((item) => "Tháng " + item?._id?.month),
      });
    });
  }, []);
  console.log("Check series :", seriesOrder, categoriesOrder);
  return (
    <ContainerPage>
      <Row>
        <Col>
          <AdminNav />
        </Col>
        <Col span={20}>
          <h2>Quản lí doanh thu</h2>
          {dataRevenue?.series?.length && seriesOrder?.length && (
            <GeneralStat dataRevenue={dataRevenue} seriesOrder={seriesOrder} />
          )}
          <div id="Doanh thu theo tháng">
            <h5>Doanh thu theo tháng</h5>
            <BarChartBasic
              series={dataRevenue?.series}
              categories={dataRevenue?.categories}
            />
          </div>
          <div id="Doanh thu theo tháng" style={{ marginTop: "24px" }}>
            <h5>Số lượng đơn hàng</h5>
            <Select
              defaultValue={7}
              style={{ width: 120 }}
              onChange={(e) => {
                console.log(e);
                setTime(e);
              }}
              options={[
                { value: 7, label: "7 ngày gần nhất" },
                { value: 30, label: "1 tháng gần nhấT" },
              ]}
            />
            <LineChartBasic series={seriesOrder} categories={categoriesOrder} />
          </div>
          <div id="Từ khoá nổi bật" style={{ marginTop: "24px" }}>
            <h5>Tìm kiếm nổi bật</h5>
            <WordCloudBasic />
          </div>
        </Col>
      </Row>
    </ContainerPage>
  );
};

export default SalesManagement;
