import { useState, useEffect } from "react";
import { Modal, Rating, Menu } from "@mantine/core";
import { ClassNames } from "@emotion/react";
import { IconShare, IconSend,IconAlertTriangle,IconBrandTelegram } from "@tabler/icons";
import axios from "axios";

const Modals = (props) => {
  useEffect(() => {

    setUser(JSON.parse(localStorage.getItem("user")));
    setStime(new Date())
    
  }, []);

  const [user, setUser] = useState("");
  const [value,setValue]=useState(0);
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
                      if (props.news.fake) {
                        handleShow2();
                      }else{
                        send_message()
                      }
                      handleClose1();
                    }}
                  >
                    {user[v]}
                    
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </div>
          </Menu>
          <button
            onClick={(e) => {
              if (user.rt!='000') {
                handleShow2();
                handleClose1();
              }
              else{
                send_message()
                handleClose1();
              }
            }}
          ></button>
            <button className="bg-green-300 border rounded-lg p-1 hover:bg-green-500" onClick={()=>{
                const t=new Date()
                console.log('First close')
                console.log((t.getTime()-stime.getTime())/1000)
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
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={()=>{
                  send_message()
                  handleClose2()
                  }}>
                YES
              </button>
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={()=>{
                  const t=new Date()
                  console.log('Second close')
                  console.log((t.getTime()-stime.getTime())/1000)
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
                  handleClose2()
                  }}>
                YES
              </button>
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={()=>{
                  handleShow3()
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
                  handleClose3()
              }}>
                YES
              </button>
              <button type="button" className="btn btn-success py-2 px-4 " onClick={()=>{
                  const t=new Date()
                  console.log('Third close')
                  console.log((t.getTime()-stime.getTime())/1000)
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
                    handleClose3()
                }}>
                  YES
                </button>
                <button type="button" className="btn btn-success py-2 px-4 " onClick={()=>{
                    const t=new Date()
                    console.log('Third close')
                    console.log((t.getTime()-stime.getTime())/1000)
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
        handleShow1()
        setStime(new Date())
      }} type='button' style={{'alignSelf':'bottom'}} className= "btn btn-secondary flex mx-2"><IconShare />{props.right? '':'Share to Whatsapp group:'}</button>
      </div>
    </div>
  );
};

export default Modals;
