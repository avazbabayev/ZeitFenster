<template>

    <div class="wrapper">
        <!-- Sidebar  -->
        <nav id="sidebar">
            <div class="sidebar-header">
                <h3>Anzeige verwalten</h3>
            </div>

            <ul class="list-unstyled components">

                <li>
                    <router-link to="/">Hauptseite</router-link>
                </li>
                <li>
                    <router-link to="/view_anzeige">Anzeigen</router-link>
                </li>
                <li class="active">
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
                            <label for="referenz">Referenz</label>
                            <input type="text" class="form-control" id="referenz" name="referenz"
                                   placeholder="Referenz einfügen" v-model="referenz" required>
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
                            <label class="control-label">Abholung bereit ab</label>
                            <div class="input-group date form_date" data-date="" data-date-format="dd MM yyyy"
                                 data-link-field="abholung_bereit_hidden" data-link-format="yyyy-mm-dd">
                                <datepicker :language="de" :bootstrap-styling="true"
                                            placeholder="Anlieferung spätestens bis"
                                            v-model="abholung_bereit"></datepicker>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                                <span class="input-group-addon"><span
                                        class="glyphicon glyphicon-calendar"></span></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="col-md-12">
                            <div class="box-tools ">
                                <label for="abholung_bereit_in">Abholung Bereit in</label>
                                <input type="text" required maxlength="50" class="form-control" id="abholung_bereit_in"
                                       name="abholung_bereit_in" v-model="abholung_bereit_in"
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
                                <input type="text" required maxlength="50" class="form-control" id="anlieferung_spat_in"
                                       name="anlieferung_spat_in" v-model="anlieferung_spat_in"
                                       placeholder="Anlieferung Spätestens in: 24589 Nortorf, Timmasper Weg 28 ">
                            </div>
                        </div>
                    </div>
                </div>
                <br>

                <button v-on:click="add_referenz" class="btn btn-primary"
                        style="width: 20%;margin-left: 40%;">Add
                </button>
            </div>
            <br>
            <!-- /.box-body -->

        </section>

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
        name: "manage_anzeige",
        data() {
            return {
                error: '', de: de, referenz: '', plz: '', europaletten: '', sendung_gewicht: '',
                abholung_bereit: new Date(), abholung_bereit_in: '', anlieferung_spat_bis: new Date(),
                anlieferung_spat_in: ''
            }
        },
        beforeCreate: function () {
            if (!this.$session.has('email')) {
                this.$router.push('/login')
            }
        },
        methods: {
            logout() {
                this.$session.destroy()
                this.$router.push('/login')
            },
            async add_referenz() {
                if (this.referenz.trim() == '' || this.plz.trim() == '' || this.europaletten.trim() == '' || this.sendung_gewicht.trim() == '' || this.abholung_bereit_in.trim() == ''
                    || this.anlieferung_spat_in.trim() == '' || this.anlieferung_spat_bis == '' || this.abholung_bereit == '') {
                    alert('Sie müssen alle erforderlichen Felder ausfüllen')
                    return false
                } else {
                    await axios.post("http://localhost:3000/api/add_referenz", {
                        referenz: this.referenz,
                        plz: this.plz,
                        europaletten: this.europaletten,
                        sendung_gewicht: this.sendung_gewicht,
                        abholung_bereit: this.abholung_bereit,
                        abholung_bereit_in: this.abholung_bereit_in,
                        anlieferung_spat_bis: this.anlieferung_spat_bis,
                        anlieferung_spat_in: this.anlieferung_spat_in
                    }).then((response) => {
                        if (response.status === 200) {

                            this.$router.push('/')
                        } else {
                            this.error = "Ein Fehler ist aufgetreten ";
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>