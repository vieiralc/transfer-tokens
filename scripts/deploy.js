const hre = require('hardhat');

async function main() {
  const Greeter = await hre.ethers.getContractFactory('Greeter');
  const greeter = await Greeter.deploy('Hello, Hardhat!');
  await greeter.deployed();
  console.log('Greeter deployed to:', greeter.address);

  const Token = await hre.ethers.getContractFactory('Token');
  const token = await Token.deploy();
  await token.deployed();
  console.log('Token deployed to:', token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
