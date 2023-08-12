import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Row, Col, message } from "antd";
import axios from "axios";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { deleteProduct } from "../../../functions/product";
import ContainerPage from "../../../core/ContainerPage";
const AllProducts = () => {
  const [products, setProducts] = useState();
  const [keyDelete, setKeyDelete] = useState(0);
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
    },
    []
  );
  const handleDelete = async (item) => {
    if (window.confirm(`Confirm delete ${item.name} ?`)) {
      await deleteProduct(item.slug)
        .then((res) => {
          setKeyDelete((prev) => prev + 1);
          message.success("Delete done");
          return;
        })
        .catch((err) => message.error(err.message));
    }
  };
  console.log("Check products :", products);

  return (
    <ContainerPage>
      <Row>
        <Col>
          <AdminNav />
        </Col>
        <Col span={20}>
          <h4>All Product</h4>
          <Row gutter={[16, 16]} key={keyDelete}>
            {products &&
              products.map((item) => (
                <Col md={8} lg={6}>
                  <AdminProductCard
                    handleDelete={handleDelete}
                    key={item._id}
                    product={item}
                  />
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </ContainerPage>
  );
};

export default AllProducts;
