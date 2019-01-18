<template>
    <nav class="navbar navbar-expand-lg d-flex justify-content-between shadow">
        <div class="logo">
            Ruslan
            <span class="primary">Belyy</span>
        </div>
        <button class="btn btn-outline-primary my-2 my-sm-0" v-on:click="scrollDown()">
            Contact Me
        </button>
    </nav>
</template>

<script>
    export default {
        name: "top-nav",
        data() {
            return {

            }
        },
        methods: {
            scrollDown: function () {
                window.scroll({
                    top: 100000,
                    behavior: 'smooth'
                });
            },
        }
    }
</script>

<style scoped>
    nav {
        position: fixed;
        width: 100%;
        background: white;
    }

    .shadow {
        z-index: 10000;
        box-shadow: 0 6px 2px -2px #eee;
    }

    .logo {
        font-size: 2rem;
    }

    .navbar {
        padding: .5rem 2rem;
    }

    a {
        color: #8C43FF
    }

    a:hover {
        color: white;
    }

    .primary {
        color: #8C43FF;
        font-weight: bold;
    }

    .btn-outline-primary {
        color: #8C43FF;
        background-color: transparent;
        background-image: none;
        border-color: #8C43FF;
    }

    .btn-outline-primary:hover {
        color: #fff;
        background-color: #8C43FF;
        background-image: none;
        border-color: #fff;
    }

    .btn-outline-primary:not(:disabled):not(.disabled):active,
    .btn-outline-primary:not(:disabled):not(.disabled).active,
    .show>.btn-outline-primary.dropdown-toggle {
        color: #fff;
        background-color: #8C43FF;
        background-image: none;
        border-color: #fff;
    }
</style>