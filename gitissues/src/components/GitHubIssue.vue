<template>
    <div>
        <div v-if="loader.getIssue"
             class="spinner-border text-secondary text-center"></div>
        <div v-if="!loader.getIssue && issue.number" 
             class="container">
            <template>
                    <h1>Issue de N° {{ issue.number }} </h1>
                    <br>
                    <h2>{{ issue.title }}</h2>
                    <br>
                    <div>{{ issue.body }}</div>
                    <br><br>
                    <a href="javascript:history.go(-1)"
                       class="btn btn-primary">Voltar</a>
            </template>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'GitHubIssues',

    data() {
        return {
            issue: {},
            loader: {
                getIssue: false,
            }
        }
    },

    created() {
        this.getIssue()
    },

    methods: {
        getIssue() {
            this.loader.getIssue = true
            const url = `https://api.github.com/repos/${this.$route.params.name}/${this.$route.params.repo}/issues/${this.$route.params.issue}`;
            axios.get(url)
            .then(res => (this.issue = res.data))
            .finally(() => {
                this.loader.getIssue = false
            })
        },
    }
}
</script>