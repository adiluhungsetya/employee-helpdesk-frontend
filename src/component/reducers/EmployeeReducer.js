import {
    FETCH_COMPLETE,
    HANDLE_DELETE,
    HANDLE_EDIT,
    HANDLE_INPUT, RESET_FORM,
    SET_LOADING,
    SUBMIT_COMPLETE
} from "../actions/EmployeeAction";

const defaultValue = {
    id: "",
    name: "",
    gender: "",
    idNumber: "",
    birthDate: "",
    position:{
        id: "",
        name: "",
        code: ""
    }
}

const initialState = {
    form:{...defaultValue},
    employees:[],
    isLoading: false
}

export default function EmployeeReducer (state = initialState,action) {
    const {type,payload} = action
    switch (type) {
        case SET_LOADING:
            return {...state, isLoading: true}
        case HANDLE_INPUT:
            const form = {...state.form}
            const {inputName,inputValue} = payload
            console.log(inputName," ",inputValue)
            form[inputName]= inputValue === "position" ? {id : inputValue} : inputValue
            return {...state,form: form}
        case HANDLE_EDIT:
            const editedForm = state.employees.find((employee) => employee.id === payload)
            const date = editedForm.birthDate.split("-")

            editedForm.birthDate = `${date[2]}-${date[1]}-${date[0]}`

            return {...state,form: editedForm}
        case SUBMIT_COMPLETE:
            return {...state,form: {...initialState},isLoading: false}
        case FETCH_COMPLETE:
            return {...state,isLoading: false, employees: [...payload]}
        case RESET_FORM:
            return {...state,form: {...defaultValue}}
        default:
            return {...state}
    }
}