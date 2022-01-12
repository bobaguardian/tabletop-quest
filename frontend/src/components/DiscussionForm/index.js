import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitDiscussion } from '../../store/discussions';
import './DiscussionForm.css';

const DiscussionForm = ({ productId, userId }) => {
  const dispatch = useDispatch();

  const [discussion, setDiscussion] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const discussionDetails = {
      userId,
      productId,
      discussion
    };

    setErrors([]);
    dispatch(submitDiscussion(discussionDetails))
      .catch(async(res) => {
        const data = await res.json();
        if (data && data.errors) return setErrors(data.errors);
      });
    console.log(discussionDetails);
  }


  return (
    <form onSubmit={handleSubmit}>
      <h2>Hello from DiscussionForm!</h2>
      <ul className='errors-ul'>
        {errors.map((error, idx) => <li key={idx}>* {error} *</li>)}
      </ul>
      <div className='form-ele'>
        <label htmlFor='discussion'>Discussion</label>
        <textarea
            onChange={(e) => setDiscussion(e.target.value)}
            value={discussion}
            placeholder='Awesome game!'
            required
            id='discussion'
            rows='7'
            cols='50'
          />
      </div>
      <button className='form-ele' type='submit'>Send</button>
    </form>
  );
}

export default DiscussionForm;
