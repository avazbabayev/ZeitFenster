<template>
    <div class="wrapper">
        <!-- Sidebar  -->
        <nav id="sidebar">
            <div class="sidebar-header">
                <h3>ZeitFenster Buchung</h3>
            </div>

            <ul class="list-unstyled components">

                <li class="active">
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

        </section>

    </div>
</template>

<script>

    import axios from 'axios';

    export default {

        name: 'Index',
        data() {
            return {user_name: '', email: '', password: ''}
        },
        mounted() {
        },
        beforeCreate: function () {
            if (!this.$session.has('email')) {
                this.$router.push('/login')
            }
        },
        props: {
            msg: String
        }, methods: {
            logout() {
                this.$session.destroy()
                this.$router.push('/login')
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
