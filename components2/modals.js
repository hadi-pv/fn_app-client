import { useState, useEffect } from "react";
import { Modal, Rating, Menu } from "@mantine/core";
import { ClassNames } from "@emotion/react";
import { IconShare, IconSend,IconAlertTriangle,IconBrandTelegram } from "@tabler/icons";
import axios from "axios";

const Modals = (props) => {
  useEffect(() => {

    setUser(JSON.parse(localStorage.getItem("user")));
    
  }, []);

  const [user, setUser] = useState("");
  const [value,setValue]=useState(0);
  const [accuracy,setAccuracy]=useState('')
  const [stime,setStime]=useState('');
  const [sendto,setSendto]=useState('')

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  const send_message=()=>{
    if(sendto=='family'){
      props.setFamily([...props.family,props.news.id])
    }
    if(sendto=='friend'){
      props.setFriend([...props.friend,props.news.id])
    }
    if(sendto=='colleague'){
      props.setColleague([...props.colleague,props.news.id])
    }
    const t=Math.floor((new Date().getTime()-stime.getTime())/1000)
    axios.post('/api/sendmsg',{
      fk_news_id:props.news.id,
      send_to:sendto,
      send_by:user.id,
      time_taken:t
    })
    .then((req)=>{
      console.log('message send succesfully')
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  /* 
    Task numbers:

    rt type:000
        task 00:send
        task 01:close
    rt type:111
        task 10:send
        task 11:close from modal 1
        task 13:close from modal 3
    rt type:222
        task 20:send
        task 21:close from modal 1
        task 22:close from modal 2
    rt type:333
        task 30:send
        task 31:close from modal 1
        task 33:close from modal 3

    task 40 : end of the experiment
*/
  
  const sendlog=(taskno)=>{
    console.log(taskno)
    const log={}
    const t=Math.floor((new Date().getTime()-stime.getTime())/1000)
    switch(taskno){
      case '00':
        log={news_id:props.news.id,user_id:user.id,task:'00',rt:'000',nt:user.nt,send_to:sendto,close_from:'',time_in_sec:t,add_info:''}
        break  
      case '01':
        log={news_id:props.news.id,user_id:user.id,task:'01',rt:'000',nt:user.nt,send_to:'',close_from:'1',time_in_sec:t,add_info:''}
        break  
      case '10':
        log={news_id:props.news.id,user_id:user.id,task:'10',rt:'111',nt:user.nt,send_to:sendto,close_from:'',time_in_sec:t,add_info:`rating is ${value}`}
        break   
      case '11':
        log={news_id:props.news.id,user_id:user.id,task:'11',rt:'111',nt:user.nt,send_to:'',close_from:'1',time_in_sec:t,add_info:''}
        break 
      case '13':
        log={news_id:props.news.id,user_id:user.id,task:'13',rt:'111',nt:user.nt,send_to:sendto,close_from:'3',time_in_sec:t,add_info:`rating is ${value}`}
        break 
      case '20':
        log={news_id:props.news.id,user_id:user.id,task:'20',rt:'222',nt:user.nt,send_to:sendto,close_from:'',time_in_sec:t,add_info:''}
        break  
      case '21':
        log={news_id:props.news.id,user_id:user.id,task:'21',rt:'222',nt:user.nt,send_to:'',close_from:'1',time_in_sec:t,add_info:''}
        break  
      case '22':
        log={news_id:props.news.id,user_id:user.id,task:'22',rt:'222',nt:user.nt,send_to:sendto,close_from:'2',time_in_sec:t,add_info:''}
        break   
      case '30':
        log={news_id:props.news.id,user_id:user.id,task:'30',rt:'333',nt:user.nt,send_to:sendto,close_from:'',time_in_sec:t,add_info:`User is sure of accuracy : ${accuracy}`}
        break 
      case '31':
        log={news_id:props.news.id,user_id:user.id,task:'31',rt:'333',nt:user.nt,send_to:'',close_from:'1',time_in_sec:t,add_info:''}
        break 
      case '33':
        log={news_id:props.news.id,user_id:user.id,task:'33',rt:'333',nt:user.nt,send_to:sendto,close_from:'3',time_in_sec:t,add_info:`User is sure of accuracy : ${accuracy}`}
        break 
        
    }
    
    axios.post('/api/sendlog',log)
    .then((req)=>{
      console.log('log send successfully')
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  const Model1 = () => {
    return (
      <Modal
        opened={show1}
        transition="fade"
        centered = "true"
        onClose={()=>alert('Please complete')} 
        root={ClassNames}
      >
        <div className="flex felx-col justify-between w-full">
          <img
          className="w-full h-80"
            src={props.news.image}
            alt=""
          />
          {/* <p className="m-1">{props.news.description}</p> */}
        </div>
        <div className="flex flex-col items-end">
          <Menu>
            <div className="relative">
              <br/>
              <Menu.Target>
                <center><button style={{'backgroundColor':'lightblue'}} className="flex border p-3 bg-green-300 p-2 rounded-md hover:bg-green-400">Share <IconSend /></button></center>
              </Menu.Target>
              <br/>
              <Menu.Dropdown className="absolute top-8">
                {['family','friend','colleague'].map((v,id) =>(
                  <Menu.Item key={id}
                    onClick={(e) => {
                      setSendto(v)
                      if (user.rt!='000') {
                        handleShow2();
                        handleClose1();
                      }
                      else{
                        if(v=='family'){props.setFamily([...props.family,props.news.id])}
                        if(v=='friend'){props.setFriend([...props.friend,props.news.id])}
                        if(v=='colleague'){props.setColleague([...props.colleague,props.news.id])}
                        const t=Math.floor((new Date().getTime()-stime.getTime())/1000)
                        axios.post('/api/sendmsg',{fk_news_id:props.news.id,send_to:v,send_by:user.id,time_taken:t})
                        .then((req)=>{
                          console.log('message send succesfully')
                        })
                        .catch((err)=>{
                          console.log(err)
                        })
                        axios.post('/api/sendlog',{news_id:props.news.id,user_id:user.id,task:'00',rt:'000',nt:user.nt,send_to:v,close_from:'',time_in_sec:t,add_info:''})
                        .then((req)=>{
                          console.log('log send successfully')
                        })
                        .catch((err)=>{
                          console.log(err)
                        })
                        handleClose1();
                      }
                    }}
                  >
                    {user[v]}
                    
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </div>
          </Menu>
            <button className="bg-green-300 border rounded-lg p-1 hover:bg-green-500" onClick={()=>{
                if(user.rt=='000'){
                  sendlog('01')
                }else if(user.rt=='111'){
                  sendlog('11')
                }else if(user.rt=='222'){
                  sendlog('21')
                }else if(user.rt=='333'){
                  sendlog('31')
                }
                handleClose1()
            }}>
              Close
            </button>
        </div>
      </Modal>
    );
  };

  const Model2 = () => {
    if(user.rt=='111'){
      return (
        <Modal opened={show2} onClose={()=>alert('Please complete')} centered ="true">
          <div>
            <center><IconAlertTriangle width='64' height='64'/></center>
            <h5>Before you share can you please rate this information ? </h5>
          </div>
          <br/>
          <div className="text-center">
          <Rating value={value} onChange={setValue} size="xl" className="mx-auto" />
          </div>
          <br/>
          <div className="flex flex-col items-end">
            <span className="flex gap-3">
              {value==0? 
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" disabled>
              Please rate this
            </button>
              :
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={()=>{
                  handleShow3()
                  handleClose2()
                  }}>
                NEXT
              </button>
              }
            </span>
          </div>
        </Modal>
      );
    }else if(user.rt=='222'){
      return (
        <Modal opened={show2} onClose={()=>alert('Please complete')} centered ="true">
          <div>
            <center><IconAlertTriangle width='64' height='64'/></center>
            <h5>Your personal information will be shared along with this message. Do you want to continue?</h5>
          </div>
          <br/>
          <div className="flex flex-col items-center">
            <span className="flex gap-3">
              <button type="button" className="btn btn-danger py-2 px-4 " onClick={()=>{
                  send_message()
                  sendlog('20')
                  handleClose2()
                  }}>
                YES
              </button>
              <button type="button" className="btn btn-success py-2 px-4 " onClick={()=>{
                  sendlog('22')
                  handleClose2()
              }}>
                NO
              </button>
            </span>
          </div>
        </Modal>
      );
    }else if(user.rt=='333'){
      return (
        <Modal opened={show2} onClose={()=>alert('Please complete')} centered ="true">
          <div>
            <center><IconAlertTriangle width='64' height='64'/></center>
            <h5>Are you sure about the accuracy of the information being shared?</h5>
          </div>
          <br/>
          <div className="flex flex-col items-center">
            <span className="flex gap-3">
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={()=>{
                  handleShow3()
                  setAccuracy('true')
                  handleClose2()
                  }}>
                YES
              </button>
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={()=>{
                  handleShow3()
                  setAccuracy('false')
                  handleClose2()
              }}>
                NO
              </button>
            </span>
          </div>
        </Modal>
      );
    }
    
  };
  const Model3 = () => {
    if(user.rt=='111'){
     return (
      <Modal opened={show3} onClose={()=>alert('Please complete')} centered ="true">
        <h5>DO YOU STILL WISH TO CONTINUE ? </h5>
        <br/>
        <div className="flex flex-col items-center">
            <span className="flex gap-3">
              <button type="button" className="btn btn-danger py-2 px-4 "   onClick={()=>{
                  send_message()
                  sendlog('10')
                  handleClose3()
              }}>
                YES
              </button>
              <button type="button" className="btn btn-success py-2 px-4 " onClick={()=>{
                  sendlog('13')
                  handleClose3()
              }}>
                <strong>NO</strong>
              </button>
            </span>
        </div>
      </Modal>
    ); 
    }else if(user.rt=='333'){
      return (
        <Modal opened={show3} onClose={handleClose3} centered ="true">
          <h5>DO YOU STILL WISH TO CONTINUE ? </h5>
          <br/>
          <div className="flex flex-col items-center">
              <span className="flex gap-3">
                <button type="button" className="btn btn-danger py-2 px-4 "   onClick={()=>{
                    send_message()
                    sendlog('30')
                    handleClose3()
                }}>
                  YES
                </button>
                <button type="button" className="btn btn-success py-2 px-4 " onClick={()=>{
                    sendlog('33')
                    handleClose3()
                }}>
                  <strong>NO</strong>
                </button>
              </span>
          </div>
        </Modal>
      ); 
    }
    
  };
  return (
    <div >
      <Model1 />
      <Model2 />
      <Model3 />
      <br/>
      <div className="flex justify-end">
      <button onClick={()=>{
        setStime(new Date())
        props.setOpenedNews([...props.openedNews,props.news.id])
        handleShow1()
      }} type='button' style={{'alignSelf':'bottom'}} className= "btn btn-secondary flex mx-2"><IconShare /><span className="d-md-none">{props.right? '':'Open'}</span><span className="d-none d-md-flex">{props.right? '':'Open'}</span></button>
      </div>
    </div>
  );
};

export default Modals;
