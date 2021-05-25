import React, { useRef, useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import { IUploadFile } from './types'
import { useStyles } from './styles'
// import { acceptFileTypes } from 'utils'

export default function UploadFile(props: IUploadFile) {
  const {
    // accept,
    maxSize = 10000000,
    multiple = false,
    name,
    error,
    touched,
    helperText,
    label = 'Upload...',
    classNames,
    ...rest
  } = props
  const classes = useStyles()
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [fileError, setFileError] = useState('')

  useEffect(() => {
    if (error) {
      setFileError(helperText ? helperText : fileError)
    } else {
      setFileError('')
    }
  }, [error, helperText, fileError])

  const onUpload = () => {
    if (!multiple) {
      const files = fileRef?.current?.files as FileList
      setFileError('')
      if (props?.customeraction?.setFieldValue) props?.customeraction?.setFieldValue(name, files[0], files.length)
      if (!touched && props?.customeraction?.setFieldTouched) props?.customeraction?.setFieldTouched(name, true)
    }
  }

  return (
    <Button {...rest} id={name} component="label" classes={{ root: classNames?.root }}>
      {label}
      <input
        id="upload-path"
        ref={fileRef}
        onChange={onUpload}
        className={classes.attachFileInput}
        type="file"
        data-max-size={maxSize}
        multiple={multiple}
        hidden
      />
    </Button>
  )
}
