import { IStepNFT } from '../../types'

export interface ICreateNFTStepper {
  step: IStepNFT
}

export type IAvailableSteps = 0 | 1 | 2 | 3 | 4 | 5
