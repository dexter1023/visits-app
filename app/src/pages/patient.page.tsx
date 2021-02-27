import { FC } from "react";
import { useParams } from "react-router-dom";
import {usePatient} from '../hooks/usePatients'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Typography from "@material-ui/core/Typography";
import { PatientDetails } from '../components/PatientDetails'

interface PatientPageRouterParams {
    id: string
}

export const PatientPage: FC = () => {
    const { id } = useParams<PatientPageRouterParams>()
    const { data } = usePatient(parseInt(id))

    return (
        <Grid container spacing={3}>
            <Grid item>
                <Card style={{padding: '20px'}}>
                    {data && <PatientDetails patient={data}/> }
                </Card>
            </Grid>
            <Grid item>
                <Card>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant='h4'>Wizyty</Typography>
                            <VisitsList visits={data.visits} />
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    )
}