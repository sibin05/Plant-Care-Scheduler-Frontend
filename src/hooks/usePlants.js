// usePlants.js
import { useState, useEffect } from 'react';
import * as plantService from '../services/plantService';

export const usePlants = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    plantService.getPlants().then((res) => {
      const transformedPlants = res.data.map((plant) => ({
        name: plant.nickname,
        status: plant.healthStatus,
        acquired: plant.acquisitionDate,
        height: plant.currentHeightCm,
        width: plant.currentWidthCm,
        pot: plant.potSize,
        soil: plant.soilType,
        location: plant.location,
        notes: plant.notes,

        careTasks: (plant.careTasks || []).map((task) => ({
          task: task.taskType,
          status: task.status,
          priority: task.priority,
        })),

        environment: {
          temperature: plant.environmentDataList?.[0]?.temperatureCelsius ?? 'N/A',
          humidity: plant.environmentDataList?.[0]?.humidityPercentage ?? 'N/A',
          light: plant.environmentDataList?.[0]?.lightLevelLux ?? 'N/A',
          soilMoisture: plant.environmentDataList?.[0]?.soilMoisturePercentage ?? 'N/A',
        },

        healthRecords: (plant.healthRecords || []).map((record) => ({
          date: record.assessmentDate,
          status: record.overallHealth,
          note: record.notes,
        })),
      }));

      setPlants(transformedPlants);
      setLoading(false);
    });
  }, []);

  return { plants, loading };
};
