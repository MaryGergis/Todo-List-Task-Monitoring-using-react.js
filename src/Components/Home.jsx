import React from 'react';
import HomeImage from '../Images/Home.svg'

const Home = (props) => {
  
    return (
        <div className='container  row   align-items-center  ' style={{marginTop:'7%', marginLeft:'10%'}}>
            <div className='col-6'>
                <h1 style={{color:'#3300FF'}}>Welcome to Your Todo List!</h1>
                <p className='fst-italic fs-5' style={{color:'#ff8c00'}}>
                ″You can always change your plan, but only if you have one. I’m a big believer in to-do lists. It helps us break life into small steps. I once put “get tenure” on my to-do list. That was naïve. The most useful to-do list breaks tasks into small steps. It’s like when I encourage Logan to clean his room by picking up one thing at a time.″
                </p>
            </div>
            <div className='col-6'>
                <img src={HomeImage} alt=""   />
            </div>
        </div>
    );
};

export default Home;