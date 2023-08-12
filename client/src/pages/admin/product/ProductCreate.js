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
import { createProduct } from "../../../functions/product";
import FileUpload from "../../../components/forms/FileUpload";
import ContainerPage from "../../../core/ContainerPage";
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
  colors: ["Black", "Brown", "Silver", "White", "Blue", "Any"],
  brands: [
    "Apple",
    "Samsung",
    "Microsoft",
    "Lenovo",
    "ASUS",
    "HP",
    "Dell",
    "Acer",
    "MSI",
  ],
  color: "",
  brand: "",
};

const ProductCreate = () => {
  const form = useForm();
  const [values, setValues] = useState(initialState);
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
  const [key, setKey] = useState(0);
  const handleSubmit = (valuesForm) => {
    valuesForm.images = images;
    console.log(valuesForm);
    createProduct(valuesForm)
      .then((res) => {
        message.success("Create Success !");
        setKey((prev) => prev + 1);
        setValues((values) => ({ ...values, images: [] }));
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
    <ContainerPage>
      <Spin spinning={false}>
        <Row>
          <Col>
            <AdminNav />
          </Col>
          <Col span={20}>
            <h4>Product Create</h4>
            <Form
              key={key}
              onFinish={handleSubmit}
              layout="vertical"
              initialValues={{
                title: "Test",
                category: "Lenovo",
                description: "fasdfasdfa",
                price: "1000",
                shipping: "Yes",
                quantity: "100",
                color: "Black",
                brand: "Apple",
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
                <FileUpload setValues={setValues} values={values} />
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
      </Spin>
    </ContainerPage>
  );
};

export default ProductCreate;
