import React, { useState, useEffect } from 'react';
import PlantCard from './PlantCard';
import * as plantService from '../../services/plantService';

const PlantList = ({ refreshTrigger, userRole }) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlants = () => {
    plantService.getPlants()
      .then(res => {
        const fetchedPlants = Array.isArray(res.data) ? res.data : res.data.content || [];
        setPlants(fetchedPlants);
        setLoading(false);
      })
      .catch(() => {
        setPlants([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPlants();
  }, [refreshTrigger]);

  if (loading) return <p>Loading plants...</p>;

  return (
    <div className="plant-list">
      {plants.map(plant => (
        <PlantCard key={plant.id} plant={plant} userRole={userRole} />
      ))}
    </div>
  );
};

export default PlantList;
