const testApi = 'http://localhost:3000/users'

fetch(testApi)
  .then(response => {
    return response.json()
  })
  .then(users => {
    console.log(users)
  })
