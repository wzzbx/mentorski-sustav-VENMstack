<script lang='babel'>

import { router } from '../index'
import auth from '../auth'

export default {

  data() {
    return {
      
      user: {
        email:    '',
        password: ''
      },
        error: '',
        msg:'',
      }
  },
  
  methods: {
    
    submit() {
        //event.preventDefault();
        var user = {
            email    : this.user.email,
            password : this.user.password }; 
      
    this.$http
        .post('http://localhost:8080/login', user, (data) => {
            
            localStorage.setItem('id_token',data.id_token);
            auth.user.id_token = data.id_token;
            auth.user.authenticated = true;
            
            if (data.isAdmin) { 
              auth.user.isAdmin = true;
              auth.user.email = this.user.email;
                router.go({ name: 'mentorlistastudent', params: { email: this.user.email }});
                  }
                else
                  { router.go({ name: 'student', params: { email: this.user.email }}); }  
    }).error((err) => console.log(err))
           
             }
  }
  
}
</script>
<template>

<div class="container">

<div class="col-sm-4 col-sm-offset-4">

    <h1 class=" text-primary"><span class="fa fa-sign-in glyphicon glyphicon-education"></span> Mentorski sustav</h1>

    <!-- LOGIN FORMA -->
    <form @submit.prevent="submit()">
        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" v-model="user.email" placeholder="Enter your email" required>
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="user.password" placeholder="Enter your password" required>
        </div>

        <button type="submit" class="btn btn-warning btn-lg btn-block">Login</button>
    </form>
</div>

</div>
</template>






    
