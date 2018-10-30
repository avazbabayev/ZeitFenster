<template>
    <div class="wrapper">
        <nav id="sidebar">
            <div class="sidebar-header">
                <h3>Benutzer</h3>
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
                <li class="active">
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
            <div class="row" style="margin-right: 5% ; margin-left: 5%">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header">
                            <h1 class="box-title" style="color: #0d6aad">View Users</h1>
                        </div><!-- /.box-header -->
                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-12 col-lg-12">

                                    <table id="mydatatable" class="table table-bordered table-hover display">
                                        <thead>
                                        <tr>
                                            <th style="color: #0d6aad">User Name</th>
                                            <th style="color: #0d6aad">Email</th>
                                            <th style="color: #0d6aad">Password</th>
                                            <th style="color: #0d6aad">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="item in data">
                                            <td :id="'user_name'+item.id">{{item.user_name}}</td>
                                            <td :id="'email'+item.id">{{item.email}}</td>
                                            <td :id="'password'+item.id">{{}}</td>
                                            <td>
                                                <input type='button' class="edit_button btn btn-primary"
                                                       :id="'edit_button'+item.id" value="edit"
                                                       v-on:click="edit_row(item.id)">
                                                <input type='button' class="delete_button btn btn-warning"
                                                       :id="'delete_button'+item.id" value="delete"
                                                       v-on:click="delete_row(item.id)">
                                                <input type='button' class="save_button btn btn-success"
                                                       :id="'save_button'+item.id" value="save"
                                                       v-on:click="save_row(item.id)" style="display: none">
                                            </td>
                                        </tr>
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "view_users",
        data() {
            return {
                data: []
            }
        },
        async created() {
            await axios.get("http://localhost:3000/api/view_users/").then((response => {
                    if (response.status === 200 && response.data.length != 0) {
                        this.data = response.data.data
                    } else {
                        this.$router.push('/')
                    }
                })
            )
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

            edit_row(id) {
                var user_name = document.getElementById("user_name" + id).innerHTML;
                var email = document.getElementById("email" + id).innerHTML;
                var password = document.getElementById("password" + id).innerHTML;
                document.getElementById("user_name" + id).innerHTML = "<input type='text' id='user_name_text" + id + "' value='" + user_name + "'>";
                document.getElementById("email" + id).innerHTML = "<input type='text' id='email_text" + id + "' value='" + email + "'>";
                document.getElementById("password" + id).innerHTML = "<input type='password' id='password_text" + id + "' value='" + password + "'>";
                document.getElementById("edit_button" + id).style.display = "none";
                document.getElementById("save_button" + id).style.display = "inline";
            },
            delete_row(id) {
                axios.post('http://localhost:3000/api//delete_user', {identification: id});
                location.reload()
            },
            save_row(id) {
                var user_name = document.getElementById("user_name_text" + id).value;
                var email = document.getElementById("email_text" + id).value;
                var password = document.getElementById("password_text" + id).value;
                axios.post('http://localhost:3000/api//update_user', {
                    user_name: user_name,
                    identification: id,
                    email: email,
                    password: password
                });
                document.getElementById("edit_button" + id).style.display = "inline";
                document.getElementById("save_button" + id).style.display = "none";
                location.reload();
            }, async refresh_user() {
                await axios.get("http://localhost:3000/api/view_users/").then((response => {
                        if (response.status === 200 && response.data.length != 0) {
                            this.data = response.data.data
                        } else {
                            this.$router.push('/')
                        }
                    })
                )
            }

        }

    }
</script>

<style scoped>

</style>