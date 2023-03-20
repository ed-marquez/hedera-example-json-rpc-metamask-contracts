  // SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.5.0 <0.9.0;
pragma experimental ABIEncoderV2;

import "./HederaResponseCodes.sol";
import "./IHederaTokenService.sol";
import "./HederaTokenService.sol";
  
  contract AssociateToken is HederaTokenService{
      event ResponseCode(int responseCode);

    function associateTokenFcn(address _tokenAddress) public {
        address _receiver = msg.sender;
        (int responseCode) = HederaTokenService.associateToken(_receiver, _tokenAddress);

        if (responseCode != HederaResponseCodes.SUCCESS) {
            revert ();     
        }

        emit ResponseCode(responseCode);
    }
  }
    