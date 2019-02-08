import React, { Component } from 'react'
import { createAsyncImport } from '../util/createAsyncImport'

const Home = createAsyncImport({
  component: () => import('components/home' /* webpackChunkName: "home" */),
  resolve: () => require.resolveWeak('components/home')
})

export class App extends Component {
  render() {
    return (
      <div>
        Hello
      </div>
    )
  }
}
