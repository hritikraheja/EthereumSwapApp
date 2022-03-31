// SPDX-License-Identifier: HRITIK

pragma solidity >=0.5.0;

import "./Token.sol";

contract EthSwap{
    string public name = "EthSwap Instant Exchange";
    Token public token;
    uint public rate = 100;

    event TokenPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );
    //Creation of an event that some task just got executed.
    constructor(Token _token) public {
        token = _token;
    }

    function buyTokens() public payable{
        uint tokenAmount = msg.value * rate;

        //It works as a balance check, if the investor do not have enough ethers than transaction will not be completed.
        //If the condition inside the require function is true, then the function executes completely,
        //else it stops the function and do not do anything else.
        require(token.balanceOf(address(this)) >= tokenAmount);
        token.transfer(msg.sender, tokenAmount);

        //Emit an event
        emit TokenPurchased(msg.sender, address(token), tokenAmount, rate);
    }
}