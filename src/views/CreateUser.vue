<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t("Create User") }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <main>
        <h1 class="ion-margin-start">{{ $t('Create User Your Account') }}</h1>
          <ion-item>
            <ion-input label-placement="floating" v-model="formData.username" autofocus>
              <div slot="label">{{ $t('Username') }} <ion-text color="danger">*</ion-text></div>
            </ion-input>
          </ion-item>
          <ion-item>
            <ion-input label-placement="floating" v-model="formData.fullname">
              <div slot="label">{{ $t('Full name') }} <ion-text color="danger">*</ion-text></div>
            </ion-input>
          </ion-item>

          <ion-item class="ion-margin-top">
            <ion-input :label="$t('Organzation Name')" label-placement="floating" v-model="formData.organizationName"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input :label="$t('Email')" label-placement="floating" v-model="formData.emailAddress" type="email"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input :label="$t('Contact number')" label-placement="floating" v-model="formData.contactNumber" type="tel"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input :label="$t('Password')" label-placement="floating" name="password" v-model="formData.password" id="password" type="password" />
          </ion-item>
          <ion-item>
            <ion-input :label="$t('Confirm Password')" label-placement="floating" name="confirmPassword" v-model="formData.confirmPassword" id="ConfirmPassword" type="password" />
          </ion-item>
          <ion-item>
            <ion-checkbox :checked="isRequirePassword"  @ionChange="requirePassword"  justify="space-between" type="boolean">{{ $t("Require Password Change") }}</ion-checkbox>
          </ion-item>
        <ion-button class="ion-margin-top" @click="createUser()">
          {{ $t("Create User") }}
          <ion-icon slot="end" :icon="arrowForwardOutline"/>
        </ion-button>
      </main>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  IonInput,
  IonCheckbox
} from "@ionic/vue";
import { defineComponent } from "vue";
import { mapGetters, useStore } from "vuex";
import { useRouter } from 'vue-router'
import {
  arrowForwardOutline,
} from 'ionicons/icons';
import { showToast, isValidEmail, isValidPassword } from '@/utils'
import { UserService } from '@/services/UserService'
import { hasError } from '@/adapter'
import logger from '@/logger';

export default defineComponent({
  name: "CreateUser",
  components: {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar,
    IonInput,
    IonCheckbox
  },
  computed: {
    ...mapGetters({
     
    })
  },
  data() {
    return {
        isRequirePassword: false,
      formData: {
        username: '',
        fullname: '',
        organizationName: '',
        emailAddress: '',
        contactNumber: '',
        password: '',
        confirmPassword: '',
      }
    }
  },
  methods: {
    clearFormData() {
      this.formData = {
        username: '',
        fullname: '',
        organizationName: '',
        emailAddress: '',
        contactNumber: '',
        password: '',
        confirmPassword: '',

      }
    },
    requirePassword(event: CustomEvent) {
      this.isRequirePassword = event.detail.checked;
    },
    validateCreateUserDetail (data: any) {
      const validationErrors = [];
        if (!data.fullname) {
          validationErrors.push(('Name is required.'));
        }
        if (!data.username) {
          validationErrors.push(('Username is required.'));
        }
        if (!data.organizationName) {
          validationErrors.push(('Organization name is required.'));
        }
        if (!data.emailAddress) {
          validationErrors.push(('Email address is required.'));
        }
        if (!data.contactNumber) {
          validationErrors.push(('Contact number is required.'));
        }
        if (data.emailAddress && !isValidEmail(data.emailAddress)) {
         validationErrors.push(('Invalid email address.'));
        }
        if (data.password && !isValidPassword(data.password)) {
          validationErrors.push(('Password is not valid'));
        }
        if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
          validationErrors.push(('Password is not matching with confirm password.'));
        }
        return validationErrors; 
    },
    async createUser() {
        let passwordRequired = this.isRequirePassword ? "Yes" : "No";
    console.log('form--', this.formData)
      try {
        const validationErrors = this.validateCreateUserDetail({...this.formData});
        if (validationErrors.length > 0) {
          const errorMessages = validationErrors.join(" ");
          logger.error(errorMessages);
          showToast((errorMessages));
          return;
        }

        const payload = {
          ...this.formData,
          passwordRequired,
        }
        console.log('payload--', payload);

        // const resp = await UserService.createUser(payload);
        // if (resp.status === 200 && !hasError(resp) && resp.data.partyId) {
        //   const partyId = resp.data.partyId;
        //   showToast($t("User created successfully"));
        //   this.$router.replace({ path: `/user-confirmation/${partyId}` })
        // } else {
        //   throw resp.data;
        // }
      } catch (err:any) {
        let errorMessage = ('Failed to create user.');
        if (err?.response?.data?.error?.message) {
          errorMessage = err.response.data.error.message
        }
        logger.error('error', err)
        showToast(errorMessage);
      }
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    return {
      store,
      router,
      arrowForwardOutline,
    };
  }
});
</script>
<style scoped>

  @media (min-width: 700px) {
    main {
      max-width: 375px;
      margin: auto;
    }
  }

</style>