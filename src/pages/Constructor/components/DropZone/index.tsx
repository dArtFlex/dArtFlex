//@ts-nocheck
import React, { useMemo } from 'react'
import clsx from 'clsx'
import { useFormikContext } from 'formik'
import { DropZone as DropZoneContainer } from 'common'
import { Box, Typography } from '@material-ui/core'
import { UploadIcon } from 'common/icons'
import { ICreateNFT } from '../../types'
import { acceptFileTypes } from 'utils'
import { IDropZoneProps } from './types'
import { useStyles } from './styles'

const MAZ_SIZE_40 = 40000000
const FILE_EXT = '.jpg'

export default function DropZone(props: IDropZoneProps) {
  const { name, title = 'Upload' } = props
  const classes = useStyles()
  const { setFieldValue, setFieldError } = useFormikContext<ICreateNFT>()

  const asseptType = useMemo(() => (FILE_EXT ? acceptFileTypes(FILE_EXT) : ''), [FILE_EXT])

  return (
    <DropZoneContainer
      accept={asseptType}
      maxSize={MAZ_SIZE_40}
      multiple={false}
      name={name}
      customClass={classes.flexBox}
      customeraction={{
        setFieldValue,
        setFieldError,
      }}
    >
      <Box className={classes.container}>
        <Box className={classes.flexBox}>
          <Box pb={5.5}>
            <UploadIcon />
          </Box>
          <Typography className={classes.titleText}>{title}</Typography>
          <Box pt={2} pb={2}>
            <Typography className={classes.mainText}>Max size 40Mb, format jpg, png, gif</Typography>
          </Box>
          <Typography className={clsx(classes.mainText, classes.footer)}>Or Drag And Drop</Typography>
        </Box>
      </Box>
    </DropZoneContainer>
  )
}
