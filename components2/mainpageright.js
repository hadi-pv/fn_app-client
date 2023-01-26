import { useEffect, useState } from "react";
import styles from '../styles/mobile.module.css'
import { IconSearch,IconDotsVertical } from "@tabler/icons";
import Modals from "./modals";
import { Card } from "react-bootstrap";
import { Loader } from "@mantine/core";

const Mainpageright = ({persons,news,loading,user}) => {
    const [selectedTab, setSelectedTab] = useState('');
   
    return(
        <div className={styles.smartphone}>
            <div className='h-full'>
                <div className = 'flex flex-col relative h-[80px] w-[100%]  bg-[#00a884] justify-between text-white p-2 pb-0'>
                    <div className='flex justify-between'>
                        <h4>Whatsapp</h4> 
                        <div className='flex gap-2'>
                            <IconSearch/> 
                            <IconDotsVertical/> 
                        </div>
                    </div>
                    <div className='person_class h-[80px] flex justify-between'>
                    {
                        ['family','friend','colleague'].map((pers,id)=>{
                            return(
                                <button key={id} id={pers} className='w-full m-2' onClick={()=>{

                                    setSelectedTab(pers)
                                    console.log(persons[pers])
                                    document.getElementById(pers).className="border-width-3px border-bottom rounded-bottom border-white w-full m-2"
                                    for(const item of ['family','friend','colleague']){
                                        if(item!=pers){
                                            document.getElementById(item).className="w-full m-2"
                                        }
                                    }

                                }}>{user[pers]}</button> 
                            );
                        })
                    }  
                </div> 
                </div>

                {/*<div className={ styles.content + ' flex flex-col justify-end items-end'}>
                    dasd
                </div>*/}

                {!loading? 
                    <div className={`${styles.content} flex flex-col justify-center items-center`}>
                        <center><Loader color="green"/></center>
                    </div>:
                    <div className={`${styles.content} flex flex-col justify-end items-end`} style={{'overflowY':'scroll'}}>
                    {
                        !selectedTab? <h1 style={{'marginBottom':'300px'}}><center>Select a Person</center></h1>:
                        persons[selectedTab].map((obj)=>{
                            const objnews= news.filter((k)=>k.id==obj)[0]
                            return(
                                <div key={objnews.id} className="d-flex flex-row-reverse p-2 col-example text-left">
                                    <Card style={{ width: '15rem' }}>
                                        <Card.Body>
                                            <Card.Title>{objnews.title}</Card.Title>
                                            <Card.Text>
                                                <img src={objnews.image} alt="news_image" className="img-fluid" style={{'width':'100%'}}/>
                                            </Card.Text>
                                            <Modals news={objnews} right={true}/>
                                        </Card.Body>
                                    </Card>
                                </div>
                            );
                            
                        })
                    }
                </div> 
                }
            </div> 
            </div>
    );
}

export default Mainpageright;