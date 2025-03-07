import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const FormTable = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  // Fetch data from the API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/submit-forms");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle delete action
  const handleDelete = async (record) => {
    try {
      await axios.delete(`http://localhost:8000/api/submit-form-delete/${record._id}`);
      message.success("Record deleted successfully");
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error("Error deleting record:", error);
      message.error("Failed to delete record");
    }
  };

  // Handle edit action
  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record); // Set form values to the current record
    setIsModalVisible(true);
  };

  // Handle modal submit
  const handleModalSubmit = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(
        `/api/submit-form-update/${editingRecord._id}`,
        values
      );
      message.success("Record updated successfully");
      setIsModalVisible(false);
      fetchData(); // Refresh data after update
    } catch (error) {
      console.error("Error updating record:", error);
      message.error("Failed to update record");
    }
  };

  // Table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Transaction ID",
      dataIndex: "trxnId",
      key: "trxnId",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="_id"
        scroll={{ x: true }} // Make table responsive
      />

      {/* Edit Modal */}
      <Modal
        title="Edit Record"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleModalSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter the email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mobile"
            label="Mobile"
            rules={[{ required: true, message: "Please enter the mobile number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="trxnId"
            label="Transaction ID"
            rules={[{ required: true, message: "Please enter the transaction ID" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter the description" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FormTable;