// @ts-nocheck
import React from 'react'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import clsx from 'clsx'
import { useDropzone } from 'react-dropzone'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 3, 3, 0),
      width: '100%',
      display: 'inline-block',
      position: 'relative',
      '& + &>$info': {
        display: 'none',
      },
    },
    file: {
      position: 'relative',
      overflow: 'hidden',
      width: '140px',
      height: '140px',
      objectFit: 'contain',
      transition: 'background-color 200ms cubic-bezier(0.0, 0, 0.2, 1)',
      backgroundColor: ' rgba(0, 0, 0, 0.09)',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '15px 0px',
      '&>input': {
        display: 'none',
      },
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: 'rgba(0, 0, 0, 0.13)',
      },
    },
    error: {
      border: `1px solid${theme.palette.error.main}`,
    },
    errorText: {
      color: theme.palette.error.main,
    },
    img: {
      display: 'block',
      maxHeight: '100%',
    },
    imgOverlay: {
      color: '#ffffff',
      backgroundColor: theme.palette.primary.main,
      opacity: 0,
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      transition: 'opacity 200ms cubic-bezier(0.0, 0, 0.2, 1)',
      '&:hover': {
        opacity: 1,
      },
    },
    info: {
      position: 'absolute',
      top: '0',
      whiteSpace: 'nowrap',
    },
    dropzoneContainer: {
      border: '2px dashed transparent',
      '&:focus': {
        outline: 'none',
      },
    },
    active: {
      border: `2px dashed ${theme.palette.primary.main}`,
    },
  })
)

interface FileInputProps {
  name?: string
  title?: string
  customeraction?: {
    // eslint-disable-next-line
    setFieldValue?: any
    // eslint-disable-next-line
    setFieldError?: any
    // eslint-disable-next-line
    setFieldTouched?: any
    // eslint-disable-next-line
    setFieldsArray?: any
  }
  error?: string
  touched?: boolean
  helperText?: string
  value?: File | string
  id?: string
  preview?: string
  children?: JSX.Element
  desc?: string
  accept?: string | Array<string>
  maxSize?: number
  multiple?: boolean
  withoutInput?: boolean
  selectFile?: () => void
  // eslint-disable-next-line
  dependency?: any
  style?: { [key: string]: string }
  isFolderUpload?: boolean
  disabled?: boolean
  customClass?: string
}

export default function DropZoneContainer({
  name,
  title,
  children,
  desc,
  accept = '',
  maxSize = 209715200,
  multiple = true,
  error,
  helperText,
  touched,
  withoutInput,
  dependency,
  isFolderUpload = false,
  disabled = false,
  customClass,
  ...props
}: FileInputProps) {
  const classes = useStyles()

  const [fileError, setFileError] = React.useState('')
  const [active, setActive] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (error || fileError) {
      setFileError(helperText ? helperText : fileError)
    } else {
      setFileError('')
    }
  }, [error, helperText, fileError])

  const onDrop = React.useCallback((acceptedFiles) => {
    setActive(false)
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        setFileError('')
        if (props?.customeraction?.setFieldValue) props?.customeraction?.setFieldValue(name, file, acceptedFiles.length)
        if (!touched && props?.customeraction?.setFieldTouched) props?.customeraction?.setFieldTouched(name, true)
      }
      reader.readAsArrayBuffer(file)
    })
    if (props?.customeraction?.setFieldsArray) props?.customeraction?.setFieldsArray(acceptedFiles)
    // eslint-disable-next-line
  }, dependency)

  const onDropRejected = (e: DropEvent) => {
    if (!touched && props?.customeraction?.setFieldTouched) props?.customeraction?.setFieldTouched(name, true)
    let errorText: string
    if (e[0].errors[0].code === 'file-too-large') {
      errorText = `Upload failed! Maximum file size ${maxSize * 10 ** -6} MB.`
    } else {
      errorText = 'Invalid format'
    }
    e.forEach((file: File) => {
      props?.customeraction?.setFieldError(file.file.name, errorText)
    })

    setFileError(errorText)
  }

  const onDragEnter = () => {
    setActive(true)
  }

  const onDragLeave = () => {
    setActive(false)
  }

  const { getRootProps, getInputProps } = useDropzone({
    multiple,
    accept,
    onDrop,
    maxSize,
    onDropRejected,
    disabled,
    onDragEnter,
    onDragLeave,
  })

  if (children)
    return (
      <div
        {...getRootProps()}
        {...props}
        className={clsx(customClass, classes.dropzoneContainer, active && classes.active)}
      >
        {isFolderUpload && (
          <input
            {...getInputProps({ name: name })}
            webkitdirectory=""
            mozdirectory=""
            msdirectory=""
            odirectory=""
            directory=""
            multiple
          />
        )}
        {!withoutInput && <input {...getInputProps({ name: name })} />}
        {children}
        {!!fileError && (
          <Typography variant="subtitle2" className={classes.errorText}>
            {fileError}
          </Typography>
        )}
      </div>
    )

  return (
    <div className={classes.root} {...props}>
      {desc && (
        <Typography variant="subtitle2" color="secondary" className={classes.info}>
          {desc}
        </Typography>
      )}
      <div {...getRootProps()} className={clsx(classes.file, fileError && classes.error)}>
        <input {...getInputProps({ name: name })} />
        <Typography color="secondary" style={{ display: 'flex' }}>
          <CloudUploadIcon color="inherit" style={{ marginRight: '10px' }} />
          {'upload'}
        </Typography>
      </div>
      <Typography variant="subtitle2" color="secondary">
        {title}
      </Typography>

      {!!fileError && (
        <Typography variant="subtitle2" className={classes.errorText}>
          {fileError}
        </Typography>
      )}
    </div>
  )
}
