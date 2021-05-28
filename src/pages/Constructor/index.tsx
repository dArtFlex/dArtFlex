import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import clsx from 'clsx'
import { Box, Typography } from '@material-ui/core'
import { PageWrapper, Form } from 'common'
import { LibraryConstrIcon, UploadConstrIcon } from 'common/icons'
import { CardForm, Library, Uploader } from './components'
import { IConstructor, ConstructorSource, IGalleryImage } from './types'
import { useStyles } from './styles'

const CONSTRUCTOR_SOURCE = {
  LIBRARY: 'library',
  UPLOADER: 'uploader',
}

const GALLERY: IGalleryImage[] = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => ({
  tokenId: uuidv4(),
  src: `https://picsum.photos/500/50${i}`,
  selected: false,
}))

const initialData: IConstructor = {
  tokenId0: '',
  tokenId1: '',
  file0: '',
  file1: '',
  images: [],
}

export default function Constructor() {
  const classes = useStyles()
  const [data, setData] = useState<IConstructor>(initialData)

  useEffect(() => {
    setData((state) => ({ ...state, images: GALLERY }))
  }, [])

  return (
    <PageWrapper className={classes.container}>
      <Form initialValues={data} onSubmit={(state: IConstructor) => console.log('y', state)} enableReinitialize>
        <Components />
      </Form>
    </PageWrapper>
  )
}

function Components() {
  const classes = useStyles()
  const [filesSource, setFilesSource] = useState<ConstructorSource | null>(null)

  switch (filesSource) {
    case 'library':
      return <Library />
    case 'uploader':
      return <Uploader />
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
