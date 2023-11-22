import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup/:token" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
