import { FC, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField'
import {usePatients} from '../hooks/usePatients'
import {PatientsTable} from '../components/PatientsTable'
import Button from '@material-ui/core/Button'
import {AddPatient} from '../components/AddPatient'

export const PatientsPage: FC = () => {
    const [search, setSearch] = useState<string>('')

    const [openPatientModal, setPatientModal] = useState<boolean>(false)

    const { data } = usePatients(search)

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const openModal = () => setPatientModal(true)

    const handleClose = () => setPatientModal(false)

    return (
        <Grid container direction='row'>
            <Grid item>
                <Button onClick={openModal}>Dodaj pacjenta</Button>
                <TextField 
                    id="search"
                    label="Szukaj"
                    value={search}
                    onChange={handleSearchChange}
                />
            </Grid>
            <Grid item style={{width: '100%'}}>
                <Grid container>
                    <PatientsTable data={data}/>
                </Grid>
            </Grid>
            <AddPatient open={openPatientModal} onClose={handleClose}/>
        </Grid>
    )
}