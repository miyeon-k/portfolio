<template>
  <div>
    <EnHeader />
    <slot />
    <EnFooter />
  </div>
</template>

<script>
import EnHeader from '../components/EnHeader';
import EnFooter from '../components/EnFooter';

export default {
  name: "EnLayout",
  components: {
    EnHeader,
    EnFooter,
  }
};
</script>