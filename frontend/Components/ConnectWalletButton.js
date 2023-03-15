const ConnectWalletButton = ({ connectWallet }) => (
  <button
    style={{
      position: "absolute",
      top: "25%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "20px",
    }}
    className="h-[5rem] text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out"
    // Add an onClick functionality
    onClick={connectWallet}
  >
    Connect Wallet
  </button>
);

export default ConnectWalletButton;
