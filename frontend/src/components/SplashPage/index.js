import { Link } from 'react-router-dom';
import './SplashPage.css';

const SplashPage = () => {
  return (
    <div id='splash-div'>
      <img src='/images/splash-image.jpg' alt='splash'/>
      <div id='splash-banner'>
        <h2>Embark on a quest to find your next favorite tabletop game!</h2>
        <Link to='/products'>Start by browsing products here </Link>
        <p>Developed by Vivian Thach</p>
        <div id='about-links'>
          <a href='https://github.com/bobaguardian' target="_blank">GitHub</a>
          <a href='https://www.linkedin.com/in/vivianthach1023/' target="_blank">LinkedIn</a>
        </div>
      </div>
    </div>

  );
}

export default SplashPage;
