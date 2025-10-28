const Sidebar = ({ user, selected, setSelected }) => {
  const menuItems = ['plants', 'care tasks', 'environment data', 'health records'];
  const adminItems = user?.role === 'ADMIN' ? ['admin dashboard'] : [];

  return (
    <aside className="sidebar" style={{ backgroundColor: '#f0f4f3', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '250px', padding: '20px' }}>
      <div>
        <h2>🌿PLANCARE 🌿</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {[...menuItems, ...adminItems].map(item => (
            <li
              key={item}
              style={{
                fontWeight: selected === item ? 'bold' : 'normal',
                color: selected === item ? '#2e7d32' : '#333',
                marginBottom: '15px',
                cursor: 'pointer',
                backgroundColor: adminItems.includes(item) ? '#e8f5e8' : 'transparent',
                padding: adminItems.includes(item) ? '8px' : '0',
                borderRadius: adminItems.includes(item) ? '4px' : '0'
              }}
              onClick={() => setSelected(item)}
            >
              {adminItems.includes(item) ? '🔧 ' : ''}{item.charAt(0).toUpperCase() + item.slice(1)}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ borderTop: '1px solid #ccc', paddingTop: '20px' }}>
        <p>{user ? user.username : 'Guest'}</p>
        <button
          onClick={() => alert('Settings clicked')}
          style={{ cursor: 'pointer', background: 'none', border: 'none', color: '#4caf50' }}
        >
          ⚙️ Settings 
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
