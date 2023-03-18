  // SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.5.0 <0.9.0;
pragma experimental ABIEncoderV2;

import "./HederaTokenService.sol";
  
  contract AssociateToken is HederaTokenService{

    function associateTokenFcn(address _tokenAddress) public {
        // require(msg.value > 500000000, "Send more than 5 HBAR to claim your tokens!");
        
        // int64 tokenAmount = 100;
        address _receiver = msg.sender;

        HederaTokenService.associateToken(_receiver, _tokenAddress);

        // (int responseCode2) =
        // HederaTokenService.transferToken(fTokenAddress, address(this), receiver, tokenAmount);

        // if (responseCode2 != HederaResponseCodes.SUCCESS) {
        //     revert ();     
        // }

        // emit ResponseCode(responseCode2);
    }
  }
    