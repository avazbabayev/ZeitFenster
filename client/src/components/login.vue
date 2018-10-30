<template>
    <div>

        <button id="changeview" class="btn btn-info" onclick="change_view()">Referenz Anmelden</button>
        <div class="container">
            <div class="card card-login mx-auto mt-5">
                <div class="card-header"><b>Login</b></div>
                <div class="card-body">
                    <div id="login-admin">

                        <div class="form-group">
                            <div class="form-label-group">
                                <label for="inputEmail"><b>Email address</b></label>
                                <input type="email" v-model="inputEmail" id="inputEmail" name="inputEmail"
                                       class="form-control"
                                       placeholder="Email address" required="required" autofocus="autofocus">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-label-group">
                                <label for="inputPassword"><b>Passwort</b></label>
                                <input type="password" v-model="inputPassword" id="inputPassword" name="inputPassword"
                                       class="form-control"
                                       placeholder="Passwort" required="required">
                            </div>
                        </div>

                        <button v-on:click="login_check" class="btn btn-primary btn-block btn-flat">Anmelden</button>

                    </div>
                    <div id="login-referenz" class="login_hide">
                        <div class="form-group">
                            <div class="form-label-group">
                                <label for="referenz"><b>Referenz address</b></label>
                                <input type="text" v-model="referenz" id="referenz" name="referenz" class="form-control"
                                       placeholder="Referenz address" required="required" autofocus="autofocus">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-label-group">
                                <label for="plz"><b>Plz</b></label>
                                <input type="text" v-model="plz" id="plz" name="plz" class="form-control"
                                       placeholder="Plz"
                                       required="required">
                            </div>
                        </div>
                        <button v-on:click="check_referenz" class="btn btn-primary btn-block btn-flat">Anmelden</button>

                    </div>
                </div>
            </div>
        </div>
        <br/><br/>
        <div class="alert alert-danger" role="alert" v-if="this.error.length>1">{{error}}</div>
    </div>

</template>

<script>

    import axios from 'axios';

    var recaptchaScript = document.createElement('script')
    export default {
        name: "login",
        data() {
            return {inputEmail: '', inputPassword: '', error: '', referenz: '', plz: ''}
        },
        destroyed() {
            this.toggleBodyClass('removeClass', 'bg-dark');
            document.head.removeChild(recaptchaScript)
        },
        mounted() {
            recaptchaScript.setAttribute('src', './javascripts/app-vue.js')
            document.head.appendChild(recaptchaScript)
            this.toggleBodyClass('addClass', 'bg-dark');
        }, methods: {

            toggleBodyClass(addRemoveClass, className) {
                const el = document.body;

                if (addRemoveClass === 'addClass') {
                    el.classList.add(className);
                } else {
                    el.classList.remove(className);
                }
            },
            async check_referenz() {
                if (this.referenz.trim() == '' || this.plz.trim() == '') {
                    alert('Sie müssen alle erforderlichen Felder ausfüllen')
                    return false
                } else {
                    await axios.post("http://localhost:3000/api/login/checkReferenz", {
                        referenz: this.referenz, plz: this.plz
                    }).then((response) => {
                        if (response.status === 200) {
                            this.$session.start()
                            this.$session.set('referenz', this.referenz)
                            this.$router.push('/referenz_anmeldung/' + this.referenz)
                        } else {
                            this.error = "Falsche Plz oder Referenz ";
                        }
                    })
                }
            }, async login_check() {
                if (this.inputEmail.trim() == '' || this.inputPassword.trim() == '' ) {
                    alert('Sie müssen alle erforderlichen Felder ausfüllen')
                    return false
                } else {
                    await axios.post("http://localhost:3000/api/login/checkAuthentication", {
                        inputEmail: this.inputEmail, inputPassword: this.inputPassword
                    }).then((response) => {
                        if (response.status === 200) {
                            this.$session.start()
                            this.$session.set('email', response.data)
                            this.$router.push('/')
                        } else {
                            this.error = "Falsche Email oder Passwort ";
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>