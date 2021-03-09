import { FC } from 'react'
import { MedicamentVisit } from '../models/medicament.model'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Table from '@material-ui/core/Table'

interface MedicamentsListProps {
  data: MedicamentVisit[]
}

export const MedicamentsList: FC<MedicamentsListProps> = ({ data }) => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nazwa</TableCell>
          <TableCell>Dawka</TableCell>
          <TableCell>Czas podawania</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((medicament) => (
          <TableRow>
            <TableCell>{medicament.name}</TableCell>
            <TableCell>{medicament.dose}</TableCell>
            <TableCell>{medicament.duration}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)
