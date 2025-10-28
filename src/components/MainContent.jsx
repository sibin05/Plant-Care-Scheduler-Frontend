import React from 'react';

const MainContent = ({ species, careTasks, environmentData }) => {
  return (
    <div className="main-content-section">
      {/* Species */}
      <h2>Species</h2>
      <div>
        {species.map((specie) => (
          <div key={specie.id}>
            <p>{specie.name}</p>
            <p>Care Difficulty: {specie.careDifficulty}</p>
          </div>
        ))}
      </div>

      {/* Care Tasks */}
      <h2>Care Tasks</h2>
      <div>
        {careTasks.map((task) => (
          <div key={task.id}>
            <p>{task.taskType}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
          </div>
        ))}
      </div>

      {/* Environment Data */}
      <h2>Environment Data</h2>
      <div>
        {environmentData.map((data) => (
          <div key={data.id}>
            <p>Location: {data.locationId}</p>
            <p>Temperature: {data.temperatureCelsius}°C</p>
            <p>Humidity: {data.humidityPercentage}%</p>
            <p>Light: {data.lightLevelLux} lux</p>
            <p>Soil Moisture: {data.soilMoisturePercentage}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
