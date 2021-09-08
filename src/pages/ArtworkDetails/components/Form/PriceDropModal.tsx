import React from 'react'
import { useFormikContext } from 'formik'
import { Box, Typography, Button, makeStyles, Theme, createStyles, Modal } from '@material-ui/core'
import { Field, InputAdornment } from 'common'
import { ApprovedFormState } from '../../types'
import { validatePrice } from 'utils'

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
    modalFields: {
      width: '100%',
      minHeight: 88,
    },
  })
)

interface IPriceDropModalProps {
  open: boolean
  onCancel: () => void
  onSubmit: (value: string) => void
  tokenName: string
  fetching: boolean
}

export default function PriceDropModal(props: IPriceDropModalProps) {
  const classes = useStyles()
  const { open, onCancel, onSubmit, tokenName, fetching } = props
  const { values, handleSubmit } = useFormikContext<ApprovedFormState>()
  return (
    <Modal open={open} onClose={onCancel} className={classes.modal}>
      <Box className={classes.modalBox}>
        <Typography>Drop Listing Price</Typography>
        <Box className={classes.modalFields}>
          <Field
            name="priceDrop"
            type="input"
            variant="outlined"
            validate={validatePrice}
            InputProps={{
              startAdornment: <InputAdornment position="start" placeholder={tokenName} />,
            }}
          />
        </Box>
        <Box className={classes.modalButtons}>
          <Button variant={'outlined'} color={'secondary'} fullWidth onClick={onCancel}>
            Nevermind
          </Button>
          <Button
            variant={'contained'}
            color={'primary'}
            fullWidth
            onClick={() => {
              handleSubmit()
              onSubmit(values.priceDrop)
            }}
            disabled={fetching}
          >
            Set new price
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
