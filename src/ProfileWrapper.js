import React from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';

function ProfileWrapper(props) {
  const navigate = useNavigate();

  if (!props.user) {
    navigate('/login');
    return null;
  }

  return <Profile user={props.user} onLogout={props.onLogout} />;
}

export default ProfileWrapper;
