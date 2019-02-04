import * as React from 'react'
import { withContext } from '../HOC/contextConsumer'

interface CatProps {
  on: boolean
}

class Cat extends React.Component<CatProps> {
  render(): React.ReactNode {
    return (
      <div>
        { JSON.stringify(this.props) }
      </div>
    )
  }
}

const Test = new Cat({ on: true })

