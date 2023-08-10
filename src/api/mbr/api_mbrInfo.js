import axios from '../index'



function insertMbrInfo(formData) {
    return axios({
        method: "post",
        url: "/api/insertMbrInfo",
        header: { 'Content-Type': 'multipart/form-data' },
        data: formData
    });
}

export default {
    insertMbrInfo,
}