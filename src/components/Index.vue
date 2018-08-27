<template>
  <div class="main">
    <div class="alert alert-success alert-dismissible fade in hidden" id="alert">
      <a href="#" class="close" data-dismiss="alert" aria-label="close" v-on:click="close">&times;</a>
      <strong>Thank You!</strong> I will reach out to you within 24 hours and look forward to working together.
    </div>
    <section class="intro">
      <h1 class="head-line">Web Developer</h1>
      <h3 class="sub-header">Building Brands that tell a Story</h3>
      <img class="avatar" src='/static/images/avatars.svg' />
      <div class="intro-footer">
        <div class="intro-hero">
          <img class="hero img-responsive" src="/static/images/hero.png" alt="">
        </div>
      </div>
    </section>
    <section class="personal-info">
      <p>Hey, I'm Ruslan</p>
      <span>
        I'm currently studying for my BS in software engineering,
        <br> I'm passionate about building excellent software that improves the lives of those around me.
        <br> I specialize in creating software for clients ranging from individuals and small-businesses all the way to large
        enterprise corporations.
      </span>
    </section>
    <section class="code-info">
      <div class="card">
        <div class="container">
          <div class="row">
            <div class="col-sm">
              <h3>Favorite Languages</h3>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">JavaScript</li>
                <li class="list-group-item">Vue.js</li>
                <li class="list-group-item">Node.js</li>
                <li class="list-group-item">C#</li>
                <li class="list-group-item">Sass</li>
                <li class="list-group-item">PHP</li>
              </ul>
            </div>
            <div class="col-sm">
              <h3>The Tools I Use</h3>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Github</li>
                <li class="list-group-item">CodePen</li>
                <li class="list-group-item">Bootstrap</li>
                <li class="list-group-item">SQL</li>
                <li class="list-group-item">MongoDB</li>
                <li class="list-group-item">Unix</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="recent-projects">
      <h3>Recent Projects</h3>
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm">
            <div class="project-card" id="ai">
              <span class="project-info">
                <h5>AgencyIntelligence leads the industry as a complete and diversified solution for CRM software.</h5>
                <button class="btn btn-outline-primary">
                  <a href="https://www.agencyintel.com">Visit Website</a>
                </button>
              </span>
            </div>
          </div>
          <div class="col-sm">
            <div class="project-card" id="hairbyirina">
              <span class="project-info">
                <h5>HairStylist website made for her clients to easily find her and improve overall number of appointments.
                  <br> Client has seen 35% increase in appoinments since launch.
                </h5>
                <button class="btn btn-outline-primary">
                  <a href="https://www.hairbyirina.com">Visit Website</a>
                </button>
              </span>
            </div>
          </div>
          <div class="col-sm">
            <div class="project-card" id="ilona">
              <span class="project-info">
                <h5>Coming Soon. A personal site for a real estate agent to allow clients to view houses for sale using zillows
                  API. </h5>
                <button class="btn btn-outline-primary">Coming Soon</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="contact" id="contact">
      <div class="container">
        <h2>Contact Me</h2>
        <div class="row justify-content-center">
          <div class="col-8">
            <form>
              <div class="form-group">
                <label for="client_name">Name</label>
                <input type="text" class="form-control required" name="name" placeholder="Full Name" v-model="contact.name">
              </div>
              <div class="form-group">
                <label for="client_email">Email</label>
                <input type="text" class="form-control required" name="email" placeholder="Contact Email" v-model="contact.email">
              </div>
              <div class="form-group">
                <label for="client_subject">Subject</label>
                <input type="text" class="form-control required" name="subject" placeholder="What are we talking about?" v-model="contact.subject">
              </div>
              <div class="form-group">
                <label for="client_message">Message</label>
                <textarea class="form-control" rows="3" v-model="contact.message"></textarea>

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
        msg: 'Welcome to Your Vue.js App',
        errors: [],
        contact: {
          name: null,
          email: null,
          subject: null,
          message: null
        }
      }
    },
    methods: {
      submitForm: function (e) {
        e.preventDefault();
        let requiredFields = document.getElementsByClassName("required");
        for (let i = 0; i < requiredFields.length; i++) {
          requiredFields[i].classList.remove("error")
        }
        let info = this.contact;
        if (!info.name) {
          document.getElementsByName("name")[0].classList.add("error");
        }
        if (!info.email) {
          document.getElementsByName("email")[0].classList.add("error");
        }
        if (!info.subject) {
          document.getElementsByName("subject")[0].classList.add("error");
        }
        if (info.name && info.email && info.subject) {
          MailService.sendEmail({
            recipient: "ruslanbelyy@gmail.com",
            name: this.contact.name,
            fromEmail: this.contact.email,
            subject: this.contact.subject,
            body: `Request Info: <br>
                Name: ${this.contact.name}
                <br>
                Email:${this.contact.email}
                <br>
                Body:${this.contact.message}`
          });
          document.getElementById("alert").classList.remove("hidden");
          this.contact.email = "";
          this.contact.name = "";
          this.contact.message = "";
          this.contact.subject = "";
        }
      },
      close: function () {
        document.getElementById("alert").classList.add("hidden");
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .error {
    border: 1px solid red;
    animation: shake 0.82s cubic-bezier(.36, .07, .19, .97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
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
    font-weight: 800;
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

  .btn-primary:not(:disabled):not(.disabled):active, .btn-primary:not(:disabled):not(.disabled).active, .show > .btn-primary.dropdown-toggle{
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


  #ai {
    background-image: url('/static/images/ai.png');
  }

  #hairbyirina {
    background-image: url('/static/images/hair-by-irina.png');
  }

  #ilona {
    background-image: url('/static/images/ilona.png');
  }

  .contact {
    background-color: #8C43FF;
    color: white;
  }

  /* // Extra small devices (portrait phones, less than 576px) */

  @media (max-width: 374.98px) {
    .intro{
      padding-top: 15vh;
    }
    .alert{
      top: 10rem;
    }
  }


  @media (max-width: 575.98px) {}

  /* // Small devices (landscape phones, less than 768px) */

  @media (max-width: 767.98px) {}

  /* // Medium devices (tablets, less than 992px) */

  @media (max-width: 991.98px) {
    .personal-info {
      padding-bottom: 3em;
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