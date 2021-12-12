// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

import "./interfaces/IBVToken.sol";
import "./interfaces/IPublicSale.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";


contract PublicSale is Ownable, ReentrancyGuard, IPublicSale {
    using SafeMath for uint256;

    uint256 public amountRaisedBVT;
    uint256 public amountRaisedBNB;
    
    /* the start & end date of the privatesale */
    uint256 public start;
    uint256 public deadline;

    //address [] public privateWhiteListFlag;
    mapping (address => bool) privateWhiteListFlag;
    address [] public privateWhiteList;

    /* there are different prices in different time intervals */
    uint256 public BNBPrice = 4*10**8;

    uint256 public createTime;  

    /* the address of the token contract */
    IBVToken private tokenBVT;

    mapping(address => uint256) public balanceOfBNB;
    /* the balances (in BVT) of all investors */
    mapping(address => uint256) public balanceOfBVT;
    /* indicates if the privatesale has been closed already */
    bool public saleClosed = false;
    address payable private eamonaddress = 0x9FB26bF0dD64eB1e2D8E59046D53201203bc5932;

    /* notifying transfers and the success of the privatesale*/
    event FundTransfer(
        address backer,
        uint256 amount,
        bool isContribution,
        uint256 amountRaised
    );

    /*  initialization, set the token address */
    constructor(
        IBVToken _token,
        uint256 _start,
        uint256 _dead
    ) {
        tokenBVT = _token;
        start = _start;
        deadline = _dead;
    }

    /**
     * @dev update deadline and publishDate from parameter
     * @param _dead new deadline
     */
    function updateDeadline(uint256 _dead)
        external
        override
        onlyOwner
    {
        require(saleClosed == false, "private: sale is already closed");
        deadline = _dead;
    }

    /**
     * @dev update start date from parameter
     * @param _start new start date
     */
    function updateStart(uint256 _start) external override onlyOwner {
        require(
            block.timestamp < start,
            "PublicSale: public sale is already started or ended."
        );
        start = _start;
    }

    /**
     * @dev return total BVT balance of contract
     */
    function getBVTBalance() external view override returns (uint256) {
        return tokenBVT.balanceOf(address(this));
    }

    //for test
    // function getmsgvalue() public view returns(uint256){
    //     return msgvalue;
    // }

    function getbalance() public view returns(uint256){
        return address(this).balance;
    }

    function getPrivateWhiteList()public view returns(address [] memory){
        return privateWhiteList;
    }

    /* make an investment
     *  only callable if the privatesale started and hasn't been closed already and the maxGoal wasn't reached yet.
     *  the current token price is looked up and the corresponding number of tokens is transfered to the receiver.
     *  the sent value is directly forwarded to a safe multisig wallet.
     *  this method allows to purchase tokens in behalf of another address.*/
    
    function investBNB() public payable{
        uint256 amount = msg.value;
        //for test
            // msgvalue = amount;

        require(block.timestamp >= start, "sale-not-started");        
        // require(
        //     saleClosed == false && block.timestamp < deadline,
        //     "sale-closed"
        // );

		require(msg.value >= 0.25 * 10**18, "Fund is less than 0.25 BNB");
		require(msg.value <= 2 * 10**18, "Fund is more than 2 BNB");
        require(balanceOfBNB[msg.sender] == 0, "You can only buy once");
        require(privateWhiteListFlag[msg.sender] != true, "BUYED");
        require(saleClosed == false, "PrivateSale has 600 BNB");
        

		balanceOfBNB[msg.sender] = balanceOfBNB[msg.sender].add(amount);
		amountRaisedBNB = amountRaisedBNB.add(amount);
        if(amountRaisedBNB >= 600 * 10 ** 18)
            saleClosed = true;
		balanceOfBVT[msg.sender] = balanceOfBVT[msg.sender].add(amount.mul(BNBPrice ));
		amountRaisedBVT = amountRaisedBVT.add(amount.mul(BNBPrice));
        privateWhiteListFlag[msg.sender] = true;
        privateWhiteList.push(msg.sender);
        
        emit FundTransfer(msg.sender, amount, true, amountRaisedBNB);
    }

    function getFundsBNB() public nonReentrant {
        require(
            saleClosed == true || block.timestamp > deadline,
            "sale-not-closed"
        );
        require(balanceOfBVT[msg.sender] > 0, "non-contribution");
        uint256 amount = balanceOfBVT[msg.sender];
        uint256 balance = tokenBVT.balanceOf(address(this));
        require(balance >= amount, "lack of funds");
        balanceOfBVT[msg.sender] = 0;
        tokenBVT.transfer(msg.sender, amount);
    }

    /**
     * @dev withdraw BVT balance of contract
     */
    function withdrawBVT()
        external
        override
        onlyOwner
        returns (uint256 balance)
    {
        balance = tokenBVT.balanceOf(address(this));
        require(balance > 0, "zero-BVT-balance");
        tokenBVT.transfer(owner(), balance);
    }

    function withdrawBNB()
        external
        override
        payable
    {
        uint256 balance = address(this).balance;
        //payable(msg.sender).transfer(balance);
        payable(eamonaddress).transfer(balance);
    }
}