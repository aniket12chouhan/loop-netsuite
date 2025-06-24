<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="auth-container">
        <ion-card>
          <form class="register-container" @keyup.enter="userRegister(form)" @submit.prevent="userRegister(form)">
            <Logo />
            <ion-item>
              <ion-input label-placement="floating" v-model="registerData.fullName">
                <div slot="label">{{ $t('Full name') }} <ion-text color="danger">*</ion-text></div>
              </ion-input>
            </ion-item>

            <ion-item>
              <ion-input label-placement="floating" v-model="registerData.emailAddress" type="email">
                <div slot="label">{{ $t('Email Address') }} <ion-text color="danger">*</ion-text></div>

              </ion-input>
            </ion-item>

            <ion-item>
              <ion-input label-placement="floating" :label="$t('Password')" name="password"
                v-model="registerData.password" id="password" type="password" required />
            </ion-item>

            <ion-item>
              <ion-input label-placement="floating" :label="$t('Confirm Password')" name="password"
                v-model="registerData.ConfirmPassword" id="password" type="password" required />
            </ion-item>

            <div class="ion-padding">
              <ion-button type="submit" expand="block">{{ $t("Register") }}</ion-button>
              <ion-button @click="navigate('/login')" fill="clear" expand="block">{{ $t("Back to Login") }}</ion-button>
            </div>
          </form>
        </ion-card>

      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { useStore } from "@/store";
import { defineComponent } from "vue";
import { mapGetters } from 'vuex';
import Logo from '@/components/Logo.vue';
import { showToast, isValidEmail, isValidPassword } from '@/utils'
import logger from '@/logger';
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonPage,
  IonText,
  IonCard
} from "@ionic/vue";

export default defineComponent({
  name: "Register",
  components: {
    IonButton,
    IonContent,
    IonInput,
    IonItem,
    IonPage,
    IonText,
    Logo,
    IonCard
  },
  data() {
    return {
      registerData: {
        fullName: '',
        emailAddress: '',
        password: '',
        ConfirmPassword: ''
      }
    };
  },
  computed: {
    ...mapGetters({
    })
  },

  methods: {
    validateCreateUserDetail(registerData: any) {
      const validationErrors = [];
      if(!registerData.fullName) {
        validationErrors.push(this.$t('Name is required.'));
      }
      if(!registerData.emailAddress) {
        validationErrors.push(this.$t('Email address is required.'));
      }
      if(registerData.emailAddress && !isValidEmail(registerData.emailAddress)) {
        validationErrors.push(this.$t('Invalid email address.'));
      }
      if(registerData.password && !isValidPassword(registerData.password)) {
        validationErrors.push(this.$t('Password is not valid'));
      }
      if(registerData.password && registerData.confirmPassword && registerData.password !== registerData.confirmPassword) {
        validationErrors.push(this.$t('Password is not matching with confirm password.'));
      }
      return validationErrors;
    },
    async userRegister() {
      try {
        const validationErrors = this.validateCreateUserDetail({ ...this.registerData });
        if(validationErrors.length > 0) {
          const errorMessages = validationErrors.join(" ");
          logger.error(errorMessages);
          showToast((errorMessages));
          return;
        }
        const payload = {
          ...this.registerData,

        }

      } catch (err: any) {
        let errorMessage = (this.$t('Failed to create user.'));
        if(err?.response?.data?.error?.message) {
          errorMessage = err.response.data.error.message
        }
        logger.error('error', err)
        showToast(errorMessage);
      }
    },
    register(form: any) {
      if(this.registerData.password !== this.registerData.ConfirmPassword) {
        showToast(this.$t("Passwords do not match"));
        return;
      }
    },
    navigate: function (route: string) {
      this.router.push({ path: route });
    }
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    return { router, store };
  }
});
</script>
<style scoped>
.auth-container {
  max-width: 400px;
  margin: auto;
  padding-top: 100px;
}
</style>
