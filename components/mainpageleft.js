import {useState} from 'react';
import news from '../data/news.json'
import { ScrollArea, Modal} from '@mantine/core';
import ModalOpen from './ModalOpen';
import Modaldiv from './modal'

import Card from './Card';
const Mainpageleft=(props)=>{
  const [opened, setOpened] = useState(false);
    return(
        
        <>
        <ScrollArea style={{ height: '100%' }} >
          <div className='grid grid-cols-3 gap-5' onClick={() => setOpened(true)} >  
        {props.news.map((v) => (
                <Card key={v.id}>
                  <div className='bg-[#bde1b9] p-2 rounded-md '>
                  <img className=" h-auto" src={v.image_link} alt=""/>
                  <h6 className='' >{v.headline}</h6>
                  <Modaldiv news={v}/>
                  </div>
                  <p className='line-clamp-2'>{v.description}</p>
                  
                </Card>
        ))}   
        </div>
        </ScrollArea>
        </>

    );
}

export default Mainpageleft;