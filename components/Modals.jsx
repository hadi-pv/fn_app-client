import { useState, useEffect } from "react";
import { Modal, Rating, Menu } from "@mantine/core";
import { ClassNames } from "@emotion/react";
import { IconSend, IconAlertTriangle,IconBrandTelegram } from "@tabler/icons";

const Modals = (props) => {
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setPeople(JSON.parse(localStorage.getItem("people")));
    // Object.values(people).map(p => localStorage.setItem(p))
    
  }, [user]);

  const [user, setUser] = useState("");
  const [people,setPeople] = useState("")
  const [sentTo,setSentTo] = useState("")
  const [news,setNews] = useState(undefined)

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => {
    setShow2(false)
    setSentTo("")};
  const handleShow2 = () => setShow2(true);

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => {
    setShow3(false)
    setSentTo("")
  };
  const handleShow3 = () => setShow3(true);
  const [value, setValue] = useState(0);

  const sent = () =>{
    if (!localStorage.getItem(sentTo)){
      localStorage.setItem(sentTo,news)
    }else{
      const array =  (localStorage.getItem(sentTo))
      
      localStorage.setItem(sentTo,JSON.stringify(array))
    }
      
      // array.push(news)
      // 
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
        <div className="flex flex-col mx-1 items-center">
          <p className="m-0">How do you rate this news?</p>
          <Rating value={value} onChange={setValue}  size="xl"/>
        </div>
        <div className="flex flex-col items-end">
          <Menu>
            <div className="relative">
              <Menu.Target>
                <button className="flex bg-green-300 p-2 rounded-md hover:bg-green-400">Share<IconSend fill="white" /></button>
              </Menu.Target>
              <Menu.Dropdown className="absolute top-8">
                {Object.keys(people).map((v) =>(
                  <Menu.Item
                    onClick={(e) => {
                      if (props.news.fake) {
                        handleShow2();
                        setSentTo(people[v])
                        setNews(props.news)
                      }
                      if (props.news.contact) {
                        handleShow3();
                      }
                      handleClose1();
                    }}
                  >
                    {people[v]}
                    
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </div>
          </Menu>
          {/* <button
            onClick={(e) => {
              if (props.news.fake) {
                handleShow2();
              }
              if (props.news.contact) {
                handleShow3();
              }
              handleClose1();
            }}
          ></button> */}
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
            <button className="bg-red-300  rounded-lg p-1 hover:bg-red-500" onClick={sent} >
              YES
            </button>
            <button className="bg-green-300 rounded-lg p-1 hover:bg-green-500" onClick={handleClose2}>
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
        <div className="text-center">
          <p>How do you rate this alert?</p>
        <Rating value={value} onChange={setValue} size="xl" className="mx-auto" />
        </div>
        <div className="flex flex-col items-end">
          <span className="flex gap-3">
            <button className="bg-red-300  rounded-lg p-1 hover:bg-red-500">
              YES
            </button>
            <button className="bg-green-300 rounded-lg p-1 hover:bg-green-500" onClick={handleClose3}>
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
      <button onClick={handleShow1} className= "mx-2"><IconBrandTelegram/></button>
      </div>
      <Model1 />
      <Model2 />
      <Model3 />
    </>
  );
};

export default Modals;
