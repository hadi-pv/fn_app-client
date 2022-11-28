import { useEffect, useState } from "react";
import styles from '../styles/mobile.module.css'
import Modaldiv from "./modal";
import Navbar from './Navbar'
import axios from "axios";

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
            <Navbar/>
        </div>
    );
}

export default Mainpageright;