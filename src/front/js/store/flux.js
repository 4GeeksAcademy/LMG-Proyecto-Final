const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			ong: [],
			auth_ong: false,
		},
		actions: {
			// ong actions
			loadOngs:() => {
				const requestOptions = {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
					mode: 'cors',
				};
				fetch(process.env.BACKEND_URL + "/api/ong/", requestOptions)
				.then((response) => response.json())
				.then((data) => {
					setStore({ ong: data });
				})
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
						"lat": newOng.lat,
						"lng": newOng.lng,
						
					})
				};
				fetch(process.env.BACKEND_URL + "/api/ong/", requestOptions)
				.then(response => response.json())
				.then(data => {
					setStore({ ong: data });
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
					"lat": editOng.lat,
					"lng": editOng.lng,

			   })
		   };
		   fetch(process.env.BACKEND_URL + "/api/ong/" + id, editOptions)
		   .then(response => response.json())
		   .then(console.log(process.env.BACKEND_URL + "/api/ong/"+ id));
  		 },	


	
		   ongLogin: (email,password) => {
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
			fetch(process.env.BACKEND_URL + "/api/ongLogin/", requestOptions)
				.then(response => {
					console.log(response.status)
					if(response.status === 200){
						setStore({ auth_admin: true });
					}
					return response.json()
				})
				.then(data => {
					localStorage.setItem("token", data.access_token);
					console.log(data)

				});
		},
		
		ongLogout: () => {
			setStore({ auth_ong: false });
			localStorage.removeItem("token");				
		},
		}
	};
};

export default getState;