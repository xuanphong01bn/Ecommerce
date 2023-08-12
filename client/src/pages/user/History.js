import { Row, Col, Card } from "antd";
import React, { useEffect, useState } from "react";
import UserNav from "../../components/nav/UserNav";
import ContainerPage from "../../core/ContainerPage";
import { getAllUserOrder } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { formatDateTime } from "../../shared/util/formatTime";
import TableUserOrder from "./TableUserOrder/TableUserOrder";
const History = () => {
  const [orders, setOrders] = useState();
  useEffect(() => {
    getAllUserOrder().then((res) => setOrders(res?.data));
  }, []);
  console.log("orders :", orders);
  console.log("format test :", formatDateTime("2023-06-05T16:01:07.669Z"));
  return (
    <ContainerPage>
      <Row>
        <Col span={3}>
          <UserNav />
        </Col>
        <Col span={21}>
          {orders?.length > 0 &&
            orders?.map((item) => (
              <Card key={item}>
                <h6>Thời gian đặt hàng: {formatDateTime(item?.createdAt)}</h6>
                <h6>Trạng thái: {item?.orderStatus}</h6>

                <TableUserOrder dataOrder={item} />
              </Card>
            ))}
        </Col>
      </Row>
    </ContainerPage>
  );
};

export default History;
