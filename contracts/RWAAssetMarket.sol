// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RWAAssetMarket is ERC20 {
    address public owner;
    uint256 public tokenPrice; // en wei por token

    constructor(string memory name, string memory symbol, uint256 initialSupply, uint256 _tokenPrice) ERC20(name, symbol) {
        owner = msg.sender;
        _mint(msg.sender, initialSupply);
        tokenPrice = _tokenPrice;
    }

    // Comprar tokens enviando ETH
    function buyTokens() public payable {
        require(msg.value > 0, "Debes enviar ETH para comprar tokens");
        uint256 amount = (msg.value * 1 ether) / tokenPrice;
        require(balanceOf(owner) >= amount, "No hay suficientes tokens en el contrato");
        _transfer(owner, msg.sender, amount);
    }

    // Vender tokens y recibir ETH
    function sellTokens(uint256 amount) public {
        require(balanceOf(msg.sender) >= amount, "No tienes suficientes tokens");
        uint256 ethAmount = (amount * tokenPrice) / 1 ether;
        require(address(this).balance >= ethAmount, "El contrato no tiene suficiente ETH");
        _transfer(msg.sender, owner, amount);
        payable(msg.sender).transfer(ethAmount);
    }

    // Permitir que el owner retire ETH acumulado
    function withdraw() public {
        require(msg.sender == owner, "Solo el owner puede retirar");
        payable(owner).transfer(address(this).balance);
    }

    // Permitir que el owner cambie el precio
    function setTokenPrice(uint256 newPrice) public {
        require(msg.sender == owner, "Solo el owner puede cambiar el precio");
        tokenPrice = newPrice;
    }

    // Recibir ETH directamente
    receive() external payable {
        buyTokens();
    }
}
