import React from 'react'
import { Box, Button, TextFieldProps, Typography, Avatar, CardMedia } from '@material-ui/core'
import FormControl from '../FormControl'
import { getFormikFieldError } from '../../lib'
import { FieldRenderProps, ITextInput, IUploadInput } from '../../types'
import { useStyles } from './styles'

export type IFormUploadInputProps = Omit<TextFieldProps, 'variant'> & IUploadInput & {}

export default function FormUploadInput(props: IFormUploadInputProps & FieldRenderProps<string>) {
  const classes = useStyles()
  const { form, field, helperText, label, description, cover, className, ...rest } = props
  const { errorText, hasError } = getFormikFieldError({ form, field })

  return (
    <FormControl error={hasError} errorText={errorText} helperText={helperText} className={className}>
      <Typography className={classes.label}>{label}</Typography>
      <Box className={classes.box}>
        {cover ? (
          <Avatar src={'https://picsum.photos/200/300'} className={classes.avatar} />
        ) : (
          <CardMedia className={classes.cover} image="https://picsum.photos/200/300" />
        )}

        <Box>
          <Typography className={classes.desctiption}>{description}</Typography>
          <Box className={classes.actions}>
            <Button variant="outlined" classes={{ root: classes.uploadBtn }}>
              Upload...
            </Button>
            <Button variant="text" classes={{ root: classes.deleteBtn }}>
              Delete
            </Button>
          </Box>
        </Box>
      </Box>
    </FormControl>
  )
}
