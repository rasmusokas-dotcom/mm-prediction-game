import {
  Routes,
  Route,
  Link
} from "react-router-dom"

import HomePage from "./pages/HomePage"
import UserPage from "./pages/UserPage"

function App() {
  return (
    <>
      <div className="nav">
        <Link to="/">Edetabel</Link>
      </div>

      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/users/:name"
          element={<UserPage />}
        />
      </Routes>
    </>
  )
}

export default App