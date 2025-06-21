import axios from 'axios';
import { base_url } from '../../constants/axiosConfig';

const getAuthToken = () => {
    const user = JSON.parse(localStorage.getItem("admin"));
    return user?.token;
};

// Get all affiliates
const getAffiliates = async () => {
    const response = await axios.get(`${base_url}/api/affiliates`, {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });
    return response.data;
};

// Get single affiliate by ID
const getAffiliateById = async (id) => {
    const response = await axios.get(`${base_url}/api/affiliates/${id}`, {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });
    return response.data;
};

// Create affiliate
const createAffiliate = async (data) => {
    const formData = new FormData();

    // Append all non-file fields
    Object.keys(data).forEach(key => {
        if (key !== 'businessProof' && key !== 'repProofId' &&
            key !== 'businessProofPreview' && key !== 'repProofIdPreview') {
            formData.append(key, data[key]);
        }
    });

    // Append files if they exist
    if (data.businessProof) {
        formData.append('businessProof', data.businessProof);
    }
    if (data.repProofId) {
        formData.append('repProofId', data.repProofId);
    }

    const response = await axios.post(`${base_url}/api/affiliates`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });

    return response.data;
};

// Update affiliate
const updateAffiliate = async ({ id, data }) => {
    // If there are files, use FormData
    if (data.businessProof || data.repProofId) {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key !== 'businessProof' && key !== 'repProofId' &&
                key !== 'businessProofPreview' && key !== 'repProofIdPreview') {
                formData.append(key, data[key]);
            }
        });
        if (data.businessProof) {
            formData.append('businessProof', data.businessProof);
        }
        if (data.repProofId) {
            formData.append('repProofId', data.repProofId);
        }
        const response = await axios.put(`${base_url}/api/affiliates/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data;
    } else {
        // Otherwise, use JSON
        const response = await axios.put(`${base_url}/api/affiliates/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data;
    }
};

// Update affiliate status
const updateAffiliateStatus = async ({ id, status }) => {
    const response = await axios.patch(`${base_url}/api/affiliates/${id}/status`, 
        { status },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAuthToken()}`,
            },
        }
    );
    return response.data;
};

// Delete affiliate
const deleteAffiliate = async (id) => {
    const response = await axios.delete(`${base_url}/api/affiliates/${id}`, {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });
    return response.data;
};

// Get affiliate statistics
const getAffiliateStatistics = async (id) => {
    const response = await axios.get(`${base_url}/api/affiliates/${id}/statistics`, {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });
    return response.data;
};

// Dissolve partnership
const dissolvePartnership = async (id) => {
    const response = await axios.post(`${base_url}/api/affiliates/${id}/dissolve`, {}, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });
    return response.data;
};

const affiliateService = {
    createAffiliate,
    updateAffiliate,
    updateAffiliateStatus,
    getAffiliates,
    getAffiliateById,
    deleteAffiliate,
    getAffiliateStatistics,
    dissolvePartnership,
};

export default affiliateService; 