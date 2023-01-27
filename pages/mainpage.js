import styles from '../styles/mainpage.module.css'
import { useEffect, useState } from 'react';
import { Drawer, Loader} from '@mantine/core';
import { Tab, Tabs } from 'react-bootstrap';
import axios from 'axios';

import Mainpageright from '../components2/mainpageright';
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
    const [selectedTab, setSelectedTab] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [user,setUser]=useState('')
    const [data,setData]=useState([])
    const [family,setFamily]=useState([])
    const [friend,setFriend]=useState([])
    const [colleague,setColleague]=useState([])
    const [loading,setLoading]=useState(true)

    const [openedNews,setOpenedNews]=useState([])

    const shuffleArray=(array)=>{
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }      

    useEffect(()=>{
        const user1=JSON.parse(localStorage.getItem('user'))
        setUser(user1)
        setData(shuffleArray(news.filter((k)=>k.nt==user1.nt)))
        console.log(data)
        // axios.post('/api/getmsg',{
        //     send_by:user1.id
        // })
        // .then((resp)=>{
        //     console.log(resp.data)
        //     if (resp.data){
        //         resp.data.message.map((data)=>{
        //             if(data.send_to=='family') setFamily([...family,data.fk_news_id])
        //             if(data.send_to=='friend') setFriend([...friend,data.fk_news_id])
        //             if(data.send_to=='colleague') setColleague([...colleague,data.fk_news_id])
        //         })
        //         setLoading(false)
        //     }
            
        // })
        // .catch((err)=>{
        //     console.log(err)
        // })
    },[])


    return(
        <>
        <div>
            <div className='bg-[#e3fff9]a h-[100vh]'>
                <div className='w-full bg-[#00a884] -z-1 h-[8vh]'>
                    <img src='/iitmlogo.png' alt='IITM LOGO' className='w-[6vh] h-[6vh] absolute top-[1vh] left-[1vh]'/>
                    <img src='/logo192.png' alt='IITM LOGO' className='bg-white rounded w-[6vh] h-[6vh] absolute top-[1vh] left-[10vh]'/>
                    <button onClick={handleShow} className=" bg-[#ffffff] w-[6vh] h-[6vh] p-2 absolute top-[1vh] right-[1vh] rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                    </button>
                </div>
                <div className=' h-[92vh] py-[2vh] d-md-none'>
                    <Tabs activeKey={selectedTab} onSelect={(k) => setSelectedTab(k)} justify>
                        <Tab eventKey={0} title="News">
                            <div className={ styles.layout + ' layout h-[88vh] z-2 w-full shadow-2xl  p-3 rounded-lg'}>
                                {!data? <Loader color="green"/> :
                                    <Mainpageleft openedNews={openedNews} setOpenedNews={setOpenedNews} news={data} family={family} friend={friend} colleague={colleague}
                                    setFamily={setFamily} setFriend={setFriend} setColleague={setColleague}/>
                                }
                                <div className='flex justify-center items-center h-[8vh]'>
                                    <button type='button' className='btn btn-primary' disabled={openedNews.length<=7} onClick={async()=> {
                                        const t=Math.floor((new Date().getTime()-user.starttime)/1000)
                                        const k=await axios.post('/api/sendlog',{news_id:'0',user_id:user.id,task:'40',rt:user.rt,nt:user.nt,send_to:'',close_from:'',time_in_sec:t,add_info:`Interacted with ${openedNews.length}`})
                                        window.location.href='/feedback'
                                    }} ><strong>TO NEXT SEGMENT</strong></button>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey={1} title="Phone">
                            <div className='layout h-[88vh] z-2 w-full p-3 justify-center items-center flex'>
                                <Mainpageright openedNews={openedNews} setOpenedNews={setOpenedNews} persons={{family, friend, colleague}} news={data} loading={loading} user={user}/>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
                <div className='flex relative justify-between px-[6vw] py-[2vh] h-[92vh] d-none d-md-flex'>
                    <div className={ styles.layout + ' layout h-[88vh] z-2 w-[60vw] shadow-2xl p-3 rounded-lg'}>
                        {!data? <Loader color="green"/> :
                            <Mainpageleft openedNews={openedNews} setOpenedNews={setOpenedNews} news={data} family={family} friend={friend} colleague={colleague}
                            setFamily={setFamily} setFriend={setFriend} setColleague={setColleague}/>
                        }
                        <div className='flex justify-center items-center h-[10vh]'>
                            <button type='button' className='btn btn-primary' disabled={openedNews.length<=1} onClick={async()=> {
                                const t=Math.floor((new Date().getTime()-user.starttime)/1000)
                                const k=await axios.post('/api/sendlog',{news_id:'0',user_id:user.id,task:'40',rt:user.rt,nt:user.nt,send_to:'',close_from:'',time_in_sec:t,add_info:`Interacted with ${openedNews.length}`})
                                window.location.href='/feedback'
                            }} ><strong>TO NEXT SEGMENT</strong></button>
                        </div>
                    </div>
                    <div className='layout h-[88vh] z-2 w-[50vw] p-3 justify-center items-center flex'>
                        <Mainpageright openedNews={openedNews} setOpenedNews={setOpenedNews} persons={{family, friend, colleague}} news={data} loading={loading} user={user}/>
                    </div>
                </div>
            </div>
            <Drawer opened ={show} onClose = {handleClose} title = 'Build by tensors' size ="lg" position="right">
                <div style={{'padding':'1vh'}}>
                    <center><h3>Instructions</h3></center>
                    <br/>
                    <h5>Number of news articles opened : <br/>
                    <center><button type='button' className='btn btn-primary'><strong>{openedNews.length}</strong></button></center></h5>
                    <br/>
                    {Object.keys(user).map((k,id)=>{
                        return(
                            <h5 key={id}>{k} : {user[k]}</h5>
                        )
                    })}                      
                </div>
            </Drawer> 
        </div>
        </>
        
    );
}

export default Mainpage;