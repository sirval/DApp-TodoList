import { BiCheckCircle } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
const Task = ({ taskText, onClick }) => {
  // console.log(onClick.handleComplete());
  return (
    <div className="flex items-center text-white">
      <div className=" bg-[#031956] text-[#b6c7db] flex w-[50%] rounded-[15px] mb-[10px] flex-1">
        <div className="flex items-center justify-between w-full p-[20px] text-xl">
          {taskText}
        </div>
      </div>

      <BiCheckCircle
        style={{ color: "green", fontWeight: "bolder", fontSize: "30px" }}
        className="text-2xl cursor-pointer ml-10"
        onClick={onClick.handleComplete}
      />
      <BsFillTrashFill
        className="text-2xl cursor-pointer ml-10"
        onClick={onClick.handleDelete}
      />
    </div>
  );
};

export default Task;
