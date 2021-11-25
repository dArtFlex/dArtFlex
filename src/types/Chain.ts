export enum IEthereumChainIds {
  ID_1 = 1,
  ID_0x1 = '0x1',
}

export enum IBinanceChainIds {
  ID_56 = 56,
  ID_0x38 = '0x38',
}

export enum IPolygonChainIds {
  ID_137 = 137,
  ID_0x89 = '0x89',
  ID_0x137 = '0x137',
}

export enum IRinkebyChainIds {
  ID_4 = 4,
  ID_0x4 = '0x4',
}

export enum IBinanceTestnetChainIds {
  ID_97 = 97,
  ID_0x61 = '0x61',
}

export const INetworkChains = {
  ...IEthereumChainIds,
  ...IBinanceChainIds,
  ...IPolygonChainIds,
  ...IRinkebyChainIds,
  ...IBinanceTestnetChainIds,
}
