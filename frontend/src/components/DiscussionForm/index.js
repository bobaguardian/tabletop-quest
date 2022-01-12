
import './DiscussionForm.css';

const DiscussionForm = ({ productId, userId }) => {


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Discussion Submitted!");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Hello from DiscussionForm!</h2>
    </form>
  );
}

export default DiscussionForm;
