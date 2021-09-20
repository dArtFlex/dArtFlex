import React from 'react'
import { useDispatch } from 'react-redux'
import { cancelledStyleTransfer } from 'stores/reducers/constructor'
import { Box, Button, Typography } from '@material-ui/core'
import { ArrowLeftIcon, EmptyImageIcon } from 'common/icons'
import { useStyles } from './styles'
import { useTextDotLoader } from 'hooks'

export default function LoadingConstructorFrom({ setFilesSource }: { setFilesSource: () => void }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { textLoader } = useTextDotLoader({
    text: `Waiting.`,
  })

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
        <Button
          variant={'text'}
          startIcon={<ArrowLeftIcon />}
          className={classes.btnBack}
          onClick={() => {
            dispatch(cancelledStyleTransfer())
            setFilesSource()
          }}
        >
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
