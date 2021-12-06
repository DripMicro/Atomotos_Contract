// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

interface IPublicSale {
    function getBVTBalance() external returns (uint256);

    function updateDeadline(uint256 _dead) external;

    function updateStart(uint256 _start) external;

    function withdrawBVT() external returns (uint256 balance);

    function withdrawBNB() external payable;
}
