import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import DashboardRecepcion from "./pages/DashboardRecepcion";
import FormularioPaciente from "./components/pacientes/FormularioPaciente"
import FormularioMedico from './components/medicos/FormularioMedico';
import LayoutPrincipal from './components/layout/LayoutPrincipal';

function App() {

  return (
    <>
      <Toaster position="top-right" richColors/>

      <Routes>
        <Route path="/" element={<LayoutPrincipal/>}>
          <Route index element={<DashboardRecepcion/>} />
          <Route path="nuevo-paciente" element={<FormularioPaciente/>} />
          <Route path="nuevo-medico" element={<FormularioMedico/>}/>
        </Route>
      </Routes>
    </>
  )
}
export default App;
