import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../services/axiosInstance';
import './tasksPageKid.css';
import robotGif from "../../../assets/robot.gif";
import robotAudio1 from "../../../assets/learning.mp3";
import robotAudio2 from "../../../assets/taskvoice.mp3";
import robotAudio3 from "../../../assets/taskvoice.mp3";
import { format, isToday } from 'date-fns';
import { MdArrowBack } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // assuming you have toast notifications set up

const TasksPageKid = () => {
  const [tasks, setTasks] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [robotVoice, setRobotVoice] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [userId, setUserId] = useState(null); // User ID state

  useEffect(() => {
    // Fetch user ID from localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUserId(parsedUserData.id);
    } else {
      console.log("No user data found in localStorage");
    }

    // Fetch tasks
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get('/posts');
        const tasks = response.data;
        const filteredTasks = tasks.map(task => ({
          ...task,
          done: false, // Add initial done status to tasks
        }));

        /*
        .filter(task => 
          task.availabilities.some(availability => 
            isToday(new Date(availability.dateTimeFrom))
          )
        );
        */ // Add filter logic for today's tasks if needed
        setTasks(filteredTasks);
        setLoading(false); // Update loading state after tasks are fetched
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false); // Handle error by updating loading state
      }
    };

    fetchTasks();
  }, []);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowDialog(true);

    switch (task.petTypeId) {
      case 1:
        setRobotVoice(robotAudio1);
        break;
      case 2:
        setRobotVoice(robotAudio2);
        break;
      case 3:
        setRobotVoice(robotAudio3);
        break;
      default:
        setRobotVoice(null);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setSelectedTask(null);
    setRobotVoice(null);
  };

  const handleRequestCreation = async () => {
    if (!selectedTask) return;

    try {
        const requestData = {
            status: "PENDING",
          };

      const selectedAvailability = selectedTask.availabilities[0]; // Assuming first availability
      const response = await axiosInstance.post(
        "/requests/create",
         requestData,
        {
          params : {
          availabilityId: selectedAvailability.id,
          userRequesterId: userId,
          },
        }
      );

      if (response.status === 200) {
        // Update task status locally
        const updatedTasks = tasks.map(task => {
          if (task.id === selectedTask.id) {
            return {
              ...task,
              done: true, // Update task status to done
            };
          }
          return task;
        });

        setTasks(updatedTasks);

        toast.success("Request successfully created!");
        // Close dialog and update UI to show task as done
        setShowDialog(false);
        setSelectedTask(null);
        setRobotVoice(null);
      } else {
        toast.error("Failed to create request.");
      }
    } catch (error) {
      console.error("Error creating request:", error);
      toast.error("Failed to create request.");
    }
  };

  return (
    <div className="tasks-page-kid">
      <div className="header">
        <Link to="/home-page-kid" className="back-link">
          <MdArrowBack className="back-icon" />
        </Link>
        <h1>Задачи за денеска</h1>
      </div>
      {loading ? (
        <div className="loading-spinner">
          {/* You can customize your loading spinner here */}
          Се вчитува...
        </div>
      ) : (
        <div className="tasks-container">
          {tasks.map(task => (
            <div key={task.id} className={`task-item ${task.done ? 'task-done' : ''}`} onClick={() => handleTaskClick(task)}>
              <img src={`data:image/png;base64,${task.picture}`} alt="Task" className="task-image" />
            </div>
          ))}
        </div>
      )}
      {showDialog && selectedTask && (
        <div className="dialog-overlay">
          <div className="dialog">
            <img src={robotGif} alt="Robot" className="dialog-robot" />
            {robotVoice && (
              <audio autoPlay>
                <source src={robotVoice} type="audio/mp3" />
              </audio>
            )}
            <div className="dialog-buttons">
              <button className="dialog-button-green" onClick={handleRequestCreation}>ДА</button>
              <button className="dialog-button-red" onClick={handleCloseDialog}>НЕ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPageKid;
