import React from 'react';
import * as plantService from '../../services/plantService';
import IntegrationTest from '../IntegrationTest';

const TestPlantCreation = () => {
  const testCreatePlant = async () => {
    const testPlant = {
      nickname: 'Test Plant',
      location: 'Living Room',
      healthStatus: 'GOOD',
      notes: 'Test plant for debugging'
    };

    try {
      console.log('=== FRONTEND TEST ===');
      console.log('Creating test plant:', testPlant);
      console.log('Token exists:', !!localStorage.getItem('accessToken'));
      
      const response = await plantService.createPlant(testPlant);
      console.log('SUCCESS:', response.data);
      alert('Plant created successfully!');
    } catch (error) {
      console.error('ERROR:', error);
      console.error('Status:', error.response?.status);
      console.error('Data:', error.response?.data);
      alert(`Error: ${error.response?.status} - ${error.response?.data || error.message}`);
    }
  };

  return (
    <div>
      <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
        <h3>Plant Creation Test</h3>
        <button onClick={testCreatePlant} style={{ padding: '10px 20px', fontSize: '16px' }}>
          Test Create Plant
        </button>
      </div>
      <IntegrationTest />
    </div>
  );
};

export default TestPlantCreation;