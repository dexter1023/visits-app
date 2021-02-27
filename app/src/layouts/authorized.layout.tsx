import {AppDrawer} from '../components/Drawer'
import {Switch, Route, Redirect} from 'react-router-dom'
import { VisitsPage } from "../pages/visits.page"
import { VisitPage } from "../pages/visit.page"
import { PatientsPage } from "../pages/patients.page"
import { PatientPage } from "../pages/patient.page"

export const AuthorizedLayout = () => {
    return (
        <AppDrawer>
            <Switch>
                <Route path='/wizyty' exact component={VisitsPage} />
                <Route path='/wizyty/:id' component={VisitPage} />
                <Route path='/pacjenci' exact component={PatientsPage} />
                <Route path='/pacjenci/:id' component={PatientPage} />
                <Route path='*'>
                    <Redirect to='/wizyty' />
                </Route>
            </Switch>
        </AppDrawer>
    )
}