pragma solidity ^0.8.4;

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router01.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
// import "http://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/interfaces/IUniswapV2Router01.sol";
// import "http://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/interfaces/IUniswapV2Router02.sol";
// import "http://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/interfaces/IUniswapV2Pair.sol";
// import "http://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/interfaces/IUniswapV2Factory.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @dev The official BlocVaultToken smart contract
 */
contract BlocVaultToken is Context, IERC20, Ownable {
    using SafeMath for uint256;
    using Address for address;
    
    // General Info
    string private _name     = "BVLT";
    string private _symbol   = "BV";
    uint8  private _decimals = 9;
    
    uint    public _deployTimestamp;
    uint256 public presale_start_time;
    uint256 public presale_end_time;

    //presale lockdealine
    uint256 public _preSaleLockDeadline = 11111111111111111;
    //presale white Limits
    mapping(address => bool) private preSaleWhiteList_bool;
    address [] public preSaleWhiteList_address;
    
    // Liquidity Settings
    IUniswapV2Router02 public _pancakeswapV2Router; // The address of the PancakeSwap V2 Router
    address public _pancakeswapV2LiquidityPair;     // The address of the PancakeSwap V2 liquidity pairing for RAINBOW/WBNB
    
    bool currentlySwapping;

    modifier lockSwapping {
        currentlySwapping = true;
        _;
        currentlySwapping = false;
    }
    event SwapAndLiquify(
        uint256 tokensSwapped,
        uint256 bnbReceived,
        uint256 tokensIntoLiqudity
    );
    
    // Addresses
    
    address payable public _preSaleAddress; //presale address
    address payable public _marketingAddress = payable(0x70c7fe48B6B329ad276100823E7F7ba52b717789); // Marketing address used to pay for marketing
    address payable public _developAddress = payable(0x32C3F47de3b90adaD693E35d3C799D23fAb63Cc2); 
    address payable public _vestingAddress = payable(0xf1C6297537B3f0A6357c9e8A46f8f90D6a72e3B0); 
    address payable public _burnAddress      = payable(0x000000000000000000000000000000000000dEaD); // Burn address used to burn a portion of tokens
    
    // Balances
    mapping (address => uint256) private _rOwned;
    mapping (address => uint256) private _tOwned;
    mapping (address => mapping (address => uint256)) private _allowances;

    // Exclusions
    mapping (address => bool) private _isExcludedFromFees;
    mapping (address => bool) private _isExcluded;
    address[] private _excluded;
   
    // Supply
    uint256 private constant MAX = ~uint256(0);
    uint256 private _tTotal = 3 * 10**12 * 10**9;
    uint256 private _rTotal = (MAX - (MAX % _tTotal));
    uint256 private _totalReflections; // Total reflections
    
    // Token Tax Settings
    uint256 public  _taxFee           = 12;  // 12% tax 
    uint256 public  _preSellTaxFee  = 40; // 12% tax 
    uint256 private _previousTaxFee;
    
    // Token Limits
    uint256 public _maxTxAmount        = 3 * 10**12 * 10**9;  // 1 quadrillion
    uint256 public _tokenSwapThreshold = 300 * 10**6 * 10**9; // 100 billion
    
    // Timer Constants 
    uint private constant DAY = 86400; // How many seconds in a day
    
    //Vesting Variables
    struct VESTINGINFO{
        uint256 lockdeadline;
        uint256 amount;
        uint256 vestingtype;
    }

    mapping (address => VESTINGINFO) private _vesting_info;
    mapping (address => bool) private _isVesting;
    // address[] private vesting_list;
uint vesting_count;

    function get_isVesting(address vest_address) public view returns(bool){
        return _isVesting[vest_address];
    }

    // function get_isVesting() public view returns(address[] memory){
    //     address[] memory ret;
    //     for (uint i = 0; i < vesting_count; i++) {
    //         if(_isVesting[i] == true)
    //             ret.push(vesting_list);
    //     }
    //     return ret;
    // }

    function get_vest_info(address vest_address) public view returns(uint256,uint256,uint256) {
        if(_isVesting[vest_address] == true){
            return (_vesting_info[vest_address].lockdeadline, _vesting_info[vest_address].amount,
        _vesting_info[vest_address].vestingtype);
        }
        else {return (0,0,0);}
    }

    // function get_vest_info() public view returns(mapping){
    //     return _vesting_info;
    // }

    function vesting(uint256 amount, uint256 lockdays) public {
        require(_isVesting[msg.sender] != true, "address is available");
        require(amount >= 254000000* 10**9, "lack of amount");
        require(amount <= balanceOf(msg.sender), "investor has less than amount");
        require(lockdays == 90 || lockdays == 180 || lockdays == 270 || lockdays == 360, "lack of vestingtype");
        vesting_count++;
        _isVesting[msg.sender] = true;
//        _vesting_info[msg.sender] = VESTINGINFO(block.timestamp.add(DAY.mul(lockdays)), amount, lockdays);
        _vesting_info[msg.sender] = VESTINGINFO(block.timestamp.add(DAY.mul(lockdays)), amount, lockdays);
        _tokenTransfer_normal(msg.sender, _vestingAddress, amount);
    }

    function claim_vest() public {
        require(_isVesting[msg.sender] == true, "address is available");
        uint256 lockdeadline = _vesting_info[msg.sender].lockdeadline;
        uint256 vestingtype = _vesting_info[msg.sender].vestingtype;
        uint256 amount = _vesting_info[msg.sender].amount;
        if(lockdeadline > block.timestamp){
            if(vestingtype == 90 || vestingtype == 180)
            {
                uint256 fee = amount.mul(35).div(1000);
                amount = amount.sub(fee);
            }
            else{
                uint256 fee = amount.mul(55).div(1000);
                amount = amount.sub(fee);
            }
        }
        else{
             if(vestingtype == 90)
            {
                uint256 gain = amount.mul(10).div(100);
                amount = amount.add(gain);
            }
            else if(vestingtype == 180)
            {
                uint256 gain = amount.mul(15).div(100);
                amount = amount.add(gain);
            }else if(vestingtype == 270)
            {
                uint256 gain = amount.mul(20).div(100);
                amount = amount.add(gain);
            }
            else{
                uint256 gain = amount.mul(25).div(100);
                amount = amount.add(gain);
            }
        }
        require(balanceOf(_vestingAddress)>=amount, "insufficient amount");
        _tokenTransfer_normal(_vestingAddress,msg.sender, amount);
        delete _vesting_info[msg.sender];
        _isVesting[msg.sender] = false;
    }

    // LIQUIDITY
    bool public _enableLiquidity = true;//false; // Controls whether the contract will swap tokens
    
    constructor () {
        // Mint the total reflection balance to the deployer of this contract
        _rOwned[_msgSender()] = _rTotal;
        
        // Exclude the owner and the contract from paying fees
        _isExcludedFromFees[owner()] = true;
        _isExcludedFromFees[address(this)] = true;
        
        // Set up the pancakeswap V2 router
        IUniswapV2Router02 pancakeswapV2Router = IUniswapV2Router02(0xD99D1c33F9fC3444f8101754aBC46c52416550D1);
        //IUniswapV2Router02 pancakeswapV2Router = IUniswapV2Router02(0x10ED43C718714eb63d5aA57B78B54704E256024E);
        _pancakeswapV2LiquidityPair = IUniswapV2Factory(pancakeswapV2Router.factory())
            .createPair(address(this), pancakeswapV2Router.WETH());
        _pancakeswapV2Router = pancakeswapV2Router;
        
        _deployTimestamp = block.timestamp;
        emit Transfer(address(0), _msgSender(), _tTotal);
    }
    
    /**
     * @notice Required to recieve BNB from PancakeSwap V2 Router when swaping
     */
    receive() external payable {}
    
    /**
     * @notice Withdraws BNB from the contract
     */
    function withdrawBNB(uint256 amount) public onlyOwner() {
        if(amount == 0) payable(owner()).transfer(address(this).balance);
        else payable(owner()).transfer(amount);
    }
    
    /**
     * @notice Withdraws non-RAINBOW tokens that are stuck as to not interfere with the liquidity
     */
    function withdrawForeignToken(address token) public onlyOwner() {
        require(address(this) != address(token), "Cannot withdraw native token");
        IERC20(address(token)).transfer(msg.sender, IERC20(token).balanceOf(address(this)));
    }
    
    /**
     * @notice Transfers BNB to an address
     */
    function transferBNBToAddress(address payable recipient, uint256 amount) private {
        recipient.transfer(amount);
    }
    
    /**
     * @notice Allows the contract to change the router, in the instance when PancakeSwap upgrades making the contract future proof
     */
    function setRouterAddress(address router) public onlyOwner() {
        // Connect to the new router
        IUniswapV2Router02 newPancakeSwapRouter = IUniswapV2Router02(router);
        
        // Grab an existing pair, or create one if it doesnt exist
        address newPair = IUniswapV2Factory(newPancakeSwapRouter.factory()).getPair(address(this), newPancakeSwapRouter.WETH());
        if(newPair == address(0)){
            newPair = IUniswapV2Factory(newPancakeSwapRouter.factory()).createPair(address(this), newPancakeSwapRouter.WETH());
        }
        _pancakeswapV2LiquidityPair = newPair;

        _pancakeswapV2Router = newPancakeSwapRouter;
    }

    function name() external view returns (string memory) {
        return _name;
    }

    function symbol() external view returns (string memory) {
        return _symbol;
    }

    function decimals() external view returns (uint8) {
        return _decimals;
    }

    function totalSupply() external view override returns (uint256) {
        return _tTotal;
    }

    function balanceOf(address account) public view override returns (uint256) {
        if (_isExcluded[account]) return _tOwned[account];
        return tokenFromReflection(_rOwned[account]);
    }

    function transfer(address recipient, uint256 amount) external override returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

    function allowance(address owner, address spender) external view override returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) external override returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) external override returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }

    function increaseAllowance(address spender, uint256 addedValue) external virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }

    function decreaseAllowance(address spender, uint256 subtractedValue) external virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue, "ERC20: decreased allowance below zero"));
        return true;
    }

    function _approve(address owner, address spender, uint256 amount) private {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    function getTotalReflections() external view returns (uint256) {
        return _totalReflections;
    }
    
    function isExcludedFromFee(address account) external view returns(bool) {
        return _isExcludedFromFees[account];
    }
    
    function isExcludedFromReflection(address account) external view returns(bool) {
        return _isExcluded[account];
    }
    
    
    function excludeFromFee(address account) external onlyOwner() {
        _isExcludedFromFees[account] = true;
    }
    
    function includeInFee(address account) external onlyOwner() {
        _isExcludedFromFees[account] = false;
    }
    
    function setTaxFeePercent(uint256 taxFee) external onlyOwner() {
        _taxFee = taxFee;
    }
    function setPreSaleTaxFeePercent(uint256 taxFee) external onlyOwner() {
        _preSellTaxFee = taxFee;
    }
    
    
    function setMaxTxAmount(uint256 maxTxAmount) external onlyOwner() {
        _maxTxAmount = maxTxAmount;
    }
    
    function setTokenSwapThreshold(uint256 tokenSwapThreshold) external onlyOwner() {
        _tokenSwapThreshold = tokenSwapThreshold;
    }
    
    function setMarketingAddress(address marketingAddress) external onlyOwner() {
        _marketingAddress = payable(marketingAddress);
    }

    function setPreSaleAddress(address preSaleAddress) external onlyOwner() {
        _preSaleAddress = payable(preSaleAddress);
    }

    /// set presale _preSaleLockDeadline
    function setPreSaleTime(uint256 time) public onlyOwner{
        _preSaleLockDeadline = time;
    }
    

    function setDevelopAddress(address developAddress) external onlyOwner() {
        _developAddress = payable(developAddress);
    }

    function setVestingAddress(address vestingAddress) external onlyOwner() {
        _vestingAddress = payable(vestingAddress);
        
    }
    

    function setLiquidity(bool b) external onlyOwner() {
        _enableLiquidity = b;
    }

    /**
     * @notice Converts a token value to a reflection value
     */
    function reflectionFromToken(uint256 tAmount, bool deductTransferFee) public view returns(uint256) {
        require(tAmount <= _tTotal, "Amount must be less than supply");
        if (!deductTransferFee) {
            (uint256 rAmount,,,,) = _getValues(tAmount);
            return rAmount;
        } else {
            (,uint256 rTransferAmount,,,) = _getValues(tAmount);
            return rTransferAmount;
        }
    }

    /**
     * @notice Converts a reflection value to a token value
     */
    function tokenFromReflection(uint256 rAmount) public view returns(uint256) {
        require(rAmount <= _rTotal, "Amount must be less than total reflections");
        uint256 currentRate =  _getRate();
        return rAmount.div(currentRate);
    }
    
    /**
     * @notice Generates a random number between 1 and 1000
     */
     /*
    function random() private returns (uint) {
        uint r = uint(uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, _nonce))) % 1000);
        r = r.add(1);
        _nonce++;
        return r;
    }
    */
    /**
     * @notice Removes all fees and stores their previous values to be later restored
     */
    function removeAllFees() private {
        if(_taxFee == 0) return;
        
        _previousTaxFee = _taxFee;
        _taxFee = 0;
    }
    
    /**
     * @notice Restores the fees
     */
    function restoreAllFees() private {
        _taxFee = _previousTaxFee;
    }
    
    
    /**
     * @notice Collects all the necessary transfer values
     */
    function _getValues(uint256 tAmount) private view returns (uint256, uint256, uint256, uint256, uint256) {
        (uint256 tTransferAmount, uint256 tFee) = _getTValues(tAmount);
        (uint256 rAmount, uint256 rTransferAmount, uint256 rFee) = _getRValues(tAmount, tFee, _getRate());
        return (rAmount, rTransferAmount, rFee, tTransferAmount, tFee);
    }

    /**
     * @notice Calculates transfer token values
     */
    function _getTValues(uint256 tAmount) private view returns (uint256, uint256) {
        uint256 tFee = tAmount.mul(_taxFee).div(100);
        uint256 tTransferAmount = tAmount.sub(tFee);
        return (tTransferAmount, tFee);
    }

    /**
     * @notice Calculates transfer reflection values
     */
    function _getRValues(uint256 tAmount, uint256 tFee, uint256 currentRate) private pure returns (uint256, uint256, uint256) {
        uint256 rAmount = tAmount.mul(currentRate);
        uint256 rFee = tFee.mul(currentRate);
        uint256 rTransferAmount = rAmount.sub(rFee);
        return (rAmount, rTransferAmount, rFee);
    }

    /**
     * @notice Calculates the rate of reflections to tokens
     */
    function _getRate() private view returns(uint256) {
        (uint256 rSupply, uint256 tSupply) = _getCurrentSupply();
        return rSupply.div(tSupply);
    }

    /**
     * @notice Gets the current supply values
     */
    function _getCurrentSupply() private view returns(uint256, uint256) {
        uint256 rSupply = _rTotal;
        uint256 tSupply = _tTotal;      
        for (uint256 i = 0; i < _excluded.length; i++) {
            if (_rOwned[_excluded[i]] > rSupply || _tOwned[_excluded[i]] > tSupply) return (_rTotal, _tTotal);
            rSupply = rSupply.sub(_rOwned[_excluded[i]]);
            tSupply = tSupply.sub(_tOwned[_excluded[i]]);
        }
        if (rSupply < _rTotal.div(_tTotal)) return (_rTotal, _tTotal);
        return (rSupply, tSupply);
    }
    
    /**
     * @notice Excludes an address from receiving reflections
     */
    function excludeFromReward(address account) external onlyOwner() {
        require(!_isExcluded[account], "Account is already excluded");
        if(_rOwned[account] > 0) {
            _tOwned[account] = tokenFromReflection(_rOwned[account]);
        }
        _isExcluded[account] = true;
        _excluded.push(account);
    }

    /**
     * @notice Includes an address back into the reflection system
     */
    function includeInReward(address account) external onlyOwner() {
        require(_isExcluded[account], "Account is already included");
        for (uint256 i = 0; i < _excluded.length; i++) {
            if (_excluded[i] == account) {
                _excluded[i] = _excluded[_excluded.length - 1];
                _tOwned[account] = 0;
                _isExcluded[account] = false;
                _excluded.pop();
                break;
            }
        }
    }
    
   
    
    function getTime() public view returns(uint256){
        return block.timestamp;
    }

    /**
     * @notice Handles the before and after of a token transfer, such as taking fees and firing off a swap and liquify event
     */
    function _transfer(address from, address to, uint256 amount) private {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");
        require(amount > 0, "Transfer amount must be greater than zero");
        
        // Only the owner of this contract can bypass the max transfer amount
        if(from != owner() && to != owner()) {
            require(amount <= _maxTxAmount, "Transfer amount exceeds the maxTxAmount.");
        }
        
       
        // Gets the contracts RAINBOW balance for buybacks, charity, liquidity and marketing
        uint256 tokenBalance = balanceOf(address(this));
        if(tokenBalance >= _maxTxAmount)
        {
            tokenBalance = _maxTxAmount;
        }
        
        // AUTO-LIQUIDITY MECHANISM
        // Check that the contract balance has reached the threshold required to execute a swap and liquify event
        // Do not execute the swap and liquify if there is already a swap happening
        // Do not allow the adding of liquidity if the sender is the PancakeSwap V2 liquidity pool
        if (_enableLiquidity && tokenBalance >= _tokenSwapThreshold && !currentlySwapping && from != _pancakeswapV2LiquidityPair) {
            tokenBalance = _tokenSwapThreshold;
            swapAndLiquify(tokenBalance);
        }
                
       //add to presale whiteList
        if(preSaleWhiteList_bool[to] != true && from == _preSaleAddress && to != _pancakeswapV2LiquidityPair){
            preSaleWhiteList_bool[to] = true;
            preSaleWhiteList_address.push(to);
        }

        // If any account belongs to _isExcludedFromFee account then remove the fee
        bool takeFee = !(_isExcludedFromFees[from] || _isExcludedFromFees[to]);

       
        if (takeFee && _preSaleLockDeadline > block.timestamp && preSaleWhiteList_bool[from] == true) {
            _previousTaxFee = _taxFee;
            _taxFee = _preSellTaxFee;
            }
        // Remove fees completely from the transfer if either wallet are excluded
        if (!takeFee) {
            removeAllFees();
        }
        
        // Transfer the token amount from sender to receipient.
        _tokenTransfer(from, to, amount);
        
        // If we removed the fees for this transaction, then restore them for future transactions
        if (!takeFee) {
            restoreAllFees();
        }
        
        // If this transaction was a sell, and we took a fee, restore the fee amount back to the original buy amount
        
         if (takeFee && _preSaleLockDeadline > block.timestamp && preSaleWhiteList_bool[from] == true) {
            _taxFee = _previousTaxFee;
            }
        
    }
    
    /**
     * @notice Handles the actual token transfer
     */
     function _tokenTransfer_normal(address sender, address recipient, uint256 tAmount) private {
        // Calculate the values required to execute a transfer
        
        uint256 rAmount = tAmount.mul(_getRate());
        // Transfer from sender to recipient
		if (_isExcluded[sender]) {
		    _tOwned[sender] = _tOwned[sender].sub(tAmount);
		}
		_rOwned[sender] = _rOwned[sender].sub(rAmount);
		
		if (_isExcluded[recipient]) {
            _tOwned[recipient] = _tOwned[recipient].add(tAmount);
		}
		_rOwned[recipient] = _rOwned[recipient].add(rAmount); 
		
        // Emit an event 
        emit Transfer(sender, recipient, tAmount);
    }
    function _tokenTransfer(address sender, address recipient, uint256 tAmount) private {
        // Calculate the values required to execute a transfer
        (uint256 tTransferAmount, uint256 tFee) = _getTValues(tAmount);
        (uint256 rAmount, uint256 rTransferAmount,) = _getRValues(tAmount, tFee, _getRate());
        
        // Transfer from sender to recipient
		if (_isExcluded[sender]) {
		    _tOwned[sender] = _tOwned[sender].sub(tAmount);
		}
		_rOwned[sender] = _rOwned[sender].sub(rAmount);
		
		if (_isExcluded[recipient]) {
            _tOwned[recipient] = _tOwned[recipient].add(tTransferAmount);
		}
		_rOwned[recipient] = _rOwned[recipient].add(rTransferAmount); 
		
		// This is always 1% of a transaction worth of tokens
		if (tFee > 0) {
	    	uint256 tPortion = tFee.div(_taxFee);

            // Burn some of the taxed tokens 1%
            _burnTokens(tPortion);
            
            // Reflect some of the taxed tokens 
            // 3% HOLDR Rewards
    		_reflectTokens(tPortion.add(tPortion).add(tPortion));
            
            // Send the BV Token to the Vesting wallet 1%
            uint256 currentRate = _getRate();
            uint256 rPortion = tPortion.mul(currentRate);
            //address payable  _vestingAddress;

            //uint curTimestamp = block.timestamp;

            if (_isExcluded[_vestingAddress]) {
                _tOwned[_vestingAddress] = _tOwned[_vestingAddress].add(tPortion);
            }
            _rOwned[_vestingAddress] = _rOwned[_vestingAddress].add(rPortion);
            

            // Take the rest of the taxed tokens for the other functions
            //_takeTokens(tFee.sub(tPortion).sub(tPortion).sub(tPortion), tPortion);
            _takeTokens(tFee.sub(tPortion.mul(5)));
		}
            
        // Emit an event 
        emit Transfer(sender, recipient, tTransferAmount);
    }
    
    /**
     * @notice Burns RAINBOW tokens straight to the burn address
     */
    function _burnTokens(uint256 tFee) private {
        uint256 rFee = tFee.mul(_getRate());
        _rOwned[_burnAddress] = _rOwned[_burnAddress].add(rFee);
        if(_isExcluded[_burnAddress]) {
            _tOwned[_burnAddress] = _tOwned[_burnAddress].add(tFee);
        }
    }

    /**
     * @notice Increases the rate of how many reflections each token is worth
     */
    function _reflectTokens(uint256 tFee) private {
        uint256 rFee = tFee.mul(_getRate());
        _rTotal = _rTotal.sub(rFee);
        _totalReflections = _totalReflections.add(tFee);
    }
    
    /**
     * @notice The contract takes a portion of tokens from taxed transactions
     */
    function _takeTokens(uint256 tTakeAmount) private {
        uint256 currentRate = _getRate();
        uint256 rTakeAmount = tTakeAmount.mul(currentRate);
        _rOwned[address(this)] = _rOwned[address(this)].add(rTakeAmount);
        if(_isExcluded[address(this)]) {
            _tOwned[address(this)] = _tOwned[address(this)].add(tTakeAmount);
        }
       
    }
    
  
    /**
     * @notice Generates BNB by selling tokens and pairs some of the received BNB with tokens to add and grow the liquidity pool
     */
    function swapAndLiquify(uint256 tokenAmount) private lockSwapping {
        // Split the contract balance into the swap portion and the liquidity portion
        uint256 seventh      = tokenAmount.div(7);     // 1/7 of the tokens, used for liquidity
        uint256 swapAmount = tokenAmount.sub(seventh); // 6/7 of the tokens, used to swap for BNB

        // Capture the contract's current BNB balance so that we know exactly the amount of BNB that the
        // swap creates. This way the liquidity event wont include any BNB that has been collected by other means.
        uint256 initialBalance = address(this).balance;

        // Swap 6/7ths of RAINBOW tokens for BNB
        swapTokensForBNB(swapAmount); 

        // How much BNB did we just receive
        uint256 receivedBNB = address(this).balance.sub(initialBalance);
        
        
        uint256 liquidityBNB = receivedBNB.div(6);
        
        // Add liquidity via the PancakeSwap V2 Router
        addLiquidity(seventh, liquidityBNB);
        
        // Send the remaining BNB to the marketing wallet 2%
        uint256 marketingBNB = receivedBNB.div(6).mul(2);
        
        transferBNBToAddress(_marketingAddress, marketingBNB);

        // Send the remaining BNB to the development wallet 3%
        uint256 devleopBNB = receivedBNB.div(6).mul(3);
        
        transferBNBToAddress(_developAddress, devleopBNB);
        
        emit SwapAndLiquify(swapAmount, liquidityBNB, seventh);
    }
    
    /**
     * @notice Swap tokens for BNB storing the resulting BNB in the contract
     */
    function swapTokensForBNB(uint256 tokenAmount) private {
        // Generate the Pancakeswap pair for DHT/WBNB
        address[] memory path = new address[](2);
        path[0] = address(this);
        path[1] = _pancakeswapV2Router.WETH(); // WETH = WBNB on BSC

        _approve(address(this), address(_pancakeswapV2Router), tokenAmount);

        // Execute the swap
        _pancakeswapV2Router.swapExactTokensForETHSupportingFeeOnTransferTokens(
            tokenAmount,
            0, // Accept any amount of BNB
            path,
            address(this),
            block.timestamp.add(300)
        );
    }
    
    /**
     * @notice Swaps BNB for tokens and immedietely burns them
     */
    function swapBNBForTokens(uint256 amount) private {
        // generate the uniswap pair path of token -> weth
        address[] memory path = new address[](2);
        path[0] = _pancakeswapV2Router.WETH();
        path[1] = address(this);

        _pancakeswapV2Router.swapExactETHForTokensSupportingFeeOnTransferTokens{value: amount}(
            0, // Accept any amount of RAINBOW
            path,
            _burnAddress, // Burn address
            block.timestamp.add(300)
        );
    }

    /**
     * @notice Adds liquidity to the PancakeSwap V2 LP
     */
    function addLiquidity(uint256 tokenAmount, uint256 bnbAmount) private {
        // Approve token transfer to cover all possible scenarios
        _approve(address(this), address(_pancakeswapV2Router), tokenAmount);

        // Adds the liquidity and gives the LP tokens to the owner of this contract
        // The LP tokens need to be manually locked
        _pancakeswapV2Router.addLiquidityETH{value: bnbAmount}(
            address(this),
            tokenAmount,
            0, // Take any amount of tokens (ratio varies)
            0, // Take any amount of BNB (ratio varies)
            owner(),
            block.timestamp.add(300)
        );
    }
    
    /**
     * @notice Allows a user to voluntarily reflect their tokens to everyone else
     */
    function reflect(uint256 tAmount) public {
        require(!_isExcluded[_msgSender()], "Excluded addresses cannot call this function");
        (uint256 rAmount,,,,) = _getValues(tAmount);
        _rOwned[_msgSender()] = _rOwned[_msgSender()].sub(rAmount);
        _rTotal = _rTotal.sub(rAmount);
        _totalReflections = _totalReflections.add(tAmount);
    }
}