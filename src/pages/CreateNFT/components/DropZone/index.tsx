//@ts-nocheck
import React, { useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import { useFormikContext } from 'formik'
import { DropZone as DropZoneContainer } from 'common'
import { Box, Typography } from '@material-ui/core'
import { UploadIcon } from 'common/icons'
import { ICreateNFT } from '../../types'
import { clearLazyMintingData, uploadImageRequest } from 'stores/reducers/minting'
import { acceptFileTypes } from 'utils'
import { useStyles } from './styles'
import { selectListing, selectMinting } from '../../../../stores/selectors'

const MAZ_SIZE_40 = 40000000
const FILE_EXT = '.jpg'

export default function DropZone() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { values, setFieldValue, setFieldError } = useFormikContext<ICreateNFT>()

  const {
    minting: { minting, src },
  } = useSelector(selectMinting())
  const {
    listing: { listing },
  } = useSelector(selectListing())

  const asseptType = useMemo(() => (FILE_EXT ? acceptFileTypes(FILE_EXT) : ''), [FILE_EXT])

  useEffect(() => {
    if (values.file) {
      dispatch(uploadImageRequest({ file: values.file }))
    }
  }, [values.file])

  useEffect(() => {
    if ((minting !== 'done' || listing !== 'done') && src !== 'album') {
      dispatch(clearLazyMintingData())
    }
  }, [])

  return (
    <DropZoneContainer
      accept={asseptType}
      maxSize={MAZ_SIZE_40}
      multiple={false}
      name="file"
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
          <Typography className={classes.titleText}>Upload</Typography>
          <Box pt={2} pb={2}>
            <Typography className={classes.mainText}>Max size 40Mb, format jpg, png, gif</Typography>
          </Box>
          <Typography className={clsx(classes.mainText, classes.footer)}>Or Drag And Drop</Typography>
        </Box>
      </Box>
    </DropZoneContainer>
  )
}
