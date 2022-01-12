import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeDiscussion } from '../../store/discussions';
import './DiscussionList.css';

const DiscussionList = ({ discussionsObj, productId }) => {
  const dispatch = useDispatch();
  const [showEditDeleteMenu, setShowEditDeleteMenu] = useState(false);
  const [edMenuId, setEdMenuId] = useState();
  const sessionUser = useSelector(state => state.session.user);


  const discussions =  Object.values(discussionsObj).sort(function (a, b) {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  const handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const discussionId = e.target.value;
    dispatch(removeDiscussion(discussionId));
    console.log("Deleting discussion", e.target.value);
  }

  return (
    <div className='discussion-list'>
      <h2>Discussions</h2>
      {discussions.map(({id, userId, productId, discussion, createdAt, updatedAt, User}) => {
        return (
          <div key={`discussion-${id}`} className='discussion-box'>
            <h3>{User.username}</h3>
            <p>{discussion}</p>
            <p>{new Date(createdAt).toLocaleString()}</p>

            {(sessionUser?.id === userId) ?
                  <i class="fas fa-ellipsis-h edit-delete-menu"
                    onMouseEnter={() => {setShowEditDeleteMenu(true); setEdMenuId(id);}}
                    onMouseLeave={() => setShowEditDeleteMenu(false)}>
                    {(showEditDeleteMenu && (edMenuId === id)) ? (
                      <div className='edit-delete-div'
                        onMouseEnter={() => {setShowEditDeleteMenu(true); setEdMenuId(id);}}
                        onMouseLeave={() => setShowEditDeleteMenu(false)}>
                        <button value={id} onClick={handleDelete}>Delete</button>
                      </div>
                    ) : null}
                  </i>
                : null }
          </div>
        );
      })}
    </div>
  );
}

export default DiscussionList;
