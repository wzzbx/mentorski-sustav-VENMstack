import Vue from 'vue'
import App from './components/App.vue'
import MentorListaStudent from './components/MentorListaStudent.vue'
import MentorStudent from './components/MentorStudent.vue'
import Student from './components/Student.vue'
import Login from './components/Login.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(VueRouter)
import auth from './auth'

Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');

// provjera autentifikacije @app start
auth.checkAuth()

export var router = new VueRouter({
    hashbang: true,
    history: false,   // reload page ne radi if true
    mode: 'html5'
    //SaveScrollPosition: true
});

router.map({
  '/login': {
    name: 'login',
    component: Login,
  },
  
  '/mentorStudent/:email': {
    name: 'mentorStudent',
  	component: MentorStudent
  },
  
  '/student/:email': {
    name: 'student',
    component: Student

  },
  
  '/mentorlistastudent/:email': {
    name: 'mentorlistastudent',
    component: MentorListaStudent
  }
});

router.redirect({
  '*': '/login'
});

router.start(App, '#app');

