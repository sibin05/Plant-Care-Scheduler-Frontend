import React, { useState, useEffect } from 'react';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {
    // Request notification permission on component mount
    if ('Notification' in window && permission === 'default') {
      Notification.requestPermission().then(setPermission);
    }

    // Check for overdue tasks every minute
    const interval = setInterval(checkOverdueTasks, 60000);
    return () => clearInterval(interval);
  }, []);

  const checkOverdueTasks = () => {
    const now = new Date();
    const careReminders = JSON.parse(localStorage.getItem('careReminders') || '[]');
    
    careReminders.forEach(reminder => {
      const reminderDate = new Date(reminder.date);
      if (reminderDate <= now && !reminder.notified) {
        showNotification(reminder);
        // Mark as notified
        reminder.notified = true;
        localStorage.setItem('careReminders', JSON.stringify(careReminders));
      }
    });
  };

  const showNotification = (reminder) => {
    if (permission === 'granted') {
      const notification = new Notification(`PLANTA Reminder`, {
        body: `Time to ${reminder.type.toLowerCase()} your ${reminder.plantName}!`,
        icon: '/favicon.ico',
        badge: '/favicon.ico'
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      // Auto close after 5 seconds
      setTimeout(() => notification.close(), 5000);
    }

    // Add to in-app notifications
    const newNotification = {
      id: Date.now(),
      message: `Time to ${reminder.type.toLowerCase()} your ${reminder.plantName}!`,
      type: reminder.type,
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]); // Keep only 5 notifications
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
      {notifications.length > 0 && (
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '8px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          padding: '16px',
          maxWidth: '300px',
          border: '1px solid #10b981'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ margin: 0, color: '#065f46', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
              </svg>
              Care Reminders
            </h4>
            <button 
              onClick={clearAll}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#6b7280', 
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Clear All
            </button>
          </div>
          {notifications.slice(0, 3).map(notif => (
            <div 
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              style={{ 
                padding: '8px',
                backgroundColor: notif.read ? '#f9fafb' : '#ecfdf5',
                borderRadius: '4px',
                marginBottom: '8px',
                cursor: 'pointer',
                fontSize: '12px',
                border: notif.read ? '1px solid #e5e7eb' : '1px solid #10b981'
              }}
            >
              <div style={{ fontWeight: '500', color: '#065f46' }}>{notif.message}</div>
              <div style={{ color: '#6b7280', fontSize: '10px' }}>
                {notif.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;