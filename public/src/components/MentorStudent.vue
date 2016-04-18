<template>

  <div class="row">
    <div class="col-sm-9 col-md-6">
    <tabs>
             
          <input v-model="searchQuery" placeholder="Search..." class="form-control">
           
          <tab v-for="sem in semestar" :header="sem.id +'.sem'">
           <table class="table table-hover table-bordered">
            <thead>
              <tr><th colspan="5" class="bg-info">Popis predmeta</th></tr>
                <tr>
                  <th>Ime</th>
                  <th>Bodovi</th>
                  <th>Šifra</th>
                  <th>Pon.</th>
                  <th>Upiši</th>
                </tr>
            </thead>
            <tbody>
              <tr v-for="predmet in predmeti | filterBy searchQuery"
               v-show="predmet.sem_redovni == sem.id">
                  <td><span class="text-primary">{{ predmet.ime}}</span></td>
                  <td><span class="text-primary">{{ predmet.bodovi}} </span></td>
                  <td><span class="text-primary">{{ predmet.kod }}</span></td>
                  <td align="center">
                  <select v-model="$index">
                    <option selected value="">*</option>
                    <option   value="NE">NE</option>
                    <option   value="DA">DA</option>
                   </select>
                  </td>
                  <td align="center">
                  <popover
                      effect="fade"
                      placement="left"
                      trigger="hover"
                      title="Upozorenje"
                      content="Za upis predmeta potrebno je odabrati ponavljanje predmeta!">
                    <button
                   class="btn btn-primary btn-xs glyphicon glyphicon-ok"
                   v-on:click="upisiPredmet(predmet._id,$index)"
                   >
                   </button>
                    </popover>
                  
                   </td>
              </tr>
            </tbody>
          </table>
        </tab>
    </tabs>
    </div>
    <div class="col-sm-9 col-md-6" id="div_upisani">
    
      <table class="table table-hover table-bordered">
    <thead>
    <tr><th colspan="7" class="bg-danger">Upisani predmeti</th></tr>
      <tr>
        <th>Ime</th>
        <th>Bodovi</th>
        <th>Šifra</th>
        <th>Sem.</th>
        <th>Pon.</th>
        <th>Ispiši</th>
        <th>Položeno</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="upredmet in uPredmeti">  
        <td><span class="text-primary">{{ upredmet.ime }}</span></td>
        <td><span class="text-primary">{{ upredmet.bodovi }}</span></td>
        <td><span class="text-primary">{{ upredmet.kod }}</span></td>
        <td><span class="text-primary">{{ upredmet.sem_redovni }}</span></td>
        <td> <span class="text-primary">{{ upredmet.ponavlja }}</span></td>
        <td align="center"><button class="btn btn-danger btn-xs glyphicon glyphicon-remove" v-on:click="removePredmet(upredmet._id)"></button></td>
        <td>Ocjena:
                    <select v-model="$index">
                      <option selected value=""></option>
                      <option   value="2"> 2 </option>
                      <option   value="3"> 3 </option>
                      <option   value="4"> 4 </option>
                      <option   value="5"> 5 </option>
                    </select>
                    <popover
                      effect="fade"
                      placement="left"
                      trigger="hover"
                      title="Upozorenje"
                      content="Prije upisa položenog predmeta provjeriti da su svi podatci točni!">
                    <button class="btn btn-success btn-xs glyphicon glyphicon-ok" v-on:click="polozeniPredmet(upredmet._id,$index)"></button>
                    </popover>
        </td>
      </tr>
      <thead>
        <tr  v-if="bodovi != 0" class="bg-danger"><th colspan="1">Ukupno bodova</th>
            <th colspan="6">{{ bodovi_upisani }}</th>
        </tr>
        <tr v-if="bodovi > 60">
        <th colspan="6" class="alert alert-danger">
          <strong>Upozorenje!</strong> Upisali ste preko 60 bodova.
        </th>
        </tr>
      </thead>
    </tbody>
  </table>
    </div>
    </div>
    <div class="row">
     <div class="col-sm-9 col-md-6">
    
      <table class="table table-hover table-bordered">
    <thead>
    <tr><th colspan="6" class="bg-success">Položeni predmeti</th></tr>
      <tr>
        <th>Ime</th>
        <th>Bodovi</th>
        <th>Šifra</th>
        <th>Sem.</th>
        <th>Ocjena </th>
        <th>Ispiši</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="polPredmet in polozeni_predmeti">
        <td><span class="text-primary">{{ polPredmet.ime }}</span></td>
        <td><span class="text-primary">{{ polPredmet.bodovi }}</span></td>
        <td><span class="text-primary">{{ polPredmet.kod }}</span></td>
        <td><span class="text-primary">{{ polPredmet.sem_redovni }}</span></td>
        <td><span class="text-primary">{{ polPredmet.ocjena }}</span></td>
        <td align="center"><button class="btn btn-danger btn-xs glyphicon glyphicon-remove" v-on:click="removePolozeniPredmet(polPredmet._id)"></button></td>
      </tr>
      <thead>
        <tr  class="bg-success"><th colspan="1">Ukupno bodova</th>
            <th colspan="6">{{ bodovi_polozeni }}</th> 
        </tr>
      </thead>
    </tbody>
  </table>
    </div>
    </div>
  
 


