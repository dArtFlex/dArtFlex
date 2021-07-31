import React from 'react'
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
  royalties: '',
  step: STEPS_NFT.UPLOAD_FILE,
  tags: ['default'], // Todo: Should be changed after tags field has been implemented
}

export default function CreateNFT() {
  const classes = useStyles()

  return (
    <PageWrapper className={classes.container}>
      <Form
        initialValues={initialData}
        onSubmit={(state: ICreateNFT) => console.log('y', state)}
        validationSchema={useValidationSchema()}
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
