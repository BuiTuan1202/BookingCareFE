import axios from '../axios'
const handleLoginApi = (email, password) =>{
    return axios.post('/api/login', {email :email, password: password});

}
const getAllUsers = (id) =>{
    return axios.get(`/api/get-all-users?id=${id}`);
}
const createNewUserService = (data)=>{
    return axios.post(`/api/create-new-user`, data);
}
const deleteUserService = (userId)=>{
    return axios.delete(`/api/delete-user`, {
        data: {
          id: userId
        }
      });
}
const editUserService = (inputData)=>{
    return axios.put(`/api/edit-user`, inputData);
}
const getAllcodeService = (inputType) =>{
    return axios.get(`/api/get-allcode?type=${inputType}`);
}
const getTopDoctorHomeService = (limit) =>{
    return axios.get(`/api/get-top-doctor-home?limit=${limit}`);
}
export {handleLoginApi, getAllUsers,
     createNewUserService, deleteUserService,
     editUserService, getAllcodeService,
     getTopDoctorHomeService}