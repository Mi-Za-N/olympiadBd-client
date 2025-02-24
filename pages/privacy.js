import React from 'react';
import { Typography, Card } from 'antd';

const { Title, Paragraph } = Typography;

const PrivacyPolicy = () => {
  return (
    <Card style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Title level={2}>Privacy Policy</Title>
      <Paragraph>
        Welcome to <strong>Olympiad Bangladesh</strong>! This Privacy Policy explains how we collect, use, and protect your personal information when you use our app. By signing up and using our services, you agree to the terms outlined in this policy.
      </Paragraph>

      <Title level={3}>1. Information We Collect</Title>
      <Paragraph>
        When you create an account on Olympiad Bangladesh, we collect the following information:
        <ul>
          <li><strong>Personal Information:</strong> Your name, email address, phone number, and school details.</li>
          <li><strong>Quiz Data:</strong> Your quiz responses, scores, and leaderboard rankings.</li>
          <li><strong>Device Information:</strong> Device type, operating system, and IP address for technical support and analytics.</li>
        </ul>
      </Paragraph>

      <Title level={3}>2. How We Use Your Information</Title>
      <Paragraph>
        We use your information for the following purposes:
        <ul>
          <li>To create and manage your account.</li>
          <li>To allow you to participate in quizzes and contests.</li>
          <li>To display your results on the leaderboard after the quiz period ends.</li>
          <li>To send you notifications about upcoming quizzes and results.</li>
          <li>To provide technical support and improve our app.</li>
        </ul>
      </Paragraph>

      <Title level={3}>3. Data Security</Title>
      <Paragraph>
        We take your privacy seriously and implement industry-standard security measures to protect your data. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
      </Paragraph>

      <Title level={3}>4. Sharing Your Information</Title>
      <Paragraph>
        We do not sell, trade, or share your personal information with third parties except in the following cases:
        <ul>
          <li>To comply with legal obligations or government requests.</li>
          <li>To provide you with surprise gifts for top 50 competitors (e.g., sharing your address with a delivery partner).</li>
        </ul>
      </Paragraph>

      <Title level={3}>5. Leaderboard and Quiz Results</Title>
      <Paragraph>
        After the quiz period ends, your results will be displayed on the leaderboard. Only your name, score, and ranking will be visible to other users.
      </Paragraph>

      <Title level={3}>6. Children's Privacy</Title>
      <Paragraph>
        Olympiad Bangladesh is designed for students of all ages. If you are under 13, please ensure you have parental consent before creating an account.
      </Paragraph>

      <Title level={3}>7. Changes to This Policy</Title>
      <Paragraph>
        We may update this Privacy Policy from time to time. Any changes will be posted in the app, and your continued use of Olympiad Bangladesh constitutes acceptance of the updated policy.
      </Paragraph>

      <Title level={3}>8. Contact Us</Title>
      <Paragraph>
        If you have any questions or concerns about this Privacy Policy, please contact us at:
        <br />
        <strong>Email:</strong> olympiadbd2025@gmail.com
        <br />
        <strong>Phone:</strong> +880-01511-360724
      </Paragraph>
    </Card>
  );
};

export default PrivacyPolicy;