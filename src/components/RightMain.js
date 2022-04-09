import React, {Component} from "react";
import PurchaseHrits from "./PurchaseHrit";
import SellHrits from "./SellHrit";

class RightMain extends Component{
    constructor(props){
        super(props)
         
        this.state = {
            purchase : true,
            sell : false
        }
         
        this.handlePurchaseClick = this.handlePurchaseClick.bind(this)
        this.handleSellClick = this.handleSellClick.bind(this)
      }
     
      handlePurchaseClick(){
       if(this.state.sell){
           this.setState({purchase : true, sell:false});
       }
      }

      handleSellClick(){
        if(this.state.purchase){
            this.setState({purchase : false, sell:true});
        }
       }
    render(){
        var data

        var purchaseTokensClass = '';
        var sellTokensClass = '';
        if(this.state.purchase){
            purchaseTokensClass = 'nav-active';
            data = <PurchaseHrits accountBalance = {this.props.accountBalance}
            tokenBalance = {this.props.tokenBalance}
            buyTokens = {this.props.buyTokens}/>
        } else {
            sellTokensClass = 'nav-active';
            data = <SellHrits accountBalance = {this.props.accountBalance}
            tokenBalance = {this.props.tokenBalance}
            sellTokens = {this.props.sellTokens}/>
        }

        return (
            <div className="right-main">
                <div className="purchase-sell-nav">
                    <button className={purchaseTokensClass} onClick = {this.handlePurchaseClick}>PURCHASE</button>
                    <button className={sellTokensClass} onClick={this.handleSellClick}>SELL</button>
                </div>
                {data}
            </div>
        );
    }
}

export default RightMain;