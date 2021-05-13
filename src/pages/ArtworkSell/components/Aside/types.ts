import appConst from 'config/consts'

const {
  FILTER_VALUES: { IN_AUCTION, BUY_NOW },
} = appConst
export interface IAsideProps {
  form: typeof IN_AUCTION | typeof BUY_NOW
}
