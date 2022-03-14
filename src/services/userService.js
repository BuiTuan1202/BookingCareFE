import axios from '../axios'
const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email: email, password: password });

}
const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`);
}
const createNewUserService = (data) => {
    return axios.post(`/api/create-new-user`, data);
}
const deleteUserService = (userId) => {
    return axios.delete(`/api/delete-user`, {
        data: {
            id: userId
        }
    });
}
const editUserService = (inputData) => {
    return axios.put(`/api/edit-user`, inputData);
}
const getAllcodeService = (inputType) => {
    return axios.get(`/api/get-allcode?type=${inputType}`);
}
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/get-top-doctor-home?limit=${limit}`);
}
const getAllDoctorSevice = () => {
    return axios.get(`/api/get-all-doctor`);
}
const saveInforDoctorSevice = (data) => {
    return axios.post(`/api/save-infor-doctor`, data);
}
const getDetailInforDotor = (inputid) => {
    return axios.get(`/api/get-detail-doctor?id=${inputid}`);
}
const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
}
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}
const getExtraInfoById = (doctorId, date) => {
    return axios.get(`/api/get-extra-info-by-id?doctorId=${doctorId}`);
}
const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}
const postBookingAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data);
}
const postVerifyBookingAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data);
}
export {
    handleLoginApi, getAllUsers,
    createNewUserService, deleteUserService,
    editUserService, getAllcodeService,
    getTopDoctorHomeService, getAllDoctorSevice,
    saveInforDoctorSevice, getDetailInforDotor,
    saveBulkScheduleDoctor, getScheduleDoctorByDate,
    getExtraInfoById, getProfileDoctorById,
    postBookingAppointment, postVerifyBookingAppointment,
}