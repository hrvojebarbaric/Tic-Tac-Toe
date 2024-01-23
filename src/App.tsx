import { Route, Routes } from 'react-router-dom'
import PublicLayout from './components/Layout/PublicLayout/PublicLayout'
import LogIn from './pages/LogIn/LogIn'
import ProtectedLayout from './components/Layout/ProtectedLayout/ProtectedLayout'
import GameList from './pages/GameList/GameList'
import PlayGame from './pages/PlayGame/PlayGame'
import Register from './pages/Register/Register'

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<PublicLayout />}>
                <Route index element={<LogIn />} />
                <Route path="/Register" element={<Register />} />
            </Route>
            <Route element={<ProtectedLayout />}>
                <Route path="/GameList" element={<GameList />} />
                <Route path="/PlayGame/:id" element={<PlayGame />} />
            </Route>
        </Routes>
    )
}

export default App
