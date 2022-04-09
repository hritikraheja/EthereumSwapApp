import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';
import EthSwap from '../abis/EthSwap.json';
import Token from '../abis/Token.json';
import NavBar from './NavBar';
import Main from './Main.js'

class App extends Component {

  async componentWillMount(){
    await this.loadWeb3();
    await this.loadBlockChain();
  }

  //****REFER TO THE WEB3 DOCUMENTATION. */
  async loadBlockChain(){
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    // Setting the blockchain account address in state.
    this.setState({accountAddress : accounts[0]});

    const accountBalance = await web3.eth.getBalance(this.state.accountAddress);

    // Setting the blockchain account balace in state.
    this.setState({accountBalance : accountBalance});

    //Using Token smart contract methods.
    //See web3 document.
    //Load token
    const abi= Token.abi;
    const networkId = await web3.eth.net.getId();
    const tokenData = Token.networks[networkId];
    if(tokenData){
      const token = new web3.eth.Contract(abi, tokenData.address);
      this.setState({token: token});
      let tokenBalance = await token.methods.balanceOf(this.state.accountAddress).call();
      this.setState({tokenBalance : tokenBalance})
    } else {
      window.alert('Token contract not deployed to the detected network.')
    }


    const ethSwapAbi= EthSwap.abi;
    const ethSwapData = EthSwap.networks[networkId];
    if(ethSwapData){
      const ethSwap = new web3.eth.Contract(ethSwapAbi, ethSwapData.address);
      this.setState({ethSwap : ethSwap});
    } else {
      window.alert('Token contract not deployed to the detected network.')
    }


    //Getting the data from the state.
    console.log(this.state.accountAddress);
    console.log(this.state.accountBalance);
    
    //When the data is loaded completely.
    this.setState({loading : false});
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
      accountBalance : '0',
      token:{},
      tokenBalance :'0',
      ethSwap:{},
      loading :true
    }
  }

  buyTokens = (etherAmount) =>{
    this.setState({loading:true});
    this.state.ethSwap.methods.buyTokens().
    send({value : etherAmount, from : this.state.accountAddress}, (err, transactionHash)=>{
      if(err){
        window.alert('Transaction Rejected');
        this.setState({loading : false});
      } else {
      this.setState({loading : false});
      window.location.reload(false)
      }
    })
  }

  sellTokens = (tokenAmount) => {
    this.setState({loading : true})
    this.state.token.methods.approve(this.state.ethSwap.address, tokenAmount).send({
      from: this.state.accountAddress}, (err, transactionHash) => {
        if(err){
          window.alert('Transaction Rejected');
          this.setState({loading : false});
        } else {
          this.state.ethSwap.methods.sellTokens(tokenAmount).send({from : this.state.accountAddress}, (err2, transactionHash2) =>{
            if(err){
              window.alert('Transaction Rejected');
              this.setState({loading : false});
            } else {
            this.setState({loading : false});
            window.location.reload(false)
            }
          })
        }
      })
  }
  render() {
    // Show content only when the data is loaded, else show loading.
    let content;
    if(this.state.loading){
      content = <p id='loader' className='text-center'>Loading .... </p>
    } else {
      content = <Main accountBalance = {this.state.accountBalance} 
      tokenBalance = {this.state.tokenBalance}
      buyTokens = {this.buyTokens}
      sellTokens = {this.sellTokens}/>
    }


    return (
      <div>
        <NavBar accountNumber = {this.state.accountAddress}/> //This will use the navbar component and
        //and pass the accountNumber as a constructor for navbar.
        {content}
      </div>
    );
  }
}

export default App;
