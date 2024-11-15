import React from 'react';
import UsersStadistics from '../../molecules/UserStadistics/UserStadistics';
import "./UsersStatus.css";
const UsersStatus = () => {
  return (
    <div className='UsersStatusContainer'>
      <UsersStadistics titleText="Estado estudiantes" />
      <UsersStadistics titleText="Estado brigadistas" />
    </div>
  );
};

export default UsersStatus;
