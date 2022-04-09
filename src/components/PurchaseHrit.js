import React, {Component} from "react";
import ethLogo from './ethLogo.png'
import hritLogo from './hritLogo.png'

class PurchaseHrits extends Component{

    constructor(props){
        super(props);
        this.state = {
            output : ''
        }
    }

    buy = () =>{
        let ethers = this.state.output /100;
        if(this.state.output == ''){
            window.alert('Enter an amount.')
        } else {
            ethers = window.web3.utils.toWei(ethers+'', 'Ether');
            this.props.buyTokens(ethers);
        }
    }
    render(){

        const ethBalance = this.props.accountBalance/1000000000000000000;
        const hritBalance = this.props.tokenBalance/1000000000000000000;
        return(

            <div className="purchase-hrits">
                <div className="d-block">
                    <div className="d-upper">
                        <h2 className="d-head">Enter Amount In Ethers : </h2>
                        <p className="d-balance">Ether Balance : {ethBalance}</p>
                    </div>
                    <div className="d-lower">
                        <input className="d-input" required type='number' placeholder="0" onChange={event => {
                            const etherAmount = event.target.value.toString();
                            this.setState({output : etherAmount*100});
                        }}
                        ></input>
                        <div className="d-currency">
                            <img className="d-currency-logo" src={ethLogo}></img>
                            <p className="d-currency-name">ETH</p>
                        </div>
                    </div>
                </div>

                <div className="d-block">
                    <div className="d-upper">
                        <h2 className="d-head">Equivalent Amount In HRITs : </h2>
                        <p className="d-balance">HRIT Balance : {hritBalance}</p>
                    </div>
                    <div className="d-lower">
                        <input className="d-input" disabled placeholder="0" value={this.state.output} type = 'number'></input>
                        <div className="d-currency">
                            <img className="d-currency-logo" src={hritLogo}></img>
                            <p className="d-currency-name">HRIT</p>
                        </div>
                    </div>
                </div>

                <div className="exchange-rate-div">
                    <p className="exchange-rate-head">EXCHANGE RATE</p>
                    <p className="exchange-rate-value">1 ETH  = 100 HRITs</p>
                </div>

                <button className="buy-button" onClick={this.buy}>BUY HRITS</button>
            </div>
        );
    }
}

export default PurchaseHrits;