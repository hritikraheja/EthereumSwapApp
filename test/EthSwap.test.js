const { assert } = require('chai');

const Token = artifacts.require('Token');
const EthSwap = artifacts.require('EthSwap');

require('chai').use(require('chai-as-promised')).should();

contract('EthSwap', ([deployer, investor]) => {

    let token, ethSwap;
    let result;
    let resultS;
    // before works as a constructor.
    before(async() => {
        token = await Token.new();
        ethSwap = await EthSwap.new(token.address);
        await token.transfer(ethSwap.address, '1000000000000000000000000');
        result = await ethSwap.buyTokens({from : investor, value : '1000000000000000000'});
    })

    describe('Token Deployment', async() => {
        it('contract has a name', async() => {
            const name = await token.name();
            assert.equal(name, 'Hrit Token');
        })
    });

    describe('EthSwap Deployment', async() => {
        it('contract has a name', async() => {
            const name = await ethSwap.name();
            assert.equal(name, 'EthSwap Instant Exchange');
        })

        // it('contract has balance', async() => {
        //     let balance = await token.balanceOf(ethSwap.address);
        //     assert.equal(balance.toString(), '1000000000000000000000000');
        // })
    });

    describe('buyTokens()', async() => {
        it('It allows users to purchase tokens at a fixed rate.', async() => {
            let balance = await token.balanceOf(investor);
            assert.equal(balance.toString(), '100000000000000000000');

            console.log(result.logs[0].args);
        })
    })

    describe('sellTokens()', async() =>{
        let result;

        before(async() => {
            await token.approve(ethSwap.address, '100000000000000000000', {from: investor});
            result = await ethSwap.sellTokens('100000000000000000000', {from : investor})
        })
        it('It allows users to sell tokens at a fixed rate.', async () => {
            let balance = await token.balanceOf(investor);
            assert.equal(balance.toString(), '0');
        })
    })
})