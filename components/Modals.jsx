import { useState, useEffect } from "react";
import { Modal, Rating, Menu } from "@mantine/core";
import { ClassNames } from "@emotion/react";
import { IconSend, IconAlertTriangle } from "@tabler/icons";
import people from "../data/people.json";
const Modals = (props) => {
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [user]);

  const [user, setUser] = useState("");
  const [person, setPerson] = useState("");
  const [fake, setFake] = useState(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const [value, setValue] = useState(0);
  const Model1 = () => {
    return (
      <Modal
        opened={show1}
        title={props.news.title}
        onClose={handleClose1}
        root={ClassNames}
      >
        <div className="flex felx-col justify-between w-full">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDA0AJjyyfl9SC28cYh0H_OuChB1pUM53glA&usqp=CAU"
            alt=""
          />
          <p className="m-1">{props.news.description}</p>
        </div>
        <div className="flex flex-col mx-1 items-center">
          <p className="m-0">Rate This news</p>
          <Rating value={value} onChange={setValue} />
        </div>
        <div className="flex flex-col items-end">
          <Menu>
            <div className="relative">
              <Menu.Target>
                <IconSend fill="green" />
              </Menu.Target>
              <Menu.Dropdown className="absolute top-8">
                {people.family.map((p) => (
                  <Menu.Item
                    onClick={(e) => {
                      if (props.news.fake) {
                        handleShow2();
                      }
                      if (props.news.contact) {
                        handleShow3();
                      }
                      handleClose1();
                    }}
                  >
                    {p}
                  </Menu.Item>
                ))}
                {people.friends.map((p) => (
                  <Menu.Item
                    onClick={(e) => {
                      if (props.news.fake) {
                        handleShow2();
                      }
                      if (props.news.contact) {
                        handleShow3();
                      }
                      handleClose1();
                    }}
                  >
                    {p}
                  </Menu.Item>
                ))}
                {people.Collegues.map((p) => (
                  <Menu.Item
                    onClick={(e) => {
                      if (props.news.fake) {
                        handleShow2();
                      }
                      if (props.news.contact) {
                        handleShow3();
                      }
                      handleClose1();
                    }}
                  >
                    {p}
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
      <Modal title="Please be advised!!" opened={show2} onClose={handleClose2}>
        <div>
          <h4>THIS NEWS IS FAKE DO YOU STILL WISH TO CONTINUE</h4>
          <IconAlertTriangle />
        </div>
        <div className="flex flex-col items-end">
          <span className="flex gap-3">
            <button className="bg-red-300  rounded-lg p-1 hover:bg-red-500">
              YES
            </button>
            <button className="bg-green-300 rounded-lg p-1 hover:bg-green-500">
              NO
            </button>
          </span>
        </div>
        <Rating value={value} onChange={setValue} />
      </Modal>
    );
  };
  const Model3 = () => {
    return (
      <Modal title="Please be advised!!" opened={show3} onClose={handleClose3}>
        <p className="">
          YOUR CONTACT INFO WOULD BE SHARED DO YOU STILL WISH TO CONINTUE??
        </p>
        <div className="flex flex-col items-end">
          <span className="flex gap-3">
            <button className="bg-red-300  rounded-lg p-1 hover:bg-red-500">
              YES
            </button>
            <button className="bg-green-300 rounded-lg p-1 hover:bg-green-500">
              NO
            </button>
          </span>
        </div>
        <Rating value={value} onChange={setValue} />
      </Modal>
    );
  };
  return (
    <>
      <button onClick={handleShow1}>click</button>
      <Model1 />
      <Model2 />
      <Model3 />
    </>
  );
};

export default Modals;
