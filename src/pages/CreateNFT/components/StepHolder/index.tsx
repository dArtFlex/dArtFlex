import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectMinting, selectListing } from 'stores/selectors'
import { useFormikContext } from 'formik'
import { Box } from '@material-ui/core'
import { IStepNFT, ICreateNFT } from '../../types'
import { STEPS_NFT } from '../../index'

interface IStepHolderProps {
  children: ({ step }: { step: IStepNFT }) => React.ReactChild
  className?: string
}

export default function StepHolder(props: IStepHolderProps) {
  const { children, className } = props
  const {
    minting: { uploading, data, minting },
  } = useSelector(selectMinting())
  const {
    listing: { listing },
  } = useSelector(selectListing())

  const { values } = useFormikContext<ICreateNFT>()
  const [step, setStep] = useState<IStepNFT>(values.step)

  useEffect(() => {
    if (listing === 'done') {
      return setStep(STEPS_NFT.LISTED)
    }
  }, [listing])

  useEffect(() => {
    if (listing !== 'done' && minting === 'done') {
      return setStep(STEPS_NFT.MINTED)
    }
  }, [minting])

  useEffect(() => {
    if (minting !== 'done') {
      if (uploading) {
        return setStep(STEPS_NFT.UPLOADING)
      }
      if (!uploading && Boolean(data.image.length)) {
        return setStep(STEPS_NFT.FILL_FORM)
      }
    }
  }, [uploading])

  useEffect(() => {
    if (values.step !== step) {
      setStep(values.step)
    }
  }, [values.step])

  useEffect(() => {
    if (minting !== 'done' && values.file === null) {
      setStep(STEPS_NFT.UPLOAD_FILE)
    }
  }, [values.file])

  return <Box className={className}>{children({ step })}</Box>
}
