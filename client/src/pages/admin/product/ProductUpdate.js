import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {
  Row,
  Col,
  message,
  Form,
  Input,
  Button,
  Spin,
  Tag,
  Alert,
  Space,
  Modal,
  Select,
} from "antd";

import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  createCategory,
  getCategories,
  removeCategory,
  updateCategory,
  listSubsOfCategory,
} from "../../../functions/category";
import { useForm } from "antd/lib/form/Form";
import { useQuery } from "react-query";
import { async } from "@firebase/util";
import { createProduct, getProductBySlug } from "../../../functions/product";
import FileUpload from "../../../components/forms/FileUpload";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { updateProduct } from "../../../functions/product";
const { Option } = Select;
const initialState = {
  title: "",
  description: "",
  price: "",
  categories: "",
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};

const ProductUpdate = () => {
  const [values, setValues] = useState(initialState);
  const { slug } = useParams();
  const navigate = useNavigate();
  console.log("Check slug :", slug);
  const [product, setProduct] = useState();
  useEffect(() => {
    if (slug) {
      getProductBySlug(slug)
        .then((res) => {
          console.log("res slug :", res);
          if (res?.data?.length) {
            setProduct(res?.data[0]);
            setKey((prev) => prev + 1);
          } else message.error("No product");
        })
        .catch((err) => message.error(err.message));
    }
  }, [slug]);
  console.log("Check product fetch :", product);
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;
  const [imagesValue, setImagesValue] = useState();
  useEffect(() => {
    if (product && product?.images) {
      setImagesValue(product?.images);
    }
  }, [product]);
  const [key, setKey] = useState(0);
  const handleSubmit = (valuesForm) => {
    valuesForm.images = imagesValue;
    console.log(valuesForm);
    updateProduct(slug, valuesForm)
      .then((res) => {
        message.success("Update Success!");
        setKey((prev) => prev + 1);
        setImagesValue([]);
        navigate("/admin/products");
      })
      .catch((err) => message.error(err.response.data.err));
  };
  useEffect(() => {
    fetch = async () => {
      await getCategories().then((res) => {
        setValues({ ...values, categories: res.data });
      });
    };
    fetch();
  }, []);
  const [listSubs, setListSubs] = useState();
  const handleChangeCategory = async (e) => {
    setValues({ ...values, category: e });
    const listSub = await listSubsOfCategory(e);
    console.log("Check subs :", subs);
    console.log("Check list subs :", listSub?.data);
    setListSubs(listSub?.data);
  };
  console.log("Check listSub test :", listSubs);
  return (
    <Spin spinning={false}>
      <div className="container-fluid">
        <Row>
          <Col>
            <AdminNav />
          </Col>
          <Col md={15}>
            <h4>Product Update</h4>
            <Form
              key={key}
              onFinish={handleSubmit}
              layout="vertical"
              initialValues={{
                title: product && product.title,
                category: product && product.category,
                images: imagesValue,
                description: product && product.description,
                price: product && product.price,
                shipping: product && product.shipping,
                quantity: product && product.quantity,
                color: product && product.color,
                brand: product && product.brand,
              }}
            >
              <label>Title</label>
              <Form.Item
                name="title"
                placeholde="Enter title"
                rules={[
                  {
                    required: true,
                    message: "Please input your new title!",
                  },
                ]}
              >
                <Input value={title} />
              </Form.Item>
              <label>Choose Image</label>
              <Form.Item>
                <FileUpload
                  setImagesValue={setImagesValue}
                  //   values={product ? product?.images : []}
                  test="hihi"
                  values={{ images: imagesValue }}
                />
              </Form.Item>
              <label>Choose Category</label>
              <Form.Item name="category">
                <Select
                  defaultValue=""
                  placeholde="Select category of sub"
                  onChange={(e) => handleChangeCategory(e)}
                >
                  {categories &&
                    categories.length > 0 &&
                    categories.map((item, index) => (
                      <Option value={item._id} key={item._id}>
                        {item.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
              <label>Choose Sub Category</label>
              <Form.Item name="subs">
                <Select
                  mode="multiple"
                  defaultValue=""
                  // onChange={(e) => setValues({ ...values, subs: [...subs, e] })}
                  onChange={(e) => console.log("Check e :", e)}
                >
                  {listSubs &&
                    listSubs.length > 0 &&
                    listSubs.map((item, index) => (
                      <Option value={item._id} key={item._id}>
                        {item.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
              <label>Description</label>
              <Form.Item
                name="description"
                placeholde="Enter title"
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
              >
                <Input value={description} />
              </Form.Item>
              <label>Price</label>
              <Form.Item
                name="price"
                type="number"
                rules={[
                  {
                    required: true,
                    message: "Required!",
                  },
                ]}
              >
                <Input value={price} />
              </Form.Item>
              <label>Shipping</label>
              <Form.Item name="shipping">
                <Select defaultValue="" placeholde="Select category of sub">
                  <Option value="Yes">Yes</Option>
                  <Option value="No">No</Option>
                </Select>
              </Form.Item>
              <label>Quantity</label>
              <Form.Item
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: "Required!",
                  },
                ]}
              >
                <Input value={quantity} />
              </Form.Item>
              <label>Color</label>
              <Form.Item name="color">
                <Select>
                  {colors.map((item) => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <label>Brand</label>
              <Form.Item name="brand">
                <Select>
                  {brands.map((item) => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </Spin>
  );
};

export default ProductUpdate;
