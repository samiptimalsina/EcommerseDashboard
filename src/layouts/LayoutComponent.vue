<template>
  <div>
    <HeaderComponent />
    <main>
      <router-view></router-view>
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/Nav/HeaderComponent.vue';
import FooterComponent from '@/components/Nav/FooterComponent.vue';

export default {
  name: 'LayoutComponent',  
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<style scoped>
main {
  padding: 20px;
}
</style>
