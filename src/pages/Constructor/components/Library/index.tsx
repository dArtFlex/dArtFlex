import React, { useState } from 'react'
import { FieldArray, useFormikContext } from 'formik'
import { Box, Typography } from '@material-ui/core'
import { HashTagsFilter } from 'common'
import { CardImage, SelectedPreview } from '../../components'
import { IConstructor } from '../../types'
import { useStyles } from './styles'

const hashTags = ['all', '#General', '#Portraits', '#Landscapes', '#Sci Bio Art', '#Characters']

export default function Library() {
  const classes = useStyles()
  const { values, setFieldValue } = useFormikContext<IConstructor>()

  const [switchFile, setSwitchFile] = useState<0 | 1>(0)

  const onSelect = (tokenId: string, src: string, selected: boolean) => {
    // Selected value is false as this event triggered before selection
    if (selected === false) {
      setFieldValue(`file${switchFile}`, src)
      setFieldValue(`tokenId${switchFile}`, tokenId)
      setSwitchFile(switchFile ? 0 : 1)
    } else {
      setFieldValue(`file${switchFile}`, '')
      setFieldValue(`tokenId${switchFile}`, '')
    }
  }

  const disabled = Boolean(values.tokenId0.length) && Boolean(values.tokenId1.length)

  return (
    <Box className={classes.libraryContainer}>
      <Typography variant={'h1'} align={'left'}>
        Constructor
      </Typography>
      <Box mt={6} mb={6}>
        <HashTagsFilter tags={hashTags} withAction />
      </Box>
      <FieldArray
        name="images"
        render={() => (
          <Box className={classes.gallery}>
            {values.images.map(({ tokenId, src, selected, ...rest }, i) => (
              <CardImage
                key={i}
                {...rest}
                name={`images.${i}.selected`}
                selected={selected}
                src={src}
                onClick={() => onSelect(tokenId, src, selected)}
                disabled={disabled && selected === false}
              />
            ))}
          </Box>
        )}
      />

      <SelectedPreview file0={values.file0} file1={values.file1} />
    </Box>
  )
}
