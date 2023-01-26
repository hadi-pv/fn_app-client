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
    const [data,setData]=useState(news)
    const [family,setFamily]=useState([])
    const [friend,setFriend]=useState([])
    const [colleague,setColleague]=useState([])
    const [loading,setLoading]=useState(true)


    useEffect(()=>{
        const user1=JSON.parse(localStorage.getItem('user'))
        setUser(user1)
        axios.post('/api/getmsg',{
            send_by:user1.id
        })
        .then((resp)=>{
            console.log(resp.data)
            if (resp.data){
                resp.data.message.map((data)=>{
                    if(data.send_to=='family') setFamily([...family,data.fk_news_id])
                    if(data.send_to=='friend') setFriend([...friend,data.fk_news_id])
                    if(data.send_to=='colleague') setColleague([...colleague,data.fk_news_id])
                })
                setLoading(false)
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])


    return(
        <div>
            <div className='bg-[#e3fff9]a h-[100vh]'>
                <div className='w-full bg-[#00a884] -z-1 h-[8vh]'>
                    <img src='/iitmlogo.png' className='w-[6vh] h-[6vh] absolute top-[1vh] left-[1vh]'/>
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
                                {!data? <Loader color="green"/>:
                                <Mainpageleft news={data} family={family} friend={friend} colleague={colleague}
                                setFamily={setFamily} setFriend={setFriend} setColleague={setColleague}/> }
                            </div>
                        </Tab>
                        <Tab eventKey={1} title="Phone">
                            <div className='layout h-[88vh] z-2 w-full p-3 justify-center items-center flex'>
                                <Mainpageright persons={{family, friend, colleague}} news={data} loading={loading} user={user}/>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
                <div className='flex relative justify-between px-[6vw] py-[2vh] h-[92vh] d-none d-md-flex'>
                    <div className={ styles.layout + ' layout h-[88vh] z-2 w-[50vw] shadow-2xl p-3 rounded-lg'}>
                        {!data? <Loader color="green"/>:
                        <Mainpageleft news={data} family={family} friend={friend} colleague={colleague}
                        setFamily={setFamily} setFriend={setFriend} setColleague={setColleague}/>}
                    </div>
                    <div className='layout h-[88vh] z-2 w-[50vw] p-3 justify-center items-center flex'>
                        <Mainpageright persons={{family, friend, colleague}} news={data} loading={loading} user={user}/>
                    </div>
                </div>
            </div>
            <Drawer
                    opened ={show}
                    onClose = {handleClose}
                    title = 'Build by tensors'
                    size ="sm"
                    position="right"
                    >
                        <div>
                            <h3>Instructions</h3>
                            <br/>
                            {Object.keys(user).map((k,id)=>{
                                return(
                                    <h5 key={id}>{k} : {user[k]}</h5>
                                )
                            })}                      
                        </div>
            </Drawer>
        </div>
    );
}

export default Mainpage;