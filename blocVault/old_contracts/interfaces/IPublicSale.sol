// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

interface IPublicSale {
    function checkBUSDFunds(address _addr) external returns (uint256);

    function checkBNBFunds(address _addr) external returns (uint256);

    function getBUSDBalance() external returns (uint256);

    function getBVTBalance() external returns (uint256);

    function updateDeadline(uint256 _dead, uint256 _publish) external;

    function updateStart(uint256 _start) external;

    function withdrawBUSD() external returns (uint256 balance);

    function withdrawBVT() external returns (uint256 balance);

    function withdrawBNB() external payable;
}
