const hre = require("hardhat");

async function main() {
  //define contract through ethersjs help
  const TodoContract = await hre.ethers.getContractFactory("TodoContract");
  const deployedContract = await TodoContract.deploy();
  await deployedContract.deployed();
  console.log(
    "Todo List Successfully Deployed with Address: ",
    deployedContract.address
  );
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
