import { useState, useEffect } from "react";
import { Modal, Rating, Menu } from "@mantine/core";
import { ClassNames } from "@emotion/react";
import { IconSend, IconAlertTriangle,IconBrandTelegram } from "@tabler/icons";
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
        onClose={handleClose1}
        root={ClassNames}
      >
        <h3 className="text-center">{props.news.title}</h3>
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
              <Menu.Target>
                <button className="flex bg-green-300 p-2 rounded-md hover:bg-green-400">Share<IconSend fill="white" /></button>
              </Menu.Target>
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
              if (props.news.fake) {
                handleShow2();
                handleClose1();
              }
              else{
                send_message()
                handleClose1();
              }
            }}
          ></button>
            <button className="bg-green-300 rounded-lg p-1 hover:bg-green-500" onClick={()=>{
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
    return (
      <Modal title="Please be advised!!" opened={show2} onClose={handleClose2} centered ="true">
        <div>
          <h5>THIS NEWS IS FAKE DO YOU STILL WISH TO CONTINUE</h5>
          <IconAlertTriangle />
        </div>
        <div className="text-center">
          <p>How do you rate this alert?</p>
        <Rating value={value} onChange={setValue} size="xl" className="mx-auto" />
        </div>
        <div className="flex flex-col items-end">
          <span className="flex gap-3">
            <button className="bg-red-300  rounded-lg p-1 hover:bg-red-500" onClick={()=>{
                handleShow3()
                handleClose2()
                }}>
              YES
            </button>
            <button className="bg-green-300 rounded-lg p-1 hover:bg-green-500" onClick={()=>{
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
  };
  const Model3 = () => {
    return (
      <Modal title="Please be advised!!" opened={show3} onClose={handleClose3} centered ="true">
        <h5>YOUR CONTACT INFO WOULD BE SHARED DO YOU STILL WISH TO CONINTUE??</h5>
        <div className="flex flex-col items-end">
          <span className="flex gap-3">
            <button className="bg-red-300  rounded-lg p-1 hover:bg-red-500" onClick={()=>{
                send_message()
                handleClose3()
            }}>
              YES
            </button>
            <button className="bg-green-300 rounded-lg p-1 hover:bg-green-500" onClick={()=>{
                const t=new Date()
                console.log('Third close')
                console.log((t.getTime()-stime.getTime())/1000)
                handleClose3()
            }}>
              NO
            </button>
          </span>
        </div>
        
      </Modal>
    );
  };
  return (
    <>
      <div className="flex justify-end">
      <button onClick={()=>{
        handleShow1()
        setStime(new Date())
      }} className= "mx-2">Share : <IconBrandTelegram/></button>
      </div>
      <Model1 />
      <Model2 />
      <Model3 />
    </>
  );
};

export default Modals;
