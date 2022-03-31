import React from 'react';
import PropTypes from 'prop-types';

const UserItem = ({ user: { avatar_url, login, score,  html_url} }) => {
  return (
    <div className="user-card text-center">
      <img
        src={avatar_url}
        alt={login}
        className="round-img"
        style={{ width: '60px' }}
      />
      <h3>{login}</h3>
      <div className="show-on-hover">
          <p>Score: {score}</p>
          <p><a href={html_url} target="_blank" rel="noopener noreferrer">Profile Link</a></p>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
