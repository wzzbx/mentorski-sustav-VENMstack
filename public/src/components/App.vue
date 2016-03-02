<template>
<div class="container-full-bg">
    <div class="container-special">
      <div class="jumbotron"></div>
    </div>
</div>

<nav class="navbar navbar-inverse" v-if="user.authenticated">
  <ul class="nav navbar-nav navbar-right">
    <li><a v-link="{ name:'mentorlistastudent', params: { email: user.email }}" v-if="user.isAdmin"><span class="glyphicon glyphicon-user"></span> Lista studenata</a></li>
    <li v-if="user.isAdmin"><a><span class="glyphicon glyphicon-king"></span> Dobrodošli, {{ user.email }}</a></li>
    <li v-if="!user.isAdmin"><a><span class="glyphicon glyphicon-king"></span> Dobrodošli, {{ $route.params.email }}</a></li>
    <li><a v-link="'/login'" v-if="user.authenticated" @click="logout()"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
    <li><a v-link="'/login'" v-if="!user.authenticated"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
  </ul>
</nav>

<div class="container-fluid">
    <router-view></router-view>
 </div>  
</template>

<script>
import auth from '../auth'
//import {router} from '../index'

export default {
  data() {
    return {
      
      user: auth.user,
      isAdmin: auth.isAdmin,
      email: auth.user.email

        }
      },

      methods: {
        
        logout() {
          auth.logout()
        }
      }
    }

  
</script>
<style>

.navbar-nav > li > a, .navbar-brand {
    margin-top: 0px;
    margin-right: 2em;
}

.jumbotron {
  background-color:inherit;
  margin-top: 0px;
  margin-bottom: 0px;
  
        
}
.container-special {
  margin-top:0px;
}
 
.container-full-bg {
  margin-top: 0px;
  width:100%;
  height:100%;
  max-width:100%;
  background-position:center;
  background-size:cover;
  background-image:url('./images/background.png');

}
    
.container-full-bg .container, .container-full-bg .container .jumbotron {
  height:100%;
  width:100%;
}
  
</style>
