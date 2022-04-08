import React, {Component, component} from 'react';
import Identicon from 'identicon.js';
import './App.css'

class NavBar extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ethereum Swap Application
          </a>
          <div className='nav_bar_right'>
          <p className='accountNumber'>{this.props.accountNumber}</p>
          {this.props.accountNumber ? 
          <img
          className='ml-2'
          width='30'
          height='30'
          src= {`data:image/png; base64, ${new Identicon(this.props.accountNumber, 30).toString()}`}
          alt='Identicon'
          />:
          <span></span>
          }
          </div>
        </nav>
        );
    }
}

export default NavBar;