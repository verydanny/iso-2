import * as React from 'react'
import { StoreContext } from '../store/reactContext'

interface ContextProviderProps {
  children: React.ReactNode
}
interface ContextProviderState {
  cart: Array<{ catId: number }>
}

export class ContextProvider extends React.Component<ContextProviderProps, ContextProviderState> {
  constructor(props: ContextProviderProps) {
    super(props)

    this.state = {
      cart: []
    }
  }

  public addPetToCart = (catId: number): void => {
    this.setState({ cart: [...this.state.cart, { catId }]})
  }

  public render() {
    return (
      <StoreContext.Provider value={{
        addPetToCart: this.addPetToCart,
        cart: this.state.cart,
      }}>
        { this.props.children }
      </StoreContext.Provider>
    )
  }
}