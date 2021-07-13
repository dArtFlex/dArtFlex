import React, { useEffect, useState } from 'react'
import { IMakeOfferForm } from '../types'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Select as MUISelect,
  Typography,
} from '@material-ui/core'
import { useStyles } from '../styles'
import { ArrowLeftIcon, InfoIcon } from '../../../common/icons'
import clsx from 'clsx'
import { Field, Select } from '../../../common'
import DateFnsUtils from '@date-io/date-fns'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import appConst from '../../../config/consts'
import { daysInMonth } from '../../../utils'
import { ISellArtwork } from '../../SellNFT/types'
import { useFormikContext } from 'formik'

const {
  SCHEDULE: { DAYS3, DAYS5, WEEK, MONTH, SPECIFIC, NEVER },
} = appConst

const schedule = [
  {
    value: DAYS3,
    label: '3 days',
  },
  {
    value: DAYS5,
    label: '5 days',
  },
  {
    value: MONTH,
    label: '1 month',
  },
  {
    value: SPECIFIC,
    label: 'Custom Date',
  },
]

export default function FormConfirmOffer(props: IMakeOfferForm) {
  const classes = useStyles()

  const { values, setFieldValue, handleSubmit } = useFormikContext<{ offerExpiration: string; endDate: string }>()
  const days = daysInMonth(new Date().getDay(), new Date().getFullYear())

  useEffect(() => {
    switch (values.offerExpiration) {
      case '5days':
        return setFieldValue('endDate', new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 5))
      case '3days':
        return setFieldValue('endDate', new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 3))
      case 'week':
        return setFieldValue('endDate', new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7))
      case 'month':
        return setFieldValue('endDate', new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * days))
    }
  }, [values.offerExpiration])

  const [sortValue, setSortValue] = useState('3days')

  const [datePicker, setDatePicker] = useState(false)

  const [date, setDate] = React.useState<Date>(new Date())

  function onSort({ target }: React.ChangeEvent<{ value: unknown }>) {
    if (target.value === 'customDate') {
      setDatePicker(true)
    } else {
      setDatePicker(false)
    }

    setSortValue(target.value as string)
  }

  const sortItems = [
    {
      label: 'in 3 days',
      value: '3days',
    },
    {
      label: 'in 7 days',
      value: '7days',
    },
    {
      label: 'A month',
      value: 'month',
    },
    {
      label: 'Custom Date',
      value: 'customDate',
    },
  ]

  return (
    <Box className={classes.formConfirmOffer}>
      <Box className={classes.formConfirmOfferWrapper}>
        <Box className={classes.flexBox}>
          <IconButton className={classes.backIcon} onClick={() => props.setFormId(1)}>
            <ArrowLeftIcon />
          </IconButton>
          <Typography variant="h1">Make offer</Typography>
        </Box>
        <Box mt={4} className={classes.flexBox}>
          <span>This item hasn&apos;t been reviewed by dArtflex</span>
          <Icon className={clsx(classes.flexBox, classes.infoIcon)}>
            <InfoIcon />
          </Icon>
        </Box>
        <Box className={clsx(classes.flexBox, classes.makeOfferBlock, classes.spaceContent)}>
          <Typography variant={'body1'} className={classes.textSecondary}>
            Your Balance
          </Typography>
          <span className={classes.textBold}>2.435 ETH</span>
        </Box>
        <OutlinedInput
          id="outlined-adornment-weight"
          endAdornment={
            <InputAdornment position="end">
              <Typography className={classes.adornmentText}>ETH</Typography>
            </InputAdornment>
          }
          className={classes.makeOfferInput}
          fullWidth
          classes={{ focused: classes.focusedInput }}
        />
        <Box>
          <Typography className={classes.descriptionText}>$1234.45</Typography>
        </Box>
        <Box mt={6}>
          <Typography className={classes.textBold}>Offer expiration</Typography>
        </Box>
        <Box className={clsx(classes.flexBox, classes.dateSelect)}>
          {/*<FormControl variant="outlined" color={'primary'} className={classes.datePickerWrapper}>*/}
          {/*  <MUISelect*/}
          {/*    style={{ minWidth: '155px' }}*/}
          {/*    value={sortValue}*/}
          {/*    defaultValue={'in 3 days'}*/}
          {/*    onChange={onSort}*/}
          {/*    MenuProps={{*/}
          {/*      PopoverClasses: {*/}
          {/*        paper: classes.selectPopover,*/}
          {/*      },*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    {sortItems.map(({ label, value }) => (*/}
          {/*      <Select key={value} value={value}>*/}
          {/*        {label}*/}
          {/*      </Select>*/}
          {/*    ))}*/}
          {/*  </MUISelect>*/}
          {/*</FormControl>*/}
          {/*{datePicker && (*/}
          {/*  <MuiPickersUtilsProvider utils={DateFnsUtils}>*/}
          {/*    <DateTimePicker*/}
          {/*      value={date}*/}
          {/*      onChange={(newDate) => setDate(newDate)}*/}
          {/*      ampm={false}*/}
          {/*      classes={{}}*/}
          {/*      className={clsx(classes.timePickerWrapper, classes.timePicker)}*/}
          {/*      format={'MM/dd/yyyy hh:mm'}*/}
          {/*    />*/}
          {/*  </MuiPickersUtilsProvider>*/}
          {/*)}*/}
          <Field type="select" options={schedule} name="offerExpiration" fullWidth={false} />
          {values.offerExpiration === SPECIFIC && (
            <Field type="picker" name="endDate" fullWidth={false} date={date} setDate={setDate} />
          )}
        </Box>
        <Box mt={6}>
          <Box className={classes.rulesBox}>
            <Checkbox color="primary" classes={{ root: classes.checkBox }} />
            <span>I acknowledge that this item has not been reviewed or approved by dArtflex</span>
          </Box>
          <Box className={classes.rulesBox}>
            <Checkbox color="primary" classes={{ root: classes.checkBox }} />
            <span>I agree with dArtflex&apos;s Terms and Services</span>
          </Box>
          <Box mt={8}>
            <Button
              className={classes.makeOfferBlockContent}
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => handleSubmit()}
            >
              Make Offer
            </Button>
          </Box>
        </Box>
      </Box>
      <Typography align={'center'} className={clsx(classes.textBold, classes.bottomInfoText)}>
        Learn how our auctions work
      </Typography>
    </Box>
  )
}
