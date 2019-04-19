import { Injectable } from '@nestjs/common';
import Web3 from 'web3';

import contract = require('truffle-contract');
import * as contractJSON from '../../truffle/build/contracts/Information.json';

const web3 = new Web3('ws://localhost:8545');

const InformationContract = contract(contractJSON);
InformationContract.setProvider(web3.currentProvider);

@Injectable()
export class Web3Service {
	async getInfo(username: string) {
		const instance = await InformationContract.deployed();
		return await instance.getInfo(username);
	}

	async setInfo(username: string, info: string) {
		const instance = await InformationContract.deployed();
		const accounts = await web3.eth.getAccounts();
		return await instance.setInfo(username, info, { from: accounts[2] });
	}
}
