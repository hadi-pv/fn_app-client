import { useEffect, useState } from "react";
import styles from '../styles/mobile.module.css'
import Modaldiv from "./modal";
import Navbar from './Navbar'
import axios from "axios";
import {IconSearch,IconDotsVertical} from '@tabler/icons'
import Pagination from 'react-bootstrap/Pagination';
import { Row,Col } from "react-bootstrap";
import { Loader } from "@mantine/core";




const Mainpageright=(props)=>{


    const [person,setPerson]=useState('');
    const [flag,setFlag]=useState(true)
    const [persons,setPersons] = useState({
        'family':null,
        'friend':null,
        'colleague':null
    })

    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem('user'))
        axios.post('/api/getmsg',{
            send_by:user.id
        })
        .then((resp)=>{
            if(resp.data){
                setPersons(prevState=>({
                    ...prevState,
                    'family':resp.data.message.filter((data)=>data.send_to=='family'),
                    'friend':resp.data.message.filter((data)=>data.send_to=='friend'),
                    'colleague':resp.data.message.filter((data)=>data.send_to=='colleague')
                }))    
                setFlag(false)
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])
   
    return(
        <div className={styles.smartphone}>
            <div className=' h-full'>
                <div className = 'flex flex-col relative h-[100px] w-[100%]  bg-[#00a884] justify-between text-white p-2 pb-0'>
                    <div className='flex justify-between'>
                    <h4>Whatsapp</h4> 
                    <div className='flex gap-2'>
                        <IconSearch/> 
                        <IconDotsVertical/> 
                    </div>
                </div>
                
                <div className='person_class flex justify-between'>
                    {
                        ['family','friend','colleague'].map((pers,id)=>{
                            return(
                                <button key={id} id={pers} className='w-full m-2' onClick={()=>{

                                    setPerson(pers)
                                    document.getElementById(pers).className="border-b-[3px] border-white w-full m-2"

                                    for(const item of ['family','friend','colleague']){
                                        if(item!=pers){
                                            document.getElementById(item).className="w-full m-2"
                                        }
                                    }

                                }}>{pers.toUpperCase()}</button> 
                            );
                        })
                    }  
                </div> 
            </div>
            
            <div className={`${styles.layout} bg-slate-50 h-[580px] news_display`}>{
                flag ? <center><Loader color="green"/>{person}{flag}</center>:
                <>
                    hello
                </>
            }</div>
       </div>
        </div>
    );
}

export default Mainpageright;