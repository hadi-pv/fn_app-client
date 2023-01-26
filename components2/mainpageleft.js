import {useState} from 'react';
import { ScrollArea,} from '@mantine/core';

import news from '../data/news.json'
import Modals from './modals';
// import img from '../data/newsimg/F1.jpg'
// import Card from './Card';
import styles from "../styles/card.module.css";



const Mainpageleft=(props)=>{
    return(
        
        <>
        <ScrollArea style={{ 'height': '75vh' }} >
        <div className='flex flex-wrap gap-2'>  
            {news.map((v, index) => (
                    <div className={(props.openedNews.includes(v.id)? styles.newsCard2 : styles.newsCard)} key={v.id}>
                      <div className='bg-[#bde1b9] rounded-md ' style={{'height':'100%'}}>
                        <center><img className="h-full" src={v.image} alt="img" height={180} width={180} /></center>  
                      </div>
                      <div>
                        <Modals openedNews={props.openedNews} setOpenedNews={props.setOpenedNews} news={v} family={props.family} friend={props.friend} colleague={props.colleague} 
                        setFamily={props.setFamily} setFriend={props.setFriend} setColleague={props.setColleague}/> 
                        {props.opened}
                      </div>
                      
                    </div>
            ))}   
          </div>
        </ScrollArea>
        </>

    );
}

export default Mainpageleft;