

import axios from 'axios';

const setAuthToken = token => {
  if(token){
    //Apply to every request
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }else{
    //Delete the auth headers
    delete axios.defaults.headers.common['Authorization']
  }
}

export default setAuthToken;
