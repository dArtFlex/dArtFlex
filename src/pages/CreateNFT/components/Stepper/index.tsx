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
  const [activeStep, setActiveStep] = useState<IAvailableSteps>(4)

  // 1 - upload_file
  // 2 - uploading
  // 3 - filing_form
  // 4 - minting | minted

  useEffect(() => {
    if (step === 'uploading') {
      setActiveStep(1)
    }
    if (
      step === 'filled_form' &&
      (Boolean(values.name.length) === false || Boolean(values.description.length) === false)
    ) {
      setActiveStep(2)
      setSteps((state) =>
        state.map((step) => {
          return step.label === 'Uploading' ? { ...step, state: 'done' } : step
        })
      )
    }
    if (step === 'minting') {
      setActiveStep(4)
    }
    if (step === 'minted') {
      setActiveStep(4)
      setSteps((state) =>
        state.map((step) => {
          return step.label === 'Minting' ? { ...step, state: 'done' } : step
        })
      )
    }
  }, [step, activeStep])

  useEffect(() => {
    if (step === 'filled_form' && Boolean(values.name.length) && Boolean(values.description.length)) {
      setActiveStep(3)
    } else if (
      activeStep === 3 &&
      (Boolean(values.name.length) === false || Boolean(values.description.length) === false)
    ) {
      setActiveStep(2)
    }
  }, [values.name, values.description])

  useEffect(() => {
    if (values.file === null) {
      setActiveStep(0)
      setSteps(STEPS)
    }
  }, [values.file])

  return <Stepper steps={steps} activeStep={activeStep} />
}
