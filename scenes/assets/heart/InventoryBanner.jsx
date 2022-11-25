import React from 'react';
import styles from './InventoryBanner.module.css';
import sample from './surgery2.mp4';


const videoSource = "./surgerySmall.mp4";
//import BackgroundVideo from './BackgroundVideo';

const InventoryBanner = () => {
  return (
    <div
      className={styles.menu}>
        <h1>Surgery: Restrictive cardiomyopathy</h1>
       <video  width="600" autoPlay loop muted>
            <source src={sample} type='video/mp4' />
        </video>
    </div>

  );
};
export default InventoryBanner;



/*
        <div>
      <div style={{ height: '50vh' }}>
        <BackgroundVideo
          blur={1}
          videoSource={videoSource} >
          <div className='content'>
            <div className='sub-content' >
              <h1>Background Video</h1>
              <p>Learn how to create a background video in React</p>
            </div>
          </div>
        </BackgroundVideo>
      </div>
    </div>
*/