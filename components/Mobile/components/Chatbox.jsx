import React from 'react';
const Chatbox=()=>{
    return(
        <div>
        <div className='box'>
        <img src='./assets/dp.jpg'></img>
        <i className="fa-solid fa-video"></i>
        <i className="fa-solid fa-phone"></i>
        <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
        <div className='chatarea'>
        <i className="fa-solid fa-face-smile"></i>
        <textarea className='mytext'></textarea>
        <i className="fa-solid fa-paperclip"></i>
        <i className="fa-solid fa-indian-rupee-sign"></i>
        <i className="fa-solid fa-camera"></i>
        </div>
        
        </div>
    )
}
export default Chatbox