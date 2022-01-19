import Axios from 'axios'

const request = Axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'x-xsrf-token': localStorage.getItem('xsrfToken')
  },
  withCredentials: true
})

export async function login(mail, password) {
  return new Promise((resolve, reject) => {
    request.post('/login', {
      mail,
      password
    }).then(res => {
      localStorage.setItem('xsrfToken', res.data.xsrfToken)
      request.defaults.headers['x-xsrf-token'] = res.data.xsrfToken;
      resolve(res.data.companyId);
    }).catch(err => {
      console.log(err);

      err.response && err.response.data ? (
        reject(err.response.data.error)
      ) : (
        reject('Erreur de communication avec le serveur')
      )
    })
  })
}

export async function getCompany() {
  return new Promise((resolve, reject) => {
    request.get('/company').then(res => {
      resolve(res.data);
    }).catch(err => {
      console.log(err.request);
      reject(err);
    })
  })
}

export async function getEvents() {
  return new Promise((resolve, reject) => {
    request.get('/company/events').then(res => {
      resolve(res.data);
    }).catch(err => {
      console.log(err.request);
      reject(err);
    })
  })
}

export async function getEventDatas(event) {
  return new Promise((resolve, reject) => {
    const path = '/event/' + event.uniqueId + '/datas'
    request.get(path).then(res => {
      resolve(res.data);
    }).catch(err => {
      console.log(err.request);
      reject(err);
    })
  })
}

export async function deleteItem(itemId) {
  return new Promise((resolve, reject) => {
    const path = '/item/' + itemId
    request.delete(path).then(res => {
      resolve(res.data);
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}

export async function createItem(item) {
  return new Promise((resolve, reject) => {
    const path = '/item'
    request.post(path, {
      ...item
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}