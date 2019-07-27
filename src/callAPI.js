const axios = require('axios');

const callAPI = async ({method, url, token, data, additionalParams}, handleError) => {
  try {
    let errorMessage
    const axiosInstance = axios.create({});

    // *** Unfortunately, not implemented on backend ***
    // axiosInstance.interceptors.response.use(error => {
    //   errorMessage = {
    //     title: `Request failed: ${error.response.status}`,
    //     text: `Unfortunately error happened during request: ${error.config.url}`,
    //   }
    //   return Promise.reject({ ...error,errorMessage })
    //   }
    // )

    const response = await axiosInstance({
      method, url, data, headers: {
        "Authorization": `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
      additionalParams
    });

    return response
  } catch (error) {
    console.error(error);
    handleError(error.message)
  }
}

export default callAPI