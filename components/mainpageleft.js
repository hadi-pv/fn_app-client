import {useState} from 'react';
import news from '../data/news.json'
import { ScrollArea, Modal} from '@mantine/core';
import ModalOpen from './ModalOpen';

import Card from './Card';
const Mainpageleft=(props)=>{
  const [opened, setOpened] = useState(false);
    return(
        
        <>
        <ScrollArea className='h-full py-0' onClick={setOpened(true)} >
          <div className='grid grid-cols-3 gap-5'  >  
        {news.map((v) => (
                <Card key={v.id}>
                  <div className='bg-[#bde1b9] p-2 rounded-md '>
                  <img className=" h-auto" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDA0AJjyyfl9SC28cYh0H_OuChB1pUM53glA&usqp=CAU" alt=""/>
                    <h6 className='' >{v.title}</h6>
                  </div>
                  <p className='line-clamp-2'>{v.description}</p>
                </Card>
        ))}   
        </div>
        </ScrollArea> 
        <Modal
        opened={opened}
        onClose={() => setOpened(false)}  
        centered>
          <ModalOpen/>
        
      </Modal>
        </>

    );
}

export default Mainpageleft;