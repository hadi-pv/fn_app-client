import React from "react";
import { Menu } from "@mantine/core";
const ModalOpen = () => {
  return (
    <div>
      <img
        className=" h-auto"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDA0AJjyyfl9SC28cYh0H_OuChB1pUM53glA&usqp=CAU"
        alt=""
      />
      <h2>Natural calamity</h2>
      <p>
        "Many people lost their lives in this calamity. Many people lost their
        lives in this calamity.Many people lost their lives in this calamity."
      </p>
      <Menu>
        <Menu.Target>
          <img
            className="h-10 w-10"
            src="https://www.mtctutorials.com/wp-content/uploads/2019/04/Share-button-png-by-mtc-tutorials.png"
            alt=""
          />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>Friends</Menu.Item>
          <Menu.Item>Family</Menu.Item>
          <Menu.Item>Colleagues</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default ModalOpen;
