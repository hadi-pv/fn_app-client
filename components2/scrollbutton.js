import { useEffect, useState } from 'react';

const ScrollButton = () => {
  
    const scrollToBottom = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
        });
    };

    return <button type='button' className='btn btn-danger' onClick={scrollToBottom}>Scroll to Bottom</button> ;
};

export default ScrollButton;
