export const DOMAIN_TYPE = [
  {
    type: 'string',
    name: 'name',
  },
  {
    type: 'string',
    name: 'version',
  },
  {
    type: 'uint256',
    name: 'chainId',
  },
  {
    type: 'address',
    name: 'verifyingContract',
  },
]

export const ERC721Types = {
  Part: [
    { name: 'account', type: 'address' },
    { name: 'value', type: 'uint96' },
  ],
  Mint721: [
    { name: 'tokenId', type: 'uint256' },
    { name: 'tokenURI', type: 'string' },
    { name: 'creators', type: 'Part[]' },
    { name: 'royalties', type: 'Part[]' },
  ],
}

export const ZERO = '0x0000000000000000000000000000000000000000'

export const ORDER_TYPES = {
  AssetType: [
    { name: 'assetClass', type: 'bytes4' },
    { name: 'data', type: 'bytes' },
  ],
  Asset: [
    { name: 'assetType', type: 'AssetType' },
    { name: 'value', type: 'uint256' },
  ],
  Order: [
    { name: 'maker', type: 'address' },
    { name: 'makeAsset', type: 'Asset' },
    { name: 'taker', type: 'address' },
    { name: 'takeAsset', type: 'Asset' },
    { name: 'salt', type: 'uint256' },
    { name: 'start', type: 'uint256' },
    { name: 'end', type: 'uint256' },
    { name: 'dataType', type: 'bytes4' },
    { name: 'data', type: 'bytes' },
  ],
}

export const LAZY_MINT_NFT_ENCODE_PARAMETERS = [
  'address',
  'tuple(uint256, string, tuple(address, uint256)[], tuple(address, uint256)[], bytes[])',
]

export const NFT_ENCODE_PARAMETERS = ['address', 'uint256']
