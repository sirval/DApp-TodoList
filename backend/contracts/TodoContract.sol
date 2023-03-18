//SPDX-Lincense-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract TodoContract {
    event AddTask(address recipient, uint taskId);
    event DeleteTask(uint taskId, bool isDeleted);
    event CompletedTask(uint taskId, bool isCompleted);

    //define the task structure
    struct Task {
        uint id;
        string taskText;
        bool isDeleted;
        bool isCompleted;
    }

    Task[] private tasks;
    mapping(uint256 => address) taskToOwner;

    //TODO: create a new task
    function addTask(
        string memory taskText,
        bool isDeleted,
        bool isCompleted
    ) external {
        uint taskId = tasks.length;
        tasks.push(Task(taskId, taskText, isDeleted, isCompleted));
        taskToOwner[taskId] = msg.sender;
        emit AddTask(msg.sender, taskId);
    }

    //TODO: get users undeleted task
    function getUserTask() external view returns (Task[] memory) {
        Task[] memory temp = new Task[](tasks.length);
        uint counter = 0;
        //loop through each task and push to a temporary array
        for (uint i = 0; i < tasks.length; i++) {
            if (
                (taskToOwner[i] == msg.sender && tasks[i].isDeleted == false) &&
                (taskToOwner[i] == msg.sender && tasks[i].isCompleted == false)
            ) {
                temp[counter] = tasks[i];
                counter++;
            }
        }
        Task[] memory result = new Task[](counter);
        for (uint i = 0; i < counter; i++) {
            result[i] = temp[i];
        }
        return result;
    }

    function completeTask(uint taskId, bool isCompleted) external {
        if (taskToOwner[taskId] == msg.sender) {
            tasks[taskId].isCompleted = isCompleted;
            emit CompletedTask(taskId, isCompleted);
        }
    }

    function deleteTask(uint taskId, bool isDeleted) external {
        if (taskToOwner[taskId] == msg.sender) {
            tasks[taskId].isDeleted = isDeleted;
            emit DeleteTask(taskId, isDeleted);
        }
    }
}
