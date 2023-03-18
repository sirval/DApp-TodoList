import { useRef, useState, useEffect } from "react";
import WrongNetworkMessage from "@/Components/WrongNetworkMessage";
import ConnectWalletButton from "@/Components/ConnectWalletButton";
import TodoList from "@/Components/TodoList";
import { TodoContractAddress, abi } from "@/constants";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import Image from "next/image";
import swal from "sweetalert";
// import { ReactComponent as Loader } from "./loader.svg";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [allTasks, setAllTasks] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const web3ModalRef = useRef();

  //get the provider or signer
  const getProviderOrSigner = async (needSigner = false) => {
    try {
      // window.ethereum.enable();
      const provider = await web3ModalRef.current.connect();
      const web3Provider = new providers.Web3Provider(provider);

      //check if signers network is goerli
      const { chainId } = await web3Provider.getNetwork();
      if (chainId !== 5) {
        alert("Switch to goerli testnet");
        setCorrectNetwork(false);
        throw new Error("Change network to goerli");
      } else {
        setCorrectNetwork(true);
      }

      if (needSigner) {
        const signer = web3Provider.getSigner();
        return signer;
      }
      return web3Provider;
    } catch (error) {
      console.error(error);
    }
  };

  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try {
      setIsLoading(true);
      const signer = await getProviderOrSigner(true);
      let address = signer.getAddress();
      // console.log("User logged in with address", address);
      setWalletConnected(true);
      setCurrentAccount(address);
      setIsLoggedIn(true);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
    }
    connectWallet();
    setInterval(async function () {
      await getAllTasks();
    }, 10 * 1000);
  }, [walletConnected]);

  // Just gets all the tasks from the contract
  const getAllTasks = async () => {
    try {
      //get signer
      const signer = await getProviderOrSigner(true);
      const TodoContract = new Contract(TodoContractAddress, abi, signer);
      setIsLoading(true);
      const _allTasks = await TodoContract.getUserTask();
      setAllTasks(_allTasks);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Add tasks from front-end onto the blockchain
  const addTask = async (e) => {
    e.preventDefault();
    if (input === "") {
      swal({
        icon: "warning",
        title: "Warning",
        text: "Todo is Required",
      });

      return;
    }
    const payload = {
      taskText: input,
      isDeleted: false,
      isCompleted: false,
    };

    try {
      //get signer
      const signer = await getProviderOrSigner(true);
      const TodoContract = new Contract(TodoContractAddress, abi, signer);
      setIsLoading(true);
      TodoContract.addTask(
        payload.taskText,
        payload.isDeleted,
        payload.isCompleted
      )
        .then((response) => {
          setTodos([...todos, payload]);
          setInput("");
          setIsLoading(false);

          swal({
            icon: "success",
            title: "Success",
            text: "Task successfully added. Please wait blockchain response",
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  //mark a task as completed
  const completeTask = (key) => async () => {
    try {
      setIsLoading(true);
      const signer = await getProviderOrSigner(true);
      const TodoContract = new Contract(TodoContractAddress, abi, signer);
      const completeTackTx = await TodoContract.completeTask(key, true);
      setIsLoading(false);
      swal({
        icon: "success",
        title: "Success",
        text: "Task Successfully Completed. Please wait for bloxkchain response",
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Remove tasks from front-end by filtering it out on our "back-end" / blockchain smart contract
  const deleteTask = (key) => async () => {
    try {
      setIsLoading(true);
      const signer = await getProviderOrSigner(true);
      const TodoContract = new Contract(TodoContractAddress, abi, signer);
      const deleteItemTx = await TodoContract.deleteTask(key, true);
      setIsLoading(false);
      swal({
        icon: "success",
        title: "Success",
        text: "Task successfully deleted. Please wait for bloxkchain respons",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderTodoList = () => {
    if (isLoading) {
      return (
        <>
          <div>
            <Image
              style={{
                width: "100px",
                height: "100px",
                margin: "20px",
              }}
              src="/loader.svg"
              alt="Loader"
              width={100}
              height={100}
              priority
            />
            <p style={{ textAlign: "center" }}>Please wait...</p>
          </div>
        </>
      );
    }
    return (
      <TodoList
        setInput={setInput}
        input={input}
        addTask={addTask}
        allTasks={allTasks}
        deleteTask={deleteTask}
        completeTask={completeTask}
      />
    );
  };

  return (
    <div className="bg-[#97b5fe] h-screen w-screen flex justify-center py-6">
      {!isLoggedIn ? (
        <>
          <div>
            <div style={{ textAlign: "center" }}>
              <h1 style={{ fontSize: "50px", fontWeight: "bolder" }}>
                Welcome to DApp Todo List
              </h1>
              <br />

              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#930202",
                }}
              >
                You're currently logged out. Click the Connect Wallet Button to
                connect your wallet
              </p>
              <br />
              <br />
            </div>
            <div>
              <ConnectWalletButton connectWallet={connectWallet} />
            </div>
          </div>
        </>
      ) : correctNetwork ? (
        <>{renderTodoList()}</>
      ) : (
        <WrongNetworkMessage />
      )}
    </div>
  );
}
