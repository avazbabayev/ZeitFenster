<template>

    <div class="wrapper">
        <!-- Sidebar  -->
        <nav id="sidebar">
            <div class="sidebar-header">
                <h3>Email Bestatigung</h3>
            </div>


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


            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Email Bestätigung</h5>
            </div>
            <div class="modal-body">
                <div class="box box-solid box-primary">
                    <br>
                    <div class="box-tools " style="margin-left: 10px; margin-right: 10px">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" v-model="email" id="email" name="email"
                               placeholder="Email" required>
                        <input type="hidden" v-model="this.datum_ausgewahlt" class="form-control" id="date_ausgewahlt"
                               name="date_ausgewahlt" value="<%=data.datum_ausgewahlt%>">
                    </div>
                    <br>
                </div>
                <input type="submit" v-on:click="email_submit" class="btn btn-primary ">

            </div>
        </section>

    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "email_bestatigung",
        data() {
            return {
                datum_ausgewahlt: '',
                email: ''
            }
        }, methods: {

            logout() {
                this.$session.destroy()
                this.$router.push('/login')
            },
            async email_submit() {
                if (this.email.trim() == '') {
                    alert('Sie müssen alle erforderlichen Felder ausfüllen')
                    return false
                } else {

                    await axios.post("http://localhost:3000/api/sendemail/", {
                        email: this.email,
                        date_ausgewahlt: this.datum_ausgewahlt
                    }).then((response => {
                            if (response.status === 200 && response.data.length != 0) {
                                this.datum_ausgewahlt = response.data.datum_ausgewahlt;
                            } else {
                                this.$router.push('/')
                            }
                        })
                    )
                }
            }
        },
        beforeCreate: function () {
            if (!this.$session.has('referenz')) {
                this.$router.push('/login')
            }
        },
        mounted() {
        },
        async created() {
            await axios.get("http://localhost:3000/api/email_bestatigung/" + this.$route.params.ref_id).then((response => {
                    if (response.status === 200 && response.data.length != 0) {
                        this.datum_ausgewahlt = response.data.datum_ausgewahlt;
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