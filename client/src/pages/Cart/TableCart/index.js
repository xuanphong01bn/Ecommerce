import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Card, Table, Image } from "antd";
import sampleImage from "../../../assets/images/sampleLap2.jpg";
import { DeleteFilled } from "@ant-design/icons";
const TableCart = () => {
  const { user, cart } = useSelector((state) => state);
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
    {
      title: "Remove",
      key: "remove",
      render: (_, record) => (
        <div>
          <DeleteFilled style={{ color: "red" }} />
        </div>
      ),
    },
  ];
  const data = cart?.map((item) => ({
    key: item,
    title: item?.title,
    image: item?.images?.[0]?.url || sampleImage,
    price: item?.price,
    count: item?.count,
  }));
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default TableCart;
