import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CaseManagementClient.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import AlertNotificationManagement from './AlertNotificationManagement';
import legalHomeLogo from './logo.png';

const CaseManagementClient = () => {
  const [cases, setCases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all cases from the server
    axios.get('http://localhost:3001/get-cases-client')
      .then(response => {
        console.log('Cases:', response.data.cases);
        setCases(response.data.cases);
      })
      .catch(error => console.error('Error fetching cases:', error));
  }, []);


  const handleBackClick = () => {
    // Navigate to Home
    navigate('/HomeForClient');
  };

  const handleHomeClientClick = () => {
    navigate('/HomeForClient');
  };

  const handleViewClick = (caseId) => {
    navigate(`/ViewCaseClient/${caseId}`);
    // Handle View button click, you can navigate to a specific view page or perform any action
    console.log(`View clicked for caseId: ${caseId}`);
  };


  const handleDocumentClick = (caseId) => {
    navigate(`/DocumentManagementClient/${caseId}`);
    // Handle Edit button click, you can navigate to an edit page or perform any action
  };
  

  const handleCaseManagementClick = () => {
    navigate('/CaseManagementClient');
  };

  const handleEventManagementClick = () => {
    navigate('/EventManagementClient');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
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
              <a href="#case" onClick={handleCaseManagementClick} style={{ color: '#f6d41e' }}>Case Management</a>
            </li>
            <li>
              <a href="#casematter" onClick={handleEventManagementClick}>
                Event Management
              </a>
            </li>

          </ul>
        </nav>
    </aside>
    <main className="client-case-content">
      <div>
  <div className='client-case-management-header'>
  <h2>Case Management</h2>
    <button className="create-back-button" onClick={handleBackClick}>
      Back
    </button>
  </div>
  <div className="client-case-management">
    <div className="table-container">
      {cases.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Index</th>
              <th>Case ID</th>
              <th>Case Name</th>
              <th>Case Type</th>
              <th>Case Status</th>
              <th>Staff Name</th>
              <th>Client Name</th>
              <th className="client-case-actions-header">Actions</th> {/* Added Actions header */}
            </tr>
          </thead>
          <tbody>
            {cases.map((caseItem, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{caseItem.case_id}</td>
                <td>{caseItem.case_name}</td>
                <td>{caseItem.case_type}</td>
                <td>{caseItem.case_status}</td>
                <td>{caseItem.staff_name}</td>
                <td>{caseItem.client_name}</td>
                <td className="client-case-actions-cell">
                  <button onClick={() => handleViewClick(caseItem.case_id)}>View</button>
                  <button onClick={() => handleDocumentClick(caseItem.case_id)}>Document</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No cases available.</p>
      )}
    </div>
  </div>
</div>
    </main>
  </div>
  
  );
};

export default CaseManagementClient;
