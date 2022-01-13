import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitDiscussion, editDiscussion, getDiscussionsForProduct } from '../../store/discussions';
import './DiscussionForm.css';

const DiscussionForm = ({ type, discussionsObj, productId, userId, discussionId, setShowEditForm}) => {
  const dispatch = useDispatch();

  let initialDiscussion = '';
  let discussionDetails;
  if (discussionId) {
    discussionDetails = discussionsObj[discussionId];
    if (discussionDetails) initialDiscussion = discussionDetails.discussion;
  }

  const [discussion, setDiscussion] =  useState(initialDiscussion);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const discussionDetails = {
      userId,
      productId,
      discussion
    };

    setErrors([]);

    if (type === 'create') {
      dispatch(submitDiscussion(discussionDetails))
        .then((res) => {
          setDiscussion('');
        })
        .catch(async(res) => {
          const data = await res.json();
          if (data && data.errors) return setErrors(data.errors);
        });
    } else {
      dispatch(editDiscussion(discussionId, discussionDetails))
        .then((res) => dispatch(getDiscussionsForProduct(productId)))
        .catch(async(res) => {
          const data = await res.json();
          if (data && data.errors) return setErrors(data.errors);
        });
      setShowEditForm(false);
    }
    console.log(discussionDetails);
  }


  return (
    <form onSubmit={handleSubmit}>
      <ul className='errors-ul'>
        {errors.map((error, idx) => <li key={idx}>* {error} *</li>)}
      </ul>
      <div className='form-ele' className='discussion-form-div'>
        { type === 'create' ? <label htmlFor='discussion'>What are your thoughts?</label> : null}
        <div>
          <textarea
              onChange={(e) => setDiscussion(e.target.value)}
              value={discussion}
              placeholder='Awesome game!'
              required
              id='discussion'
              rows='4'
              cols='85'
            />
          <button className='form-ele' type='submit'>Send</button>

        </div>
      </div>
    </form>
  );
}

export default DiscussionForm;
