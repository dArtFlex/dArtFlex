export interface ApprovedSubFormProps {}

export interface IApprovedFormProps {
  tokenId: string
  onSubmit: () => void
}

export interface ApprovedFormState {
  bid: number
  acknowledge: boolean
  agreeTerms: boolean
}

export interface IFormContainer {
  tokenId: string
  formId: number
  setFormId: (formId: number) => void
}
