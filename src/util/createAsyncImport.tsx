import React, { Component, createContext, createElement } from 'react'

interface ICreatAsyncImport {
  ssr?: boolean,
  chunkName?: string,
  component?: () => any,
  resolve?: () => any,
  loadingComponent?: () => React.ComponentType
}

function loadComponent(component) {
  const state = {
    loading: true,
    loaded: undefined,
    err: false,
    promise: undefined,
  }
}

export function createAsyncImport({
  ssr,
  chunkName,
  component,
  resolve,
  loadingComponent,
}: ICreatAsyncImport = {}) {
  
}


