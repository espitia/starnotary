const StarNotary = artifacts.require('StarNotary')

contract('StarNotary', accounts => { 

    beforeEach(async function() { 
        this.contract = await StarNotary.new({from: accounts[0]})
    })

    let _name = "The Soverign Individual Star"
    let _dec = "dec_121.874"
    let _mag = "mag_245.978"
    let _cent = "ra_032.155"
    let _story = "Satoshi told the story"

    describe('can create a star', () => { 
        it('can create a star and get its name', async function () { 

            // call contract to create a star and get tx
            let tx = await this.contract.createStar(_name, _dec, _mag, _cent, _story, {from: accounts[0]})
    
            // creating star returns the tokenId assigned to the newly minted token
            let tokenId = tx.logs[0].args.tokenId

            // get star using tokenId
            let starInfo = await this.contract.tokenIdToStarInfo(tokenId)

            assert.equal(starInfo[0], _name)
            // ** add assertion to make sure creating a star with the same coords fails
        })
    })

    describe('buying and selling stars', () => { 
        let user1 = accounts[1]
        let user2 = accounts[2]
        let randomMaliciousUser = accounts[3]
        
        let starId
        let starPrice = web3.toWei(.01, "ether")

        beforeEach(async function () { 
            let tx = await this.contract.createStar('awesome star!','d','d','d','d', {from: user1})    
            starId = tx.logs[0].args.tokenId
        })

        it('user1 can put up their star for sale', async function () { 
            assert.equal(await this.contract.ownerOf(starId), user1)
            await this.contract.putStarUpForSale(starId, starPrice, {from: user1})
            
            assert.equal(await this.contract.starsForSale(starId), starPrice)
        })

        describe('user2 can buy a star that was put up for sale', () => { 
            beforeEach(async function () { 
                await this.contract.putStarUpForSale(starId, starPrice, {from: user1})
            })

            it('user2 is the owner of the star after they buy it', async function() { 
                await this.contract.buyStar(starId, {from: user2, value: starPrice, gasPrice: 0})
                assert.equal(await this.contract.ownerOf(starId), user2)
            })

            it('user2 ether balance changed correctly', async function () { 
                let overpaidAmount = web3.toWei(.05, 'ether')
                const balanceBeforeTransaction = web3.eth.getBalance(user2)
                await this.contract.buyStar(starId, {from: user2, value: overpaidAmount, gasPrice: 0})
                const balanceAfterTransaction = web3.eth.getBalance(user2)
                assert.equal(balanceBeforeTransaction.sub(balanceAfterTransaction), starPrice)
            })
        })
    })

    describe('managing stars', () => {

        let user1 = accounts[1]
        let tokenId;
        let starPrice = web3.toWei(.01, "ether")


        beforeEach(async function () { 
            let tx = await this.contract.createStar(_name, _dec, _mag, _cent, _story, {from:user1})
            tokenId = tx.logs[0].args.tokenId // get tokenId from tx 
        })



        it('user1 created star and star does indeed exsist given the coordinates', async function () {
            assert.equal(await this.contract.checkIfStarExist(_dec, _mag, _cent), true)
        })


        it('given a tokenId, we can retrieve the star info. (tokenIdToStarInfo())', async function () {
           let star = await this.contract.tokenIdToStarInfo(tokenId)
           
           assert.equal(_name, star[0]);
           assert.equal(_dec, star[1]);
           assert.equal(_mag, star[2]);
           assert.equal(_cent, star[3]);
           assert.equal(_story, star[4]);
           
        })
        
        it('given a tokenId, we can find whether the star for said tokenId is up for sale (starsForSale())', async function () {
            await this.contract.putStarUpForSale(tokenId, starPrice, {from: user1})
            assert.equal(await this.contract.starsForSale(tokenId), starPrice)
        })

    })

    describe('ERC721 contract functions', () => {

        it('user 1 can mint new ERC721 token (star) and is owner of said token', async () => {
            
            let contract = await StarNotary.new({from: accounts[0]})
            let user1 = accounts[1]

            // mint star
            let tx = await contract.createStar(_name, _dec, _mag, _cent, _story, {from: user1})
            // creating star returns the tokenId assigned to the newly minted token
            let tokenId = tx.logs[0].args.tokenId
            
            // check that the minted token exsists and user 1 is owner
            assert.equal(await contract.ownerOf(tokenId), user1)
        })

        it('user 1 can APPROVE of user 2 to make transfer calls of a user 1 tokens to user 3', async () => {
            let contract = await StarNotary.new({from: accounts[0]})
            let user1 = accounts[1]
            let user2 = accounts[2]
            let user3 = accounts[3]

            // mint star
            let tx = await contract.createStar(_name, _dec, _mag, _cent, _story, {from: user1})
            // creating star returns the tokenId assigned to the newly minted token
            let tokenId = tx.logs[0].args.tokenId

            // user 1 gives approval to user 2
            await contract.approve(user2, tokenId, {from: user1})

            // user 2 makes transfer to user 3
            await contract.transferFrom(user1, user3, tokenId, {from: user2})

            // // assert that user 3 is owner of token
            assert.equal(await contract.ownerOf(tokenId), user3)            
        })



        it('user 1 can safeTransfer their token to user 2', async () => {
            let contract = await StarNotary.new({from: accounts[0]})
            let user1 = accounts[1]
            let user2 = accounts[2]
            let user3 = accounts[3]
            
            // mint star
            let tx = await contract.createStar(_name, _dec, _mag, _cent, _story, {from: user1})
            // creating star returns the tokenId assigned to the newly minted token
            let tokenId = tx.logs[0].args.tokenId

            // user 1 transfers ownership to user 2
            await contract.safeTransferFrom(user1, user2, tokenId, {from: user1})

            // assert that user 2 is now owner of given token
            assert.equal(await contract.ownerOf(tokenId), user2)            
        })


        it('user 1 can approve user 2 operator rights over ALL user 1 tokens', async () => {
            let contract = await StarNotary.new({from: accounts[0]})
            let user1 = accounts[1]
            let user2 = accounts[2]
            let user3 = accounts[2]

            // mint star
            let tx1 = await contract.createStar(_name, _dec, _mag, _cent, _story, {from: user1})
            // creating star returns the tokenId assigned to the newly minted token
            let tokenId1 = tx1.logs[0].args.tokenId

            // mint star 2
            let tx2 = await contract.createStar(_name, (_dec + 'randomData'), _mag, _cent, _story, {from: user1}) // insert randomData to not create the same token
            // creating star returns the tokenId assigned to the newly minted token
            let tokenId2 = tx2.logs[0].args.tokenId
            
            // user 1 gives setApprovalForAll to user 2
            await contract.setApprovalForAll(user2, true, {from: user1})

            // user 2 makes transfer of tokenId1 AND tokenId2 to user 3
            await contract.transferFrom(user1, user3, tokenId1, {from: user2})
            await contract.transferFrom(user1, user3, tokenId2, {from: user2})

            // assert that user 3 is owner of token1 and token2
            assert.equal(await contract.ownerOf(tokenId1), user3)  
            assert.equal(await contract.ownerOf(tokenId2), user3)            
        })

        it('user 2 is approved as operator for token user 1 approved of', async () => {
            let contract = await StarNotary.new({from: accounts[0]})
            let user1 = accounts[1]
            let user2 = accounts[2]
            
            // mint star
            let tx = await contract.createStar(_name, _dec, _mag, _cent, _story, {from: user1})
            // creating star returns the tokenId assigned to the newly minted token
            let tokenId1 = tx.logs[0].args.tokenId

            // user 1 gives approval to user 2
            await contract.approve(user2, tokenId1, {from: user1})

            // assert that user 2 is approved for tokenId1
            assert.equal(await contract.getApproved(tokenId1), user2)     
        })


        it('user 2 is approved for ALL tokens of user 1', async () => {
            let contract = await StarNotary.new({from: accounts[0]})
            let user1 = accounts[1]
            let user2 = accounts[2]
            let user3 = accounts[3]
            
            let tokenId1 = web3._extend.utils.toBigNumber(2948298403842384)
          
            // mint star
            let tx = await contract.createStar(_name, _dec, _mag, _cent, _story, {from: user1})
            // creating star returns the tokenId assigned to the newly minted token
            let tokenId = tx.logs[0].args.tokenId

            // user 1 gives approval to user 2
            await contract.setApprovalForAll(user2, true, {from: user1})

            // assert that user 2 is approved for tokenId1
            assert.equal(await contract.isApprovedForAll(user1, user2), true)
            assert.equal(await contract.isApprovedForAll(user1, user3), false)     

        })
    })
})