import { Routes, Route } from "react-router-dom"

import Layout from "components/Layout"
// import HomePage from "containers/HomePage"
import Home from "pages/Home"
import Login from "features/auth/Login"
import RequireAuth from "features/auth/RequireAuth"
import UsersList from "features/users/UsersList"
import PersistLogin from "components/PersistLogin"



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />} >
            <Route index element={<Home />} />
            <Route path="/users" element={<UsersList />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}




export default App