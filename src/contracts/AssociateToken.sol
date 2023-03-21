  // SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.5.0 <0.9.0;
pragma experimental ABIEncoderV2;

import "https://github.com/hashgraph/hedera-smart-contracts/blob/main/contracts/hts-precompile/IHederaTokenService.sol";
  
  contract AssociateToken {
    address htsPrecompiles = address(0x167);

    constructor(address _tokenAddress) {
        address _receiver = msg.sender;
        htsPrecompiles.call(abi.encodeWithSelector(IHederaTokenService.associateToken.selector,_receiver, _tokenAddress));
    }  
  }
    