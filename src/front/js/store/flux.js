const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            voluntarios: [],
            auth_voluntario: false,
        },
        actions: {
            getVoluntarios: () => {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    mode: 'cors',
                };
                fetch(process.env.BACKEND_URL + "/api/voluntario/", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    setStore({ voluntarios: data });
                })
             },

    
            addVoluntario(newVoluntario) {
                const requestOptions = {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "nombre": newVoluntario.nombre,
                    "email": newVoluntario.email,
                    "password": newVoluntario.password,
                    "ciudad": newVoluntario.ciudad,
                    "lat":newVoluntario.lat,
                    "lng": newVoluntario.lng,
                    
                    })
                };

                fetch(process.env.BACKEND_URL + "/api/voluntario/", requestOptions)
                    .then((response) => {
                        if (response.ok) {
                            // Voluntario creado correctamente
                            alert("Voluntario creado correctamente");
                        } else {
                            // Error creando el voluntario
                            alert("Lo sentimos, ha habido un error creando el voluntario :(");
                        }
                    })
                    .catch((error) => {
                        // Error general
                        alert(error);
                    });
            },

            
            deleteVoluntario: (id) => {
                            const deleteOptions = {
                                method: "DELETE",
                                mode: 'cors',
                                headers: { 'Content-Type': 'application/json'  },
                            };
                            fetch(process.env.BACKEND_URL + "/api/voluntario/" + id, deleteOptions)
                                .then(response => response.json())
                                .then((data =>{
                                    alert("Voluntario eliminado");
                                    fetch(process.env.BACKEND_URL + "/api/voluntario/")
                                        .then((response) => response.json())
                                        .then((data) => {
                                            setStore({ voluntarios: data });
                            })
                        }))
            },

            
            editVoluntario: (editVoluntario, id) => {
                const editOptions = {
                  method: "PUT",
                  mode: 'cors',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    "nombre": editVoluntario.nombre,
                    "email": editVoluntario.email,
                    "password": editVoluntario.password,
                    "ciudad": editVoluntario.ciudad,
                    "lat": editVoluntario.lat,
                    "lng": editVoluntario.lng
                  })
                };
              
                fetch(process.env.BACKEND_URL + "/api/voluntario/" + id, editOptions)
                  .then(response => response.json())
                  .then(() => {
                    alert("Voluntario editado correctamente");
                    console.log(process.env.BACKEND_URL + "/api/voluntario/" + id);
                  });
            },


            voluntarioLogin: (email, password) => {
                console.log('Login desde flux')
                 const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(
                        {
                            "email":email,
                            "password":password
                        }
                    )
                };
                fetch(process.env.BACKEND_URL + "/api/voluntarioLogin/", requestOptions)
                    .then(response => {
                        console.log(response.status)
                        if(response.status === 200){
                            setStore({ auth_voluntario: true });
                        }
                        return response.json()
                    })
                    .then(data => {
                        localStorage.setItem("token", data.access_token);
                        console.log(data)
    
                    });
            },

            voluntarioSignup: (email, password) => {
                const requestOptions = {
                    method: 'POST',
                    mode: 'cors',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(
                        {
                            "email":email,
                            "password":password
                        }
                    )
                  };
                  
                fetch(process.env.BACKEND_URL + "/api/voluntarioSignup/", requestOptions)
                    .then(response => {
                        if(response.status == 200){
                            setStore({ auth_admin: true });
                        }
                        return response.text()
                    })
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            },


            voluntarioLogout: () => {
                setStore({ auth_voluntario: false });
                localStorage.removeItem("token");				
            },


        }
            };
        };
export default getState;
