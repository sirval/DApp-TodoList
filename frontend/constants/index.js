export const TodoContractAddress = "0x2f09dE217f82977067287248e87e74b9DcF6E02A";

export const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "taskId",
        type: "uint256",
      },
    ],
    name: "AddTask",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "taskId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isDeleted",
        type: "bool",
      },
    ],
    name: "DeleteTask",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "taskText",
        type: "string",
      },
      {
        internalType: "bool",
        name: "isDeleted",
        type: "bool",
      },
    ],
    name: "addTask",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "taskId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isDeleted",
        type: "bool",
      },
    ],
    name: "deleteTask",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getUserTask",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "taskText",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isDeleted",
            type: "bool",
          },
        ],
        internalType: "struct TodoContract.Task[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
