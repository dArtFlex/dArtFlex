import React from 'react'
import { Box, Typography, Button, makeStyles, Theme, createStyles, Modal } from '@material-ui/core'
import { CircularProgressLoader } from 'common'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalBox: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: theme.palette.white,
      width: 628,

      padding: theme.spacing(8),
      gap: 14,
      borderRadius: theme.spacing(3),
      outline: 'none',
      [theme.breakpoints.down(720)]: {
        width: '96vw',
      },
    },
    modalButtons: {
      display: 'flex',
      width: '100%',
      gap: 14,
    },
  })
)

interface IPriceDropModalProps {
  open: boolean
  onCancel: () => void
  onSubmit: () => void
  title?: string
  desc?: string
  fetching: boolean
  btnCancelText?: string
  btnSubmitText?: string
}

export default function ConfirmationModal(props: IPriceDropModalProps) {
  const classes = useStyles()
  const { open, onCancel, onSubmit, fetching, title, desc, btnCancelText = 'No', btnSubmitText = 'Yes' } = props

  return (
    <Modal open={open} onClose={onCancel} className={classes.modal}>
      <Box className={classes.modalBox}>
        {title && <Typography variant={'h3'}>{title}</Typography>}
        {desc && <Typography variant={'body1'}>{desc}</Typography>}
        <Box className={classes.modalButtons}>
          <Button variant={'outlined'} color={'secondary'} fullWidth onClick={onCancel}>
            {btnCancelText}
          </Button>
          <Button
            variant={'contained'}
            color={'primary'}
            fullWidth
            onClick={onSubmit}
            disabled={fetching}
            startIcon={fetching ? <CircularProgressLoader size={24} color={'secondary'} /> : null}
          >
            {btnSubmitText}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
