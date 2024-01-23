import React from 'react';
import CustomButton from './CustomButton';

function Card(props) {
  return (
    <div
      className='Card'
      style={{
        backgroundColor: props.complete === true ? 'gray' : 'white',
        color: props.complete === true ? 'white' : 'black',
      }}
    >
      <h3>{props.title}</h3>
      <p>{props.des}</p>
      <p>
        <strong>Date:</strong> {props.date}
      </p>
      <p>
        <strong>Status:</strong> {props.complete ? 'Completed' : 'Incomplete'}
      </p>
      <div className='btnwrapper'>
        <CustomButton
          color='White'
          bg='#1877F2'
          name='Complete'
          click={props.update}
        />
        <CustomButton color='White' bg='red' name='Delete' click={props.delete} />
      </div>
    </div>
  );
}

export default Card;

