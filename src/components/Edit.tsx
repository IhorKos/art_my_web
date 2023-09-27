import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { User, UsersGenders } from './Users'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_USER, GET_USERS } from '../requests'
import { ChangeEvent, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


export const Edit = () => {
  const { data } = useQuery(GET_USERS)
  const [editUser] = useMutation(UPDATE_USER)

  const usersFromApi = data?.users?.nodes

  const params = useParams()
  const userId = params.id
  const editedUser = usersFromApi?.find(
    (user: User) => user.id === Number(userId),
  )
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState<any>(editedUser)

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleSubmit = async () => {
    editUser({ variables: formValues })
    try {
      toast.success('Wow! User edited!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    } catch (e) {
      toast.error('ERROR((', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    } finally {
      setTimeout(() => navigate('/users'), 3000)
    }
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Stack paddingTop={10}>
        <Typography variant="h3" gutterBottom>
          User editing
        </Typography>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <TextField
              required
              id="name"
              name="name"
              label="Name"
              defaultValue={editedUser?.name}
              onChange={handleInputChange}
            />
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              defaultValue={editedUser?.email}
              onChange={handleInputChange}
            />
            <TextField
              id="gender"
              name="gender"
              select
              label="Gender"
              defaultValue={editedUser?.gender}
              onChange={handleInputChange}
            >
              <MenuItem value={UsersGenders.Male}>Male</MenuItem>
              <MenuItem value={UsersGenders.Female}>Female</MenuItem>
            </TextField>
            <TextField
              id="status"
              name="status"
              select
              label="Status"
              defaultValue={editedUser?.status}
              onChange={handleInputChange}
            >
              <MenuItem value={'active'}>Active</MenuItem>
              <MenuItem value={'inactive'}>Inactive</MenuItem>
            </TextField>
            <Button variant="outlined" size="large" onClick={handleSubmit}>
              Save User
            </Button>
          </Stack>
        </Box>
      </Stack>
    </>
  )
}
