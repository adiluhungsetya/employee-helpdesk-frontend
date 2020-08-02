import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Spinner,
    Table
} from "reactstrap";
import {FETCH_COMPLETE, HANDLE_DELETE, HANDLE_EDIT, SET_LOADING} from "../actions/EmployeeAction";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {deleteEmployee, getAllEmployee} from "../../services/EmployeeService";
import Icon from "../../shared/icons/Icon";

function EmployeeList (props) {
    const [open,setOpen] = useState(false)
    const [employee,setEmployee] = useState("")
    const [modal,setModal] = useState(false)
    const [message,setMessage] = useState("")

    const toggle = ()=>{setOpen(!open)}
    const toggleButton = ()=>{setModal(!modal)}

    const loadData = () =>{
        const {setLoading,fetchComplete} = props
        setLoading();
        getAllEmployee()
            .then((employees)=>{
                fetchComplete(employees)
            })
    }

    useEffect(()=>{
        loadData()
    },[])

    const handleEditButton = (id) =>{
        const {handleEdit,form,history} = props

        handleEdit(id)

        history.replace("/form")

    }

    const handleDeleteButton = () =>{
        deleteEmployee(employee)
            .then((response)=>{
                toggle()
                if (response){
                    setMessage("Delete success !")
                    toggleButton()
                    loadData()
                } else {
                    setMessage("Delete failed !")
                    toggleButton()
                }

            })
    }

    const generateTableRow = () =>{
        const {employees,isLoading} = props
        let rows = (
            <tr>
                <td><Spinner className="text-center" type="grow" aria-colspan={6} color="info"/></td>
            </tr>
        )
        if (!isLoading){
            rows=(
                <tr>
                    <td colSpan={8} className="table-warning text-center"><strong><em>No Employee(s) yet.</em></strong></td>
                </tr>
            )
        }
        if (employees.length>0 && !isLoading){
            rows = employees.map((employee,index)=>{
                return(
                    <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{employee.name}</td>
                        <td>{employee.gender}</td>
                        <td>{employee.idNumber}</td>
                        <td>{employee.birthDate}</td>
                        <td>{employee.position.name}</td>
                        <td>
                            <Button type="button" color="warning" size="sm" className="shadow"
                                    onClick={()=>handleEditButton(employee.id)}
                            ><Icon icon="fas edit"></Icon> Edit</Button>
                        </td>
                        <td>
                            <Button type="button" color="danger" size="sm" className="shadow"
                                    onClick={()=>{
                                        setEmployee(employee.id)
                                        toggle()
                                    }}
                            ><Icon icon="fas trash"></Icon> Delete</Button>
                        </td>
                    </tr>
                )
            })
        }
        return rows;
    }

    return (
        <Card className="shadow">
            <CardHeader tag="strong">
                <Row>
                    <Col >
                        <Link to="/form">
                            <Button color="primary" className="shadow"><Icon icon="fas plus"></Icon> Add</Button>
                        </Link>
                    </Col>
                    <Col md={{size:7,offset:2}}>
                        <h3>Employee List</h3>
                    </Col>
                </Row>
            </CardHeader>
            <Table striped hover responsive className="m-0">
                <thead>
                    <tr>
                        <th width="5%">No.</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Id Number</th>
                        <th>Birth Date</th>
                        <th>Position</th>
                        <th colSpan={2} width="15%" className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        generateTableRow()
                    }
                </tbody>
            </Table>
            <Modal isOpen={open} toggle={toggle}>
                <ModalHeader toggle={toggle}><Icon icon="fas exclamation-triangle" color="red"/> Warning !</ModalHeader>
                <ModalBody>Employee will permanently deleted, Are you sure to continue ?</ModalBody>
                <ModalFooter>
                    <Button onClick={handleDeleteButton} color="danger">Yes</Button>
                    <Button onClick={toggle} color="primary" className="ml-2">No</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modal} toggle={toggleButton}>
                <ModalBody>
                    {message}
                </ModalBody>
            </Modal>
        </Card>
    )
}

function mapStateToProps(state) {
    return {...state}
}

function mapDispatchToProps(dispatch) {
    return {
        handleEdit: (id) => dispatch({type:HANDLE_EDIT,payload: id}),
        setLoading: () => dispatch({type:SET_LOADING}),
        fetchComplete: (payload) => dispatch({type:FETCH_COMPLETE,payload})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(EmployeeList))