import { FC, useEffect } from 'react'
import { useParams } from 'react-router'
import { useVisit, useFinishVisitMutation } from '../hooks/useVisits'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import { PatientDetails } from '../components/PatientDetails'
import { VisitDescription } from '../components/VisitDescription'
import { ExecutedVisitPayload } from '../models/visits.model'
import { useSnackbarContext } from '../context/snackbar.context'

interface PageParams {
  id: string
}

export const VisitPage: FC = () => {
  const { id } = useParams<PageParams>()
  const visit = useVisit(id)
  const mutation = useFinishVisitMutation()
  const snackbarContext = useSnackbarContext()

  useEffect(() => {
    visit.refetch()
  }, [])

  const handleSubmit = (payload: ExecutedVisitPayload) => {
    payload.id = parseInt(id)
    mutation.mutate(payload, {
      onSuccess: () =>
        snackbarContext.open('Poprawnie zapisano wizytę', 'success'),
      onError: () => snackbarContext.open('Błąd przy zapisie wizyty', 'error'),
    })
  }
  return (
    <Grid container spacing={3}>
      <Grid item>
        <Card>
          <PatientDetails patient={visit?.data?.patient} />
        </Card>
      </Grid>
      <Grid item>
        <VisitDescription onSubmit={handleSubmit} />
      </Grid>
    </Grid>
  )
}
