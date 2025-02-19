import React,{useState,useEffect} from 'react';
import { Button, Card,Switch,Modal, Form, Input,message, Tooltip } from 'antd';

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Meta } = Card;

const AdminSliderCard = ({ slider,handleRemove }) => {
    // console.log("slider",slider);
    const { name, image, slug,} = slider;
  return (
    <Card
      cover={
        <img
          src={image.Location}
          style={{ height: "250px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
       <div style={{ display: 'flex', justifyContent: 'space-between',padding:5 }}>
        <Link
            href={``}
            className="pointer" >
            <EditOutlined className="text-warning" />
        </Link>
        <DeleteOutlined className="text-danger" 
          onClick={() => handleRemove(slug)}
        />
       </div>
      ]}
    >
      <Meta
        title={name}
      />
    </Card>
  );
};

export default AdminSliderCard;