import Navbar from "./Navbar";
import { IoMdAddCircle } from "react-icons/io";
import Greeting from "./Greeting";
import Task from "./Task";

const TodoList = (prop) => (
  <div className="w-[70%] bg-[#354ea3] py-4 px-9 rounded-[30px] overflow-y-scroll">
    <Navbar />
    <Greeting />
    <div className="py-3 text-[#7d99e9]">TODAY&apos;S TASKS</div>
    <form className="flex items-center justify-center">
      <input
        value={prop.input}
        onChange={(e) => {
          prop.setInput(e.target.value);
        }}
        className="rounded-[10px] w-full p-[10px] border-none outline-none bg-[#031956] text-white mb-[10px]"
        placeholder="What is your main focus today?"
        // take input from the form here
      />
      <IoMdAddCircle
        // Add an onClick method
        onClick={prop.addTask}
        className="text-[#ea0aff] text-[50px] cursor-pointer ml-[20px] mb-[10px]"
      />
    </form>
    <ul>
      {prop.allTasks.length > 0 &&
        prop.allTasks.map((todos) => {
          // console.log(todos.id);
          return (
            <Task
              key={todos.id}
              taskText={todos.taskText}
              onClick={prop.deleteTask(todos.id)}
            />
          );
        })}
    </ul>
  </div>
);

export default TodoList;
