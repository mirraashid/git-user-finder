import React, { useContext } from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/githubContext';

const Users = () => {
  const githubContext = useContext(GithubContext);
  const { loading, users, loadMoreUsers, totalCount } = githubContext;
  if (loading) return <Spinner />;
  return (
    <>
      <div style={Users.userStyle}>
        {users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
      {totalCount > users.length && <button
          className="btn btn-primary btn-block"
          onClick={loadMoreUsers}
        >
          Load More
        </button>}
    </>
  );
};

Users.userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem',
};

export default Users;
