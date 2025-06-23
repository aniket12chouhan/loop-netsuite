<template>
  <ion-page>
    <ion-header :translucent="true" class="flex-header"> >
      <ion-item>
        <h1>Hotwax Commerce</h1>
      </ion-item>
      <div>
        <ion-segment v-model="segmentSelected" @ionChange="segmentChanged">
          <ion-segment-button value="Configuration">
            <ion-label>{{ $t("Configuration") }}</ion-label>
          </ion-segment-button>
          <ion-segment-button value="UserProfile">
            <ion-label>{{ $t("User Profile") }}</ion-label>
          </ion-segment-button>
          <ion-segment-button value="SyncStatus">
            <ion-label>{{ $t("Sync Status") }}</ion-label>
          </ion-segment-button>
        </ion-segment>
      </div>
    </ion-header>
    <ion-content ref="contentRef" :scroll-events="true">
      <div v-if="segmentSelected === 'Configuration'">
        <section>
          <ion-card>
            <ion-card-header>
              <ion-item lines="none">
                <ion-thumbnail slot="start">
                  <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                </ion-thumbnail>
                <ion-card-title>NetSuite Credentials</ion-card-title>
              </ion-item>
              <ion-item lines="none">
                <ion-chip :outline="true"><ion-icon :icon=addOutline /> <ion-label>Sandbox</ion-label></ion-chip>
                <ion-chip :outline="true"><ion-icon :icon=addOutline /> <ion-label>Producation</ion-label></ion-chip>
              </ion-item>
            </ion-card-header>
               

            <ion-card-content>
              <ion-list>
                <ion-item>

                </ion-item>
              </ion-list>

              <div class="cred-entry" v-for="(cred, index) in credentials" :key="index">
                <div class="cred-info">
                  <h3>{{ cred.env }}</h3>
                  <p>&lt;account id&gt;</p>
                </div>
                <div class="cred-status">
                  <ion-button v-if="cred.status === 'verify'" size="small" color="warning" fill="outline">
                    VERIFY
                  </ion-button>

                  <ion-text v-else-if="cred.status === 'verified'" color="success">
                    <p class="verified-text">verified</p>
                  </ion-text>

                  <ion-badge v-else-if="cred.status === 'failed'" color="danger" class="fail-badge">
                    <ion-icon name="alert-circle-outline" slot="start" />
                    verification failed
                  </ion-badge>

                  <ion-icon name="trash-outline" class="trash-icon" />
                </div>
              </div>
            </ion-card-content>
          </ion-card>
        </section>
      </div>
      <div v-if="segmentSelected === 'UserProfile'">
      </div>
      <div v-if="segmentSelected === 'SyncStatus'">

      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonLabel,
  IonHeader,
  IonSegment,
  IonSegmentButton,
  IonContent,
  IonCard,
  IonCardHeader,
  IonThumbnail,
  IonItem,
  IonCardTitle,
  IonCardContent,
  IonChip,
  IonIcon,
  IonList


} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { mapGetters } from 'vuex';
import { showToast } from "@/utils";
import { addOutline } from "ionicons/icons";

export default defineComponent({
  name: "UserDetailPage",
  components: {
    IonPage,
    IonLabel,
    IonHeader,
    IonSegment,
    IonSegmentButton,
    IonContent,
    IonItem,
    IonCard,
    IonCardHeader,
    IonThumbnail,
    IonCardTitle,
    IonCardContent,
    IonChip,
    IonIcon,
    IonList

  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
    })
  },

  methods: {
    segmentChanged(e: CustomEvent) {
      this.segmentSelected = e.detail.value
      if (this.segmentSelected === 'Configuration') {
        // this.configuration()
      } else if (this.segmentSelected === 'UserProfile') {
        // this.userProfile()
      } else {
        // this.syncStatus()
      }
    },
  },

  setup() {
    const router = useRouter();
    const store = useStore();
    const segmentSelected = ref('Configuration');
    const credentials = ref([
      { env: 'Sandbox', status: 'verify' },
      { env: 'Sandbox', status: 'verified' },
      { env: 'Sandbox', status: 'failed' }
    ]);

    return { router, store, segmentSelected, credentials, addOutline };
  }
});
</script>
<style scoped>
@media (min-width: 343px) {
  ion-content>div {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(343px, 1fr));
  }
}

section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(431px, 1fr));
  align-items: start;
}

.seg-btns {
  margin-top: 8px;
  margin-bottom: 12px;
}


.cred-entry {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ddd;
  padding: 12px 0;
}

.cred-info h3 {
  font-size: 16px;
  margin: 0;
}

.cred-info p {
  margin: 4px 0 0;
  font-size: 13px;
  color: gray;
}

.cred-status {
  display: flex;
  align-items: center;
  gap: 10px;
}

.verified-text {
  font-size: 14px;
}

.fail-badge {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  display: flex;
  align-items: center;
}

.trash-icon {
  font-size: 18px;
  color: #888;
  cursor: pointer;
}

.user-detail-container {
  max-width: 375px;
  margin: 0 auto;
  padding: 16px;
}

.flex {
  display: flex;
  align-items: center;
  height: 64px;
  /* Fixed height for header logo container */
  width: 100%;
}

.flex-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
}

@media (min-width: 991px) {
  ion-header>div {
    display: flex;
  }
}
</style>
