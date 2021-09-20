import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectConstructor } from 'stores/selectors'
import clsx from 'clsx'
import { v4 as uuidv4 } from 'uuid'
import { Box, Typography } from '@material-ui/core'
import { PageWrapper, Form } from 'common'
import { LibraryConstrIcon, UploadConstrIcon } from 'common/icons'
import {
  CardForm,
  LibraryConstructorForm,
  UploaderConstructorForm,
  GeneratedConstructorForm,
  LoadingConstructorFrom,
} from './components'
import { createStyleTransferRequest } from 'stores/reducers/constructor'
import { IConstructor, ConstructorSource, IGalleryImage } from './types'
import { getRandomLibraryImages } from 'utils'
import { useStyles } from './styles'

const CONSTRUCTOR_SOURCE = {
  LIBRARY: 'library',
  UPLOADER: 'uploader',
  GENERATED: 'generated',
}

const GALLERY: IGalleryImage[] = getRandomLibraryImages().map((src) => ({
  tokenId: uuidv4(),
  src,
  selected: false,
}))

const initialData: IConstructor = {
  tokenId0: '',
  tokenId1: '',
  file0: null,
  file1: null,
  images: [],
}

export default function Constructor() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [data, setData] = useState<IConstructor>(initialData)
  const [filesSource, setFilesSource] = useState<ConstructorSource | null>(null)
  const { priority, endScale } = useSelector(selectConstructor())

  useEffect(() => {
    setData((state) => ({ ...state, images: GALLERY }))
  }, [])

  const onSubmit = (values: IConstructor) => {
    dispatch(
      createStyleTransferRequest({
        contentImage: values.file0,
        styleImage: values.file1,
        priority,
        endScale,
      })
    )
  }

  return (
    <PageWrapper className={clsx(classes.container, filesSource === 'generated' && classes.clear)}>
      <Form initialValues={data} onSubmit={onSubmit} enableReinitialize>
        <Components filesSource={filesSource} setFilesSource={setFilesSource} />
      </Form>
    </PageWrapper>
  )
}

function Components({
  filesSource,
  setFilesSource,
}: {
  filesSource: ConstructorSource | null
  setFilesSource: (filesSource: ConstructorSource | null) => void
}) {
  const classes = useStyles()
  const { imageUrl, fetching } = useSelector(selectConstructor())

  useEffect(() => {
    if (imageUrl.length) {
      setFilesSource('generated')
    }
    if (fetching) {
      setFilesSource('loading')
    }
  }, [imageUrl, fetching])

  switch (filesSource) {
    case 'library':
      return <LibraryConstructorForm setFilesSource={() => setFilesSource('loading')} />
    case 'uploader':
      return <UploaderConstructorForm setFilesSource={() => setFilesSource('loading')} />
    case 'loading':
      return <LoadingConstructorFrom setFilesSource={() => setFilesSource(null)} />
    case 'generated':
      return <GeneratedConstructorForm setFilesSource={() => setFilesSource(null)} />
    default:
      return (
        <Box pb={18}>
          <Typography variant={'h1'} className={clsx(classes.mainTitle, filesSource && classes.self)}>
            Constructor
          </Typography>
          <Box className={classes.containerCardForm}>
            <CardForm
              title={'Choose from library'}
              onClick={() => setFilesSource(CONSTRUCTOR_SOURCE.LIBRARY as ConstructorSource)}
              icon={<LibraryConstrIcon />}
            />
            <CardForm
              title={'Upload your images'}
              onClick={() => setFilesSource(CONSTRUCTOR_SOURCE.UPLOADER as ConstructorSource)}
              icon={<UploadConstrIcon />}
            />
          </Box>
        </Box>
      )
  }
}
