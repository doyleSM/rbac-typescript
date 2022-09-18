import './main/config/module-alias'
import 'reflect-metadata'
import { setupApp } from './main/config'

const port = 3000

const bootstrap = async (): Promise<void> => {
  const app = await setupApp()
  app.listen(port, () => console.log(`http://localhost:${port}`))
}

void bootstrap()
