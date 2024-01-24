const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			campaign: [],
			auth_admin: false,
		},
		actions: {
			// campaign actions
			loadCampaigns:() => {
				const requestOptions = {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
					mode: 'cors',
				};
				fetch(process.env.BACKEND_URL + "/api/campaign/", requestOptions)
				.then((response) => response.json())
				.then((data) => {
					setStore({ campaign: data });
				})
			},
			addCampaign(newCampaign) {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					mode: 'cors',
					body: JSON.stringify({
						"articulos":newCampaign.articulos,
						"fecha_finalizacion":newCampaign.fecha_finalizacion,
						"fecha_inicio": newCampaign.fecha_inicio,
						"nombre":newCampaign.nombre,
						"objetivo":newCampaign.objetivo,
						"ong_id": newCampaign.ong_id,

					})
				};
				fetch(process.env.BACKEND_URL + "/api/campaign/", requestOptions)

			},


			deleteCampaign: (id) => {
				const deleteOptions = {
					method: "DELETE",
					mode: 'cors',
					headers: { 'Content-Type': 'application/json'  },
				};
				fetch(process.env.BACKEND_URL + "/api/campaign/" + id, deleteOptions)

					.then(response => response.json())
					.then((data =>{
						fetch(process.env.BACKEND_URL + "/api/campaign/")
							.then((response) => response.json())
							.then((data) => {
								setStore({ campaign: data });
				})
			}))
			},

			editCampaign: (editCampaign, id) => {
				const editOptions = {
			   method: "PUT",
			   headers: { 'Content-Type': 'application/json' },
			   mode: 'cors',
			   body: JSON.stringify({
				   "ong": editCampaign.ong,
					"articulos":editCampaign.articulos,
					"fecha_finalizacion":editCampaign.fecha_fin,
					"fecha_inicio": editCampaign.fecha_inicio,
					"nombre":editCampaign.nombre,
					"objetivo":editCampaign.objetivo,
					"ong_id": editCampaign.ong_id,

			   })
		   };
		   fetch(process.env.BACKEND_URL + "/api/campaign/" + id, editOptions)
		   .then(response => response.json())
		   .then(console.log(process.env.BACKEND_URL + "/api/campaign/"+ id));
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
		}
	};
};

export default getState;
