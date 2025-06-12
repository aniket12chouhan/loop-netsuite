<template>
  <ion-page>
    <ion-content>
      <div class="flex">
        <form class="login-container" @keyup.enter="login(form)" @submit.prevent="login(form)">
          <Logo />

          <ion-item lines="full" v-if="!baseURL">
            <ion-input label-placement="fixed" :label="('OMS')" name="instanceUrl" v-model="instanceUrl" id="instanceUrl" type="text" required />

          </ion-item>
          <ion-item lines="full">
            <ion-input label-placement="fixed" :label="('Username')" name="username" v-model="username" id="username" type="text" required />

          </ion-item>
          <ion-item lines="none">
            <ion-input label-placement="fixed" :label="('Password')" name="password" v-model="password" id="password" type="password" required />

          </ion-item>

          <div class="ion-padding">
            <ion-button type="submit" color="primary" fill="outline" expand="block">{{("Login") }}</ion-button>
          </div>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { 
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonPage 
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { mapGetters } from 'vuex';
import {showToast} from "@/utils";
import Logo from '@/components/Logo.vue';

export default defineComponent({
  name: "Login",
  components: {
    IonButton,
    IonContent,
    IonInput,
    IonItem,
    IonPage,
    Logo
  },
  data() {
    return {
      username: "",
      password: "",
      instanceUrl: "",
      baseURL: process.env.VUE_APP_BASE_URL,
      alias: JSON.parse(process.env.VUE_APP_ALIAS as any)
    };
  },
  computed: {
    ...mapGetters({
      currentInstanceUrl: 'user/getInstanceUrl'
    })
  },
  mounted() {
    this.instanceUrl = this.currentInstanceUrl;
  },
  methods: {
    login: function () {
      const instanceURL = this.instanceUrl.trim().toLowerCase();
      if(!this.baseURL) this.store.dispatch("user/setUserInstanceUrl", this.alias[instanceURL] ? this.alias[instanceURL] : instanceURL);
      const { username, password } = this;
      this.store.dispatch("user/login", { username, password }).then((data: any) => {
        if (data.api_key) {
          this.username = ''
          this.password = ''
          this.router.push('/home')
        }
      }).catch((error: any) => {
        showToast("Username or password is incorrect");
      });
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
.login-container {
  width: 375px;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>