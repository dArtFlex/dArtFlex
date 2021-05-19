import React from 'react'

export const Loadable = {
  Image: React.lazy(() => import('common/Image')),
}
