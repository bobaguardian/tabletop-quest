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
    console.log('use effect');
    dispatch(getDiscussionsForProduct(productId));
  }, [dispatch])


  const handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const discussionId = e.target.value;
    dispatch(removeDiscussion(discussionId));
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
                    <button value={id} onClick={() => {setShowEditForm(true); setEditDiscussionId(id)}}>Edit</button>
                    <button value={id} onClick={handleDelete}>Delete</button>
                  </div>
                ) : null}
              </i>
            : null }
            { (showEditForm && editDiscussionId === id ) ? <DiscussionForm type='update' discussionsObj={discussionsObj} discussionId={editDiscussionId} userId={userId} productId={productId} setShowEditForm={setShowEditForm}/> : null }

          </div>
        );
      })}
    </div>
  );
}

export default DiscussionList;
