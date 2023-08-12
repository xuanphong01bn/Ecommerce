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
  createSub,
  removeSub,
  updateSub,
  getSubs,
} from "../../../functions/sub";
import { getCategories } from "../../../functions/category";
import { useForm } from "antd/lib/form/Form";
import { useQuery } from "react-query";
import ContainerPage from "../../../core/ContainerPage";
const { Option } = Select;
const SubCreate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = useForm();
  const { user } = useSelector((state) => state);
  const [categories, setCategories] = useState([]);
  const [key, setKey] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [categoryOfSub, setCategoryOfSub] = useState("");
  const [listSub, setListSub] = useState([]);
  console.log("Check categories :", categories);
  //create category
  const handleSubmit = async (values) => {
    setKey((prev) => prev + 1);
    setIsLoading(true);
    setKeyword("");
    await createSub(values.sub, categoryOfSub, user.token)
      .then((res) => {
        console.log("Check res :", res);
        setIsLoading(false);
        message.success(`create category success!`);
        form.resetFields();
      })
      .catch((err) => {
        setIsLoading(false);
        message.error(err.message);
      });
  };
  useEffect(() => {
    fetch = async () => {
      await getCategories().then((res) => {
        setCategories(res.data);
        console.log("Check res :", res);
      });
      await getSubs().then((res) => {
        setListSub(res.data);
      });
    };
    fetch();
  }, [key]);
  const [itemName, setItemName] = useState("");

  // Delete Sub
  const deleteItems = async (item) => {
    console.log("Check e:", item);
    // let answer = window.confirm("Confirm delete ${item.name} ?");
    if (window.confirm(`Confirm delete ${item.name} ?`)) {
      try {
        await removeSub(item.slug, user.token);
        message.success("Delete success");
        setKey((prev) => prev + 1);
      } catch (error) {
        message.error(error.message);
      }
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemSelect, setItemSelect] = useState("");
  const showModal = (item) => {
    setIsModalOpen(true);
    setItemSelect(item);
    setItemName(item.name);
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    try {
      // console.log(itemSelect.slug, itemSelect.name);
      await updateSub(itemSelect.slug, itemName, categoryOfSub, user.token);
      message.success("Update done");
      setKey((prev) => prev + 1);
      setIsModalOpen(false);
      setItemSelect("");
    } catch (error) {
      message.error(error.message);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  // search functions
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);
  return (
    <ContainerPage>
      <Spin spinning={isLoading}>
        <div className="container-fluid">
          <Row>
            <Col>
              <AdminNav />
            </Col>
            <Col md={15}>
              <h4>Create Sub</h4>
              <Form form={form} onFinish={handleSubmit} layout="vertical">
                <label>Choose Category Of Sub</label>
                <Form.Item>
                  <Select
                    defaultValue=""
                    placeholde="Select category of sub"
                    onChange={(e) => setCategoryOfSub(e)}
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
                <label>Enter Sub Category</label>
                <Form.Item
                  name="sub"
                  placeholde="Select sub name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your new category!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
              <hr />
              <Input
                key={key}
                placeholder="Search sub"
                value={keyword}
                onChange={(e) => handleSearch(e)}
                allowClear={true}
              />
              <hr />
              <div style={{ display: "block" }}>
                {listSub.filter(searched(keyword)).map((item, index) => {
                  return (
                    <div
                      style={{
                        display: "inline-block",
                        marginRight: "8px",
                        marginBottom: "4px",
                      }}
                    >
                      <Alert
                        key={index}
                        message={item.name}
                        type="success"
                        action={
                          <div>
                            <Button
                              size="small"
                              type="text"
                              icon={<EditOutlined />}
                              onClick={() => showModal(item)}
                            ></Button>
                            <Button
                              size="small"
                              type="text"
                              icon={<DeleteOutlined />}
                              onClick={() => deleteItems(item)}
                            ></Button>
                          </div>
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </div>
        <Modal
          title="Edit Category"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Select
            defaultValue=""
            placeholde="Select category of sub"
            onChange={(e) => setCategoryOfSub(e)}
            style={{ width: "100%", marginBottom: "8px" }}
          >
            {categories &&
              categories.length > 0 &&
              categories.map((item, index) => (
                <Option value={item._id} key={item._id}>
                  {item.name}
                </Option>
              ))}
          </Select>

          <Input
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </Modal>
      </Spin>
    </ContainerPage>
  );
};

export default SubCreate;
