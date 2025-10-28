import React from 'react';

const PlantImageGallery = ({ onSelectImage }) => {
  const plantImages = [
    { url: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400&h=300&fit=crop&q=80', name: 'Monstera' },
    { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop&q=80', name: 'Neem Tree' },
    { url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop&q=80', name: 'Mango Tree' },
    { url: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=300&fit=crop&q=80', name: 'Aloe Vera' },
    { url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&q=80', name: 'Rose' },
    { url: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=300&fit=crop&q=80', name: 'Cactus' },
    { url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop&q=80', name: 'Fern' },
    { url: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=300&fit=crop&q=80', name: 'Succulent' },
    { url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&q=80', name: 'Orchid' },
    { url: 'https://images.unsplash.com/photo-1550948537-6b5b6c6c2c0d?w=400&h=300&fit=crop&q=80', name: 'Bamboo' },
    { url: 'https://images.unsplash.com/photo-1618164435735-413d3b066c9a?w=400&h=300&fit=crop&q=80', name: 'Basil' },
    { url: 'https://images.unsplash.com/photo-1574263867128-a3d5c1b1deaa?w=400&h=300&fit=crop&q=80', name: 'Jade Plant' }
  ];

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(4, 1fr)', 
      gap: '12px', 
      padding: '16px',
      maxHeight: '300px',
      overflowY: 'auto',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      backgroundColor: '#f9fafb'
    }}>
      {plantImages.map((plant, index) => (
        <div 
          key={index}
          onClick={() => onSelectImage(plant.url)}
          style={{
            cursor: 'pointer',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '2px solid transparent',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.border = '2px solid #10b981';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.border = '2px solid transparent';
            e.target.style.transform = 'scale(1)';
          }}
        >
          <img 
            src={plant.url} 
            alt={plant.name}
            style={{
              width: '100%',
              height: '80px',
              objectFit: 'cover',
              display: 'block'
            }}
          />
          <div style={{
            padding: '4px',
            fontSize: '10px',
            textAlign: 'center',
            backgroundColor: 'white',
            color: '#374151',
            fontWeight: '500'
          }}>
            {plant.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlantImageGallery;