import { Grid } from "@material-ui/core"
import React, {FC} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import { LoginPage } from "../pages/login.page"
import {RegistrationPage} from '../pages/registration.page'

const containerStyle = {
    width: '100vw',
    height: '100vh'
}

export const UnauthorizedLayout: FC = ({children}) => (
    <Grid container justify='center' alignItems='center' style={containerStyle} >
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/rejestracja" component={RegistrationPage} />
                <Route path="*">
                    <Redirect to="/login"/>
                </Route>

            </Switch>
    </Grid>
)