import { useEffect, useState } from "react";
import styles from '../styles/mobile.module.css'
import Modaldiv from "./modal";
import Navbar from './Navbar'
import axios from "axios";
import {IconSearch,IconDotsVertical} from '@tabler/icons'
import Pagination from 'react-bootstrap/Pagination';
import { Row,Col,Card } from "react-bootstrap";
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
            
        <div className={`${styles.layout} d-flex flex-column-reverse flex-row-reverse bg-slate-50 h-[580px] news_display`} style={{'overflowY':'scroll'}}>
            {flag? <center><Loader color="green"/></center>:
                <>
                {
                    !person? <h1 style={{'marginBottom':'300px'}}><center>Select a Person</center></h1>:
                    persons[person].map((obj)=>{
                        return(
                            <div key={obj.news_id} className="d-flex flex-row-reverse p-2 col-example text-left">
                                <Card style={{ width: '20rem' }}>
                                    <Card.Body>
                                        <Card.Title>{obj.headline}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{obj.info}</Card.Subtitle>
                                        <Card.Text>
                                        {obj.description}
                                        </Card.Text>
                                        <Modaldiv news={obj}/>
                                    </Card.Body>
                                </Card>
                            </div>
                        );
                        
                    })
                }
               </> 
            }
        </div>    
       </div>
        </div>
    );
}

export default Mainpageright;



// import { Container,Card ,Row,Col,Form, Modal} from "react-bootstrap";
// import { useEffect, useState } from "react";
// import styles from '../styles/mainpage.module.css'
// import Modaldiv from "./modal";
// import axios from "axios";

// const Mainpageright=(props)=>{

//     const [person,setPerson]=useState('');
//     const [flag,setFlag]=useState(true)
//     const [persons,setPersons] = useState({
//         'family':null,
//         'friend':null,
//         'colleague':null
//     })

//     useEffect(()=>{
//         const user=JSON.parse(localStorage.getItem('user'))
//         axios.post('/api/getmsg',{
//             send_by:user.id
//         })
//         .then((resp)=>{
//             if(resp.data){
//                 setPersons(prevState=>({
//                     ...prevState,
//                     'family':resp.data.message.filter((data)=>data.send_to=='family'),
//                     'friend':resp.data.message.filter((data)=>data.send_to=='friend'),
//                     'colleague':resp.data.message.filter((data)=>data.send_to=='colleague')
//                 }))    
//                 setFlag(false)
//             }
            
//         })
//         .catch((err)=>{
//             console.log(err)
//         })
//     },[])
   
//     return(
//         <>
//             <Container className={styles.rightcontainer}>
//                 <br/>
//                 <Row style={{'padding':'1vh'}}>
//                     <Form.Select aria-label="Default select example" onChange={(e)=>setPerson(e.target.value)}>
//                         <option value=''>Select person</option>
//                         <option value='family'>Family</option>
//                         <option value='friend'>Friends</option>
//                         <option value='colleague'>Colleagues</option>
//                     </Form.Select>
//                 </Row>
//                 {flag? '............':
//                 <Row className="d-flex flex-column-reverse flex-row-reverse" style={{'height':'90%','backgroundColor':'lightgrey','borderRadius':'10px','overflowY':'scroll'}}>
//                 {
//                     !person? <h1 style={{'marginBottom':'50%','color':'white'}}><center>Select a Person</center></h1>:
//                     persons[person].map((obj)=>{
//                         return(
//                             <div key={obj.news_id} className="d-flex flex-row-reverse p-2 col-example text-left">
//                                 <Card style={{ width: '25rem' }}>
//                                     <Card.Body>
//                                         <Card.Title>{obj.headline}</Card.Title>
//                                         <Card.Subtitle className="mb-2 text-muted">{obj.info}</Card.Subtitle>
//                                         <Card.Text>
//                                         {obj.description}
//                                         </Card.Text>
//                                         <Modaldiv news={obj}/>
//                                     </Card.Body>
//                                 </Card>
//                             </div>
//                         );
                        
//                     })
//                 }
//             </Row>
//         }
//             </Container>
//         </>
//     );
// }

// export default Mainpageright;