import React, {Component} from "react";
import ethLogo from './ethLogo.png'
import hritLogo from './hritLogo.png'

class SellHrit extends Component{

    constructor(props){
        super(props);
        this.state = {
            output : ''
        }
    }

    sell = ()=>{
        let hrits = this.state.output*100;
        console.log(hrits)
        if(this.state.output == ''){
            window.alert('Enter an amount.')
        } else {
            hrits = window.web3.utils.toWei(hrits +'', 'Ether');
            console.log(hrits)
            this.props.sellTokens(hrits);
        }
    }
    render(){
        const ethBalance = this.props.accountBalance/1000000000000000000;
        const hritBalance = this.props.tokenBalance/1000000000000000000;
        return(
            <div className="purchase-hrits">
                <div className="d-block">
                    <div className="d-upper">
                        <h2 className="d-head">Enter Amount In HRITs : </h2>
                        <p className="d-balance">HRIT Balance : {hritBalance}</p>
                    </div>
                    <div className="d-lower">
                        <input className="d-input" required type='number' placeholder="0" onChange={event=>{
                            const hritAmount = event.target.value.toString();
                            this.setState({
                                output : hritAmount/100
                            })
                        }}></input>
                        <div className="d-currency">
                            <img className="d-currency-logo" src={hritLogo}></img>
                            <p className="d-currency-name">HRIT</p>
                        </div>
                    </div>
                </div>

                <div className="d-block">
                    <div className="d-upper">
                        <h2 className="d-head">Equivalent Amount In Ethers : </h2>
                        <p className="d-balance">Ether Balance : {ethBalance}</p>
                    </div>
                    <div className="d-lower">
                        <input className="d-input" disabled value={this.state.output} placeholder='0'></input>
                        <div className="d-currency">
                            <img className="d-currency-logo" src={ethLogo}></img>
                            <p className="d-currency-name">Ether</p>
                        </div>
                    </div>
                </div>

                <div className="exchange-rate-div">
                    <p className="exchange-rate-head">EXCHANGE RATE</p>
                    <p className="exchange-rate-value">100 HRITs = 1ETH</p>
                </div>

                <button className="sell-button" onClick={this.sell}>SELL HRITS</button>
            </div>
        );
    }
}

export default SellHrit;