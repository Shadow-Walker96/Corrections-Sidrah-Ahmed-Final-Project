The issue you experienced with installation of etherscan was this:

The version of hardhat you installed was close to the latest which is not compactable with
you installing etherscan separately

The reason been version 17 upward has a prebuild plugin called @nomicfoundation/hardhat-toolbox and not
more nomiclabs.

It has @nomicfoundation/hardhat-verify which will verify the source code of your contract

In a nutshell what caused the issue is incompactability of plugins.

I only made changes on the folliwing files ----> deploy.js and hardhat.config.js