// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "./interfaces/IBVToken.sol";

contract BVToken is Context, IBVToken {
    using SafeMath for uint256;

    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    uint256 private _totalSupply;
    string public _name;
    string public _symbol;
    uint8 public _decimals;
    mapping(uint256 => address) privateWhitelist;
    mapping(uint256 => address) preWhitelist;

    constructor() {
        _name = "Block Volt";
        _symbol = "BV";
        _decimals = 18;
        _totalSupply = 1 * 10**12 * 10**18; // 500m
        _balances[msg.sender] = _totalSupply;
    }

    /**
     * @dev Returns the token decimals.
     */
    function decimals() external view virtual override returns (uint8) {
        return _decimals;
    }

    /**
     * @dev Returns the token symbol.
     */
    function symbol() external view virtual override returns (string memory) {
        return _symbol;
    }

    
    /**
     * @dev Returns the token name.
     */
    function name() external view virtual override returns (string memory) {
        return _name;
    }

    /**
     * @dev See total supply of token.
     */
    function totalSupply() external view virtual override returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev See balance of account.
     */
    function balanceOf(address account)
        external
        view
        virtual
        override
        returns (uint256)
    {
        return _balances[account];
    }

    /**
     * @dev transfer token from msg.sender to recipient
     * @param _recipient address of account to receive token,
     *                   where it cannot be zero
     * @param _amount amount of token to transfer
     */
    function transfer(address _recipient, uint256 _amount)
        external
        override
        returns (bool)
    {
        _transfer(_msgSender(), _recipient, _amount);
        return true;
    }

    /**
     * @dev get allowance spender by owner
     * @param _owner owner of token
     * @param _spender account to be approved.
     */
    function allowance(address _owner, address _spender)
        external
        view
        override
        returns (uint256)
    {
        return _allowances[_owner][_spender];
    }

    /**
     * @dev approve spender by owner
     * @param _spender account to be approved
     * @param _amount amount to transfer
     */
    function approve(address _spender, uint256 _amount)
        external
        override
        returns (bool)
    {
        _approve(_msgSender(), _spender, _amount);
        return true;
    }

    /**
     * @dev transfer token from _sender to _recipient and update allowance
     */
    function transferFrom(
        address _sender,
        address _recipient,
        uint256 _amount
    ) external override returns (bool) {
        _transfer(_sender, _recipient, _amount);
        _approve(
            _sender,
            _msgSender(),
            _allowances[_sender][_msgSender()].sub(
                _amount,
                "BVT: transfer amount exceeds allowance"
            )
        );
        return true;
    }

    /**
     * @dev Atomically increases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {BEP20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     */
    function increaseAllowance(address _spender, uint256 _addedValue)
        public
        returns (bool)
    {
        _approve(
            _msgSender(),
            _spender,
            _allowances[_msgSender()][_spender].add(_addedValue)
        );
        return true;
    }

    /**
     * @dev Atomically decreases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {BEP20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     */
    function decreaseAllowance(address _spender, uint256 _subtractedValue)
        public
        returns (bool)
    {
        _approve(
            _msgSender(),
            _spender,
            _allowances[_msgSender()][_spender].sub(
                _subtractedValue,
                "HYT: decreased allowance below zero"
            )
        );
        return true;
    }

    /**
     * @dev Destroys `_amount` tokens from the caller.
     */
    function burn(uint256 _amount) public virtual {
        _burn(_msgSender(), _amount);
    }

    /**
     * @dev Moves tokens `amount` from `sender` to `recipient`.
     *
     * This is internal function is equivalent to {transfer}, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a {Transfer} event.
     *
     * Requirements:
     *
     * - `sender` cannot be the zero address.
     * - `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     */
    function _transfer(
        address _sender,
        address _recipient,
        uint256 _amount
    ) internal {
        require(_sender != address(0), "BVT: transfer from the zero address");
        require(_recipient != address(0), "BVT: transfer to the zero address");

        _balances[_sender] = _balances[_sender].sub(
            _amount,
            "BVT: transfer _amount exceeds balance"
        );
        _balances[_recipient] = _balances[_recipient].add(_amount);
        emit Transfer(_sender, _recipient, _amount);
    }

    /**
     * @dev Destroys `amount` tokens from `_account`, reducing the
     * total supply.
     *
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * Requirements
     *
     * - `_account` cannot be the zero address.
     * - `_account` must have at least `_amount` tokens.
     */
    function _burn(address _account, uint256 _amount) internal {
        require(_account != address(0), "BVT: burn from the zero address");

        _balances[_account] = _balances[_account].sub(
            _amount,
            "BVT: burn amount exceeds balance"
        );
        _totalSupply = _totalSupply.sub(_amount);
        emit Transfer(_account, address(0), _amount);
    }

    /**
     * @dev Sets `_amount` as the allowance of `spender` over the `_owner`s tokens.
     *
     * This is internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     *
     * Emits an {Approval} event.
     *
     * Requirements:
     *
     * - `_owner` cannot be the zero address.
     * - `_spender` cannot be the zero address.
     */
    function _approve(
        address _owner,
        address _spender,
        uint256 _amount
    ) internal {
        require(_owner != address(0), "BVT: approve from the zero address");
        require(_spender != address(0), "BVT: approve to the zero address");

        _allowances[_owner][_spender] = _amount;
        emit Approval(_owner, _spender, _amount);
    }
}
