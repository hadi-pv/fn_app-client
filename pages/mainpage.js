import styles from '../styles/mainpage.module.css'
import { useEffect, useState } from 'react';
import { Drawer, Loader} from '@mantine/core';
import axios from 'axios';

import Mainpageright from '../components/mainpageright';
import Mainpageleft from '../components2/mainpageleft';
import news from '../data/news.json'


export async function getStaticProps(){
    return {
        props: { news
        },
      };
}


const Mainpage = () => {

    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [user,setUser]=useState('')
    const [data,setData]=useState(news)
    const [family,setFamily]=useState([])
    const [friend,setFriend]=useState([])
    const [colleague,setColleague]=useState([])


    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('user')))
        axios.post('/api/getmsg',{
            send_by:user.id
        })
        .then((resp)=>{
            // if(resp.data){
            //     setFamily(resp.data.message.filter((data)=>data.send_to=='family'))
            //     setColleague(resp.data.message.filter((data)=>data.send_to=='colleague'))
            //     setFriend(resp.data.message.filter((data)=>data.send_to=='friend')) 
            //     setFlag(false)

            // }
            if (resp.data){
                resp.data.message.map((data)=>{
                    if(data.send_to=='family') setFamily([...family,data.fk_news_id])
                    if(data.send_to=='friend') setFriend([...friend,data.fk_news_id])
                    if(data.send_to=='colleague') setColleague([...colleague,data.fk_news_id])
                })
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])


    return(
        <>
        <div className='bg-[#e3fff9]a h-[100vh]'>
            <button onClick={handleShow} className=" bg-[#519fff] flex p-2 h-12 w-12  mx-12 mb-2  rounded-md relative top-2 justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>
            </button>
            <div className='flex relative top-10 justify-between px-20'>
                <div className={ styles.layout + '   layout h-[85vh] z-2 w-[50vw] shadow-2xl  p-3 rounded-lg  '}>
                    {!data? <Loader color="green"/>:
                    <Mainpageleft news={data} family={family} friend={friend} colleague={colleague}/>}
                </div>
                {/* <Mainpageright/> */}
            </div>
        </div>
         <Drawer
                opened ={show}
                onClose = {handleClose}
                title = 'Instructions'
                size ="sm">
                    <div>
                        <h1>{user.name}</h1>
                        <h5>{user.id}</h5>
                        <h3>{user.age}</h3>                        
                    </div>
        </Drawer>

        </>
        
    );
}

export default Mainpage;