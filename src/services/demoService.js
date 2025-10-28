export const startDemoSession = () => {
  const demoStartTime = Date.now();
  localStorage.setItem('demoStartTime', demoStartTime.toString());
  localStorage.setItem('isDemoMode', 'true');
};

export const checkDemoExpiry = () => {
  const demoStartTime = localStorage.getItem('demoStartTime');
  const isDemoMode = localStorage.getItem('isDemoMode');
  
  if (!isDemoMode || !demoStartTime) return false;
  
  const currentTime = Date.now();
  const elapsedTime = currentTime - parseInt(demoStartTime);
  const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
  
  return elapsedTime >= fiveMinutes;
};

export const clearDemoSession = () => {
  localStorage.removeItem('demoStartTime');
  localStorage.removeItem('isDemoMode');
};

export const isDemoMode = () => {
  return localStorage.getItem('isDemoMode') === 'true';
};