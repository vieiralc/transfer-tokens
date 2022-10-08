// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Token {
    string public name = "Lucas Test Token";
    string public symbol = "LTT";
    uint256 public totalSupply = 1000000;
    mapping(address => uint256) balance;

    constructor() {
        balance[msg.sender] = totalSupply;
    }

    function transfer(address to, uint256 amount) external {
        require(balance[msg.sender] >= amount, "Not enough LTT");
        balance[msg.sender] -= amount;
        balance[to] += amount;
    }

    function balanceOf(address account) external view returns (uint256) {
        require(
            msg.sender == account,
            "You are not allowed to access this accounts balance"
        );
        return balance[account];
    }
}
