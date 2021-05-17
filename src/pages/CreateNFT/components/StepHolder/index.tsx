import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectMinting } from 'stores/selectors'
import { useFormikContext } from 'formik'
import { Box } from '@material-ui/core'
import { IStepNFT, ICreateNFT } from '../../types'
import { STEPS_NFT } from '../../index'

interface IStepHolderProps {
  children: any
  className?: string
}

export default function StepHolder(props: IStepHolderProps) {
  const { children, className } = props
  const { UPLOAD_FILE, UPLOADING, FILL_FORM, MINTED, LISTED } = STEPS_NFT
  const {
    minting: { uploading, minting, data },
  } = useSelector(selectMinting())

  const { values } = useFormikContext<ICreateNFT>()
  const [step, setStep] = useState<IStepNFT>(values.step)

  useEffect(() => {
    if (uploading) {
      return setStep(UPLOADING)
    }
    if (!uploading && Boolean(data.image.length)) {
      return setStep(FILL_FORM)
    }
  }, [uploading])

  useEffect(() => {
    if (values.step !== step) {
      setStep(values.step)
    }
  }, [values.step])

  return <Box className={className}>{children({ step })}</Box>
}
