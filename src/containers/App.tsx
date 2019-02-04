import React from 'react'
import { ContextProvider } from '../containers/contextProvider'
import { Primitive } from '../tsStuff/1'

Primitive.push('hello')

export default class App extends React.Component {
  public render() {
    return (
      <ContextProvider>
        Hello
      </ContextProvider>
    )
  }
}