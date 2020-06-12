<template>
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="linkProps(to)">
    <slot></slot>
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate.js'

export default {
  props: {
    to: String
  },
  methods: {
    linkProps (url) {
      if (isExternal(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank'
        }
      }
      return {
        is: 'router-link',
        to: url
      }
    }
  }
}
</script>
