import { useQuery } from '@apollo/client'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableFooter,
  TablePagination,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
  Box,
  CircularProgress,
  Alert,
  AlertTitle,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GET_USERS } from '../requests'

export enum UsersGenders {
  All = 'all',
  Male = 'male',
  Female = 'female',
}

export type User = {
  id: number
  name: string
  email: string
  gender: string
  status: string
}

export const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS)

  const usersFromApi = data?.users?.nodes || []

  const [showedGender, setShowedGender] = useState<string>(UsersGenders.All)
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeGender = (event: SelectChangeEvent) => {
    setShowedGender(event.target.value)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const navigate = useNavigate()

  const filteredUsers =
    showedGender === UsersGenders.All
      ? usersFromApi
      : usersFromApi.filter((user: User) => user.gender === showedGender)

  return (
    <Stack paddingTop={10} alignItems={'center'}>
      <Typography variant="h3" gutterBottom>
        USERS
      </Typography>
      <Stack>
        {loading && (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        )}
        {usersFromApi && !loading && !error && (
          <Stack>
            <Box sx={{ paddingBottom: 2 }}>
              <FormControl size="small">
                <InputLabel id="demo-select-small-label">Gender</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={showedGender}
                  label="Gender"
                  onChange={handleChangeGender}
                  sx={{ width: 200}}
                >
                  <MenuItem value={UsersGenders.All}>All</MenuItem>
                  <MenuItem value={UsersGenders.Female}>Female</MenuItem>
                  <MenuItem value={UsersGenders.Male}>Male</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TableContainer
              // sx={{ maxHeight: '70vh', maxWidth: '80%' }}
              component={Paper}
            >
              <Table stickyHeader aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: User) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                        onClick={() => {
                          navigate('/edit/' + row.id)
                        }}
                      >
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.gender}</TableCell>
                        <TableCell>{row.status}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={filteredUsers.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Stack>
        )}
      </Stack>
      {error && (
        <Alert severity="error">
          <AlertTitle>{error.name}</AlertTitle>
          This is an error <strong>{error.message}</strong>
        </Alert>
      )}
    </Stack>
  )
}
