import React, { useState } from "react";
import {
  Input,
  Row,
  Col,
  InputNumber,
  Form,
  Divider,
  Typography,
  Table,
} from "antd";

const { Title } = Typography;
function DataTable({ data }) {
  const [filter, setFilter] = useState({
    Tag1: "",
    Tag2: "",
    Tag3: "",
    Metric1: { min: "", max: "" },
    Metric2: { min: "", max: "" },
  });
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [filterValues, setFilterValues] = useState({});

  //Table definitions
  const columns = [
    {
      title: "Tag1",
      dataIndex: "Tag1",
      sorter: (a, b) => a.Tag1.localeCompare(b.Tag1),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Tag2",
      dataIndex: "Tag2",
      sorter: (a, b) => a.Tag2.localeCompare(b.Tag2),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Tag3",
      dataIndex: "Tag3",
      sorter: (a, b) => a.Tag3.localeCompare(b.Tag3),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Metric1",
      dataIndex: "Metric1",
      sorter: (a, b) => a.Metric1 - b.Metric1,
      sortDirections: ["ascend", "descend"],
      render: (value) => Number(value).toFixed(2),
    },
    {
      title: "Metric2",
      dataIndex: "Metric2",
      sorter: (a, b) => a.Metric2 - b.Metric2,
      sortDirections: ["ascend", "descend"],
      render: (value) => Number(value).toFixed(2),
    },
  ];

  const handleTableChange = (event, columnName) => {
    console.log("table event", event);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilter({ ...filter, [name]: value });
    handleFilterChange(event, name);
  };

  const handleMetricInputChange = (value, name) => {
    const [type, key] = name.split(".");
    setFilterValues({
      ...filterValues,
      [type]: { ...filter[type], [key]: value },
    });
    setFilter({ ...filter, [type]: { ...filter[type], [key]: value } });
  };

  const handleSort = (event, column) => {
    event.preventDefault();
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleFilterChange = (event, column) => {
    setFilterValues({
      ...filterValues,
      [column]: event.target.value,
    });
  };

  const filteredData = data.filter((row) =>
    Object.keys(filterValues).every((column) => {
      if (!filterValues[column]) return true;
      if (typeof row[column] === "number") {
        return (
          (filterValues[column].min === "" ||
            row[column] >= filterValues[column].min) &&
          (filterValues[column].max === "" ||
            row[column] <= filterValues[column].max)
        );
      } else {
        return String(row[column]).includes(filterValues[column]);
      }
    })
  );

  if (sortColumn !== null && sortDirection !== null) {
    filteredData.sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue === bValue) {
        return 0;
      } else if (sortDirection === "asc") {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }

  return (
    <div>
      <Title>Live Events Dashboard</Title>
      <Divider orientation="left">Filters</Divider>
      <div style={{ marginBottom: "16px" }}>
        <Row gutter={[16, 40]}>
          <Col span={6}>
            <Input
              name="Tag1"
              placeholder="Search Tag1"
              allowClear
              onChange={handleInputChange}
            />
          </Col>
          <Col span={6}>
            <Input
              name="Tag2"
              placeholder="Search Tag2"
              allowClear
              onChange={handleInputChange}
            />
          </Col>
          <Col span={6}>
            <Input
              name="Tag3"
              placeholder="Search Tag3"
              allowClear
              onChange={handleInputChange}
            />
          </Col>
        </Row>
      </div>
      <div style={{ marginBottom: "16px" }}>
        <Row gutter={[16, 40]}>
          <Col span={2}>
            <Form.Item label="Metric1 Min" name="Metric1 Min">
              <InputNumber
                name="Metric1.min"
                min={1}
                onChange={(value) => {
                  handleMetricInputChange(value, "Metric1.min");
                }}
              />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item label="Metric1 Max" name="Metric1 Max">
              <InputNumber
                name="Metric1.max"
                min={1}
                onChange={(value) => {
                  handleMetricInputChange(value, "Metric1.max");
                }}
              />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item label="Metric2 Min" name="Metric2 Min">
              <InputNumber
                name="Metric2.min"
                min={1}
                onChange={(value) => {
                  handleMetricInputChange(value, "Metric2.min");
                }}
              />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item label="Metric2 max" name="Metric2 max">
              <InputNumber
                name="Metric2.max"
                min={1}
                onChange={(value) => {
                  handleMetricInputChange(value, "Metric2.max");
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </div>
      <Divider orientation="left">Data</Divider>
      <Table
        columns={columns}
        dataSource={filteredData}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default DataTable;
