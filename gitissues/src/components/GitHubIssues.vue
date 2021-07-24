<template>
    <div>
        <div class="container">
            <h1>Vue.js + GitHub</h1>
            <p class="lead">
                Página que lista issues de um repositório no GitHub, usando Vue.js.
            </p>
        </div>
        <div class="container">
            <div v-if="response.status === 'error'" class="alert alert-danger">
                {{ response.message }}
            </div>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <input  v-model="username"
                                type="text" 
                                class="form-control"
                                placeholder="GitHub Username">
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <input  v-model="rep"
                                type="text"
                                class="form-control"
                                placeholder="Repositório GitHub">
                    </div>
                </div>
                <div class="col-3">
                    <div class="form-group">
                        <button @click="getIssues" class="btn btn-success">GO!</button>
                        <button @click="clear" class="btn btn-danger">LIMPAR</button>
                    </div>
                </div>
            </div>
            <br><br><br>
            <table class="table table-sm table-bordered">
                <thead>
                    <tr>
                        <th width="100">Número</th>
                        <th>Título</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="loader.getIssues || loader.getIssue">
                        <td class="text-center" colspan="2"><div class="spinner-border text-secondary"></div></td>
                    </tr>
                    <template v-if="!loader.getIssue">
                        <tr v-for="issue in issues"
                            :key="issue.number">
                            <td v-if="showIssues">
                                <router-link :to="{ name: 'GitHubIssue', 
                                                    params: { 
                                                        name: username, 
                                                        repo: rep, 
                                                        issue: issue.number }
                                }"> {{ issue.number }}
                                </router-link>
                            </td>
                            <td v-if="showIssues"> {{ issue.title }} </td>
                        </tr>
                    </template>
                    <tr v-if="noIssues">
                        <td class="text-center" colspan="2">Nenhuma issues encontrada!</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'GitHubIssues',

    data() {
        return {
            username: '',
            rep: '',
            issues: [],
            loader: {
                getIssues: false,
                getIssue: false,
            },
            response: {
                status: '',
                message: '',
            }
        }
    },

    created() {
        this.getLocalData()
    },

    computed: {
        showIssues() {
            return !!this.issues.length && !this.loader.getIssues
        },
        noIssues() {
            return !this.issues.length && !this.loader.getIssues
        }
    },

    methods: {
        clear() {
            this.username = '',
            this.rep = '',
            this.issues = [],
            localStorage.removeItem('GitHubIssues');
            
        },
        clearResponse() {
            this.response.status = '',
            this.response.message = ''
        },
        getIssues() {
            this.clearResponse()
            this.issues = []
            localStorage.setItem('GitHubIssues', JSON.stringify({username: this.username, repo: this.rep}))
            this.loader.getIssues = true
            const url = `https://api.github.com/repos/${this.username}/${this.rep}/issues`;
            axios.get(url)
            .then(res => (this.issues = res.data))
            .catch(() => {
                this.response.status = 'error',
                this.response.message = 'Esse repositório não existe!'
            })
            .finally(() => {
                this.loader.getIssues = false
            })
        },
        getLocalData() {
            const localData = JSON.parse(localStorage.getItem('GitHubIssues'))
            if (localData && localData.username && localData.repo) {
                this.username = localData.username
                this.rep = localData.repo
                this.getIssues()
            }
        },
    }
}
</script>