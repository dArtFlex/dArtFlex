export interface IApprovedFormProps {
  onSubmit: () => void
}

export interface ApprovedFormState {
  bid: number
  acknowledge: boolean
  agreeTerms: boolean
  formProgress: IFormProgress
}

type IFormProgress = 'details' | 'auction' | 'buy' | 'approved'
