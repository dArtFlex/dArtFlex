import React from 'react'
import { FieldArray, useFormikContext } from 'formik'
import { Box, Typography } from '@material-ui/core'
import { CardImage, SelectedPreview } from '../../../components'
import { IConstructor } from '../../../types'
import { useStyles } from './styles'
import { imageUrlToFile } from 'utils'

// import { HashTagsFilter } from 'common'
// const hashTags = ['all', '#General', '#Portraits', '#Landscapes', '#Sci Bio Art', '#Characters']

export default function LibraryConstructorForm({ setFilesSource }: { setFilesSource: () => void }) {
  const classes = useStyles()
  const { values, handleSubmit, setFieldValue } = useFormikContext<IConstructor>()

  const onSelect = async (tokenId: string, src: string, selected: boolean) => {
    // Selected value is false as this event triggered before selection

    if (selected === false) {
      const file = await imageUrlToFile(src)
      if (!values.file0) {
        setFieldValue('file0', file)
        setFieldValue(`tokenId0`, tokenId)
      } else {
        setFieldValue('file1', file)
        setFieldValue(`tokenId1`, tokenId)
      }
    } else {
      if (tokenId === values.tokenId0) {
        setFieldValue(`file0`, '')
        setFieldValue(`tokenId0`, '')
      } else {
        setFieldValue(`file1`, '')
        setFieldValue(`tokenId1`, '')
      }
    }
  }

  const disabled = Boolean(values.tokenId0) && Boolean(values.tokenId1)

  return (
    <Box className={classes.libraryContainer}>
      <Typography variant={'h1'} align={'left'}>
        Constructor
      </Typography>
      <Box mt={6} mb={6}>
        {/* ************** Todo: Next version ************** */}
        {/* <HashTagsFilter tags={hashTags} withAction /> */}
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

      <SelectedPreview
        file0={values.file0 as File}
        file1={values.file1 as File}
        onClick={() => {
          handleSubmit()
          setFilesSource()
        }}
      />
    </Box>
  )
}
