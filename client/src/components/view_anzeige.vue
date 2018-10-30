<template>

    <div class="wrapper">
        <!-- Sidebar  -->
        <nav id="sidebar">
            <div class="sidebar-header">
                <h3>Anzeigen</h3>
            </div>



            <ul class="list-unstyled components">

                <li >
                    <router-link to="/">Hauptseite</router-link>
                </li>
                <li class="active">
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

        <section style="width: 100%;height: 100%">
            <nav class="navbar navbar-expand-lg navbar-light bg-light"
                 style=" background:grey!important;border-radius: 0!important;">
                <div class="container-fluid">

                    <button type="button" id="sidebarCollapse" class="btn btn-info">
                        <i class="fas fa-align-left"></i>
                    </button>
                    <button class="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fas fa-align-justify"></i>
                    </button>

                    <div style="right: 1%">
                        <button style="right: 0!important ;%" v-on:click="logout" class="btn btn-info">Logout</button>
                    </div>
                </div>
            </nav>
            <br>

            <div class="box" style="margin-left: 2%;margin-right: 2%">
                <div class="box-header">
                    <h1 class="box-title" style="color: #0d6aad">Anzeigen</h1>
                </div><!-- /.box-header -->

                <div class="alert alert-info" role="alert" v-if="this.deleted.length>1">{{deleted}}</div>
                <div class="box-body">
                    <div class="row">
                        <div class="col-md-12 col-lg-12">

                            <table id="mydatatable" class="table table-bordered table-hover display">
                                <thead>
                                <tr>
                                    <th style="color: #0d6aad">Referenz</th>
                                    <th style="color: #0d6aad">Plz</th>
                                    <th style="color: #0d6aad">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="item in data">
                                    <td :id="item.id">{{item.referenz}}</td>
                                    <td :id="item.id">{{item.plz}}</td>
                                    <td>
                                        <router-link :to="{ name:'edit_anzeige', params: { anzeigeid:item.id}}">
                                            <a class="btn btn-secondary">Edit</a>
                                        </router-link>
                                        <input type='button' class="delete_button btn btn-warning"
                                               value="delete"
                                               v-on:click="delete_row(item.id)">
                                    </td>
                                </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
                <div id="page" ref="page"></div>
        </section><!-- /.content -->
    </div>
</template>

<script>
    import axios from 'axios';

        export default {
            name: "view_anzeige",
            beforeCreate: function () {
                if (!this.$session.has('email')) {
                    this.$router.push('/login')
                }
            },
            data() {
                return {
                    pages: '', current: '', data: [], pagination: '',deleted:''
                }
            }, methods: {
                logout() {
                    this.$session.destroy()
                    this.$router.push('/login')
                },
               async delete_row(id) {
                  await  axios.post("http://localhost:3000/api/delete_anzeige/",{identification:id}).then((response)=>{
                        if (response.status===200){
                            this.deleted = 'Anzeige wurde erfolgreich gelöscht'
                        }

                        this.delete_refresh()
                        this.$forceUpdate()
                    })
                },delete_refresh(){
                         axios.get("http://localhost:3000/api/view_anzeige/" +
                            this.$route.params.viewanzeigeid).then((response) => {
                            if (response.status === 200 && response.data.length != 0) {
                                this.data = response.data.data  }

                            })
                        }
            },

        async created() {
            await axios.get("http://localhost:3000/api/view_anzeige/" +
                this.$route.params.viewanzeigeid).then((response => {
                    if (response.status === 200 && response.data.length != 0) {
                        this.pages = response.data.pages;
                        this.current = response.data.current;
                        this.data = response.data.data


                        if (this.pages > 0) {
                            this.pagination = '<ul class="pagination" style="margin-left: 30%;">'
                            if (this.current == 1) {
                                this.pagination += '<li class="disabled page-item"><a class="page-link">First</a></li>'}
                            else
                                {
                                    this.pagination += '<li class="page-item">' +
                                        '<a class="page-link" >First</a></li>'
                                }
                                var i = (Number(this.current) > 5 ? Number(this.current) - 4 : 1)
                                if (i !== 1) {
                                    this.pagination += ' <li class="disabled page-item"><a class="page-link">...</a></li>'
                                }
                                for (; i <= (Number(this.current) + 4) && i <= this.pages; i++) {
                                    if (i == this.current) {
                                        this.pagination += '  <li class="active page-item"><a class="page-link">'+ i+ ' </a></li>'
                                    } else {
                                        this.pagination += ' <li class="page-item"><a class="page-link" >'+i+'</a></li>'
                                    }
                                    if (i == Number(this.current) + 4 && i < this.pages) {
                                        this.pagination += '  <li class="disabled page-item"><a class="page-link">...</a></li>'
                                    }
                                }
                                if (this.current == this.pages) {
                                    this.pagination += ' <li class="disabled page-item"><a class="page-link">Last</a></li>'
                                } else {
                                    this.pagination += ' <li class="page-item"><a class="page-link" >Last</a></li>'
                                }
                                this.pagination += '</ul>'
                                this.$refs.page.innerHTML=this.pagination;
                            }


                        } else {
                            this.$router.push('/')
                        }
                    }
                )
            )
        }

    }
</script>

<style scoped>
    a {
        color: #FFF;
    }

    a:hover {
        color: #FFF
    }
</style>