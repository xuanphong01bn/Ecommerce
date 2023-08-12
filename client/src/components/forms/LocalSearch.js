import React from "react";
import { Input } from "antd";
const LocalSearch = ({ key, keyword, setKeyword }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <Input
      key={key}
      placeholder="Search category"
      value={keyword}
      onChange={(e) => handleSearch(e)}
      allowClear={true}
    />
  );
};

export default LocalSearch;
