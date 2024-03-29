const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {

			campaigns: [],
			allCampaigns: [],
			auth_admin: false,
			ongs: [],
			ong:{},
			auth_ong: false,
            voluntarios: [],
			voluntario: {},
            auth_voluntario: false,
			favorites: [],
			favorite: [],
			ongApi:[],
		},
		actions: {
			//	voluntario actions
			getVoluntarios: () => {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    mode: 'cors',
                };
                fetch(process.env.BACKEND_URL + "/api/voluntarios/", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    setStore({ voluntarios: data });
                })
             },

			 getVoluntarioById: (id) => {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    mode: 'cors',
                };
                fetch(process.env.BACKEND_URL + "/api/voluntario/" + id, requestOptions)
                .then((response) => response.json())
                .then((data) => {
				console.log(data)
				console.log(id)
                    setStore({ voluntario: data });
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
                    "direccion":newVoluntario.direccion,
                    
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
                    "direccion": editVoluntario.direccion,
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
				console.log('Login desde flux');
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				};
			
				fetch(process.env.BACKEND_URL + "/api/voluntarioLogin/", requestOptions)
					.then(response => {
						console.log(response.status);
						if (response.status === 200) {
							setStore({ auth_voluntario: true });
						}
						console.log(response);
						return response.json();
					})
					.then(data => {
						console.log(data);
						const expirationTime = Date.now() + 12 * 60 * 60 * 1000; // 12 horas en milisegundos
						localStorage.setItem("token", data.access_token);
						localStorage.setItem("tokenExpiry", expirationTime);
						localStorage.setItem("id", data.voluntario_data.id);
						setStore({voluntarioid: data.voluntario_data.id})
						localStorage.setItem("userType", "voluntario"); // Indicador de tipo de usuario
						console.log(data);
					});
			},
			
			checkLoggedIn: () => {
				const token = localStorage.getItem("token");
				const tokenExpiry = localStorage.getItem("tokenExpiry");
				const userType = localStorage.getItem("userType");
				const id = localStorage.getItem("id");
				const favs = localStorage.getItem("favorites");
				
				if (favs && token && tokenExpiry && Date.now() < parseInt(tokenExpiry)) {
					// Token existe y no ha caducado, verificar tipo de usuario
					if (userType === "ong") {
						setStore({ auth_ong: true });
					} else if (userType === "admin") {
						setStore({ auth_admin: true });
					} else if (userType === "voluntario") {
						setStore({ auth_voluntario: true });
					} else {
						// Tipo de usuario desconocido
						console.error("Tipo de usuario desconocido");
						setStore({ auth_ong: false, auth_admin: false, auth_voluntario: false });
					}
					
					// Si el ID coincide con el ID del token, guardar los favoritos
					if (id === token) {
						const favoritesToSave = [
							{ campaignName: "favorito1", ongName: "ong1" }, 
							{ campaignName: "favorito2", ongName: "ong2" }, 
							{ campaignName: "favorito3", ongName: "ong3" }
						]; // Lista de favoritos que deseas guardar
						favoritesToSave.forEach(favorite => actions.addFavorites(favorite.campaignName, favorite.ongName));
					}
				} else {
					// Token no existe o ha caducado
					setStore({ auth_ong: false, auth_admin: false, auth_voluntario: false });
				}
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

			// ong actions
			getOngs:() => {
				const requestOptions = {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
					mode: 'cors',
				};
				fetch(process.env.BACKEND_URL + "/api/ong/", requestOptions)
				.then((response) => response.json())
				.then((data) => {
					setStore({ ongs: data });
				})
			},

			getOngById: (id) => {
				const requestOptions = {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
					mode: 'cors',
				};
				fetch(process.env.BACKEND_URL + `/api/ong/${id}`, requestOptions)
					.then((response) => response.json())
					.then((data) => {
						console.log(data);
						setStore({ ong: data });
					})
					.catch(error => {
						console.error('Error fetching ONG by ID:', error);
					});
			},
			

			addOng(newOng) {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					mode: 'cors',
					body: JSON.stringify({
						"nif":newOng.nif,
						"email":newOng.email,
						"ciudad": newOng.ciudad,
						"nombre":newOng.nombre,
						"actividad":newOng.actividad,
						"aprobado": newOng.aprobado,
						"password": newOng.password,
						"direccion": newOng.direccion,
						
						
					})
				};
				fetch(process.env.BACKEND_URL + "/api/ong/", requestOptions)
				.then(response => response.json())
				.then(data => {
					setStore({ ong: data });
					alert("ONG creada correctamente");
				})
				.catch(error => {
					console.error('Error adding ONG:', error);
				});
			},


			deleteOng: (id) => {
				const deleteOptions = {
					method: "DELETE",
					mode: 'cors',
					headers: { 'Content-Type': 'application/json'  },
				};
				fetch(process.env.BACKEND_URL + "/api/ong/" + id, deleteOptions)

					.then(response => response.json())
					.then((data =>{
						fetch(process.env.BACKEND_URL + "/api/ong")
							.then((response) => response.json())
							.then((data) => {
								setStore({ ong: data });
				})
			}))
			},

			editOng: (editOng, id) => {
				const editOptions = {
			   method: "PUT",
			   headers: { 'Content-Type': 'application/json' },
			   mode: 'cors',
			   body: JSON.stringify({
					"nif":editOng.nif,
					"email":editOng.email,
					"ciudad": editOng.ciudad,
					"nombre":editOng.nombre,
					"actividad":editOng.actividad,
					"aprobado": editOng.aprobado,
					"password": editOng.password,
					"direccion": editOng.direccion,
					
			   })
		   };
		   fetch(process.env.BACKEND_URL + "/api/ong/" + id, editOptions)
		   .then(response => response.json())
		   .then(console.log(process.env.BACKEND_URL + "/api/ong/"+ id));
  		 },	

		
		ongLogin: (email, password) => {
			console.log('Login desde flux');
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					"email": email,
					"password": password
				})
			};
		
			fetch(process.env.BACKEND_URL + "/api/ongLogin/", requestOptions)
				.then(response => {
					console.log(response.status);
					if (response.status === 200) {
						setStore({ auth_ong: true });
					}
					console.log(response);
					return response.json();
				})
				.then(data => {
					console.log(data);
					const expirationTime = Date.now() + 12 * 60 * 60 * 1000; // 12 horas en milisegundos
					localStorage.setItem("token", data.access_token);
					localStorage.setItem("tokenExpiry", expirationTime);
					localStorage.setItem("id", data.ong_data.id);
					setStore({ongid: data.ong_data.id})
					localStorage.setItem("userType", "ong"); // Indicador de tipo de usuario
					console.log(data);
				});
		},

		ongLogout: () => {
			setStore({ auth_ong: false });
			localStorage.removeItem("token");
			localStorage.removeItem("id");
			localStorage.removeItem("tokenExpiry");
			localStorage.removeItem("userType");			
		},


		// campaign actions
		loadAllCampaigns: () => {
			const requestOptions = {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
				mode: 'cors',
			};
			fetch(process.env.BACKEND_URL + "/api/campaign", requestOptions)
				.then((response) => response.json())
				.then((data) => {
					setStore({ allCampaigns: data }); // Use 'allCampaigns' instead of 'campaign'
				})
				.catch((error) => {
					console.error("Error loading all campaigns:", error);
				});
		},

		loadCampaignsByOng: (ongId) => {
			const requestOptions = {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
				mode: 'cors',
			};
			fetch(process.env.BACKEND_URL + `/api/campaigns/${ongId}`, requestOptions)
				.then((response) => response.json())
				.then((data) => {
					setStore({ campaigns: data }); // Use 'campaigns' instead of 'campaign'
				})
				.catch((error) => {
					console.error("Error loading campaigns by ONG:", error);
				});
		},
		
		addCampaign(newCampaign) {
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				mode: 'cors',
				body: JSON.stringify({
					"fecha_finalizacion": newCampaign.fecha_finalizacion,
					"fecha_inicio": newCampaign.fecha_inicio,
					"nombre": newCampaign.nombre,
					"objetivo": newCampaign.objetivo,
					"articulos": newCampaign.articulos,
					"ong_name": newCampaign.ong_name,
				})
			};
			fetch(process.env.BACKEND_URL + "/api/campaign/", requestOptions)
				.then(response => response.json())
				.then(data => {
					// Aquí puedes agregar alguna acción adicional si lo necesitas
					// Por ejemplo, puedes mostrar la respuesta del servidor
					console.log('Campaign added successfully:', data);
					// Alerta de campaña creada correctamente
					alert("Campaña creada correctamente");
				})
				.catch(error => {
					console.error('Error adding campaign:', error);
				});
		},
		


		deleteCampaign: (id) => {
			const deleteOptions = {
				method: "DELETE",
				mode: 'cors',
				headers: { 'Content-Type': 'application/json' },
			};
			fetch(process.env.BACKEND_URL + "/api/campaign/" + id, deleteOptions)
				.then(response => response.json())
				.then(() => {
					// Aquí puedes agregar alguna acción adicional si lo necesitas
					// Por ejemplo, puedes mostrar la respuesta del servidor
					console.log('Campaign deleted successfully');
					// Alerta de campaña eliminada correctamente
					alert("Campaña eliminada correctamente");
					// Actualizar la lista de campañas en el store si es necesario
					fetch(process.env.BACKEND_URL + "/api/campaign/")
						.then(response => response.json())
						.then(data => {
							setStore({ campaign: data });
						});
				})
				.catch(error => {
					console.error('Error deleting campaign:', error);
				});
		},
		


		// //update campaing after deletion
		// setCampaigns: (campaigns) => {
		// 	setStore({ campaigns: campaigns });
		// },

		editCampaign: (editCampaign, id) => {
			const editOptions = {
				method: "PUT",
				headers: { 'Content-Type': 'application/json' },
				mode: 'cors',
				body: JSON.stringify({
					"ong": editCampaign.ong,
					"articulos": editCampaign.articulos,
					"fecha_finalizacion": editCampaign.fecha_fin,
					"fecha_inicio": editCampaign.fecha_inicio,
					"nombre": editCampaign.nombre,
					"objetivo": editCampaign.objetivo,
					"ong_name": editCampaign.ong_name,
				})
			};
			fetch(process.env.BACKEND_URL + "/api/campaign/" + id, editOptions)
				.then(response => response.json())
				.then(data => {
					// Aquí puedes agregar alguna acción adicional si lo necesitas
					// Por ejemplo, puedes mostrar la respuesta del servidor
					console.log('Campaign edited successfully:', data);
					// Alerta de campaña editada correctamente
					alert("Campaña editada correctamente");
				})
				.catch(error => {
					console.error('Error editing campaign:', error);
				});
		},
			
	// admin login system 
	adminLogin: (email,password) => {
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
		fetch(process.env.BACKEND_URL + "/api/adminLogin/", requestOptions)
			.then(response => {
				console.log(response.status)
				if(response.status === 200){
					setStore({ auth_admin: true });
				}
				return response.json()
			})
			.then(data => {
				localStorage.setItem("token", data.access_token);
				localStorage.setItem("userType", "admin"); // Indicador de tipo de usuario
				console.log(data)
			});
	},

	adminSignup: (email, password) => {
		const requestOptions = {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(
				{
					"email":email,
					"password":password
				}
			)
		  };
		  
		fetch(process.env.BACKEND_URL + "/api/adminSignup/", requestOptions)
			.then(response => {
				if(response.status == 200){
					setStore({ auth_admin: true });
				}
				return response.text()
			})
			.then(result => console.log(result))
			.catch(error => console.log('error', error));
	},
	adminLogout: () => {
		setStore({ auth_admin: false });
		localStorage.removeItem("token");				
	},
	
	addFavorites: (campaignName, ongName) => {
		const favorites = getStore().favorites;
		const index = favorites.findIndex(favorite => favorite.campaignName === campaignName && favorite.ongName === ongName);
	
		let updatedFavorites;
	
		if (index === -1) {
			// Si el elemento no está en la lista de favoritos, agrégalo.
			updatedFavorites = [...favorites, { campaignName, ongName }];
		} else {
			// Si el elemento está en la lista de favoritos, elimínalo.
			updatedFavorites = favorites.filter(favorite => !(favorite.campaignName === campaignName && favorite.ongName === ongName));
		}
		
		// Actualiza el estado con los favoritos actualizados
		setStore({ ...getStore(), favorites: updatedFavorites });
		
		// Actualiza LocalStorage con los favoritos
		localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
	},
	
	
	
	

	deleteFavorite: (name) => {
		const store = getStore()
		const newFavorite = store.favorites.filter((item) => item !== name);
		

		setStore({favorites: newFavorite});

	},

	getCampaignById: (id) => {
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			mode: 'cors',
		};
		fetch(process.env.BACKEND_URL + "/api/campaign/" + id, requestOptions)
		.then((response) => response.json())
		.then((data) => {
		console.log(data)
		console.log(id)
			setStore({ campaign: data });
		})
	 },


	getApi: async () => {
		const apiUrl = 'https://api.charityapi.org/api/organizations/search/miami';
		const apiKey = 'live-SjALIo8higRQpV8gp8hC-9BXj5d06WksGHq6rOdl4NCtVbMH6X5f6KEB452GMxzxtqNYrKSOk1yHQHez'; // Reemplaza 'keyhere' con tu clave real
		fetch(apiUrl, {
    			method: 'GET',
   				headers: {
        		'apikey': apiKey
    },
})
    			.then(response => {
				if (!response.ok) {
					throw new Error(`Error de red - ${response.status}`);
				}
				return response.json();
			})
			.then(data => {
				// Imprimir datos en la consola
				console.log('Datos de la API de ONG:', data);
				// Almacenar la variable en el estado del store
				setStore({ ongApi: data });
			})
			.catch(error => {
				console.error('Error al hacer la solicitud:', error.message);
			});
			},

		}
	};
};

export default getState;