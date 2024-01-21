//ViewEventClient.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ViewEventClient.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import AlertNotificationManagement from './AlertNotificationManagement';
import legalHomeLogo from './logo.png';

const ViewEventClient = () => {
  const [eventData, setEventData] = useState({});
  const { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch event details by eventId
    axios.get(`http://localhost:3001/get-event-details/${eventId}`)
      .then(response => {
        console.log('Event Details:', response.data.eventData);
        setEventData(response.data.eventData);
      })
      .catch(error => console.error('Error fetching event details:', error));
  }, [eventId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleCaseManagementClick = () => {
    navigate('/CaseManagementClient');
  };

  const handleEventManagementClick = () => {
    navigate('/EventManagementClient');
  };

  const handleBackClick = () => {
    // Navigate to Home
    navigate('/EventManagementClient');
  };

  const handleHomeClientClick = () => {
    navigate('/HomeForClient');
  };

  
  return (
    <div>
      <header className="main-top-nav">
        <div>
          <h1 className="main-header">Apex Legal Solution</h1>
        </div>
        <div>
        <div className="main-notification-container">
          <AlertNotificationManagement />
          </div>
          <div className="main-setting-container1" onClick={() => navigate('/ProfileSettingClient')}>
            <FontAwesomeIcon icon={faCog} className="main-custom-icon1" />
          </div>
          <div className="main-icon-container2" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="main-custom-icon2" />
          </div>
        </div>
      </header>
      <aside className="main-side-nav">
        <nav>
          <ul>
            <li>
              <img src={legalHomeLogo} alt="Legal Logo" className="logo-test" />
            </li>
            <li>
                <a href="#home" onClick={handleHomeClientClick}>Home</a>
            </li>
            <li>
              <a href="#casematter" onClick={handleCaseManagementClick}>
                Case Management
              </a>
            </li>
            <li>
              <a href="#casematter" onClick={handleEventManagementClick} style={{ color: '#f6d41e' }}>
                Event Management
              </a>
            </li>
          </ul>
        </nav>
      </aside>

    <div className='container'>
      <h2 className='view-event-title'>Event Information</h2>
      <p><span className="label">Event Id         :</span> {eventData.event_id}</p>
      <p><span className="label">Event Name       :</span> {eventData.event_name}</p>
      <p><span className="label">Event Description:</span> {eventData.event_desc}</p>
      <p><span className="label">Event Date       :</span> {eventData.event_date}</p>
      <p><span className="label">Event Time Start :</span> {eventData.event_time_start}</p>
      <p><span className="label">Event Time End   :</span> {eventData.event_time_end}</p>
      <p><span className="label">Event Location   :</span> {eventData.event_location}</p>
      <button className="back-button" onClick={handleBackClick}>
        Back
      </button>
    </div>
  </div>  
  );
};

export default ViewEventClient;
