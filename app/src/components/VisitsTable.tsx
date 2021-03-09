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
import { VisitListItem } from '../models/visits.model'
import { formatDate } from '../utils/date.utils'

interface VisitsTableProps {
  data: VisitListItem[] | undefined
}

export const VisitsTable: FC<VisitsTableProps> = ({ data }) => {
  console.log(data)
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Imię</TableCell>
            <TableCell>Nazwisko</TableCell>
            <TableCell>Data wizyty</TableCell>
            <TableCell>Akcje</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((el, i) => (
              <TableRow key={`visit-${i}`}>
                <TableCell>{el.patient.firstName}</TableCell>
                <TableCell>{el.patient.lastName}</TableCell>
                <TableCell>{formatDate(el.visitDate)}</TableCell>
                <TableCell align="left">
                  <Link to={`/wizyty/${el.id}`}>
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
