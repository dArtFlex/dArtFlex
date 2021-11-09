import React, { useEffect } from 'react'
import { useFormikContext } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { selectConstructor } from 'stores/selectors'
import { cancelledStyleTransfer } from 'stores/reducers/constructor'
import { Box, Button, Typography } from '@material-ui/core'
import { ArrowLeftIcon, EmptyImageIcon } from 'common/icons'
import { useStyles } from './styles'
import { useTextDotLoader } from 'hooks'
import { IConstructor } from '../../../types'

export default function LoadingConstructorFrom({ setFilesSource }: { setFilesSource: () => void }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { fetching } = useSelector(selectConstructor())

  const { values, setFieldValue } = useFormikContext<IConstructor>()

  const { textLoader } = useTextDotLoader({
    text: `Waiting.`,
  })

  const handleBack = () => {
    dispatch(cancelledStyleTransfer())
    setFilesSource()
    setFieldValue(`file0`, '')
    setFieldValue(`file1`, '')
  }

  useEffect(() => {
    if (!fetching && !values.file0 && !values.file1) {
      handleBack()
    }
  }, [fetching, values.file0, values.file1])

  return (
    <Box className={classes.generatedContainer}>
      <Box>
        <Box className={classes.imageBox}>
          <Box className={classes.image}>
            <EmptyImageIcon />
          </Box>
        </Box>
      </Box>
      <Box className={classes.genetatedForm}>
        <Button variant={'text'} startIcon={<ArrowLeftIcon />} className={classes.btnBack} onClick={handleBack}>
          Back
        </Button>
        <Box mb={10}>
          <Typography variant={'h1'}>{textLoader}</Typography>
          <Typography variant={'body1'} color={'textSecondary'}>
            Images added to processing queue successfully
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
