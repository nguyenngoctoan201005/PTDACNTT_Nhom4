const axios = require('axios');

const API_URL = 'http://localhost:8081/store';

async function testApi() {
    try {
        console.log('1. Attempting Login (admin/admin)...');
        const loginRes = await axios.post(`${API_URL}/auth/token`, {
            userName: 'admin',
            matKhau: 'admin'
        });

        console.log('Login Status:', loginRes.status);
        const token = loginRes.data.result.token;
        console.log('Token obtained (truncated):', token.substring(0, 20) + '...');

        console.log('\n2. Fetching All Orders (/don-hang/getALLDH)...');
        const ordersRes = await axios.get(`${API_URL}/don-hang/getALLDH`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log('Get Orders Status:', ordersRes.status);
        console.log('Orders Data:', JSON.stringify(ordersRes.data, null, 2));

    } catch (error) {
        if (error.response) {
            console.error('API Error:', error.response.status, error.response.data);
        } else {
            console.error('Network/Script Error:', error.message);
        }
    }
}

testApi();
