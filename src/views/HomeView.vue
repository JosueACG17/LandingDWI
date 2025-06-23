<template>
  <div class="flex flex-col min-h-screen">
    <HeaderComponent />

    <main class="flex-grow">
      <HeroSection />
      <FeaturesSection />
      <ContactSection />
    </main>

    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import HeaderComponent from '@/layout/HeaderComponent.vue'
import FooterComponent from '@/layout/FooterComponent.vue'
import HeroSection from '@/components/HeroSection.vue'
import FeaturesSection from '@/components/FeatureSection.vue'
import ContactSection from '@/components/ContactSection.vue'
</script>

<style scoped>
.border-red-500 {
  border-color: #ef4444;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
