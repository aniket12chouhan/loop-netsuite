<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Card Title</ion-card-title>
      <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      Here's a small text description for the card content. Nothing more, nothing less.
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
  import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "Home",
    components: { 
      IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle 
    },
  });
</script>