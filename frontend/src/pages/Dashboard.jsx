const Dashboard = () => {
    return (
      <div className = "page-container">
        <div style={styles.container}>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard!</p>
      </div>
      </div>
    );
  };

  const styles = {
    container: {
      padding: '2rem',
      color: 'white',
    },
  };

export default Dashboard;