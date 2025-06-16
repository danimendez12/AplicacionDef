// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RWAOrderBook {
    struct Offer {
        address seller;
        uint256 amount;
        uint256 pricePerToken; // en wei
        bool active;
    }

    IERC20 public token;
    Offer[] public offers;

    event OfferCreated(uint256 indexed offerId, address indexed seller, uint256 amount, uint256 pricePerToken);
    event OfferFilled(uint256 indexed offerId, address indexed buyer, uint256 amount, uint256 totalPrice);
    event OfferCancelled(uint256 indexed offerId);

    constructor(address tokenAddress) {
        token = IERC20(tokenAddress);
    }

    // Crear una oferta de venta
    function createOffer(uint256 amount, uint256 pricePerToken) external {
        require(amount > 0, "Cantidad debe ser mayor a 0");
        require(pricePerToken > 0, "Precio debe ser mayor a 0");
        require(token.transferFrom(msg.sender, address(this), amount), "Transferencia fallida");
        offers.push(Offer({
            seller: msg.sender,
            amount: amount,
            pricePerToken: pricePerToken,
            active: true
        }));
        emit OfferCreated(offers.length - 1, msg.sender, amount, pricePerToken);
    }

    // Comprar tokens de una oferta
    function fillOffer(uint256 offerId, uint256 buyAmount) external payable {
        Offer storage offer = offers[offerId];
        require(offer.active, "Oferta no activa");
        require(buyAmount > 0 && buyAmount <= offer.amount, "Cantidad invalida");
        uint256 totalPrice = buyAmount * offer.pricePerToken;
        require(msg.value >= totalPrice, "ETH insuficiente");
        offer.amount -= buyAmount;
        if (offer.amount == 0) {
            offer.active = false;
        }
        require(token.transfer(msg.sender, buyAmount), "Transferencia de token fallida");
        payable(offer.seller).transfer(totalPrice);
        emit OfferFilled(offerId, msg.sender, buyAmount, totalPrice);
        // Reembolsar exceso de ETH
        if (msg.value > totalPrice) {
            payable(msg.sender).transfer(msg.value - totalPrice);
        }
    }

    // Cancelar una oferta (solo el vendedor)
    function cancelOffer(uint256 offerId) external {
        Offer storage offer = offers[offerId];
        require(offer.active, "Oferta no activa");
        require(offer.seller == msg.sender, "No eres el vendedor");
        offer.active = false;
        require(token.transfer(msg.sender, offer.amount), "Devolucion de tokens fallida");
        emit OfferCancelled(offerId);
    }

    // Obtener el número de ofertas
    function getOffersCount() external view returns (uint256) {
        return offers.length;
    }
}
