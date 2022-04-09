import React, {Component} from "react";
import './App.css'
import LeftMain from "./LeftMain";
import RightMain from "./RightMain";

class Main extends Component{
    render(){
        return(
            <div className="main-content">
                <LeftMain/>
                <RightMain accountBalance = {this.props.accountBalance} 
                tokenBalance = {this.props.tokenBalance}
                buyTokens = {this.props.buyTokens}
                sellTokens = {this.props.sellTokens}/>
            </div>
        );
    }
}

export default Main
