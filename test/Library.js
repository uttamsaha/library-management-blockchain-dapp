const {expect} = require("chai");
const {ethers} = require('ethers');

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max-min)) + min;
}

//writing test using hardhat
describe("Library Contract", function(){
    let  Library;
    let library;
    let owner;

    const NUM_UNFINISHED_BOOK = 5; //dummy data
    const NUM_FINISHED_BOOK = 3; //dummy data
    let unfinishedBookList;
    let finishedBookList;


    //before each unit test these code will run
    beforeEach(async function(){
        Library = await ethers.getContractsFactory("Library"); //Library is contract name
        library = await Library.deploy();
        [owner] = await ethers.getSigners();
        unfinishedBookList = [];
        finishedBookList = [];

        for(let i = 0; i <NUM_UNFINISHED_BOOK; i++){
            let book = {
                'name': getRandomInt(1,1000).toString(),
                'year': getRandomInt(1800,2022).toString(),
                'author': getRandomInt(1,1000).toString(),
                'finished': false
            };

            await library.addBook(book.name, book.year, book.author, book.finished);
            unfinishedBookList.push(book);
        }

        for(let i = 0; i <NUM_FINISHED_BOOK; i++){
            let book = {
                'name': getRandomInt(1,1000).toString(),
                'year': getRandomInt(1800,2022).toString(),
                'author': getRandomInt(1,1000).toString(),
                'finished': true
            };

            await library.addBook(book.name, book.year, book.author, book.finished);
            finishedBookList.push(book);
        }
    })
});

describe("Add a Book", function(){
    it("Should emit AddBook event", async function(){
        let book = {
            'name': getRandomInt(1,1000).toString(),
            'year': getRandomInt(1800,2022).toString(),
            'author': getRandomInt(1,1000).toString(),
            'finished': true
        };
        await expect(await library.addBook(book.name, book.year, book.author, book.finished)).to.emit(library,"AddBook").withArgs(owner.address, NUM_UNFINISHED_BOOK + NUM_FINISHED_BOOK)
    });
    
})