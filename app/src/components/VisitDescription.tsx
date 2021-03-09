import { FC } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import T from '@material-ui/core/Typography'
import { ExecutedVisitPayload } from '../models/visits.model'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Table from '@material-ui/core/Table'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'

interface VisitDescriptionProps {
  onSubmit: (payload: ExecutedVisitPayload) => void
}

export const VisitDescription: FC<VisitDescriptionProps> = ({ onSubmit }) => {
  const { register, handleSubmit, control } = useForm()

  const measurementFields = useFieldArray({
    control,
    name: 'measurements',
  })
  const medicamentFields = useFieldArray({
    control,
    name: 'medicaments',
  })

  const insertMeasurement = () => {
    measurementFields.append({
      name: '',
      value: '',
    })
  }

  const insertMedicament = () => {
    medicamentFields.append({
      name: '',
      dose: '',
      duration: '',
    })
  }

  const removeMeasurement = (index: number) => {
    measurementFields.remove(index)
  }

  const removeMedicament = (index: number) => {
    medicamentFields.remove(index)
  }
  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item md={6} sm={12}>
              <T variant="h5">Opis wizyty</T>
              <TextField
                style={{ width: '100%' }}
                name="description"
                multiline
                inputRef={register({ required: true })}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <T variant="h5">Rekomendacje</T>
              <TextField
                style={{ width: '100%' }}
                name="recommendations"
                multiline
                inputRef={register({ required: true })}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <T variant="h5">Badania</T>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableCell>Nazwa badania</TableCell>
                    <TableCell>Wynik</TableCell>
                  </TableHead>
                  <TableBody>
                    {measurementFields.fields.map((item, index) => (
                      <TableRow>
                        <TableCell>
                          <TextField
                            name={`measurements[${index}].name`}
                            inputRef={register({ required: true })}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name={`measurements[${index}].value`}
                            inputRef={register({ required: true })}
                          />
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => removeMeasurement(index)}>
                            Usuń
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button onClick={insertMeasurement}>Dodaj</Button>
            </Grid>
            <Grid item md={6} sm={12}>
              <T variant="h5">Przepisane leki</T>
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
                    {medicamentFields.fields.map((item, index) => (
                      <TableRow>
                        <TableCell>
                          <TextField
                            name={`medicaments[${index}].name`}
                            inputRef={register({ required: true })}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name={`medicaments[${index}].dose`}
                            inputRef={register({ required: true })}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name={`medicaments[${index}].duration`}
                            inputRef={register({ required: true })}
                          />
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => removeMedicament(index)}>
                            Dodaj
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button onClick={insertMedicament}>Dodaj</Button>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ width: '100%' }}
          >
            Zapisz
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
