import styles from '../styles/mainpage.module.css'
import { useEffect, useState } from 'react';
import { Drawer, Loader} from '@mantine/core';
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
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [user,setUser]=useState('')
    const [data,setData]=useState(news)
    const [family,setFamily]=useState([])
    const [friend,setFriend]=useState([])
    const [colleague,setColleague]=useState([])
    const [loading,setLoading]=useState(true)

    const [openedNews,setOpenedNews]=useState([])


    useEffect(()=>{
        const user1=JSON.parse(localStorage.getItem('user'))
        setUser(user1)
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
        <div className='d-none d-md-block'>
            <div className='bg-[#e3fff9]a h-[100vh]'>
                <div className='w-full bg-[#00a884] -z-1 h-[8vh]'>
                    <img src='/iitmlogo.png' className='w-[6vh] h-[6vh] absolute top-[1vh] left-[5vh]'/>
                    <button onClick={handleShow} className=" bg-[#ffffff] w-[6vh] h-[6vh] p-2 absolute top-[1vh] right-[1vh] rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                    </button>
                </div>
                <div className='flex relative top-10 justify-between px-20'>
                    <div className={ styles.layout + '   layout h-[85vh] z-2 w-[50vw] shadow-2xl  p-3 rounded-lg'}>
                        {!data? <Loader color="green"/>:
                        <Mainpageleft openedNews={openedNews} setOpenedNews={setOpenedNews} news={data} family={family} friend={friend} colleague={colleague}
                        setFamily={setFamily} setFriend={setFriend} setColleague={setColleague}/>}
                        <br/>
                        <center>{openedNews.length>=3? <button type='button' className='btn btn-primary'><strong>TO NEXT SEGMENT</strong></button>: ''}</center>
                    </div>
                    <div  className='layout h-[85vh] z-2 w-[50vw] p-3'>
                        <center>
                            <Mainpageright openedNews={openedNews} setOpenedNews={setOpenedNews} persons={{family, friend, colleague}} news={data} loading={loading} user={user}/>
                        </center>
                    </div>
                </div>
            </div>
            <Drawer
                    opened ={show}
                    onClose = {handleClose}
                    title = 'Build by tensors'
                    size ="lg"
                    position="right"
                    >
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
        <div className='d-sm-block d-md-none'>
            <button onClick={handleShow} className=" bg-[#519fff] flex p-2 h-12 w-12  mx-12 mb-2  rounded-md relative top-2 justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>
            </button>
            
            <div className='bg-[#e3fff9]a h-[100vh]'>
                <div className='flex relative top-2 justify-content-center'>
                    <div className={ styles.layout + '   layout h-[95vh] z-2 w-[100vw] shadow-2xl rounded-lg'}>
                        {!data? <Loader color="green"/>:
                        <Mainpageleft openedNews={openedNews} setOpenedNews={setOpenedNews} news={data} family={family} friend={friend} colleague={colleague}
                        setFamily={setFamily} setFriend={setFriend} setColleague={setColleague}/>}
                        <br/>
                        <center>{openedNews.length>=7? <button type='button' className='btn btn-primary'><strong>TO NEXT SEGMENT</strong></button>: ''}</center>
                    </div>
                </div>
            </div>
            <div className='bg-[#e3fff9]a h-[100vh]'>
                    <div  className='layout h-[85vh] z-2 w-[100vw]'>
                        <center>
                            <Mainpageright openedNews={openedNews} setOpenedNews={setOpenedNews} persons={{'family':family, 'friend':friend, 'colleague':colleague}} news={data} loading={loading} user={user}/>
                        </center>
                    </div>
            </div>
        </div>
        

        </>
        
    );
}

export default Mainpage;