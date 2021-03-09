import { FC, useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { useForm } from 'react-hook-form'
import { useVisitMutation } from '../hooks/useVisits'
import { useSnackbarContext } from '../context/snackbar.context'
import { CreateVisitRequest } from '../models/visits.model'
import { usePatients } from '../hooks/usePatients'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import { formatDate } from '../utils/date.utils'

interface AddVisitProps {
  open: boolean
  onClose: () => void
  patientId?: number
}

export const AddVisit: FC<AddVisitProps> = ({ open, onClose, patientId }) => {
  const [request, setRequest] = useState<CreateVisitRequest>({
    patientId: 0,
    visitDate: '',
  })
  const [inputSearch, setInputSearch] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const { data } = usePatients(search)
  const snackbarContext = useSnackbarContext()
  const mutation = useVisitMutation()

  useEffect(() => {
    if (patientId) {
      setRequest({
        ...request,
        patientId,
      })
    }
  }, [patientId])

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value)
  }

  const handleClickSearch = () => {
    setSearch(inputSearch)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequest({
      ...request,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmitForm = () => {
    console.log(request)
    if (request.patientId > 0 && request.visitDate !== '') {
      mutation.mutate(request, {
        onSuccess: () =>
          snackbarContext.open('Poprawnie dodano wizytę', 'success'),
        onError: () =>
          snackbarContext.open('Błąd przy dodawaniu wizytę', 'error'),
      })
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Dodaj wizytę</DialogTitle>
      <DialogContent>
        <form>
          <Grid container direction="column" justify="center">
            {!patientId && (
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <TextField label="Szukaj" onChange={handleChangeSearch} />
                    <Button onClick={handleClickSearch}>Szukaj</Button>
                  </Grid>
                  <Grid item>
                    <TextField
                      select
                      name="patientId"
                      label="Pacjent"
                      placeholder="Pacjent"
                      required
                      onChange={handleChange}
                    >
                      {data?.map((el) => (
                        <MenuItem key={el.id} value={el.id}>
                          {el.firstName} {el.lastName}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Grid item>
              <TextField
                id="date"
                name="visitDate"
                label="Data"
                placeholder="Data"
                type="date"
                defaultValue={formatDate(new Date().toISOString())}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Zamknij</Button>
        <Button onClick={handleSubmitForm}>Dodaj pacjenta</Button>
      </DialogActions>
    </Dialog>
  )
}
