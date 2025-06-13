

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NotificationChannelService } from '../services/NotificationChannelService';

const NotificationChannelComponent = () => {
  const { register, handleSubmit, errors } = useForm();
  const [notificationChannel, setNotificationChannel] = useState({});
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      if (!data.name || typeof data.name !== 'string') {
        throw new Error('Name must be a non-empty string');
      }
      if (!data.description || typeof data.description !== 'string') {
        throw new Error('Description must be a non-empty string');
      }
      if (!data.type || typeof data.type !== 'string') {
        throw new Error('Type must be a non-empty string');
      }

      const response = await NotificationChannelService.createNotificationChannel(data);
      if (response.ok ) {
        setNotificationChannel(response.data);
      } else {
        throw new Error('Failed to create notification channel');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Create Notification Channel</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" ref={register({ required: true })} />
          {errors.name && <div>This field is required</div>}
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" ref={register({ required: true })} />
          {errors.description && <div>This field is required</div>}
        </div>
        <div>
          <label>Type:</label>
          <select name="type" ref={register({ required: true })}>
            <option value="">Select type</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
          </select>
          {errors.type && <div>This field is required</div>}
        </div>
        <button type="submit">Create</button>
      </form>
      {error && (
        <div>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      )}
      {notificationChannel && (
        <div>
          <h2>Created Notification Channel</h2>
          <p>Name: {notificationChannel.name}</p>
          <p>Description: {notificationChannel.description}</p>
          <p>Type: {notificationChannel.type}</p>
        </div>
      )}
    </div>
  );
};

export default NotificationChannelComponent;