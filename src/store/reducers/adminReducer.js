import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctor: [],
    AllDoctor: [],
    allScheduleTime: [],
    allRequireDoctorInfo: [],

}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copystate = { ...state };
            copystate.isLoadingGender = true;
            return {
                ...copystate,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;

            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAIL:

            state.genders = [];
            state.isLoadingGender = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAIL:
            state.positions = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAIL:
            state.roles = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_FAIL:
            state.users = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctor = action.dataDoctor;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAIL:
            state.topDoctor = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.AllDoctor = action.dataAllDoctor;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAIL:
            state.AllDoctor = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALCODE_SCHEDULE_TIME_FAIL:
            state.allScheduleTime = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRE_DOCTOR_INFO_SUCCESS:
            state.allRequireDoctorInfo = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRE_DOCTOR_INFO_FAIL:
            state.allRequireDoctorInfo = [];
            return {
                ...state,
            }


        default:
            return state;
    }
}

export default adminReducer;