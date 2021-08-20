import axiosWithAuth from '../helpers/axiosWithAuth';

const fetchColorService = () => {
    return axiosWithAuth()
        .get('/colors')
}

export default fetchColorService;