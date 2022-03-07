import actionTypes from './actionTypes';
import {
    getAllcodeService, createNewUserService,
    getAllUsers, deleteUserService, editUserService,
    getTopDoctorHomeService,getAllDoctorSevice, saveInforDoctorSevice
} from '../../services/userService'
import { toast } from 'react-toastify';
//get gender
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })

            let res = await getAllcodeService("GENDER")
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            }
            else {
                dispatch(fetchGenderFail());
            }
        } catch (e) {
            dispatch(fetchGenderFail());
            console.log(e)

        }
    }

}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})

//get position

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodeService("POSITION")
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            }
            else {
                dispatch(fetchPositionFail());
            }
        } catch (e) {
            dispatch(fetchPositionFail());
            console.log(e)

        }
    }

}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})


//get role
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllcodeService("ROLE")
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            }
            else {
                dispatch(fetchRoleFail());
            }
        } catch (e) {
            dispatch(fetchRoleFail());
            console.log(e)

        }
    }

}
export const fetchRoleSuccess = (RoleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: RoleData
})
export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})

//create user
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await createNewUserService(data)
            console.log('check create user redux', res);
            if (res && res.errCode === 0) {
                dispatch(createUserSuccess());
                dispatch(fetchAllUserStart());
                toast.success('Create a new user succsess');
            }
            else {
                dispatch(createUserFail());
                toast.error('Create a new user error');
            }
        } catch (e) {
            dispatch(createUserFail());
            console.log(e)

        }
    }

}
export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,

})
export const createUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL
})

//fetch all user
export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllUsers("ALL")
            let res1 = await getTopDoctorHomeService(3)
            console.log('check doctor', res1);
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            }
            else {
                dispatch(fetchAllUserFail());
                toast.error('fetch all user error');
            }
        } catch (e) {
            dispatch(fetchAllUserFail());
            console.log(e)

        }
    }

}
export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})
export const fetchAllUserFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})


//delete user
export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {

            let res = await deleteUserService(userId)
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
                toast.success('Delete a user succsess');
            }
            else {
                dispatch(deleteUserFail());
                toast.error('Delete a user error');
            }
        } catch (e) {
            dispatch(deleteUserFail());
            console.log(e)

        }
    }

}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,

})
export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL
})

//edit user
export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await editUserService(data)
            console.log('check data edit user', res);
            if (res && res.errCode === 0) {
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
                toast.success('update a user succsess');
            }
            else {
                dispatch(editUserFail());
                toast.error('update a user error not conect');
            }
        } catch (e) {
            toast.error('update a user error ');
            dispatch(editUserFail());
            console.log(e)

        }
    }

}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,

})
export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAIL
})

//get top doctor
export const fetchTopDoctor =()=>{
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('')
            console.log("check res", res);
            if(res && res.errCode===0){
                dispatch({
                    type:actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctor:res.data
                })
            }
            else{
                dispatch({
                    type:actionTypes.FETCH_TOP_DOCTOR_FAIL,
                })
            }
        }
        catch (e) {
            console.log(e);
            dispatch({
                type:actionTypes.FETCH_TOP_DOCTOR_FAIL,
            })

        }
    }
}

//get all doctor
export const fetchAllDoctor =()=>{
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorSevice('')
            if(res && res.errCode===0){
                dispatch({
                    type:actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataAllDoctor:res.data
                })
            }
            else{
                dispatch({
                    type:actionTypes.FETCH_ALL_DOCTOR_FAIL,
                })
            }
        }
        catch (e) {
            console.log(e);
            dispatch({
                type:actionTypes.FETCH_ALL_DOCTOR_FAIL,
            })

        }
    }
}


//get save detail doctor
export const saveDetailDoctor =(data)=>{
    return async (dispatch, getState) => {
        try {
            let res = await saveInforDoctorSevice(data);
            console.log("check data", res);
            if(res && res.errCode===0){
                toast.success('save infor detail doctor succsess');
                dispatch({
                    type:actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                   
                })
            }
            else{
                toast.success('save infor detail doctor fail');
                dispatch({
                    type:actionTypes.SAVE_DETAIL_DOCTOR_FAIL,
                })
            }
        }
        catch (e) {
            console.log(e);
            toast.success('save infor detail doctor fail');
            dispatch({
                type:actionTypes.SAVE_DETAIL_DOCTOR_FAIL,
            })

        }
    }
}

