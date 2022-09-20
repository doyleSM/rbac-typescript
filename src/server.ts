import './main/config/module-alias'
import 'reflect-metadata'
import dotenv from 'dotenv'
// if (process.env.TS_NODE_DEV === 'true') {
dotenv.config()
// }

// eslint-disable-next-line import/first
import { setupApp } from './main/config'

const port = 3000

const bootstrap = async (): Promise<void> => {
  const app = await setupApp()
  app.listen(port, () => console.log(`http://localhost:${port}`))
}

void bootstrap()
