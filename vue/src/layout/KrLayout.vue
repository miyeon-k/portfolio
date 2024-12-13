<template>
  <div class="wrap">
    <KrHeader />
    <slot />
    <KrFooter />
  </div>
</template>

<script>
import KrHeader from '../components/KrHeader';
import KrFooter from '../components/KrFooter';

export default {
  name: "KrLayout",
  components: {
    KrHeader,
    KrFooter,
  },
};
</script>