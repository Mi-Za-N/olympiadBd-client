import { useState, useEffect } from 'react';
import { Form, Input, message, Modal, Select } from "antd";
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { withRouter } from 'next/router';

const ActivateAccount = ({ router }) => {
    const [loading, setLoading] = useState(false);
    const [buttonText, setButtonText] = useState("Activate Account");
    const [state, setState] = useState({
        name: '',
        token: '',
        success: '',
        error: ''
    });

    const [form] = Form.useForm();
    const { name, token, success, error } = state;

    useEffect(() => {
        let token = router.query.id;
        if (token) {
            const { name } = jwt.decode(token);
            setState({ ...state, name, token });
        }
    }, [router]);

    const onFinish = async (values) => {
        console.log("values", values);
        try {
            setLoading(true);
            setButtonText("loading...");
            await axios.post(`/api/register/activate`, {
                ...values,
                token,
            });
            setButtonText("Done.");
            message.success("Registration successful");
            router.push("/");
            setLoading(false);
        } catch (error) {
            message.error("Something went wrong");
            setButtonText("loading...");
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid p-3">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 text-center">
                    <h3 className="fw-bold">
                        Hello "{name}" Welcome to Cherag
                    </h3>
                    <p className="lead">"Secure Escrow, Safe Transactions: The Trusted Online Platform for Hassle-Free Deals!"</p>
                </div>
                <div className="col-12 col-md-6">
                    <h6>Ready to activate your account?</h6>
                    <Form
                        layout="vertical"
                        className="transaction-form"
                        onFinish={onFinish}
                        form={form}
                    >
                        <Form.Item label="Phone (required)" name="phone">
                            <Input type="text" placeholder="Phone number (required)" />
                        </Form.Item>
                        <div className="d-flex justify-content-end pb-5">
                            <button className="btn btn-outline-dark btn-block" type="submit" disabled={loading}>
                                {buttonText}
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default withRouter(ActivateAccount);