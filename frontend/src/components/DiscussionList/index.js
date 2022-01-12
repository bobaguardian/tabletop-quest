import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiscussionsForProduct } from '../../store/discussions';
import './DiscussionList.css';

const DiscussionList = ({ discussionsObj, productId }) => {
  const dispatch = useDispatch();
  const discussions =  Object.values(discussionsObj).sort(function (a, b) {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  return (
    <div className='discussion-list'>
      <h2>Hello from DiscussionList</h2>
      {discussions.map(({id, userId, productId, discussion, createdAt, updatedAt, User}) => {
        return (
          <div key={`discussion-${id}`} className='discussion-box'>
            <h3>{User.username}</h3>
            <p>{discussion}</p>
            <p>{new Date(createdAt).toLocaleString()}</p>
          </div>
        );
      })}
    </div>
  );
}

export default DiscussionList;
