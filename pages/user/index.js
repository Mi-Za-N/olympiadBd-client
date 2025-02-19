import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Card, List, Typography, Spin, Button, Modal, message } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { Context } from "../../context";
import { useRouter } from "next/router";

const { Title, Text } = Typography;

const Index = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrollModalVisible, setEnrollModalVisible] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  const { state } = useContext(Context);
  const { user } = state;
  const enrollQuiz = user ? user.enrolledQuizzes : []; // Array of enrolled quiz IDs
  const userId = user ? user._id : "";

  const router = useRouter();

  useEffect(() => {
    axios.get('/api/quizzes')
      .then(response => {
        // Filter quizzes to show only those the user has enrolled in
        const enrolledQuizzes = response.data.filter(quiz => enrollQuiz.includes(quiz._id));
        setQuizzes(enrolledQuizzes);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [enrollQuiz]); // Add enrollQuiz as a dependency

  const handleEnrollClick = (quizId) => {
    setSelectedQuizId(quizId);
    setEnrollModalVisible(true);
  };

  const handleEnrollConfirm = async () => {
    if (!userId || !selectedQuizId) {
      message.error("User ID or Quiz ID is missing.");
      return;
    }

    try {
      const response = await axios.post(`/api/users/${userId}/enroll/${selectedQuizId}`);
      if (response.data) {
        message.success("You have successfully enrolled in the quiz!");
        // Optionally, refetch the user data or update the context to reflect the new enrollment
      } else {
        message.error(response.data.message || "Failed to enroll in the quiz.");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while enrolling in the quiz.");
    } finally {
      setEnrollModalVisible(false);
      setSelectedQuizId(null);
    }
  };

  const handleEnrollCancel = () => {
    setEnrollModalVisible(false);
    setSelectedQuizId(null);
  };

  const handleViewQuiz = async () => {
    router.push("/user");
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Enrolled Quizzes</Title>
      {loading ? (
        <Spin size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }} />
      ) : quizzes.length > 0 ? (
        <List
          grid={{
            gutter: 16,
            xs: 1, // 1 column on extra small screens
            sm: 2, // 2 columns on small screens
            md: 3, // 3 columns on medium screens
            lg: 3, // 3 columns on large screens
            xl: 4, // 4 columns on extra large screens
            xxl: 4, // 4 columns on extra extra large screens
          }}
          dataSource={quizzes}
          renderItem={(quiz) => (
            <List.Item>
              <Card
                title={quiz.title}
                actions={[
                  <Text type="secondary">
                    <CalendarOutlined /> {new Date(quiz.quizDate).toLocaleDateString()}
                  </Text>,
                  <Text type="secondary">
                    <CalendarOutlined /> {new Date(quiz.quizEndDate).toLocaleDateString()}
                  </Text>,
                  <Button type="primary" onClick={handleViewQuiz}>
                    View Quiz
                  </Button>,
                ]}
              >
                <Text>{quiz.description}</Text>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <Text>No enrolled quizzes available.</Text>
      )}

      {/* Enroll Confirmation Modal */}
      <Modal
        title="Enroll in Quiz"
        open={enrollModalVisible}
        onOk={handleEnrollConfirm}
        onCancel={handleEnrollCancel}
        okText="Enroll"
        cancelText="Cancel"
      >
        <p>Are you sure you want to enroll in this quiz?</p>
      </Modal>
    </div>
  );
};

export default Index;