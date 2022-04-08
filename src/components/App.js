import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';

class App extends Component {

  async componentWillMount(){
    await this.loadWeb3();
    await this.loadBlockChain();
  }

  async loadBlockChain(){
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    // Setting the blockchain account address in state.
    this.setState({accountAddress : accounts[0]});

    const accountBalance = await web3.eth.getBalance(this.state.accountAddress);

    // Setting the blockchain account balace in state.
    this.setState({accountBalance : accountBalance});

    //Getting the data from the state.
    console.log(this.state.accountAddress);
    console.log(this.state.accountBalance);
  }

  async loadWeb3(){
      if(window.ethereum){
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if(window.web3){
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert('Non-ethereum browser detected. You should consider trying MetaMask!')
      }
  }

  constructor(props){
    super(props);

    // Setting the default state.
    this.state = {
      accountAddress : '',
      accountBalance : '0'
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dapp University
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>
                <h1>Hello World!</h1>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
