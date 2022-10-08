require('@nomicfoundation/hardhat-toolbox');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.17',
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    // goerli: {
    //   url: `https://goerli.infura.io/v3/${process.env.INFURA_KEY}`,
    //   accounts: [`0x${process.env.ACCOUNT_KEY}`],
    // },
  },
};
