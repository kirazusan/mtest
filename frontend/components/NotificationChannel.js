

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotificationChannel = () => {
  const [notificationChannels, setNotificationChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotificationChannels = async () => {
      try {
        const response = await axios.get('/api/notification-channels');
        if (response.data && Array.isArray(response.data)) {
          setNotificationChannels(response.data);
        } else {
          setError('Invalid response data');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotificationChannels();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (notificationChannels.length === 0) {
    return <div>No notification channels found</div>;
  }

  return (
    <div>
      <h1>Notification Channels</h1>
      <ul>
        {notificationChannels.map((channel) => (
          <li key={channel.id}>{channel.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationChannel;