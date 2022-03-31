const { assert } = require('chai');

const Token = artifacts.require('Token');
const EthSwap = artifacts.require('EthSwap');

require('chai').use(require('chai-as-promised')).should();

contract('EthSwap', (accounts) => {

    describe('Token Deployment', async() => {
        it('contract has a name', async() => {
            let token = await Token.new();
            const name = await token.name();
            assert.equal(name, 'Hrit Token');
        })
    });

    describe('EthSwap Deployment', async() => {
        it('contract has a name', async() => {
            let ethSwap = await EthSwap.new();
            let a
            const name = await ethSwap.name();
            assert.equal(name, 'EthSwap Instant Exchange');
        })
    });
})