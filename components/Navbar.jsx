import { IconSearch, IconDotsVertical } from "@tabler/icons";
const Navbar = () => {
  return (
    <div className=" h-full">
      <div className="flex flex-col relative h-[100px] w-[328px]  bg-[#00a884] justify-between text-white p-2 pb-0">
        <div className="flex justify-between">
          <h4>Whatsapp</h4>
          <div className="flex gap-2">
            <IconSearch />
            <IconDotsVertical />
          </div>
        </div>
        <div className="flex justify-between">
          <button className="border-b-[3px] border-white w-full m-2">
            FRIEND
          </button>
        </div>
      </div>
      <div className="bg-slate-50 h-[420px]"></div>
    </div>
  );
};
export default Navbar;
