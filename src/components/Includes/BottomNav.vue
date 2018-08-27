<template>
    <footer>
        <div class="contact">
            <span>
                <a href="tel:9419610045">(941) 961-0045</a>
            </span>
            <br>
            <span>
                <a href="mailto:ruslanbelyy@gmail.com">Ruslanbelyy@gmail.com</a>
            </span>
        </div>
        <div class="icons">
            <div class="stuff">
                <a href="https://github.com/Peopleoff">
                    <embed class="websites" src='/static/images/github.svg' />
                </a>
                <a href="https://www.linkedin.com/in/ruslan-belyy-56052a134">
                    <embed class="websites" src='/static/images/linkedin.svg' />
                </a>
                <a href="https://codepen.io/peopleoff">
                    <embed class="websites" src='/static/images/codepen.svg' />
                </a>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "bottom-nav"
    }
</script>

<style scoped>
    footer {
        padding: 1rem;
        display: flex;;
        justify-content: space-around;
        background-color: #8C43FF;
        color: white;
        border-top: 1px solid white;
    }

    a{
        color: white;
    }

    .logo {
        font-size: 2rem;
    }

    embed{
        cursor: pointer;
    }
    svg{
        cursor: pointer;
    }

    .websites {
        height: 5%;
        width: 3rem;
        margin: 0 15px;
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