<template>
    <footer>
        <div class="contact">
            <span>
                <a href="mailto:ruslan@ruslanbelyy.com">
                    <img class="email" :src="require('@/assets/envelope-solid.svg')" alt="Email Icon">Ruslan@ruslanbelyy.com</a>
            </span>
        </div>
        <div class="icons">
            <a v-for="item in items" v-bind:key="item.title" :href="item.href" target="_blank" rel="noreferrer">
                <img class="websites" :src="item.icon" alt="">
                {{item.title}}
            </a>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "bottom-nav",
        data() {
            return {
                items: [{
                        title: 'Github',
                        href: 'https://github.com/peopleoff',
                        icon: require('@/assets/Github-Mark-Light.png')
                    },
                    {
                        title: 'Codepen',
                        href: 'https://codepen.io/peopleoff/',
                        icon: require('@/assets/codepen-white.png')
                    },
                    {
                        title: 'LinkedIn',
                        href: 'https://www.linkedin.com/in/ruslan-belyy-56052a134/',
                        icon: require('@/assets/Linked-White.png')
                    },
                ],
            }
        },
    }
</script>

<style scoped>
    footer {
        padding: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #8C43FF;
        color: white;
        flex-wrap: wrap;
    }

    a {
        color: white;
    }

    a:hover {
        color: white;
    }

    .icons {
        height: 100%;
    }

    .logo {
        font-size: 2rem;
    }

    embed {
        cursor: pointer;
    }

    svg {
        cursor: pointer;
    }

    .websites {
        height: 5%;
        width: 2rem;
        margin: 0 15px;
    }

    .email {
        height: 5%;
        width: 1rem;
        margin: 0 5px;
        color: white;
    }

    .navbar {
        padding: .5rem 2rem;
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
</style>