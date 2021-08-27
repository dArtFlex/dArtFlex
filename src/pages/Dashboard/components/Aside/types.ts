export interface IAsideProps {
  avatar: string
  name: string
  userName: string
  walletAddress: string
  content: string
  links: ILink[] | []
  joinedToArtworks: string
}

export interface ILink {
  link?: string
  icon: JSX.Element
  href?: string
}
