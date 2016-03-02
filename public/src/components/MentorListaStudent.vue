<template>
<div class="container">
  
    <div class="col-sm-6 col-sm-offset-3">

        <h1><span class="label label-primary">#Student</span></h1>
          <ul class="list-group" >
            <div v-for="student in studenti">
              <a v-link="{ name: 'mentorStudent', params: { email: student.email }}" class="list-group-item"><span class="text-primary">{{ student.email }}</span></a>
            </div>
          </ul>
    
  </div>
</template>

<script>
//import {router} from '../index';
import auth from '../auth'

export default {

  data() {
    return {
      
      studenti: ''
    
    }
  },
  
  ready: 
      function() {

        this.getStudent();
  },

  methods: {
   
    getStudent() {
      this.$http
        .get('http://localhost:8080/mentor/'+ this.$route.params.email, (data) => {
          
          this.studenti = data;
        }, { headers: auth.getAuthHeader()
        }).error((err) => console.log(err))
    }
  },
  route: {
    canActivate() {
            return  auth.user.isAdmin && auth.user.authenticated
    }
  }

}
</script>
