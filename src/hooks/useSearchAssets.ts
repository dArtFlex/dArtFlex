import { IArtworksFiltes } from 'types'

interface IAssets {
  imageData: Pick<IData, 'name'>
  userData: Pick<IData, 'userid' | 'wallet'>
}

interface IData {
  userid: string
  wallet: string
  name: string
}

function useSearchAssets<T extends IAssets>({
  assets,
  search,
}: {
  assets: T[] | null
  search: IArtworksFiltes
}): T[] | null {
  if (!assets) {
    return null
  }
  if (!search.length) {
    return assets
  }
  return assets.filter((asset) => {
    const match = (value: string) => value.match(new RegExp(search, 'gi')) !== null
    return match(asset.imageData.name) || match(asset.userData?.userid) || match(asset.userData?.wallet)
  })
}

export default useSearchAssets
