<template>
  <div>
    <label for="" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="mt-1 relative rounded-md shadow-sm">
      <input
        id=""
        :type="type"
        :placeholder="placeholder"
        name=""
        :value="value"
        :disabled="disabled"
        :class="className"
        class="focus:outline-none border  p-2 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
        @input="$emit('input', $event.target.value)"
      >
      <div class="absolute inset-y-0 right-0 pr-3 flex text-gray-400 font-semibold items-center pointer-events-none">
        {{ name }}
      </div>
    </div>
    <small v-if="subtext" class="text-xs text-gray-700">{{ subtext }}</small>
    <p class="text-red-600 text-sm mt-1" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    label: String,
    className: String,
    placeholder: String,
    name: String,
    value: String | Number,
    subtext: String,
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "text"
    },
    error: String,


  },
}
</script>

<style scoped>

</style>
