import { Button, Stack } from '@mui/material'
import GroupRoundedIcon from '@mui/icons-material/GroupRounded'
import { NavLink } from 'react-router-dom'

export const Home = () => {
  return (
    <Stack paddingTop={10}>
      <NavLink to="/users">
        <Button
          component="label"
          variant="contained"
          startIcon={<GroupRoundedIcon />}
        >
          Click me to see Users
        </Button>
      </NavLink>
    </Stack>
  )
}
