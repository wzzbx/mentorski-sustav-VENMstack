<template>
<div class="container">
  <div class="row">
    <div class="col-sm-3 col-md-6">
    <tabs>
      <div class="row">
        <div class="col-sm-3 col-md-12">
          <input v-model="searchQuery" placeholder="Search..."class="form-control">
        </div>
      </div>
          <tab v-for="sem in semestar" :header="sem.id +'.sem'">
           <table class="table table-bordered table-hover">
            <thead>
              <tr><th colspan="4"><span class="text-primary">#Predmeti</span></th></tr>
                <tr>
                  <th>Ime</th>
                  <th>Bodovi</th>
                  <th>Šifra</th>
                  <th>Upiši</th>
                </tr>
            </thead>
            <tbody>
              <tr v-for="predmet in predmeti | filterBy searchQuery" v-show="predmet.sem_redovni == sem.id">
                  <td><span class="text-primary">{{ predmet.ime}}</span></td>
                  <td><span class="text-primary">{{ predmet.bodovi}} </span></td>
                  <td><span class="text-primary">{{ predmet.kod }}</span></td>
                  <td align="center"><button class="btn btn-primary btn-xs glyphicon glyphicon-ok" v-on:click="upisiPredmet(predmet._id)"></button></td>
              </tr>
            </tbody>
          </table>
        </tab>
    </tabs>
    </div>
    <div class="col-sm-9 col-md-6">
    
      <table class="table table-bordered table-hover">
    <thead>
    <tr><th colspan="5"><span class="text-danger">#Upisani predmeti</span></th></tr>
      <tr>
        <th>Ime</th>
        <th>Bodovi</th>
        <th>Šifra</th>
        <th>Sem.</th>
        <th>Ispiši</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="upredmet in uPredmeti">
        <td><span class="text-primary">{{ upredmet.ime }}</span></td>
        <td><span class="text-primary">{{ upredmet.bodovi }}</span></td>
        <td><span class="text-primary">{{ upredmet.kod }}</span></td>
        <td><span class="text-primary">{{ upredmet.sem_redovni }}</span></td>
        <td align="center"><button class="btn btn-danger btn-xs glyphicon glyphicon-remove" v-on:click="removePredmet(upredmet._id)"></button></td>
      </tr>
      <thead>
        <tr  class="alert alert-info"><th colspan="1"><span class="text-primary">#Ukupno bodova</span></th>
            <th colspan="4"><span class="text-primary">{{ bodovi }}</span></th>
        </tr>
        <tr v-if="bodovi > 60">
        <th colspan="5" class="alert alert-danger">
          <strong>Upozorenje!</strong> Upisali ste preko 60 bodova.
        </th>
        </tr>
      </thead>
    </tbody>
  </table>
    </div>
  
  </div>
</div>

</template>

<script>
import auth from '../auth'
import { tab } from 'vue-strap'
import { tabset as tabs } from 'vue-strap'
//import {router} from '../index'

export default {
  

  data() {
    return {
      
      predmeti: '', uPredmeti: '', searchQuery: '',
      bodovi: 0,
      id: '',
      semestar:[ {id:"1"}, {id:"2"}, {id:"3"}, {id:"4"}, {id:"5"}, {id:"6"}],
            
      }
  },
  
  ready: 
      function() {

        this.getPredmet();
        this.getUpisaniPredmet();
                
        },
  components: {
   tab,
   tabs
   
  },
 
  methods: {

    getUpisaniPredmet() {
      this.$http
        .get('http://localhost:8080/user/' + this.$route.params.email , (data) => {
          
          this.uPredmeti = data; var temp_bodovi = 0;
          for (var i = 0; i < this.uPredmeti.length; i++) {
            temp_bodovi += this.uPredmeti[i].bodovi;
          };
                   this.bodovi = temp_bodovi;
        },{ headers : auth.getAuthHeader() })
        .error((err) => console.log(err))
    },
    getPredmet() {
      this.$http
        .get('http://localhost:8080/predmet', (data) => {
          this.predmeti = data;
            
          
          
        }).error((err) => console.log(err))
    },
    upisiPredmet(id) {
      this.$http
        .get('http://localhost:8080/user/'+this.$route.params.email+'/predmet/'+ id, (data)=>
          { if(data) this.getUpisaniPredmet();
                      
           })
        
              
    },
    removePredmet(id) {
      this.$http
        .get('http://localhost:8080/user/'+ this.$route.params.email+'/removePredmet/'+id, (data)=>
          { if(data) this.getUpisaniPredmet(); })
      }
          
  },

  computed: {
      filteredPredmet() {
        return this.$options.filters.filterBy(this.predmeti.sem_redovni, this.searchQ);

    }
       
},
  route: {
    canActivate() {
            return auth.user.authenticated && !auth.user.isAdmin
    }
  }

}
</script>
