export interface IFormOfferContainer {
  tokenId: string
  formId: number
  setFormId: (formId: number) => void
}

export interface IApprovedFormProps {
  tokenId: string
  onSubmit: () => void
}

export interface ApprovedFormState {
  bid: number
  acknowledge: boolean
  agreeTerms: boolean
}
