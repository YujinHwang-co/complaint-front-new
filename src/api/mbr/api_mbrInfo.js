import axios from '../index'

function listMbrInfo(params) {
    return axios.get('/api/mbr/listMbrInfo', params)
}
function getMbrInfo(params) {
    return axios.get('/api/mbr/getMbrInfo', params)
}
function insertMbrInfo(formData) {
    return axios({
        method: "post",
        url: "/api/mbr/insertMbrInfo",
        header: { 'Content-Type': 'multipart/form-data' },
        data: formData
    });
}

function updateMbrInfo(formData) {
    return axios({
        method: "post",
        url: "/api/mbr/updateMbrInfo",
        header: { 'Content-Type': 'multipart/form-data' },
        data: formData
    });
}
function deleteMbrInfo(params) {
    return axios.post('/api/mbr/deleteMbrInfo', params)
}

export default {
    listMbrInfo,
    getMbrInfo,
    insertMbrInfo,
    updateMbrInfo,
    deleteMbrInfo
}