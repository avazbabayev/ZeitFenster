<template>

    <div class="wrapper1">
        <!-- Sidebar  -->
        <nav id="sidebar">
            <div class="sidebar-header">
                <h3>Referenz Anmelden</h3>
            </div>

            <ul class="list-unstyled components">

                <li style="bottom: 0;">
                    <router-link to="/login">Anmelden</router-link>
                </li>
            </ul>

        </nav>
        <!-- DataTables Example -->

        <section style="width: 100%">
            <nav class="navbar navbar-expand-lg navbar-light bg-light"
                 style=" background:grey!important;border-radius: 0!important;">
                <div class="container-fluid">

                    <button type="button" id="sidebarCollapse" class="btn btn-info">
                        <i class="fas fa-align-left"></i>
                    </button>

                    <div style="right: 1%">
                        <button style="right: 0!important ;%" v-on:click="logout" class="btn btn-info">Logout</button>
                    </div>
                </div>
            </nav>
            <br>
            <!--main section-->
            <div class="alert alert-info" role="alert">
                <h3 class="text-center">Sendung <b>{{this.referens}}</b> ,<b>{{this.europaletten}}</b>
                    Europaletten , <b>{{this.sendung_gewicht}}</b> Kg</h3>
            </div>

            <br>
            <div class="alert alert-info" role="alert">
                <h3 class="text-center">Abholung bereit ab <b>{{this.dateformat(this.abholung_bereit)}}</b> in
                    <b>{{this.abholung_bereit_in}}</b></h3>
            </div>

            <br>
            <div class="alert alert-info" role="alert">
                <h3 class="text-center">Anlieferung spätestens bis
                    <b>{{this.dateformat(anlieferung_spat_bis)}}</b> in <b>{{anlieferung_spat_in}}</b>
                </h3>
            </div>

            <br>
            <div :id="mycal" style="width:100%;"></div>
            <br><br>


            <div class="card">
                <div class="card-header"><h3><b>Abholer</b></h3></div>

                <div class="card-body">
                    <div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="form-label-group">
                                    <label for="fahrzeug">Fahrzeug Kennzeichen:</label>
                                    <input type="text" v-model="fahrzeug" id="fahrzeug" name="fahrzeug"
                                           class="form-control"
                                           placeholder="Fahrzeug Kennzeichen:" required="required"
                                           autofocus="autofocus">
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="form-label-group">
                                    <label for="fahrer">Fahrer:</label>

                                    <input type="text" v-model="fahrer" id="fahrer" name="fahrer" class="form-control"
                                           placeholder="Fahrer:" required="required">
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="form-label-group">
                                    <label for="telephone">Telnr:</label>
                                    <input type="text" v-model="telephone" id="telephone" name="telephone"
                                           class="form-control"
                                           placeholder="Telnr:" required="required">
                                    <input type="hidden" v-model="id" name="ref_id" id="ref_id">
                                    <input type="hidden" id="date_selected" name="date_selected">
                                </div>
                            </div>
                        </div>
                        <br>

                    </div>
                </div>
            </div>
            <br>
            <button v-on:click="zeit_buchung" class="btn btn-primary btn-block btn-flat">
                Einreichen
            </button>
            <br><br>
        </section>

    </div>
</template>

<script>

    var y = document.getElementById('mycal');
    import axios from 'axios'

    export default {
        name: "referenz_anmeldungen",
        data() {
            return {
                res_date: [],
                mycal: 'cal',
                resdata: {},
                abholung_bereit: new Date(),
                abholung_bereit_in: '',
                anlieferung_spat_in: '',
                anlieferung_spat_bis: new Date(),
                europaletten: '',
                id: '',
                plz: '',
                referens: '',
                sendung_gewicht: '',
                telephone: '',
                fahrer: '',
                fahrzeug: ''

            }
        }, mounted() {
            var x = document.getElementById('cal');
            x.appendChild(y)
        },
        beforeCreate: function () {
            if (!this.$session.has('referenz')) {
                this.$router.push('/login')
            }
        },
        methods: {
            logout() {
                this.$session.destroy()
                this.$router.push('/login')
            },
            async zeit_buchung() {  if(this.fahrzeug.trim()==''||this.fahrer.trim()==''||
                this.telephone.trim()==''||this.date_selected.trim()==''||this.abholung_bereit_in.trim()==''){
                alert('Sie müssen alle erforderlichen Felder ausfüllen')
                return false
            }else{
                var date_selected = document.getElementById('date_selected').value;
                await axios.post("http://localhost:3000/api/referenz/zeitbuchung", {
                    fahrzeug: this.fahrzeug,
                    fahrer: this.fahrer,
                    telephone: this.telephone,
                    date_selected: date_selected,
                    ref_id: this.id
                }).then((response) => {
                    if (response.status === 200) {
                        this.$router.push('/email_bestatigung/' + this.id);
                    } else {
                        this.error = "Falsche Email oder Passwort ";
                    }
                })
            }},
            dateformat(date) {
                var today = new Date(date);
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //January is 0!

                var yyyy = today.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }
                var today = dd + '/' + mm + '/' + yyyy;
                return today;

            }
        },
        async created() {

            await axios.get("http://localhost:3000/api/referenz_anmeldung/" + this.$route.params.referenz).then((response => {
                    if (response.status === 200 && response.data.length != 0) {
                        this.resdata = response.data.resdata;
                        this.res_date = response.data.res_date;
                        this.referens = response.data.resdata.referenz;
                        this.plz = response.data.resdata.plz;
                        this.europaletten = response.data.resdata.europaletten;
                        this.sendung_gewicht = response.data.resdata.sendung_gewicht;
                        this.abholung_bereit = new Date(response.data.resdata.abholung_bereit);
                        this.abholung_bereit_in = response.data.resdata.abholung_bereit_in;
                        this.anlieferung_spat_bis = new Date(response.data.resdata.anlieferung_spat_bis);
                        this.anlieferung_spat_in = response.data.resdata.anlieferung_spat_in;
                        this.id = response.data.resdata.id

                        for (var i = 0; i < this.res_date.length; i++) {
                            var x = this.res_date[i].datum_ausgewahlt;
                            var year = x.slice(0, 10);
                            var hour = x.slice(11, 19)
                            $("[data-datefor=" + year + "]").find("[data-time=\"" + hour + "\"]").css('background', 'red');
                            $("[data-datefor=" + year + "]").find("[data-time=\"" + hour + "\"]").attr('clickable', 'false')
                        }
                    } else {
                        this.$router.push('/')
                    }
                })
            )


        }
    }
</script>

<style scoped>

</style>