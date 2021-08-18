export interface IApprovedFormProps {
  onSubmit: () => void
}

export interface ApprovedFormState {
  bid: number
  acknowledge: boolean
  agreeTerms: boolean
  formProgress: IFormProgress
  promotion?: boolean
  offerExpiration?: string
}

type IFormProgress = 'details' | 'auction' | 'buy' | 'approved' | 'make offer' | 'confirm offer'
