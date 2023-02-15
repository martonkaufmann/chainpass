// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract ChainPass is Initializable, ERC20Upgradeable, OwnableUpgradeable {
    event AddCredential(address indexed from, string credential);
    event AddNote(address indexed from, string note);

    uint16 private constant _developerTax = 4;
    address private constant _developerWallet = 0x6d6247501b822FD4Eaa76FCB64bAEa360279497f;

    uint16 private constant _marketingTax = 1;
    address private constant _marketingWallet = 0xb10131BB5749540375Eb42b9C653BB2A349a792A;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }
 
    function initialize() initializer public {
        __ERC20_init("ChainPass", "CPT");
        __Ownable_init();

        _mint(msg.sender, 5000000000 * 10 ** decimals());
    }

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal override {
        uint256 fromBalance = balanceOf(from);
        uint256 developerTaxAmount = amount / 100 * _developerTax;
        uint256 marketingTaxAmount = amount / 100 * _marketingTax;

        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");
        require(fromBalance >= amount, "ERC20: transfer amount exceeds balance");

        uint256 taxedAmount = amount - developerTaxAmount - marketingTaxAmount;

        super._transfer(from, to, taxedAmount);
        super._transfer(from, _developerWallet, developerTaxAmount);
        super._transfer(from, _marketingWallet, marketingTaxAmount);
    }

    function addCredential(string memory credential) public {
        emit AddCredential(msg.sender, credential);
    }

    function addNote(string memory note) public {
        emit AddNote(msg.sender, note);
    }
}
