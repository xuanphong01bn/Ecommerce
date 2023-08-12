import React from "react";
import { Card } from "antd";
import SampleLap from "../../assets/images/sampleLap2.jpg";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;
const AdminProductCard = ({ product, handleDelete }) => {
  const { title, description, images, slug } = product;
  const navigate = useNavigate();
  return (
    <>
      <Card
        bordered={true}
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt={description}
            src={(images && images.length && images[0].url) || SampleLap}
            style={{
              height: "150px",
              objectFit: "cover",
            }}
          />
        }
        actions={[
          <EditOutlined
            onClick={() => navigate(`/admin/product/update/${slug}`)}
          />,
          <DeleteOutlined onClick={() => handleDelete(product)} />,
        ]}
      >
        <Meta
          title={title}
          description={description.substring(0, 40) + "..."}
        />
      </Card>
    </>
  );
};

export default AdminProductCard;
