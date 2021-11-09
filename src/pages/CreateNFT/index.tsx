import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectMinting } from 'stores/selectors'
import { Box } from '@material-ui/core'
import { PageWrapper, Form } from 'common'
import { DropZone, StepHolder, Uploading, Form as FormCreateNFT, Stepper } from './components'
import { ICreateNFT, IStepNFT } from './types'
import { useStyles } from './styles'
import { useValidationSchema } from './lib'

export const STEPS_NFT = {
  UPLOAD_FILE: 'upload_file',
  UPLOADING: 'uploading',
  FILL_FORM: 'filled_form',
  MINT_NFT: 'mint_NFT',
  MINTING: 'minting',
  MINTED: 'minted',
  LISTED: 'listed',
}

const initialData: ICreateNFT = {
  file: null,
  name: '',
  description: '',
  hashtags: [],
  royalties: 10,
  step: STEPS_NFT.UPLOAD_FILE,
}

export default function CreateNFT() {
  const classes = useStyles()
  const { minting } = useSelector(selectMinting())
  const {
    file,
    data: { name, description },
  } = minting

  const [initialValues, setInitialValues] = useState<ICreateNFT>(initialData)
  useEffect(() => {
    setInitialValues({ ...initialValues, file, name, description })
  }, [file, name, description])

  return (
    <PageWrapper className={classes.container}>
      <Form
        initialValues={initialValues}
        onSubmit={(state: ICreateNFT) => console.log('y', state)}
        validationSchema={useValidationSchema()}
        enableReinitialize
      >
        <Box>
          <StepHolder>
            {({ step }: { step: IStepNFT }) => (
              <>
                <Stepper step={step} />
                {step === STEPS_NFT.UPLOAD_FILE && <DropZone />}
                {step === STEPS_NFT.UPLOADING && <Uploading />}
                {(step === STEPS_NFT.FILL_FORM || step === STEPS_NFT.MINTED || step === STEPS_NFT.LISTED) && (
                  <FormCreateNFT />
                )}
              </>
            )}
          </StepHolder>
        </Box>
      </Form>
    </PageWrapper>
  )
}
