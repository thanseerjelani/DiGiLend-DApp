require('@nomiclabs/hardhat-waffle');
require('dotenv').config({ path: '.env' });

const ALCHEMY_API_KEY_URL = "https://eth-sepolia.g.alchemy.com/v2/gaoQU81gBKdD0zdNgRAvtpU-HNkPEl1-"

const SEPOLIA_PRIVATE_KEY = "0e3f3511e326a4f0c68c976728a57a7ba4f6e3e4523e06711a6bf7fbb1202ef1";
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// eslint-disable-next-line no-undef
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.4',
  networks: {
    hardhat: {
      chainId: 11155111
    },
    sepolia: {
      url: ALCHEMY_API_KEY_URL,
      accounts: [`0x${SEPOLIA_PRIVATE_KEY}`],
      gasPrice: 8000000000,
      allowUnlimitedContractSize: true
    }
  }
};
