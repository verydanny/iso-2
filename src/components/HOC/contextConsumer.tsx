import * as React from 'react'
import { StoreContext } from '../../store/reactContext'

export function withContext<P extends {}>(Component: React.ComponentType<P>): React.FunctionComponent<P> {
  return (props: P) => (<Component {...props} />)
}
