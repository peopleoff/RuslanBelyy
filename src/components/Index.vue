<template>
  <div class="main">
    <div :class="'alert alert-' + alert.type" v-if="alert.show">
      <a href="#" class="close" data-dismiss="alert" aria-label="close" v-on:click="close">&times;</a>
      {{alert.message}}
    </div>
    <section class="intro">
      <h1 class="head-line">Ruslan Belyy</h1>
      <h3 class="sub-header">Full Stack Developer <strong>/</strong> Node <strong>/</strong> Vue</h3>
      <img class="avatar" src='images/avatars.svg' />
      <div class="intro-footer">
        <div class="intro-hero">
          <img class="hero img-responsive" src="images/hero.png" alt="">
        </div>
      </div>
    </section>
    <section class="personal-info flex-center">
      <p>As a developer I strive
        for efficiency.
        But, in today's online world, being fast and responsive just doesn't cut it.
        Being effective today requires a keen balance between passion, optimization, and aesthetics.</p>
    </section>
    <section class="code-info">
      <div class="card">
        <h3>Skill Set</h3>
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm">
              <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="(skill, index) in skills.languages" v-bind:key="index">{{skill}}</li>
              </ul>
            </div>
            <div class="col-sm">
              <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="(skill, index) in skills.tools" v-bind:key="index">{{skill}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <header>
      <h1>Recent Projects</h1>
    </header>

    <section id="cd-timeline" class="cd-container">

      <div class="cd-timeline-block" v-for="items in projects" v-bind:key="items.fields.name">
        <div class="cd-timeline-img cd-picture" :style="'background-color: ' + items.fields.color">
          <img :src="items.fields.image" :alt="items.fields.name + ' Image'">
        </div>
        <!-- cd-timeline-img -->

        <div class="cd-timeline-content">
          <h2>{{items.fields.name}}</h2>
          <p v-html="items.fields.description"></p>
          <div class="cd-built-with flex-left">
            <span v-for="(tech,index) in items.fields.frontEnd" v-bind:key="index">{{tech}} </span>
          </div>
          <a :href="items.fields.projectLink" class="cd-read-more">View Project</a>
        </div>
        <!-- cd-timeline-content -->
      </div>

    </section>
    <section class="contact" id="contact">
      <div class="container">
        <h2>Get In Touch</h2>
        <p>Lets talk about new projects, freelance inquiry, or just a chat.</p>
        <div class="row justify-content-center">
          <div class="col-12">
            <form>
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="client_name">Name</label>
                    <input type="text" class="form-control required" name="name" v-model="contact.name">
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="client_email">Email</label>
                    <input type="text" class="form-control required" name="email" v-model="contact.email">
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="client_message">Message</label>
                <textarea class="form-control required" rows="3" name="message" v-model="contact.message"></textarea>
                <button class="btn btn-primary" v-on:click="submitForm($event)">
                  Contact Me!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import MailService from '@/services/MailService'

  export default {
    name: 'Index',
    data() {
      return {
        errors: [],
        alert: {
          show: false,
          message: '',
          type: ''
        },
        projects: [],
        skills: [],
        description: null,
        contact: {
          name: null,
          email: null,
          subject: null,
          message: null
        },
        contactErrors: {
          name: false,
          email: false,
          subject: false
        }
      }
    },
    mounted() {
      this.getProjects();
    },
    methods: {
      validateEmail(email) {
        var re =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      },
      getProjects: function () {
        this.$contentful.getEntries('Projects')
          .then((res) => {
            res.items.forEach(element => {
              let type = element.sys.contentType.sys.id;
              if (type == 'projects') {
                this.projects.push(element);
              }
              if (type == 'skills') {
                this.skills = element.fields;
              }
              if (type == 'description') {
                this.description = element.fields.description;
              }
            });
          })
          .catch(() => {
            this.alert.show = true;
            this.alert.message = "There was an error retrieving the projects. Please refresh the page."
          });
      },
      submitForm: function (e) {
        e.preventDefault();
        let info = this.contact;
        let self = this;
        let requiredFields = document.getElementsByClassName("required");
        for (let i = 0; i < requiredFields.length; i++) {
          requiredFields[i].classList.remove("error")
        }
        if (!info.message) {
          document.getElementsByName("message")[0].classList.add("error");
          document.getElementsByName("message")[0].focus();
        }
        if (!info.email || !this.validateEmail(info.email)) {
          document.getElementsByName("email")[0].classList.add("error");
          document.getElementsByName("email")[0].focus();
        }
        if (!info.name) {
          document.getElementsByName("name")[0].classList.add("error");
          document.getElementsByName("name")[0].focus();
        }

        if (info.name && info.email && this.validateEmail(info.email) && info.message) {
          MailService.sendEmail({
            Name: this.contact.name,
            Email: this.contact.email,
            Body: this.contact.message
          });
          this.alert.show = true;
          this.alert.message = "Thank you for the request. I will reach out within 24 hours.";
          this.contact.email = "";
          this.contact.name = "";
          this.contact.message = "";
          this.contact.subject = "";
          setTimeout(function () {
            self.alert.show = false;
          }, 5000);
        }
      },
      close: function () {
        this.alert.show = false;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cd-built-with span {
    border-radius: 5px;
    border: 2px solid #8C43FF;
    padding: 8px;
    margin: 5px;
    font-size: .85em;
  }

  .form-control {
    border: 0;
  }

  .btn-primary:focus,
  .btn-primary.focus {
    outline: 0;
    box-shadow: none;
  }

  .btn-primary:not(:disabled):not(.disabled):active:focus,
  .btn-primary:not(:disabled):not(.disabled).active:focus,
  .show>.btn-primary.dropdown-toggle:focus {
    box-shadow: none;
  }

  .error {
    border: 1px solid red;
    animation: shake 0.82s cubic-bezier(.36, .07, .19, .97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

  .close:not(:disabled):not(.disabled) {
    padding: 0 10px;
  }

  .logo {
    height: 5%;
    width: 5%;
  }

  textarea {
    resize: none;
  }

  a {
    color: white;
  }

  .description {
    width: 75%;
    margin: 0 auto;
  }

  .intro {
    height: 95vh;
    align-items: stretch;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 10vh;
  }

  .hero {
    height: auto;
    width: 75%;
  }

  .intro-footer {
    padding: 0rem 1.5rem;
  }

  .intro-hero {
    margin: 0 auto;
    position: relative;
  }

  .personal-info {
    padding: 1rem;
    color: #fff;
    min-height: 30vh;
    background-color: #8C43FF;
    text-align: center;
    font-size: 1.5em;
  }

  .personal-info p {
    width: 50%;
  }

  .btn-outline-primary {
    color: white;
    border-color: #8C43FF;
  }

  .btn-outline-primary:hover {
    color: white;
    border-color: #8C43FF;
    background-color: #8C43FF;
  }

  .card {
    padding: 1rem;
    align-items: stretch;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 auto;
    margin-top: -30px;
    min-height: 30vh;
    width: 90%;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }

  .hidden {
    display: none;
  }

  .is-hidden {
    visibility: hidden;
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flex-left {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .bounce-in {
    visibility: visible;
    -webkit-animation: cd-bounce-2 0.6s;
    -moz-animation: cd-bounce-2 0.6s;
    animation: cd-bounce-2 0.6s;
  }

  .btn-primary:not(:disabled):not(.disabled):active,
  .btn-primary:not(:disabled):not(.disabled).active,
  .show>.btn-primary.dropdown-toggle {
    background-color: #fff;
    border-color: #8C43FF;
    color: #8C43FF;
  }

  .alert {
    position: fixed;
    top: 5rem;
    right: 5%;
    z-index: 200;
    opacity: 1;
    padding: 25px;
    border: 1px solid #8C43FF;
    background: white;
    color: #8C43FF;
  }

  .card p {
    text-align: left;
  }

  .recent-projects {
    margin-top: 3rem;
    padding: 0 2rem;
  }

  .recent-projects .col-sm {
    overflow: hidden;
  }

  .project-card {
    border: 1px solid black;
    border-radius: 10px;
    width: 100%;
    height: 300px;
    background-repeat: no-repeat;
    background-size: contain;
    overflow: hidden;
    margin: 20px 0;
  }

  .project-info {
    opacity: .95;
    background-color: #37474F;
    color: white;
    z-index: 100;
    position: absolute;
    top: 100%;
    left: 2.5%;
    height: 90%;
    width: 95%;
    transition: top .2s linear;
    border-radius: 10px;
    padding: 20px;
  }

  .project-card:hover .project-info {
    transition: top .2s linear;
    top: 5%;
  }

  .contact {
    padding-top: 2rem;
  }

  .contact .form-group {
    text-align: left;
  }

  .btn-primary {
    width: 100%;
    margin: 20px 0;
    background-color: #8C43FF;
    border-color: #fff;
  }

  .btn-primary:hover {
    width: 100%;
    margin: 20px 0;
    background-color: #fff;
    border-color: #8C43FF;
    color: #8C43FF;
  }



  .btn-primary a {
    color: #fff;
  }

  @keyframes shake {

    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }

  .contact {
    background-color: #8C43FF;
    color: white;
  }

  /* -------------------------------- 

Primary style

-------------------------------- */
  html * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *,
  *:after,
  *:before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  body {
    background-color: #3f3f3f;
    font-size: 100%;
    font-family: "Droid Serif", serif;
    color: #7f8c97;
  }

  a {
    color: #acb7c0;
    text-decoration: none;
    font-family: "Open Sans", sans-serif;
  }

  #cd-timeline img {
    max-width: 100%;
    border-radius: 50%;
  }

  h1,
  h2 {
    font-family: "Open Sans", sans-serif;
    font-weight: bold;
  }

  /* -------------------------------- 

Modules - reusable parts of our design

-------------------------------- */
  .cd-container {
    /* this class is used to give a max-width to the element it is applied to, and center it horizontally when it reaches that max-width */
    width: 90%;
    max-width: 1170px;
    margin: 0 auto;
  }

  .cd-container::after {
    /* clearfix */
    content: '';
    display: table;
    clear: both;
  }

  /* -------------------------------- 

Main components 

-------------------------------- */
  header {
    height: 10rem;
    line-height: 10rem;
    margin-top: 2em;
    text-align: center;
    background: #8C43FF;
  }

  header h1 {
    color: #ffffff;
    font-size: 18px;
    font-size: 1.125rem;
    line-height: 10rem;
  }

  @media only screen and (min-width: 1170px) {
    header {
      height: 10rem;
      line-height: 10rem;
      margin-top: 2em;
    }

    header h1 {
      font-size: 24px;
      font-size: 1.5rem;
      line-height: 10rem;
    }
  }

  #cd-timeline {
    position: relative;
    padding: 2em 0;
    text-align: left;
  }

  #cd-timeline::before {
    /* this is the vertical line */
    content: '';
    position: absolute;
    top: 0;
    left: 18px;
    height: 100%;
    width: 4px;
    background: #d7e4ed;
  }

  @media only screen and (min-width: 1170px) {
    #cd-timeline::before {
      left: 50%;
      margin-left: -2px;
    }
  }

  .cd-timeline-block {
    position: relative;
  }

  .cd-timeline-block::after {
    clear: both;
    content: "";
    display: table;
  }

  .cd-timeline-block:first-child {
    margin-top: 0;
  }

  .cd-timeline-block:last-child {
    margin-bottom: 0;
  }

  @media only screen and (min-width: 1170px) {
    .cd-timeline-block {
      margin: 1em 0;
    }

    .cd-timeline-block:first-child {
      margin-top: 0;
    }

    .cd-timeline-block:last-child {
      margin-bottom: 0;
    }
  }

  .cd-timeline-img {
    position: absolute;
    top: 25%;
    left: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 0 0 4px #ffffff, inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05);
  }

  .cd-timeline-img img {
    display: block;
    width: 28px;
    height: 28px;
    position: relative;
    left: 50%;
    top: 50%;
    margin-left: -14px;
    margin-top: -14px;
  }

  @media only screen and (min-width: 1170px) {
    .cd-timeline-img {
      width: 60px;
      height: 60px;
      left: 50%;
      margin-left: -30px;
      /* Force Hardware Acceleration in WebKit */
      -webkit-transform: translateZ(0);
      -webkit-backface-visibility: hidden;
    }

    .cssanimations .cd-timeline-img.bounce-in {
      visibility: visible;
      -webkit-animation: cd-bounce-1 0.6s;
      -moz-animation: cd-bounce-1 0.6s;
      animation: cd-bounce-1 0.6s;
    }
  }

  @-webkit-keyframes cd-bounce-1 {
    0% {
      opacity: 0;
      -webkit-transform: scale(0.5);
    }

    60% {
      opacity: 1;
      -webkit-transform: scale(1.2);
    }

    100% {
      -webkit-transform: scale(1);
    }
  }

  @-moz-keyframes cd-bounce-1 {
    0% {
      opacity: 0;
      -moz-transform: scale(0.5);
    }

    60% {
      opacity: 1;
      -moz-transform: scale(1.2);
    }

    100% {
      -moz-transform: scale(1);
    }
  }

  @keyframes cd-bounce-1 {
    0% {
      opacity: 0;
      -webkit-transform: scale(0.5);
      -moz-transform: scale(0.5);
      -ms-transform: scale(0.5);
      -o-transform: scale(0.5);
      transform: scale(0.5);
    }

    60% {
      opacity: 1;
      -webkit-transform: scale(1.2);
      -moz-transform: scale(1.2);
      -ms-transform: scale(1.2);
      -o-transform: scale(1.2);
      transform: scale(1.2);
    }

    100% {
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
    }
  }

  .cd-timeline-content {
    position: relative;
    margin-left: 60px;
    background: #ffffff;
    border-radius: 0.25em;
    padding: 1em;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
  }

  .cd-timeline-content::after {
    clear: both;
    content: "";
    display: table;
  }

  .cd-timeline-content h2 {
    color: #303e49;
  }

  .cd-timeline-content p,
  .cd-timeline-content .cd-read-more,
  .cd-timeline-content .cd-date {
    font-size: 13px;
    font-size: 0.8125rem;
  }

  .cd-timeline-content .cd-read-more,
  .cd-timeline-content .cd-date {
    display: inline-block;
  }

  .cd-timeline-content p {
    margin: 1em 0;
    line-height: 1.6;
  }

  .cd-timeline-content .cd-read-more {
    padding: .8em 1em;
    color: #8C43FF;
    background-color: transparent;
    background-image: none;
    border-color: #8C43FF;
    border-radius: 0.25em;
    border: 1px solid #8C43FF;
    float: right;
  }

  .no-touch .cd-timeline-content .cd-read-more:hover {
    background-color: #bac4cb;
  }

  .cd-timeline-content .cd-date {
    float: left;
    padding: .8em 0;
    opacity: .7;
  }

  .cd-built-with {
    margin: 10px 0;
  }

  .cd-built-with p:first-child {
    font-weight: 600;
  }

  .cd-read-more:hover {
    background-color: #8C43FF;
    border-color: #fff;
    color: #fff;

  }

  @media only screen and (min-width: 768px) {
    .cd-timeline-content h2 {
      font-size: 20px;
      font-size: 1.25rem;
    }

    .cd-timeline-content p {
      font-size: 16px;
      font-size: 1rem;
    }

    .cd-timeline-content .cd-read-more,
    .cd-timeline-content .cd-date {
      font-size: 14px;
      font-size: 0.875rem;
    }
  }

  @media only screen and (min-width: 1170px) {
    .cd-timeline-content {
      margin-left: 0;
      padding: 1.6em;
      width: 45%;
    }

    .cd-timeline-content::before {
      top: 24px;
      left: 100%;
      border-color: transparent;
      border-left-color: #ffffff;
    }

    .cd-timeline-content .cd-date {
      position: absolute;
      width: 100%;
      left: 122%;
      top: 6px;
      font-size: 16px;
      font-size: 1rem;
    }

    .cd-timeline-block:nth-child(even) .cd-timeline-content {
      float: right;
    }

    .cd-timeline-block:nth-child(even) .cd-timeline-content::before {
      top: 24px;
      left: auto;
      right: 100%;
      border-color: transparent;
      border-right-color: #ffffff;
    }

    .cd-timeline-block:nth-child(even) .cd-timeline-content .cd-read-more {
      float: right;
    }

    .cd-timeline-block:nth-child(even) .cd-timeline-content .cd-date {
      left: auto;
      right: 122%;
      text-align: right;
    }

    .cssanimations .cd-timeline-content.bounce-in {
      visibility: visible;
      -webkit-animation: cd-bounce-2 0.6s;
      -moz-animation: cd-bounce-2 0.6s;
      animation: cd-bounce-2 0.6s;
    }
  }

  @media only screen and (min-width: 1170px) {

    .bounce-in {
      -webkit-animation: cd-bounce-2-inverse 0.6s;
      -moz-animation: cd-bounce-2-inverse 0.6s;
      animation: cd-bounce-2-inverse 0.6s;
    }

    /* inverse bounce effect on even content blocks */
  }

  @-webkit-keyframes cd-bounce-2 {
    0% {
      opacity: 0;
      -webkit-transform: translateX(-100px);
    }

    60% {
      opacity: 1;
      -webkit-transform: translateX(20px);
    }

    100% {
      -webkit-transform: translateX(0);
    }
  }

  @-moz-keyframes cd-bounce-2 {
    0% {
      opacity: 0;
      -moz-transform: translateX(-100px);
    }

    60% {
      opacity: 1;
      -moz-transform: translateX(20px);
    }

    100% {
      -moz-transform: translateX(0);
    }
  }

  @keyframes cd-bounce-2 {
    0% {
      opacity: 0;
      -webkit-transform: translateX(-100px);
      -moz-transform: translateX(-100px);
      -ms-transform: translateX(-100px);
      -o-transform: translateX(-100px);
      transform: translateX(-100px);
    }

    60% {
      opacity: 1;
      -webkit-transform: translateX(20px);
      -moz-transform: translateX(20px);
      -ms-transform: translateX(20px);
      -o-transform: translateX(20px);
      transform: translateX(20px);
    }

    100% {
      -webkit-transform: translateX(0);
      -moz-transform: translateX(0);
      -ms-transform: translateX(0);
      -o-transform: translateX(0);
      transform: translateX(0);
    }
  }

  @-webkit-keyframes cd-bounce-2-inverse {
    0% {
      opacity: 0;
      -webkit-transform: translateX(100px);
    }

    60% {
      opacity: 1;
      -webkit-transform: translateX(-20px);
    }

    100% {
      -webkit-transform: translateX(0);
    }
  }

  @-moz-keyframes cd-bounce-2-inverse {
    0% {
      opacity: 0;
      -moz-transform: translateX(100px);
    }

    60% {
      opacity: 1;
      -moz-transform: translateX(-20px);
    }

    100% {
      -moz-transform: translateX(0);
    }
  }

  @keyframes cd-bounce-2-inverse {
    0% {
      opacity: 0;
      -webkit-transform: translateX(100px);
      -moz-transform: translateX(100px);
      -ms-transform: translateX(100px);
      -o-transform: translateX(100px);
      transform: translateX(100px);
    }

    60% {
      opacity: 1;
      -webkit-transform: translateX(-20px);
      -moz-transform: translateX(-20px);
      -ms-transform: translateX(-20px);
      -o-transform: translateX(-20px);
      transform: translateX(-20px);
    }

    100% {
      -webkit-transform: translateX(0);
      -moz-transform: translateX(0);
      -ms-transform: translateX(0);
      -o-transform: translateX(0);
      transform: translateX(0);
    }
  }


  /* // Extra small devices (portrait phones, less than 576px) */

  @media (max-width: 374.98px) {
    .intro {
      padding-top: 15vh;
    }

    .alert {
      top: 10rem;
    }
  }


  @media (max-width: 575.98px) {}

  /* // Small devices (landscape phones, less than 768px) */

  @media (max-width: 767.98px) {}

  /* // Medium devices (tablets, less than 992px) */

  @media (max-width: 991.98px) {
    .cd-timeline-block {
      margin: 1rem 0;
    }

    .personal-info {
      padding-bottom: 3em;
    }

    .personal-info p {
      font-size: 1rem;
    }
  }

  /* // Large devices (desktops, less than 1200px) */

  @media (min-width: 1199.98px) {
    .hero {
      height: auto;
      width: 50%;
    }
  }
</style>