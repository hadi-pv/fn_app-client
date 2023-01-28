import styles from '../styles/mainpage.module.css'
import { useEffect, useState } from 'react';
import { Drawer, Loader} from '@mantine/core';
import { Tab, Tabs, Modal, Button } from 'react-bootstrap';
import {IconArrowBigDownLines} from '@tabler/icons'
import axios from 'axios';

import Mainpageright from '../components2/mainpageright';
import Mainpageleft from '../components2/mainpageleft';
import ScrollButton from '../components2/scrollbutton';
import news from '../data/news.json'


export async function getStaticProps(){
    return {
        props: { news
        },
      };
}


const Mainpage = () => {

    
    const [show, setShow] = useState(false);
    const [modalOpen, setModalOpen] = useState(true);
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
            <button type='button' hidden={selectedTab==1} className={`${styles.scrollbtn} btn bg-white rounded`} onClick={() => {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth',
                });
            }}><IconArrowBigDownLines/></button>
            <div className='bg-[#e3fff9]a h-[100vh]'>
                <div className='w-full bg-[#00a884] -z-1 h-[8vh]'>
                    <img src='/iitmlogo.png' alt='IITM LOGO' className='w-[6vh] h-[6vh] absolute top-[1vh] left-[1vh]'/>
                    <img src='/logo192.png' alt='IITM LOGO' className='bg-white rounded w-[6vh] h-[6vh] absolute top-[1vh] left-[10vh]'/>
                    <button onClick={()=>setModalOpen(true)} className="flex bg-[#ffffff] w-[10vh] h-[6vh] p-2 absolute top-[1vh] right-[1vh] rounded-md justify-content-center align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>&emsp;
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1zm.905 4.555a.552.552 0 1 0-1.104 0v3.89a.552.552 0 1 0 1.104 0v-3.89zm.03 5.445a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                        </svg>
                    </button>
                </div>
                <div className=' h-[92vh] py-[2vh] d-md-none'>
                    <Tabs activeKey={selectedTab} onSelect={(k) => setSelectedTab(k)} justify>
                        <Tab eventKey={0} title="Information">
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
                                    }} ><strong>CONTINUE</strong></button>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey={1} title="Your Response">
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
                            <button type='button' className='btn btn-primary' disabled={openedNews.length<=7} onClick={async()=> {
                                const t=Math.floor((new Date().getTime()-user.starttime)/1000)
                                const k=await axios.post('/api/sendlog',{news_id:'0',user_id:user.id,task:'40',rt:user.rt,nt:user.nt,send_to:'',close_from:'',time_in_sec:t,add_info:`Interacted with ${openedNews.length}`})
                                window.location.href='/feedback'
                            }} ><strong>CONTINUE</strong></button>
                        </div>
                    </div>
                    <div className='layout h-[88vh] z-2 w-[50vw] p-3 justify-center items-center flex'>
                        <Mainpageright openedNews={openedNews} setOpenedNews={setOpenedNews} persons={{family, friend, colleague}} news={data} loading={loading} user={user}/>
                    </div>
                </div>
            </div>            
            <Modal show={modalOpen} onHide={()=>setModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title> Are you excited to participate? </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5><center><i>Number of news articles opened : <br/>
                    <button type='button' className='btn btn-primary m-2'><strong>{openedNews.length}</strong></button></i></center></h5>
                    <br/>
                    <h6><b> Here are a few instructions before you start... </b></h6> <br/>

                    There are two tabs on the experiment homepage: <br/><br/>
                    a) <b>Information</b> – you can see all the information to read. <br/>
                    b) <b>Your responses</b> - The information you shared will be shown here in the respective WhatsApp groups. <br/><br/>

                    • Please open and read all the information presented on the screen. You should <b>attempt</b> to share at least six of them. <br/><br/>

                    • When you open an information, at the bottom of the screen, you have two options: <b>share</b> and <b>close</b>. The continue button will be enabled only after sharing is complete. <br/><br/>

                    • After completing the experiment, you will be directed to the post-experiment questionnaire.  <br/><br/>

                    Enjoy the experiment!
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=>setModalOpen(false)}>
                    Close
                </Button>
                </Modal.Footer>
                <div style={{'color':'green'}}><center><strong><h6>Build by TENSORS</h6></strong></center></div>
            </Modal>
        </div>
        </>
        
    );
}

export default Mainpage;