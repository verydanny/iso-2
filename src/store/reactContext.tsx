import * as React from 'react'

export const StoreContext = React.createContext({
  addPetToCart: undefined as unknown,
  cart: [] as Array<{catId: number}>,
})