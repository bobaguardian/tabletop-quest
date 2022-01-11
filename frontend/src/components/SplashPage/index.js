import './SplashPage.css';

const SplashPage = () => {
  return (
    <div id='splash-div'>
      <img src='/images/splash-image.jpg' alt='splash'/>
      <div id='splash-banner'>

        <h2>Embark on a quest to find your next favorite tabletop game!</h2>
        <a href='/products'>Start by browsing products here </a>

      </div>
    </div>
  );
}

export default SplashPage;
