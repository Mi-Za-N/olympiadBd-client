import React from 'react';
import { Typography, Layout, Divider } from 'antd';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const PrivacyPolicy = () => {
  return (
    <Layout style={{ backgroundColor: '#fff', padding: '24px' }}>
      <Content>
        <Typography>
          <Title level={2}>Privacy Policy</Title>
          <Paragraph>
            Welcome to Cherag! This Privacy Policy explains how we collect, use, and protect your
            information when you use our platform.
          </Paragraph>

          <Divider />
          <Title level={3}>Information We Collect</Title>
          <Paragraph>
            <strong>For Users:</strong> When you place an order, we collect your mobile number and
            address to process and deliver your order. No sign-in is required for users.
          </Paragraph>
          <Paragraph>
            <strong>For Entrepreneurs/Vendors:</strong> To manage your business on Cherag, you need
            to sign up and sign in. During this process, we collect your email address, password,
            and any other information you choose to provide to set up your store.
          </Paragraph>

          <Divider />
          <Title level={3}>How We Use Your Information</Title>
          <Paragraph>
            The information collected is used to:
          </Paragraph>
          <ul>
            <li>Process and deliver user orders.</li>
            <li>Enable entrepreneurs to manage their stores.</li>
            <li>Communicate with users and vendors about orders and updates.</li>
            <li>Improve the functionality and user experience of Cherag.</li>
          </ul>

          <Divider />
          <Title level={3}>Data Sharing</Title>
          <Paragraph>
            We value your privacy. Your information will only be shared with third parties in the
            following cases:
          </Paragraph>
          <ul>
            <li>With delivery services to fulfill orders.</li>
            <li>As required by law or legal proceedings.</li>
            <li>To protect the rights and safety of Cherag users and the platform.</li>
          </ul>

          <Divider />
          <Title level={3}>Data Security</Title>
          <Paragraph>
            We implement reasonable security measures to protect your information from unauthorized
            access, disclosure, alteration, or destruction. However, no method of transmission over
            the internet is completely secure.
          </Paragraph>

          <Divider />
          <Title level={3}>Your Rights</Title>
          <Paragraph>
            As a user, you have the right to access, update, or delete the information you provide
            to us. Entrepreneurs can manage their account details through their dashboard.
          </Paragraph>

          <Divider />
          <Title level={3}>Updates to This Policy</Title>
          <Paragraph>
            We may update this Privacy Policy from time to time. Any changes will be posted on this
            page, and we encourage you to review it periodically.
          </Paragraph>

          <Divider />
          <Title level={3}>Contact Us</Title>
          <Paragraph>
            If you have any questions about this Privacy Policy, please contact us at
            support@cherag.com.
          </Paragraph>
        </Typography>
      </Content>
    </Layout>
  );
};

export default PrivacyPolicy;
