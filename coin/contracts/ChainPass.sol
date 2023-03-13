// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract ChainPass is Initializable, ERC20Upgradeable, OwnableUpgradeable, UUPSUpgradeable {
    event AddCredential(address indexed from, string credential);

    uint16 public constant developerTax = 4;
    address public constant developerWallet = 0x6d6247501b822FD4Eaa76FCB64bAEa360279497f;

    uint16 public constant marketingTax = 1;
    address public constant marketingWallet = 0xb10131BB5749540375Eb42b9C653BB2A349a792A;

    uint public usageFee;

    mapping (address=>uint[]) private credentialBlocks;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() initializer public {
        __ERC20_init("ChainPass", "CPT");
        __Ownable_init();
        __UUPSUpgradeable_init();

        _mint(msg.sender, 5000000000 * 10 ** decimals());
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}

    function _transfer(
        address from_,
        address to_,
        uint256 amount_
    ) internal override {
        // TODO: Check if vulnerable to reentrancy attack
        uint256 fromBalance = balanceOf(from_);
        uint256 developerTaxAmount = amount_ / 100 * developerTax;
        uint256 marketingTaxAmount = amount_ / 100 * marketingTax;

        require(from_ != address(0), "ERC20: transfer from the zero address");
        require(to_ != address(0), "ERC20: transfer to the zero address");
        require(fromBalance >= amount_, "ERC20: transfer amount exceeds balance");

        uint256 taxedAmount = amount_ - developerTaxAmount - marketingTaxAmount;

        super._transfer(from_, to_, taxedAmount);
        super._transfer(from_, developerWallet, developerTaxAmount);
        super._transfer(from_, marketingWallet, marketingTaxAmount);
    }

    function addCredential(string memory credential_) payable public hasSufficientUsageFee {
        credentialBlocks[msg.sender].push(block.number);

        emit AddCredential(msg.sender, credential_);
    }

    function setUsageFee(uint256 usageFee_) public onlyOwner {
        usageFee = usageFee_;
    }

    function getCredentialBlocks(address from_) public view returns (uint[] memory) {
        return credentialBlocks[from_];
    }

    modifier hasSufficientUsageFee() {
        require(msg.value == usageFee, "Insuficcient usage fee sent");
        _;
    }
}
