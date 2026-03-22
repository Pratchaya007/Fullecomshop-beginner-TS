import AppRoutes from "./routes/AppRoutes"
import { Toaster } from 'sonner'


const App = () => {
  return (
    <>
      <Toaster richColors/>
      <AppRoutes/>
    </>
  )
}
export default App