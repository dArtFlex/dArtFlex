import React from 'react'
import { useFormikContext } from 'formik'
import { Box, Typography, Button } from '@material-ui/core'
import { Image, Field } from 'common'
import { IAccountSettings } from '../../types'
import { useStyles } from './styles'
import { useDispatch } from 'react-redux'
import { deleteUserPhoto } from '../../../../stores/reducers/user'

interface IUploadFileSectionProps {
  name: keyof IAccountSettings
  label?: string
  description?: string
  variant?: 'cover' | 'avatar'
  className?: string
  photoUrl?: string
}

export default function UploadFileSection(props: IUploadFileSectionProps) {
  const { name, label, description, variant, className, photoUrl } = props
  const classes = useStyles()

  const { values, setFieldValue, handleSubmit } = useFormikContext<IAccountSettings>()
  const dispatch = useDispatch()

  return (
    <Box className={className} mb={10}>
      <Typography className={classes.label}>{label}</Typography>
      <Box className={classes.box}>
        <Box className={classes.image}>
          {variant === 'avatar' ? (
            <Image file={values[name] as File | string} className={classes.avatar} src={photoUrl} />
          ) : (
            <Image file={values[name] as File | string} className={classes.cover} src={photoUrl} />
          )}
        </Box>
        <Box>
          <Typography className={classes.desctiption}>{description}</Typography>
          <Box className={classes.actions}>
            <Field type="upload" name={name} fullWidth={false} />
            <Button
              onClick={() => {
                setFieldValue(name, '')
                dispatch(deleteUserPhoto(name))
                handleSubmit()
              }}
              variant={'text'}
              classes={{ root: classes.deleteBtn }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
