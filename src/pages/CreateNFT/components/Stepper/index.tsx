import React, { useState, useEffect } from 'react'
import { useFormikContext } from 'formik'
import { Stepper } from 'common'
import { ICreateNFTStepper, IAvailableSteps } from './types'
import { ICreateNFT } from '../../types'
import { STEPS } from './const'
import { IStepperProps } from 'common/Stepper/types'

export default function CreateNFTStepper(props: ICreateNFTStepper) {
  const { step } = props
  const { values } = useFormikContext<ICreateNFT>()
  const [steps, setSteps] = useState<IStepperProps['steps']>(STEPS)
  const [activeStep, setActiveStep] = useState<IAvailableSteps>(0)

  useEffect(() => {
    if (step === 'uploading') {
      setActiveStep(1)
    }
    if (step === 'filled_form') {
      setActiveStep(2)
      setSteps((state) =>
        state.map((step) => {
          return step.label === 'Uploading' ? { ...step, state: 'done' } : step
        })
      )
    }
    if (step === 'minting') {
      setActiveStep(3)
    }
  }, [step])

  useEffect(() => {
    if (Boolean(values.name.length) && Boolean(values.description.length)) {
      setActiveStep(3)
    } else {
      setActiveStep(2)
    }
  }, [values.name, values.description])

  return <Stepper steps={steps} activeStep={activeStep} />
}
