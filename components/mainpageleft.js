import {useState} from 'react';
import news from '../data/news.json'
import { ScrollArea,} from '@mantine/core';
import Modals from './Modals';
import img from '../data/newsimg/F1.jpg'
import Card from './Card';
const Mainpageleft=(props)=>{
    return(
        
        <>
        <ScrollArea style={{ height: 650 }} >
          <div className='grid grid-cols-3 gap-5'>  
        {news.map((v) => (
                <Card key={v.id}>
                  <div className='bg-[#bde1b9] p-2 rounded-md '>
                  <img className="h-full" src={v.image} alt="img"/>
                    <h6 className='' >{v.title}</h6>
                  </div>
                  <p className='line-clamp-2'>{v.description}</p>
                  <Modals news = {v}/>
                  {console.log(v.fake + " and " + v.contact)}

                </Card>
        ))}   
        </div>
        </ScrollArea>
        </>

    );
}

export default Mainpageleft;