import React from "react";
import {createStore} from "redux";
import EmployeeReducer from "../reducers/EmployeeReducer";
import {Provider} from "react-redux";
import {Container} from "reactstrap";
import {Route,Switch} from "react-router-dom";
import EmployeeList from "../employee/EmployeeList";
import FormEmployee from "../employee/FormEmployee";

const employeeStore = createStore(EmployeeReducer)

export default function EmployeeStore () {

    return(
        <Container fluid>
            <Provider store={employeeStore}>
                <Switch>
                    <Route exact path="/" component={EmployeeList}/>
                    <Route path="/form" component={FormEmployee}/>
                </Switch>
            </Provider>
        </Container>

)
}
