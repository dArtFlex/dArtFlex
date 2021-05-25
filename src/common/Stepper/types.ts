export interface IStepperProps {
  steps: IStateStep[]
  activeStep: number
}

export type State = 'none' | 'progress' | 'done'
export interface IStateStep {
  label: string
  state?: State
}
