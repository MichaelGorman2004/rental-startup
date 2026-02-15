import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './layout';
import { Home } from './pages/Home';

/**
 * Root application component with routing configuration.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
