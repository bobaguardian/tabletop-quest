import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiscussionsForProduct, removeDiscussion } from '../../store/discussions';
import DiscussionForm from '../DiscussionForm';
import './DiscussionList.css';

const DiscussionList = ({ discussionsObj, productId }) => {
  const dispatch = useDispatch();
  const [showEditDeleteMenu, setShowEditDeleteMenu] = useState(false);
  const [edMenuId, setEdMenuId] = useState();
  const [showEditForm, setShowEditForm] = useState(false);
  const [editDiscussionId, setEditDiscussionId] = useState();
  const sessionUser = useSelector(state => state.session.user);

  const discussions =  Object.values(discussionsObj).sort(function (a, b) {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  useEffect(() => {
    dispatch(getDiscussionsForProduct(productId));
  }, [dispatch, productId])


  const handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const discussionId = e.target.value;
    dispatch(removeDiscussion(discussionId));
  }

  const hideContent = (id) => {
    const disDate = document.getElementById(`${id}-discussion-date`);
    const actualDis = document.getElementById(`actual-discussion-${id}`);
    disDate.style.display = 'none';
    actualDis.style.display = 'none';
  }

  const showContent = (id) => {
    const disDate = document.getElementById(`${id}-discussion-date`);
    const actualDis = document.getElementById(`actual-discussion-${id}`);
    disDate.style.display = 'block';
    actualDis.style.display = 'block';
  }

  return (
    <div className='discussion-list'>
      <h2>Discussions ({discussions.length})</h2>
      {(discussions.length === 0) ? <p>There are no discussions for this game yet!</p> : null }
      {discussions.map(({id, userId, productId, discussion, createdAt, updatedAt, User}) => {
        return (
          <div key={`discussion-${id}`} className='discussion-box'>
            <div>
              <h3>{User.username}</h3>
              {(sessionUser?.id === userId) ?
                <i className="fas fa-ellipsis-h discussion-edit-delete-menu"
                  onMouseEnter={() => {setShowEditDeleteMenu(true); setEdMenuId(id);}}
                  onMouseLeave={() => setShowEditDeleteMenu(false)}>
                  {(showEditDeleteMenu && (edMenuId === id)) ? (
                    <div className='discussion-edit-delete-div'
                      onMouseEnter={() => {setShowEditDeleteMenu(true); setEdMenuId(id);}}
                      onMouseLeave={() => setShowEditDeleteMenu(false)}>
                      <button className='edit-btn' value={id} onClick={() => {setShowEditForm(true); setEditDiscussionId(id); hideContent(id)}}>Edit</button>
                      <button className='delete-btn' value={id} onClick={handleDelete}>Delete</button>
                    </div>
                  ) : null}
                </i>
              : null }
            </div>
            <p className='discussion-date' id={`${id}-discussion-date`}>{new Date(createdAt).toLocaleString()}</p>
            <p className='actual-discussion' id={`actual-discussion-${id}`}>{discussion}</p>

            { (showEditForm && editDiscussionId === id ) ? <DiscussionForm type='update' discussionsObj={discussionsObj} discussionId={editDiscussionId} userId={userId} productId={productId} setShowEditForm={setShowEditForm} showContent={showContent}/> : null }

          </div>
        );
      })}
    </div>
  );
}

export default DiscussionList;
