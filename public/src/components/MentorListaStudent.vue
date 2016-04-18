<template>

<div class="container">
     <div class="row">
        <div class="col-sm-6 col-sm-offset-3">
          <input v-model="searchQuery" placeholder="Search..."class="form-control">
        </div>
     <div class="col-sm-6 col-sm-offset-3">
    
      <table class="table table-hover">
    <thead>
    <tr><th colspan="5" class="bg-primary">Popis studenata</th></tr>
      <tr>
        <th>Ime</th>
        <th>Prezime</th>
        <th>Email</th>
        <th>Broj_Index</th>
        <th>Odaberi</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="student in studenti | filterBy searchQuery">
        <td ><span class="text-primary">{{ student.ime }}</span></td>
        <td><span class="text-primary">{{ student.prezime }}</span></td>
        <td><span class="text-primary">{{ student.email }}</span></td>
        <td><span class="text-primary">{{ student.brIndex }}</span></td>
        <td align="center">
       
          <a v-link="{ name: 'mentorStudent', params: { email: student.email }}">
            <button class="btn btn-primary btn-xs glyphicon glyphicon-edit"></button>
          </a>
     
        
        </td>
      </tr>
      
    </tbody>
  </table>
    </div>
  </div>
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
