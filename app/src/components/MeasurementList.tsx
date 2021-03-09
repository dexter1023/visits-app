import { FC } from 'react'
import { MeasurementVisit } from '../models/measurement.model'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

interface MeasurementListProps {
  data: MeasurementVisit[]
}

export const MeasurementList: FC<MeasurementListProps> = ({ data }) => (
  <TableContainer>
    <TableHead>
      <TableCell>Nazwa badania</TableCell>
      <TableCell>Wynik</TableCell>
    </TableHead>
    <TableBody>
      {data.map((measurement) => (
        <TableRow>
          <TableCell>{measurement.name}</TableCell>
          <TableCell>{measurement.value}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </TableContainer>
)
