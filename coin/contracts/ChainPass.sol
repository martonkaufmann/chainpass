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

    function getLastCredentialBlock(address from_) public view returns (uint) {
        uint[] memory blocks = credentialBlocks[from_];

        return blocks[blocks.length - 1];
    }

    modifier hasSufficientUsageFee() {
        require(msg.value == usageFee, "Insuficcient usage fee sent");
        _;
    }
    // function generateTestData() public {
    //     address[8] memory addresses = [
    //         0x7788175605244F71813E8ba255D3DaBb442F9159,
    //         0x1284214b9b9c85549aB3D2b972df0dEEf66aC2c9,
    //         0x6d6247501b822FD4Eaa76FCB64bAEa360279497f,
    //         0xE626ceB3C6CC0Bf27F6f903Ff34030d89156dcB9,
    //         0x2a12A7C1FbcBb89922205FDF28014a365cc2F418,
    //         0xC5D15eF572d27f4f3087e17Ee9099B760b1151c2,
    //         0x5CF43Cc6832Dd9bF6CDbB376aD3214e60816e4FB,
    //         0x7BFd7b2183Ec8500B65f749caa8df58a423637E8
    //     ];

    //     for(uint i = 0; i < addresses.length; i++) {
    //         address addr = addresses[i];

    //         for (uint j = 0; j < 10; j++) {
    //             credentialBlocks[addr].push(block.number + j);

    //             emit AddCredential(addr, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
    //         }
    //     }
    // }
}
