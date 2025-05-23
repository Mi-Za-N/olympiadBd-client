import React, { useEffect, useState } from "react";
import { Row, Col, Typography, Spin } from "antd";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ReactPlayer from "react-player";
import axios from "axios";

const { Title, Paragraph } = Typography;

const HomePage = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const { data } = await axios.get(`/api/all-sliders/1`);
      setSliders(data);
    } catch (error) {
      console.error("Error fetching sliders:", error);
    } finally {
      setLoading(false);
    }
  };

  const sliderItems = sliders.map((slider) => (
    <img
      key={slider._id}
      src={slider.image.Location}
      alt={slider.name}
      style={{ width: "100%", height: "auto" }}
    />
  ));

  // const videoURL = "https://bongopos.s3.ap-southeast-1.amazonaws.com/OlympiadVideo.mp4"; // Replace with your video URL

  return (
    <div style={{ padding: "16px" }}>
      {/* Slider Section */}
      <Row justify="center" style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={20} md={16} lg={12}>
          {loading ? (
            <Spin size="large" />
          ) : (
            <AliceCarousel
              autoPlay
              autoPlayInterval={3000}
              infinite
              disableButtonsControls={true}
              disableDotsControls={true}
            >
              {sliderItems}
            </AliceCarousel>
          )}
        </Col>
      </Row>

      {/* App Description Section */}
      <Row justify="center" style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={20} md={16} lg={12}>
          <Title level={2} style={{ textAlign: "center" }}>
            Welcome to Olympiad Bangladesh
          </Title>
          <Paragraph style={{ textAlign: "center", fontSize: "16px" }}>
            Join Olympiad Bangladesh – the ultimate brain battlefield for
            Bangladeshi students! Test your knowledge, sharpen your skills, and
            compete with the brightest minds across the country. Our app offers
            exciting quizzes and contests designed to challenge and inspire
            students of all ages. Whether you're preparing for academic
            excellence or just love a good mental challenge, Olympiad Bangladesh
            is your go-to platform. Join now, prove your intellect, and become a
            champion of the brain battlefield! 🏆
          </Paragraph>
        </Col>
      </Row>

      {/* Promotional Video Section */}
      {/* <Row justify="center" style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={20} md={16} lg={12}>
          <ReactPlayer
            url={videoURL}
            width="100%"
            height="100%"
            controls
            style={{ marginTop: "16px" }}
          />
        </Col>
      </Row> */}

      {/* Call to Action Section */}
      <Row justify="center" style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={20} md={16} lg={12}>
          <Title level={3} style={{ textAlign: "center" }}>
            Download Today and Let the Battle Begin!
          </Title>
        </Col>
      </Row>

      {/* App Store and Play Store Buttons */}
      <Row justify="center" style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={20} md={16} lg={12}>
          <Row gutter={[16, 16]} justify="center">
            <Col xs={12} sm={8} md={6} lg={6}>
              <a
                href="https://play.google.com/store/apps/details?id=com.olympiadbd.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://bongopos.s3.ap-southeast-1.amazonaws.com/Google-Play-Store-Button.png"
                  alt="Play Store"
                  style={{ width: "100%", height: "auto" }}
                />
              </a>
            </Col>
            <Col xs={12} sm={8} md={6} lg={6}>
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://bongopos.s3.ap-southeast-1.amazonaws.com/Available_on_the_App_Store_(black).png"
                  alt="App Store"
                  style={{ width: "100%", height: "auto" }}
                />
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;






// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { Card, List, Typography, Spin, Button, Modal, message } from 'antd';
// import { CalendarOutlined } from '@ant-design/icons';
// import { Context } from "../context";
// import { useRouter } from "next/router";
// import ReactPlayer from "react-player";
// import AliceCarousel from 'react-alice-carousel';
// import 'react-alice-carousel/lib/alice-carousel.css'; // Import Alice Carousel styles

// const { Title, Text } = Typography;

// const Index = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [enrollModalVisible, setEnrollModalVisible] = useState(false);
//   const [selectedQuizId, setSelectedQuizId] = useState(null);

//   useEffect(() => {
//     axios.get(`/api/quizzes`)
//       .then(response => {
//         setQuizzes(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error(error);
//         setLoading(false);
//       });
//   }, []);

//   const {
//     state: { user },
//     updateUser,
//   } = useContext(Context);
//   const enrollQuiz = user ? user.enrolledQuizzes : []; // Array of enrolled quiz IDs
//   const userId = user ? user._id : null;

//   const router = useRouter();

//   const handleEnrollClick = (quizId) => {
//     setSelectedQuizId(quizId);
//     setEnrollModalVisible(true);
//   };

//   const refetchUserData = async () => {
//     if (!userId) return;
//     try {
//       const response = await axios.get(`/api/get-user/${userId}`);
//       console.log("trying update user", response.data);
//       if (response.data) {
//         updateUser(response.data); // Update the user in the context
//       }
//     } catch (error) {
//       console.error("Failed to refetch user data:", error);
//     }
//   };

//   const handleEnrollConfirm = async () => {
//     if (!userId || !selectedQuizId) {
//       message.error("User ID or Quiz ID is missing.");
//       return;
//     }

//     try {
//       const response = await axios.post(`/api/users/${userId}/enroll/${selectedQuizId}`);
//       if (response.data) {
//         message.success("You have successfully enrolled in the quiz!");
//         refetchUserData();
//       } else {
//         message.error(response.data.message || "Failed to enroll in the quiz.");
//       }
//     } catch (error) {
//       console.error(error);
//       message.error("An error occurred while enrolling in the quiz.");
//     } finally {
//       setEnrollModalVisible(false);
//       setSelectedQuizId(null);
//     }
//   };

//   const handleEnrollCancel = () => {
//     setEnrollModalVisible(false);
//     setSelectedQuizId(null);
//   };

//   const isEnrolled = (quizId) => {
//     return enrollQuiz.includes(quizId);
//   };

//   const handleViewQuiz = async () => {
//     router.push("/user");
//   };

//   const handleSigninToJoin = async () => {
//     router.push("/login");
//   };

//   return (
//     <div style={{ padding: '24px' }}>
      
//       {loading ? (
//         <Spin size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }} />
//       ) : quizzes.length > 0 ? (
//         <List
//           grid={{
//             gutter: 16,
//             xs: 1,
//             sm: 2,
//             md: 3,
//             lg: 3,
//             xl: 4,
//             xxl: 4,
//           }}
//           dataSource={quizzes}
//           renderItem={(quiz) => (
//             <List.Item>
//               <Card
//                 title={quiz.title}
//                 actions={[
//                   <Text type="secondary">
//                     <CalendarOutlined /> {new Date(quiz.quizDate).toLocaleDateString()}
//                   </Text>,
//                   isEnrolled(quiz._id) ? (
//                     <Button type="primary" onClick={handleViewQuiz}>
//                       View Quiz
//                     </Button>
//                   ) : (
//                     <>
//                       {!user && (
//                         <Button type="primary" onClick={handleSigninToJoin}>
//                           Signin to Join
//                         </Button>
//                       )}
//                       {user && (
//                         <Button type="primary" onClick={() => handleEnrollClick(quiz._id)}>
//                           Enroll Now
//                         </Button>
//                       )}
//                     </>
//                   ),
//                 ]}
//               >
//                 <Text>{quiz.description}</Text>
//                 <br />
//                 <br />
//                 <AliceCarousel
//                   autoPlay
//                   autoPlayInterval={3000}
//                   infinite
//                   disableButtonsControls={true}
//                   disableDotsControls={true}
//                 >
//                   {quiz.imageOne && (
//                     <img src={quiz.imageOne} alt="Image One" style={{ width: '100%', height: 'auto' }} />
//                   )}
//                   {quiz.imageTwo && (
//                     <img src={quiz.imageTwo} alt="Image Two" style={{ width: '100%', height: 'auto' }} />
//                   )}
//                 </AliceCarousel>
//                 {quiz.videoURL && (
//                   <div style={{ marginTop: '16px' }}>
//                     <ReactPlayer
//                       url={quiz.videoURL}
//                       width="100%"
//                       height="100%"
//                       controls
//                     />
//                   </div>
//                 )}
//               </Card>
//             </List.Item>
//           )}
//         />
//       ) : (
//         <Text>No quizzes available.</Text>
//       )}

//       <Modal
//         title="Enroll in Quiz"
//         open={enrollModalVisible}
//         onOk={handleEnrollConfirm}
//         onCancel={handleEnrollCancel}
//         okText="Enroll"
//         cancelText="Cancel"
//       >
//         <p>Are you sure you want to enroll in this quiz?</p>
//       </Modal>
//     </div>
//   );
// };

// export default Index;