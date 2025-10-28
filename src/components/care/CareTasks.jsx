import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../../services/taskService';
import { axiosConfig } from '../../services/axiosConfig';
import { canCreate, canUpdate, canDelete, isReadOnly } from '../../utils/permissions';
import '../../styles/components.css';

const CareTasks = ({ plantId, userRole = 'GUEST' }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newTask, setNewTask] = useState({
    taskType: 'WATERING',
    scheduledDate: '',
    priority: 'MEDIUM',
    notes: ''
  });
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const url = plantId ? `/care-tasks?plantId=${plantId}` : '/care-tasks';
      const response = await axiosConfig.get(url);
      console.log('Care tasks API response:', response.data);
      setTasks(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]);
    }
    setLoading(false);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    
    // Use plantId from props or default to first plant
    let targetPlantId = plantId;
    if (!targetPlantId) {
      // If no plantId provided, use plant ID 1 as default
      targetPlantId = 1;
    }
    
    try {
      const taskToSend = {
        plantId: targetPlantId,
        taskType: newTask.taskType,
        scheduledDate: newTask.scheduledDate,
        priority: newTask.priority || 'MEDIUM',
        notes: newTask.notes || null,
        status: 'PENDING'
      };
      
      console.log('Sending care task:', taskToSend);
      
      if (editingTask) {
        taskToSend.status = editingTask.status;
        await axiosConfig.put(`/care-tasks/${editingTask.id}`, taskToSend);
        setEditingTask(null);
        alert('Task updated successfully!');
      } else {
        taskToSend.status = 'PENDING';
        await axiosConfig.post('/care-tasks', taskToSend);
        alert('Task created successfully!');
      }
      setNewTask({ taskType: 'WATERING', scheduledDate: '', priority: 'MEDIUM', notes: '' });
      fetchTasks();
    } catch (error) {
      console.error('Error saving task:', error.response?.data || error.message);
      alert(`Failed to save task: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({
      taskType: task.taskType,
      scheduledDate: task.scheduledDate,
      priority: task.priority,
      notes: task.notes || ''
    });
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axiosConfig.delete(`/care-tasks/${taskId}`);
        fetchTasks();
        alert('Task deleted successfully!');
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task.');
      }
    }
  };

  const handleCompleteTask = async (task) => {
    try {
      // Update task status to completed
      await axiosConfig.put(`/care-tasks/${task.id}`, {
        ...task,
        status: 'COMPLETED'
      });
      
      // Generate next care suggestion
      const nextCareDate = getNextCareDate(task.taskType);
      const suggestion = getCareSuggestion(task.taskType, nextCareDate);
      
      // Show suggestion and ask if user wants to schedule next task
      const scheduleNext = window.confirm(suggestion + '\n\nWould you like to schedule the next ' + task.taskType.toLowerCase() + ' task?');
      
      if (scheduleNext) {
        setNewTask({
          taskType: task.taskType,
          scheduledDate: nextCareDate,
          priority: task.priority,
          notes: `Auto-scheduled after completing previous ${task.taskType.toLowerCase()} task`
        });
        
        // Set notification reminder
        const careReminders = JSON.parse(localStorage.getItem('careReminders') || '[]');
        careReminders.push({
          id: Date.now(),
          plantName: `Plant ${task.plantId}`,
          type: task.taskType,
          date: nextCareDate,
          notified: false
        });
        localStorage.setItem('careReminders', JSON.stringify(careReminders));
      }
      
      fetchTasks();
      alert('Task completed successfully!');
    } catch (error) {
      console.error('Error completing task:', error);
      alert('Failed to complete task.');
    }
  };

  const getNextCareDate = (taskType) => {
    const now = new Date();
    let daysToAdd = 7; // Default 1 week
    
    switch (taskType) {
      case 'WATERING':
        daysToAdd = 3; // Every 3 days
        break;
      case 'FERTILIZING':
        daysToAdd = 14; // Every 2 weeks
        break;
      case 'PRUNING':
        daysToAdd = 30; // Every month
        break;
      case 'REPOTTING':
        daysToAdd = 180; // Every 6 months
        break;
    }
    
    const nextDate = new Date(now.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
    return nextDate.toISOString().slice(0, 16); // Format for datetime-local input
  };

  const getCareSuggestion = (taskType, nextDate) => {
    const formattedDate = new Date(nextDate).toLocaleDateString();
    
    switch (taskType) {
      case 'WATERING':
        return `Great job watering your plant! \n\nNext watering suggestion: ${formattedDate}\n\nTip: Check soil moisture before watering. Stick your finger 1-2 inches into the soil - if it's dry, it's time to water!`;
      case 'FERTILIZING':
        return `Excellent fertilizing! Your plant will love the nutrients.\n\nNext fertilizing suggestion: ${formattedDate}\n\nTip: During growing season (spring/summer), fertilize every 2 weeks. In winter, reduce to once a month.`;
      case 'PRUNING':
        return `Nice pruning work! This will help your plant grow healthier.\n\nNext pruning suggestion: ${formattedDate}\n\nTip: Always use clean, sharp tools and prune just above a leaf node or branch junction.`;
      case 'REPOTTING':
        return `Perfect repotting! Your plant has more room to grow now.\n\nNext repotting suggestion: ${formattedDate}\n\nTip: Most plants need repotting every 1-2 years when roots become pot-bound.`;
      default:
        return `Task completed! Next suggested date: ${formattedDate}`;
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setNewTask({ taskType: 'WATERING', scheduledDate: '', priority: 'MEDIUM', notes: '' });
  };

  useEffect(() => {
    console.log('CareTasks component mounted, plantId:', plantId);
    fetchTasks();
  }, [plantId]);
  
  useEffect(() => {
    console.log('CareTasks: Force initial load');
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h3>Care Tasks {plantId ? `for Plant ID: ${plantId}` : '(All Plants)'}</h3>
      
      <div className="tip-box">
        <p><strong>Tip:</strong> {plantId ? `Managing tasks for Plant ID: ${plantId}` : 'Managing tasks for default plant (ID: 1). Click on a plant card to select a specific plant.'}</p>
      </div>
      
      {canCreate(userRole) && (
        <form onSubmit={handleCreateTask} className="form-container">
        <h4>{editingTask ? 'Edit Task' : 'Add New Task'}</h4>
        <div style={{ marginBottom: '10px' }}>
          <select value={newTask.taskType} onChange={(e) => setNewTask({...newTask, taskType: e.target.value})}>
            <option value="WATERING">Watering</option>
            <option value="FERTILIZING">Fertilizing</option>
            <option value="PRUNING">Pruning</option>
            <option value="REPOTTING">Repotting</option>
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="datetime-local" 
            value={newTask.scheduledDate} 
            onChange={(e) => setNewTask({...newTask, scheduledDate: e.target.value})} 
            required 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <select value={newTask.priority} onChange={(e) => setNewTask({...newTask, priority: e.target.value})}>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="text" 
            placeholder="Notes" 
            value={newTask.notes} 
            onChange={(e) => setNewTask({...newTask, notes: e.target.value})} 
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingTask ? (
              <><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg> Update Task</>
            ) : (
              <><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg> Create Task</>
            )}
          </button>
          {editingTask && (
            <button type="button" onClick={handleCancelEdit} className="btn btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
              Cancel
            </button>
          )}
        </div>
        </form>
      )}
      
      {isReadOnly(userRole) && (
        <div className="read-only-notice" style={{padding: '15px', background: '#f0f9ff', border: '1px solid #0ea5e9', borderRadius: '8px', marginBottom: '20px'}}>
          <p style={{margin: 0, color: '#0369a1'}}><strong>View Only:</strong> You have read-only access. Contact an administrator for edit permissions.</p>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {tasks.length === 0 ? (
            <p>No tasks found. Create one above!</p>
          ) : (
            tasks.map(task => (
              <div key={task.id} className="data-card">
                <h4><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg> {task.taskType}</h4>
                <p><strong>Priority:</strong> <span className={`status-badge status-${task.priority?.toLowerCase()}`}>{task.priority}</span></p>
                <p><strong>Status:</strong> <span className={`status-badge status-${task.status?.toLowerCase()}`}>{task.status}</span></p>
                <p><strong>Scheduled:</strong> <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg> {new Date(task.scheduledDate).toLocaleString()}</p>
                <p><strong>Notes:</strong> <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg> {task.notes || 'No notes'}</p>
                <div className="data-actions">
                  {canUpdate(userRole) && task.status !== 'COMPLETED' && (
                    <button onClick={() => handleCompleteTask(task)} className="btn btn-success" style={{backgroundColor: '#10b981', borderColor: '#10b981'}}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}>
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      Complete
                    </button>
                  )}
                  {canUpdate(userRole) && (
                    <button onClick={() => handleEditTask(task)} className="btn btn-primary">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}>
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                      </svg>
                      Edit
                    </button>
                  )}
                  {canDelete(userRole) && (
                    <button onClick={() => handleDeleteTask(task.id)} className="btn btn-danger">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}>
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                      </svg>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CareTasks;