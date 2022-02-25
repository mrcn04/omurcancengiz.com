import * as React from 'react'
import { navigate } from 'gatsby'

const NotFoundPage: React.FC = () => {
  React.useEffect(() => {
    navigate('/')
  }, [])

  return null
}

export default NotFoundPage
