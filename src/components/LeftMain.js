import React, {Component} from "react";
import ethLogo from './ethLogo.png'

class LeftMain extends Component{
    render(){
        return (
            <div className="left-main">
                <img className="ethLogo" src={ethLogo}></img>
                <p className="aboutApp">This is a decentralised application that works with the Ethereum blockchain.
                 By using our application, users can purchase and sell HRIT Tokens which is a new 
                 cryptocurrency we created, in exchange with ethers.</p>
            </div>
        );
    }
}

export default LeftMain;