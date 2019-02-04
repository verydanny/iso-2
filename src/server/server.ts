import express from 'express'

export const startServer = (app) => {
  app.use('/', (req, res, next) => res.send('Hello World'))
}
