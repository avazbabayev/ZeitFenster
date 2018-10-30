<template>

    <div class="wrapper">
        <!-- Sidebar  -->
        <nav id="sidebar">
            <div class="sidebar-header">
                <h3>Benutzer Verwalten</h3>
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
                <li class="active">
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
            <div class="col-md-7" style="margin-left: 20%; border: #5692be solid 2px">

                <br> <br> <br>
                <div class="form-group">
                    <label style="float:left; margin-left: 1%">Benutzername
                    </label>
                    <input style="float:left; margin-left: 1%" type="text" class="form-control" v-model="user_name"
                           name="user_name"
                           placeholder="Gib den Benutzernamen ein">

                </div>
                <br> <br> <br>
                <div class="form-group">
                    <label style="float:left; margin-left: 1%">E-Mail-Addresse
                    </label>
                    <input style="float:left; margin-left: 1%" type="email" class="form-control" v-model="email"
                           name="email"
                           placeholder="E-Mail Adresse eingeben">

                </div>
                <br> <br> <br>
                <div class="form-group">
                    <label style="float:left; margin-left: 1%">Passwort</label>
                    <input style="float:left; margin-left: 1%" type="password" maxlength="20" class="form-control"
                           v-model="password" name="password"
                           placeholder="Passwort eingeben">

                </div>
                <br> <br> <br>
                <br> <br> <br>
                <button type="submit" v-on:click="adduser" class="btn btn-primary">Submit</button>
                <br> <br> <br>
            </div>
            <div class="alert alert-danger" role="alert" v-if="this.message.length>1">{{message}}</div>

        </section>

    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "user_management",
        beforeCreate: function () {
            if (!this.$session.has('email')) {
                this.$router.push('/login')
            }
        },
        data() {
            return {
                email: '', password: '', user_name: '', message: ''
            }
        }, methods: {
            logout() {
                this.$session.destroy()
                this.$router.push('/login')
            },
            async adduser() {
                if (this.email.trim() == '' || this.password.trim() == '') {
                    alert('Sie müssen alle erforderlichen Felder ausfüllen')
                    return false
                } else {
                    await axios.post("http://localhost:3000/api/add-user", {
                        email: this.email, password: this.password, user_name: this.user_name
                    }).then((response) => {
                        if (response.status === 200) {

                            this.$router.push('/view_users')
                        } else {
                            this.message = "Falsche Email oder Passwort ";
                        }
                    })
                }
            }

        }
    }
</script>

<style scoped>

</style>