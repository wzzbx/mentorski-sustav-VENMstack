export default {
	
	user : {
		authenticated: false,
		isAdmin: false,
		id_token:'',
		email:''
	},
	logout() {
    	localStorage.removeItem('id_token')
    	this.user.authenticated = false;
    	this.user.isAdmin = false;
  },

	checkAuth() {
		var jwt = localStorage.getItem('id_token');
			if (jwt) {
				this.user.authenticated = true;
			} else {
				this.user.authenticated = false;
			}
	},

	getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  }
}