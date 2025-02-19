import { useState, useEffect } from 'react';
import { Form, Input, message, Modal, Select } from "antd";
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { showSuccessMessage, showErrorMessage } from '../../components/helplers/alerts';
import { withRouter } from 'next/router';
import PriceCard from "../../components/cards/priceCard";
// import Layout from '../../../components/Layout';


const ActivateAccount = ({ router }) => {
    const [loading, setLoading] = useState(false);
    const [plans, setPlans] = useState(false);
    const [buttonText, setButtonText] =useState("Activate Account");
     const [state, setState] = useState({
            name: '',
            token: '',
            success: '',
            error: ''
        });
    const fetchPlans = async () => {
        const { data } = await axios.post("/api/get-subscriptions");
        // console.log("prices get request", data);
        setPlans(data);
      };

      useEffect(() => {
        fetchPlans();
      }, []);

      const handleClick = async (e) => {
        e.preventDefault();
        console.log("plan clicked");
      };

        const getNextMonth = () => {
            const currentDate = new Date();
            currentDate.setMonth(currentDate.getMonth() + 1);
            return currentDate.toISOString().slice(0, 10);
        };

  useEffect(() => {
    // Set the default value for the date field
    const nextMonth = getNextMonth();
    form.setFieldsValue({ subscriptionEndDate: nextMonth });
  }, []);

  const [form] = Form.useForm();


    // console.log("..",state);
    const { name, token,  success, error } = state;

    useEffect(() => {
        let token = router.query.id;
        if (token) {
            const { name } = jwt.decode(token);
            setState({ ...state, name, token });
        }
    }, [router]);

    // const clickSubmit = async e => {
    //     e.preventDefault();
    //     // console.log('activate acccount');
    //     setState({ ...state, buttonText: 'Activating' });

    //     try {
    //         const response = await axios.post(`/api/register/activate`, { token });
    //         console.log('account activate response', response)
    //         setState({ ...state, name: '', token: '', buttonText: 'Activated', success: response.data.message });
    //         router.push("/");
    //     } catch (error) {
    //         setState({ ...state, buttonText: 'Activate Account', error: error.response.data.error });
    //     }
    // };
     

        const onFinish = async (values) => {
            console.log("values",values);
            try {
            setLoading(true);
              setButtonText("loading...");
                await axios.post(`/api/register/activate`, {
                ...values,
                token,
                });
                setButtonText("Done.");
                message.success("Registration successfull");
                router.push("/");
            setLoading(false);
            } catch (error) {
            message.error("Something went wrong");
            setButtonText("loading...");
            setLoading(false);
            }
        };

    return (
        <>
            <div className="row">
                <div className="container-fluid col-md-8 offset-md-3">
                <h3 className=" fw-bold">
                 Hello "{name}" Explore the right plan for your business
                </h3>
                <p className="lead ">Choose a plan that suites you best!</p>
                <div className="row  mb-2 text-center">
                    {plans &&
                    plans.map((plan) => (
                        <PriceCard key={plan._id} plan={plan} handleClick={handleClick} />
                    ))}
                </div>
                </div>
                <div className="col-md-6 offset-md-3">
                    <h6>Ready to activate your account?</h6>
                 <Form
                    layout="vertical"
                    className="transaction-form"
                    onFinish={onFinish}
                    form={form}
                    // initialValues={selectedItemForEdit}
                   >
                    <Form.Item label="Phone (required)" name="phone">
                    <Input type="text" placeholder="Phone number(required)"  />
                    </Form.Item>
                    <Form.Item label="address (required)" name="address">
                    <Input type="text" placeholder="Address(required)"  />
                    </Form.Item>

                    <Form.Item label="Pick a Plan (required)" name="subscription">
                    <Select>
                        <Select.Option value="Silver">Silver</Select.Option>
                        <Select.Option value="Gold">Gold</Select.Option>
                        <Select.Option value="Platinum">Platinum</Select.Option>
                        <Select.Option value="Diamond">Diamond</Select.Option>

                    </Select>
                    </Form.Item>

                    <Form.Item label="Pick a Type (required)" name="group">
                    <Select>
                        <Select.Option value="Grocery">Grocery</Select.Option>
                        <Select.Option value="Super-Shop">Super-Shop</Select.Option>
                        <Select.Option value="Clothing">Clothing</Select.Option>
                        <Select.Option value="Cosmetics">Cosmetics</Select.Option>
                        <Select.Option value="Gadget">Gadget</Select.Option>
                        <Select.Option value="Appliance">Appliance</Select.Option>
                        <Select.Option value="Hardware">Hardware</Select.Option>
                        <Select.Option value="Gadget">Gadget</Select.Option>
                        <Select.Option value="Pet-Shop">Pet-Shop</Select.Option>
                    </Select>
                    </Form.Item>

                   <Form.Item label="Subscription End Date" name="subscriptionEndDate">
                        <Input type="date" disabled/>
                    </Form.Item>

                    <div className="d-flex pb-5 justify-content-end">
                    <button className="btn btn-outline-dark btn-block" type="submit">
                        {buttonText}
                    </button>
                    </div>
                </Form>
                    {/* {success && showSuccessMessage(success)}
                    {error && showErrorMessage(error)}
                    <button className="btn btn-outline-warning btn-block" 
                    // onClick={clickSubmit}
                    >
                        {buttonText}
                    </button> */}
                </div>
            </div>
        </>
    );
};

export default withRouter(ActivateAccount);
