import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    Row
} from "reactstrap";
import {HANDLE_INPUT, RESET_FORM} from "../actions/EmployeeAction";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {addEmployee, editEmployee, getAllPosition} from "../../services/EmployeeService";
import DatePicker from "react-datepicker"
import Icon from "../../shared/icons/Icon";

function FormEmployee(props) {

    const {form,handleInputChange,history,resetForm} = props
    const [positions,setPositions] = useState([])
    const [successMessage,setSuccessMessage] = useState({message:"",open: false})

    const loadPosition = ()=>{

        getAllPosition()
            .then((positions)=>{
                setPositions(positions)
            })
    }

    const handleFormSubmit = (event)=>{
        event.preventDefault()

        const date  = form.birthDate.split("-")

        form.position = {
            id: form.position
        }
        form.birthDate = `${date[2]}-${date[1]}-${date[0]}`
        console.log("FORM",form)

        if (form.id){
            editEmployee(form)
                .then(()=>{
                    resetForm()
                    setSuccessMessage({
                        message: "Edit employee success!!",
                        open: !successMessage.open
                    })
                })
        } else {
            addEmployee(form)
                .then(()=>{
                    resetForm()
                    setSuccessMessage({
                        message: "Insert new employee success!!",
                        open: !successMessage.open
                    })
                })
        }
    }

    useEffect(()=>{
        loadPosition()
    },[])

    const isValidForm = ()=>{
        return (form.name.trim().length>0 && form.birthDate && form.gender != null
                            && form.idNumber.trim().length>0 && form.position.length>0)
    }

    const toggleForm = ()=>{
        setSuccessMessage({message: successMessage.message,open: !successMessage.open});
        history.replace("/")
    }

    return(
        <Row style={{margin: 20}}>
            <Col md={{size:6,offset:3}}>
                <Card className="shadow">
                    <CardHeader tag="strong" className="text-center">{!form.id ? "Insert New Employee" : "Edit employee"}</CardHeader>
                    <CardBody className="p-3">
                        <Form onSubmit={handleFormSubmit}>
                            <FormGroup row>
                                <Label md={3} for="name">Employee Name</Label>
                                <Col md={9}>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Insert name"
                                        value={form.name}
                                        onChange={(event => handleInputChange("name",event.target.value))}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={3} for="gender">Gender</Label>
                                <Col md={3}>
                                    <FormGroup check>
                                        <Label style={{cursor: "pointer"}}>
                                            <Input
                                                style={{cursor: "pointer"}}
                                                type="radio"
                                                name="gender"
                                                value={form.gender} onChange={(event => handleInputChange("gender",0))}
                                            />{' '}
                                            <Icon icon="fas mars"></Icon> Male
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup check>
                                        <Label style={{cursor: "pointer"}}>
                                            <Input
                                                style={{cursor: "pointer"}}
                                                type="radio"
                                                name="gender"
                                                value={form.gender} onChange={(event => handleInputChange("gender",1))}
                                            />{' '}
                                            <Icon icon="fas venus"></Icon> Female
                                        </Label>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={3}>Id Number</Label>
                                <Col>
                                    <Input
                                        type="tel"
                                        min={0}
                                        maxLength={16}
                                        id="idNumber"
                                        name="idNumber"
                                        placeholder="Insert identity number"
                                        value={form.idNumber}
                                        onChange={(event => {
                                            const value = event.target.value.replace(/[^0-9]/g,"")
                                            handleInputChange("idNumber",value)
                                    })}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={3}>Birth Date</Label>
                                <Col md={4}>
                                    <Input
                                        type="date"
                                        name="birthDate"
                                        id="birthDate"
                                        placeholder="dd/MM/yyyy"
                                        value={form.birthDate}
                                        onChange={event => handleInputChange("birthDate",event.target.value)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={3}>Position</Label>
                                <Col md={6}>
                                    <Input
                                        type="select"
                                        id="position"
                                        name="position"
                                        value={form.position.id}
                                        onChange={(event => handleInputChange("position",event.target.value))}
                                    >
                                        <option>-Select position-</option>
                                        {
                                            positions.map((position,index)=>{
                                                return(
                                                    <option
                                                        key={index}
                                                        value={position.id}
                                                    >{position.name}</option>
                                                )
                                            })
                                        }
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup className="mt-5" row>
                                <Col md={{offset:7}} className="mr-2">
                                    <Button
                                        type="submit"
                                        color="primary"
                                        className="shadow"
                                        disabled={!isValidForm()}
                                    ><Icon icon="fas check-square"></Icon> Confirm </Button>
                                </Col>
                                <Col>
                                    <Link to="/">
                                        <Button
                                            type="button"
                                            className="shadow"
                                            onClick={resetForm}
                                            style={{cursor: "pointer"}}
                                        ><Icon icon="fas arrow-left"></Icon> Back </Button>
                                    </Link>
                                </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
            <Modal isOpen={successMessage.open} toggle={toggleForm}>
                <ModalBody>
                    <Row>
                        <Col md={9}>
                            <h4>
                                {successMessage.message}
                            </h4>
                        </Col>
                        <Col md={{offset:1}} className="ml-5">
                            <Icon icon="far check-circle" color="green" size="2x"/>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </Row>
    )
}

function mapStateToProps(state) {
    return {...state}
}

function mapDispatchToProps(dispatch) {
    return {
        handleInputChange : (inputName,inputValue)=>dispatch({type:HANDLE_INPUT,payload:{inputName,inputValue}}),
        resetForm : ()=>dispatch({type:RESET_FORM})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(FormEmployee))