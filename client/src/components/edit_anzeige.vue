<template>
    <div class="wrapper">
        <!-- Sidebar  -->
        <nav id="sidebar">
            <div class="sidebar-header">
                <h3>Anzeige Verwalten</h3>
            </div>

            <ul class="list-unstyled components">

                <li>
                    <router-link to="/">Hauptseite</router-link>
                </li>
                <li>
                    <router-link to="/view_anzeige">Anzeigen</router-link>
                </li>
                <li>
                    <router-link to="/manage_anzeige">Anzeige verwalten</router-link>
                </li>
                <li>
                    <router-link to="/view_users">Benutzer</router-link>
                </li>
                <li>
                    <router-link to="/user_management">Benutzer verwalten</router-link>
                </li>
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
            <div class="box box-solid box-primary">
                <div class="row" style="margin-left: 10px">
                    <div class="box-header with-border">
                        <h3 class="box-title">Referenzdaten hinzufügen </h3>
                    </div>
                </div>
                <br>
                <div class="row" style="margin-left: 10px">
                    <div class="col-md-6">
                        <div class="box-tools ">
                            <label>Referenz</label>
                            <input type="text" class="form-control" v-model="referenz"
                                   placeholder="Referenz einfügen">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="col-md-12">
                            <div class="box-tools ">
                                <label for="plz">Postleitzahl</label>
                                <input type="text" class="form-control" id="plz" name="plz"
                                       placeholder="PLZ einfügen" v-model="plz" required>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <div class="row" style="margin-left: 10px">
                    <div class="col-md-6">
                        <div class="box-tools ">
                            <label for="europaletten">Europaletten</label>
                            <input type="number" maxlength="20" class="form-control" id="europaletten"
                                   name="europaletten" placeholder="Europaletten Nummer" v-model="europaletten"
                                   required>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="col-md-12">
                            <div class="box-tools ">
                                <label for="sendung_gewicht">Sendung Gewicht</label>
                                <input type="number" maxlength="20" class="form-control" id="sendung_gewicht"
                                       name="sendung_gewicht" placeholder="Sendung Gewicht in kg"
                                       v-model="sendung_gewicht" required>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <hr/>
                <br>
                <div class="row" style="margin-left: 10px">
                    <div class="col-md-4">
                        <div class="box-tools">
                            <label for="abholung_bereit" class="control-label">Abholung bereit ab</label>
                            <div class="input-group date form_date" data-date="" data-date-format="dd MM yyyy"
                                 data-link-field="abholung_bereit_hidden" data-link-format="yyyy-mm-dd">
                                <datepicker id="abholung_bereit" name="abholung_bereit" :language="de"
                                            v-model="abholung_bereit"
                                            :bootstrap-styling="true" required
                                            placeholder="Abholung bereit ab"></datepicker>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                                <span class="input-group-addon"><span
                                        class="glyphicon glyphicon-calendar"></span></span>
                            </div>
                            <input type="hidden" name="id" id="id" v-model="id"/><br/>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="col-md-12">
                            <div class="box-tools ">
                                <label for="abholung_bereit_in">Abholung Bereit in</label>
                                <input type="text"
                                       v-model="abholung_bereit_in" required  class="form-control"
                                       id="abholung_bereit_in"
                                       name="abholung_bereit_in"
                                       placeholder="Abholung Bereit in: 21079 Hamburg, Konsul Ritter Straße 15-17">
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <div class="row" style="margin-left: 10px">
                    <div class="col-md-4">
                        <div class="box-tools">
                            <label class="control-label">Anlieferung Spätestens bis</label>
                            <div class="input-group date form_date" data-date="" data-date-format="dd MM yyyy"
                                 data-link-field="anlieferung_spat_bis_hidden" data-link-format="yyyy-mm-dd">
                                <datepicker :language="de" :bootstrap-styling="true"
                                            placeholder="Anlieferung spätestens bis"
                                            v-model="anlieferung_spat_bis"></datepicker>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                                <span class="input-group-addon"><span
                                        class="glyphicon glyphicon-calendar"></span></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="col-md-12">
                            <div class="box-tools ">
                                <label for="anlieferung_spat_in">Anlieferung Spätestens in</label>
                                <input type="text" required v-model="anlieferung_spat_in"
                                       class="form-control" id="anlieferung_spat_in"
                                       name="anlieferung_spat_in"
                                       placeholder="Anlieferung Spätestens in: 24589 Nortorf, Timmasper Weg 28 ">
                            </div>
                        </div>
                    </div>
                </div>
                <br>

                <button type="submit" v-on:click="update_referenz" class="btn btn-primary"
                        style="width: 20%;margin-left: 40%;">Aktualisieren
                </button>
            </div>

        </section>

        <div class="alert alert-danger" role="alert" v-if="this.error.length>1">{{error}}</div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Datepicker from 'vuejs-datepicker'
    import {de} from 'vuejs-datepicker/dist/locale'

    export default {

        components: {
            Datepicker
        },
        name: "edit_anzeige"
        , data() {
            return {
                data_anzeige: [],
                error: '',
                de: de,
                referenz: '',
                plz: '',
                europaletten: '',
                sendung_gewicht: '',
                abholung_bereit: '',
                abholung_bereit_in: '',
                anlieferung_spat_bis: '',
                anlieferung_spat_in: '',
                id: ''
            }
        }, methods: {
            logout() {
                this.$session.destroy()
                this.$router.push('/login')
            },
            async update_referenz() {
                if(this.referenz.trim()==''||this.plz.trim()==''||this.europaletten.trim()==''||this.sendung_gewicht.trim()==''||this.abholung_bereit_in.trim()==''
                    ||this.anlieferung_spat_in.trim()==''||this.anlieferung_spat_bis==''||this.abholung_bereit==''){
                    alert('Sie müssen alle erforderlichen Felder ausfüllen')
                    return false
                }else{
                await axios.post("http://localhost:3000/api/update_referenz", {
                    referenz: this.referenz.trim(),
                    plz: this.plz.trim(),
                    europaletten: this.europaletten.trim(),
                    sendung_gewicht: this.sendung_gewicht.trim(),
                    abholung_bereit: this.abholung_bereit,
                    abholung_bereit_in: this.abholung_bereit_in.trim(),
                    anlieferung_spat_bis: this.anlieferung_spat_bis,
                    anlieferung_spat_in: this.anlieferung_spat_in.trim(),
                    id: this.id
                }).then((response) => {
                    if (response.status === 200) {

                        this.$router.push('/')
                    } else {
                        this.error = "ein Fehler ist aufgetreten ";
                    }
                })
            }}
        },
        async created() {
            await axios.get("http://localhost:3000/api/edit_anzeige/" + this.$route.params.anzeigeid).then((response => {
                    if (response.status === 200 && response.data.length != 0) {
                        this.data_anzeige = response.data
                        this.referenz = response.data[0].referenz
                        this.plz = response.data[0].plz
                        this.europaletten = response.data[0].europaletten
                        this.sendung_gewicht = response.data[0].sendung_gewicht
                        this.abholung_bereit = new Date(response.data[0].abholung_bereit)
                        this.abholung_bereit_in = response.data[0].abholung_bereit_in
                        this.anlieferung_spat_bis = new Date(response.data[0].anlieferung_spat_bis)
                        this.anlieferung_spat_in = response.data[0].anlieferung_spat_in
                        this.id = response.data[0].id

                    } else {
                        this.$router.push('/')
                    }
                })
            )
        }
        ,
        beforeCreate: function () {
            if (!this.$session.has('email')) {
                this.$router.push('/login')
            }
        },
    }
</script>

<style scoped>

</style>