import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { usePatient } from '../hooks/usePatients'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import { PatientDetails } from '../components/PatientDetails'
import { PatientVisitsList } from '../components/PatientVisitsList'

interface PatientPageRouterParams {
  id: string
}

export const PatientPage: FC = () => {
  const { id } = useParams<PatientPageRouterParams>()
  const { data } = usePatient(parseInt(id))

  return (
    <Grid container spacing={3}>
      <Grid item>
        <Card style={{ padding: '20px' }}>
          {data && <PatientDetails patient={data} />}
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card style={{ padding: '20px' }}>
          <Grid container>
            <Typography variant="h4">Wizyty</Typography>
            {data?.visits && <PatientVisitsList visits={data.visits} />}
          </Grid>
        </Card>
      </Grid>
    </Grid>
  )
}
