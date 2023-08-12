import { Upload, Button, message, Image, Row, Col, Spin, Badge } from "antd";
import Resizer from "react-image-file-resizer";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../functions/getToken";
const FileUpload = ({
  setValues = () => {},
  values,
  test,
  setImagesValue = () => {},
}) => {
  const [loading, setLoading] = useState(false);
  console.log("Check values images :", test);
  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);
    //resize

    let files = e.target.files;
    let allUploadedFiles = values.images;
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadImages`,
                {
                  image: uri,
                },
                {
                  headers: {
                    authToken: getToken(),
                  },
                }
              )
              .then((res) => {
                console.log("image upload res data :", res);
                allUploadedFiles.push(res.data);
                if (!setValues)
                  setValues((values) => ({
                    ...values,
                    images: allUploadedFiles,
                  }));
                setImagesValue(allUploadedFiles);
                setLoading(false);
              })
              .catch((err) => {
                message.error(err.message);
                setLoading(false);
              });
          },
          "base64"
        );
      }
    }
  };
  const handleDeletemImage = async (id) => {
    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_API}/removeImages`,
        { public_id: id },
        {
          headers: {
            authToken: getToken(),
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let image = images.filter((x) => x.public_id != id);
        setValues((values) => ({ ...values, images: image }));
        setImagesValue(image);
      })
      .catch((err) => {
        message.error(err.message);
        setLoading(false);
      });
  };
  console.log("images in file upload :", values?.images);
  return (
    <Spin spinning={loading}>
      <Row gutter={[16, 16]}>
        {values?.images &&
          values.images.length > 0 &&
          values.images.map((item) => (
            <Col span={4} style={{ cursor: "pointer" }} key={item.public_id}>
              <Badge
                count="X"
                onClick={() => handleDeletemImage(item.public_id)}
              >
                <Image src={item.url} width="80px" height="80px" />
              </Badge>
            </Col>
          ))}
      </Row>
      <Button>
        <input
          type="file"
          multiple
          accept="image/png, image/jpeg"
          onChange={fileUploadAndResize}
        />
      </Button>
    </Spin>
  );
};
export default FileUpload;
