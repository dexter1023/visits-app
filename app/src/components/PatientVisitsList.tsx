import { FC } from 'react'
import { VisitPatient } from '../models/visits.model'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import T from '@material-ui/core/Typography'
import { MeasurementList } from './MeasurementList'
import { formatDate } from '../utils/date.utils'
import { MedicamentsList } from './MedicamentsList'

interface PatientVisitsListProps {
  visits: VisitPatient[]
}

export const PatientVisitsList: FC<PatientVisitsListProps> = ({ visits }) => {
  return (
    <Grid container spacing={3}>
      {visits.map((visit) => (
        <Grid item key={`visit-${visit.id}`} xs={12} sm={6} md={4}>
          <Card>
            <T style={{ fontSize: '25px', fontWeight: 'bold' }}>
              {formatDate(visit.visitDate)}
            </T>
            <T>Opis: {visit.description}</T>
            <T> Zalecenia: {visit.recommendations}</T>
            <Grid container>
              <T>Badania:</T>
              <MeasurementList data={visit.measurements} />
            </Grid>
            <Grid>
              <T>Przepisane leki:</T>
              <MedicamentsList data={visit.medicaments} />
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