</template>

<script>
import auth from '../auth'
import { tab } from 'vue-strap'
import { tabset as tabs } from 'vue-strap'
import {popover} from 'vue-strap'
//import {router} from '../index'

export default {
  

  data() {
    return {
      
      predmeti: '', uPredmeti: '', searchQuery: '', pred_ponavlja: '', polozeni_predmeti : '',
      bodovi_upisani: 0, bodovi_polozeni: 0,
      id: '',
      semestar:[ {id:"1"}, {id:"2"}, {id:"3"}, {id:"4"}, {id:"5"}, {id:"6"}],
            
      }
  },
  
  ready: 
      function() {
        
        this.getPredmet();
        this.getUpisaniPredmet();
        this.getPolozeniPredmet();
        
        },
  components: {
   tab,
   tabs,
   popover,
   
  },
 
  methods: {
    getPolozeniPredmet() {
      this.$http
        .get('http://localhost:8080/user_polozeni/' + this.$route.params.email , (data) => {

          for(var i = 0 ; i < data.polozeni.length ; i++)
                            {
                                for ( var j = 0 ; j < data.predmeti.length ; j++ )
                                {
                                    if (data.polozeni[i].id == data.predmeti[j]._id)
                                      {
                                        data.predmeti[j].ocjena = data.polozeni[i].ocjena;
                                     
                                      }
                                }
                            }
         
          this.polozeni_predmeti = data.predmeti;
          var temp_bodovi = 0; 
          for (var i = 0; i < this.polozeni_predmeti.length; i++) {
            temp_bodovi += this.polozeni_predmeti[i].bodovi;
                                              
          }
                  
                   this.bodovi_polozeni = temp_bodovi;

                    
        })
        .error((err) => console.log(err))
    },
    
    getUpisaniPredmet() {
      this.$http
        .get('http://localhost:8080/user/' + this.$route.params.email , (data) => {

          for(var i = 0 ; i < data.upisani.length ; i++)
                            {
                                for ( var j = 0 ; j < data.predmeti.length ; j++ )
                                {
                                    if (data.upisani[i].id == data.predmeti[j]._id)
                                      {
                                        data.predmeti[j].ponavlja = data.upisani[i].ponavlja;
                                     
                                      }
                                }
                            }
         
          this.uPredmeti = data.predmeti;
          var temp_bodovi = 0;
          //this.pred_ponavlja = data.upisani;
          for (var i = 0; i < this.uPredmeti.length; i++) {
            temp_bodovi += this.uPredmeti[i].bodovi;
          };
                   this.bodovi_upisani = temp_bodovi;
        },{ headers : auth.getAuthHeader() })
        .error((err) => console.log(err))
    },
    getPredmet() {
      this.$http
        .get('http://localhost:8080/predmet', (data) => {
          this.predmeti = data;
                      
          
        }).error((err) => console.log(err))
    },
    upisiPredmet(id,ponavlja) {
      this.removePredmet(id);
      this.$http
        .get('http://localhost:8080/user/'+this.$route.params.email+'/predmet/'+ id+'/'+ponavlja, (data)=>
          { if(data) this.getUpisaniPredmet();
                      
           }).error((err) => console.log(err))
        
              
    },
    removePredmet(id) {
      this.$http
        .get('http://localhost:8080/user/'+ this.$route.params.email+'/removePredmet/'+id, (data)=>
          { if(data) this.getUpisaniPredmet(); })
      },

    polozeniPredmet(id,ocjena) {
      
      this.$http
        .get('http://localhost:8080/user/'+ this.$route.params.email +'/polozeno/'+id+'/'+ocjena, (data) =>
        {
          if(data) {
            //this.removePredmet(id);
            this.getPolozeniPredmet();
            }
        }

          )},
    removePolozeniPredmet(id) {
      this.$http
        .get('http://localhost:8080/user/'+ this.$route.params.email+'/removePolozeniPredmet/'+id, (data)=>
          { if(data) this.getPolozeniPredmet(); })

    }
          
  },
    

  computed: {
      filteredPredmet() {
        return this.$options.filters.filterBy(this.predmeti.sem_redovni, this.searchQ);

    }
       
},
  route: {
    canActivate() {
            return auth.user.authenticated && auth.user.isAdmin
    }
  }

}
</script>
<style>
  .nav-tabs[_v-4765fae9] {
    margin-bottom: 0px;
     }

  #div_upisani {
    margin-top: 75.4px;
  }

</style>
