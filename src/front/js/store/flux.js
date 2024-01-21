const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			/* Array Lista campañas*/
			campaign: [],
		},
		actions: {
			/* Acciones campañas */
			loadCampaigns:() => {
				const requestOptions = {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
					 mode: 'cors',
				};
				fetch(process.env.BACKEND_URL + "api/campaign/", requestOptions)
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
				fetch("https://obscure-invention-x5w59xrjx4pgf6xj7-3001.app.github.dev/api/campaign", requestOptions)
				// fetch(process.env.BACKEND_URL + "api/campaign/", requestOptions)

			},
			deleteCampaign: (id) => {
				const deleteOptions = {
					method: "DELETE",
					headers: { 'Content-Type': 'application/json'  },
					mode: 'cors',
					
				};
				//  fetch("https://obscure-invention-x5w59xrjx4pgf6xj7-3001.app.github.dev/api/campaign" + id, deleteOptions)
				fetch(process.env.BACKEND_URL + "/api/campaign/" + id, deleteOptions)

					.then(response => response.json())
					.then((data =>{ 
						// fetch("https://obscure-invention-x5w59xrjx4pgf6xj7-3001.app.github.dev/api/campaign")
						fetch(process.env.BACKEND_URL + "/api/campaing/")
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




			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
