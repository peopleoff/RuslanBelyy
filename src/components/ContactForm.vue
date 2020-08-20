<template>
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
                  <label for="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    class="form-control required"
                    name="name"
                    v-model="contact.name"
                  />
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    class="form-control required"
                    name="email"
                    v-model="contact.email"
                  />
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea
                id="message"
                class="form-control required"
                rows="3"
                name="message"
                v-model="contact.message"
              ></textarea>
              <button class="btn btn-outline-light btn-lg btn-block my-3" v-on:click="submitForm($event)">Contact Me!</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import MailService from "@/services/MailService";
export default {
  data() {
    return {
      alert: {
        show: false,
        message: "",
        type: "",
      },
      contact: {
        name: null,
        email: null,
        subject: null,
        message: null,
      },
      contactErrors: {
        name: false,
        email: false,
        subject: false,
      },
    };
  },
  methods: {
    validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    submitForm: function (e) {
      e.preventDefault();
      let info = this.contact;
      let self = this;
      let requiredFields = document.getElementsByClassName("required");
      for (let i = 0; i < requiredFields.length; i++) {
        requiredFields[i].classList.remove("error");
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

      if (
        info.name &&
        info.email &&
        this.validateEmail(info.email) &&
        info.message
      ) {
        MailService.sendEmail({
          Name: this.contact.name,
          Email: this.contact.email,
          Body: this.contact.message,
        });
        this.alert.show = true;
        this.alert.message =
          "Thank you for the request. I will reach out within 24 hours.";
        this.contact.email = "";
        this.contact.name = "";
        this.contact.message = "";
        this.contact.subject = "";
        setTimeout(function () {
          self.alert.show = false;
        }, 5000);
      }
    },
  },
};
</script>

<style scoped>
.form-control {
  border: 0;
}
textarea {
  resize: none;
}

.contact {
  background-color: #8c43ff;
  color: white;
  padding-top: 2rem;
}

.contact .form-group {
  text-align: left;
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
</style>