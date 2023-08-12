import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Card, Table, Image } from "antd";
import sampleImage from "../../../assets/images/sampleLap2.jpg";
import { DeleteFilled } from "@ant-design/icons";
const TableUserOrder = (dataOrder) => {
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image width={50} src={image} />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title) => <div>{title}</div>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <div>{price}</div>,
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
      render: (count) => <div>{count}</div>,
    },
  ];
  const dataTable = dataOrder?.dataOrder?.products?.map((item) => ({
    key: item,
    title: item?.product?.title,
    image: item?.product?.images?.[0]?.url || sampleImage,
    price: item?.product?.price,
    count: item?.count,
  }));
  console.log("data table :", dataOrder);
  return (
    <div>
      <Table columns={columns} dataSource={dataTable} size="small" />
    </div>
  );
};

export default TableUserOrder;
