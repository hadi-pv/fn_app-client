import {useState} from 'react';
import { ScrollArea,} from '@mantine/core';

import news from '../data/news.json'
import Modals from './modals';
// import img from '../data/newsimg/F1.jpg'
// import Card from './Card';
import styles from "../styles/card.module.css";

const Card = ({ children }) => {
  return <div className={styles.newsCard}>{children}</div>;
};

const Mainpageleft=(props)=>{
    return(
        
        <>
        <ScrollArea style={{ height: 650 }} >
          <div className='grid grid-cols-3 gap-5'>  
            {news.map((v) => (
                    <Card key={v.id}>
                      <div className='bg-[#bde1b9] p-2 rounded-md '>
                        <img className="h-full" src={v.image} alt="img"/>
                        <br/>
                        <h6 className='' >{v.title}</h6>
                      </div>
                      <Modals news={v} family={props.family} friend={props.friend} colleague={props.colleague} 
                      setFamily={props.setFamily} setFriend={props.setFriend} setColleague={props.setColleague}/>

                    </Card>
            ))}   
          </div>
        </ScrollArea>
        </>

    );
}

export default Mainpageleft;