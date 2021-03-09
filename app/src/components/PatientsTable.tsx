import { FC } from 'react'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import { Link } from 'react-router-dom'
import { PatientList } from '../models/patient.model'

interface PatientsTableProps {
  data: PatientList[] | undefined
}

export const PatientsTable: FC<PatientsTableProps> = ({ data }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Imię</TableCell>
            <TableCell>Nazwisko</TableCell>
            <TableCell>Adres email</TableCell>
            <TableCell>Akcje</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((el, i) => (
              <TableRow key={`visit-${i}`}>
                <TableCell>{el.firstName}</TableCell>
                <TableCell>{el.lastName}</TableCell>
                <TableCell>{el.email}</TableCell>
                <TableCell align="right">
                  <Link to={`/pacjenci/${el.id}`}>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
