import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import AdminNav from "../../components/nav/AdminNav";
import { Row, Col, message, Select, Divider, Card, Table, Button } from "antd";
import { getProductsByCount } from "../../functions/product";
import axios from "axios";
import AdminProductCard from "../../components/cards/AdminProductCard";
import ContainerPage from "../../core/ContainerPage";
import { getAllUserOrder } from "../../functions/user";
import { formatDateTime } from "../../shared/util/formatTime";
import { getAllOrderAdmin, updateStatusOrder } from "../../functions/admin";
import { CloseCircleFilled, CheckCircleFilled } from "@ant-design/icons";
import ButtonCore from "../../core/ButtonCore";
import EmailCreate from "./EmailCreate/EmailCreate";
import TestInvoice from "./EmailCreate/TestInvoice";
const AdminDashboard = () => {
  const [products, setProducts] = useState();
  const [orders, setOrders] = useState();
  const [orderStatus, setOrderStatus] = useState();

  const { data, isLoading, error } = useQuery(
    "products",
    // () => axios.get("https://reqres.in/api/users?page=2"),
    () =>
      getProductsByCount(10).then((res) => {
        setProducts(res?.data);
      }),
    {
      onSuccess: () => {
        console.log("Data loaded successfully:", data);
      },
    }
  );
  useEffect(() => {
    getAllOrderAdmin().then((res) => setOrders(res?.data));
  }, []);
  const handleChange = (e, item) => {
    console.log(e);
    updateStatusOrder(item?.code, e)
      .then(() => message.success("Update thành công"))
      .catch((err) => message.error(err));
  };
  console.log("Check products :", products, orders);
  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "code",
      key: "code",
      // render: (image) => <Image width={50} src={image} />,
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
      // render: (title) => <div>{title}</div>,
    },
    {
      title: "Người đặt",
      dataIndex: "orderedByName",
      key: "orderedByName",
      // render: (price) => <div>{price}</div>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (count) => <div>{count}</div>,
    },
    {
      title: "Email hoá đơn",
      dataIndex: "isSendEmail",
      key: "isSendEmail",
      render: (checkEmail, record) => (
        <div style={{ textAlign: "center" }}>
          {orderStatus == "Cancelled" || !checkEmail ? (
            <div>
              <CloseCircleFilled style={{ color: "red", fontSize: "20px" }} />
            </div>
          ) : orderStatus == "Completed" ? (
            <EmailCreate record={record} />
          ) : (
            <CheckCircleFilled style={{ color: "#00ff00", fontSize: "20px" }} />
          )}
        </div>
      ),
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (status, record) => (
        <div>
          <Select
            defaultValue={status}
            style={{
              width: 120,
            }}
            onChange={(e) => {
              handleChange(e, record);
              setOrderStatus(e);
            }}
            options={[
              {
                value: "Not Processed",
                label: "Not Processed",
              },
              {
                value: "Processing",
                label: "Processing",
              },
              {
                value: "Dispatched",
                label: "Dispatched",
              },
              {
                value: "Cancelled",
                label: "Cancelled",
              },
              {
                value: "Completed",
                label: "Completed",
              },
            ]}
          />
        </div>
      ),
    },
  ];
  const dataTable = orders?.map((item) => ({
    code: item?._id,
    time: formatDateTime(item?.createdAt),
    orderedByName: item?.orderedBy?.name,
    price: (item?.paymentIntent?.amount / 100).toFixed(2),
    status: item?.orderStatus,
    isSendEmail: item?.receiverInfo?.receiverInfo.isSendEmail,
    ...item,
  }));
  return (
    <ContainerPage>
      <div className="container-fluid">
        <Row>
          <Col>
            <AdminNav />
          </Col>
          <Col span={20}>
            <h4>Quản lí trạng thái đơn hàng</h4>
            {/* {orders?.map((item) => (
              <Card>
                <h6>Mã đơn: {item?._id}</h6>
                <h6>Thời gian đặt hàng: {formatDateTime(item?.createdAt)}</h6>
                <h6>Người đặt: {item?.orderedBy?.name}</h6>
                <h6>
                  Cập nhật trạng thái đơn: {""}
                  <Select
                    defaultValue={item?.orderStatus}
                    style={{
                      width: 120,
                    }}
                    onChange={(e) => handleChange(e, item)}
                    options={[
                      {
                        value: "Not Processed",
                        label: "Not Processed",
                      },
                      {
                        value: "Processing",
                        label: "Processing",
                      },
                      {
                        value: "Dispatched",
                        label: "Dispatched",
                      },
                      {
                        value: "Cancelled",
                        label: "Cancelled",
                      },
                      {
                        value: "Completed",
                        label: "Completed",
                      },
                    ]}
                  />
                </h6>

                <Divider />
              </Card>
            ))} */}

            <div>
              <div>
                <Table columns={columns} dataSource={dataTable} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </ContainerPage>
  );
};

export default AdminDashboard;
