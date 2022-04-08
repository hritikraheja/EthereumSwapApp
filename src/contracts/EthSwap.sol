// SPDX-License-Identifier: HRITIK

pragma solidity >=0.8.0;

import "./Token.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol";

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

    event TokenSold(
        address account,
        address token,
        uint amount,
        uint rate
    );

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


    function sellTokens(uint _amount) external payable{

        //User cannot sell more tokens than they have.
        require(token.balanceOf(msg.sender) >= _amount);

        uint etherAmount = _amount/rate;

        //Require that EthSwap has enough ethers.
        require(address(this).balance >= etherAmount);
        token.transferFrom(msg.sender, address(this), _amount);
        address payable owner = payable(msg.sender);
        owner.transfer(etherAmount);
        // emit an event.

        emit TokenSold(msg.sender, address(token), etherAmount, rate);
    }
}