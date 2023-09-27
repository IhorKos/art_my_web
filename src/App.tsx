import { Stack } from '@mui/material'
import { Users } from './components/Users'
import { Route, Routes } from 'react-router-dom'
import { Home } from './components/Home'
import { Edit } from './components/Edit'

function App() {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Stack>
  )
}

export default App
