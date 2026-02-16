<template>
  <div :class="{ 'form-floating': floatLabel }">
    <input
      :id="id"
      :type="type"
      class="form-control w-100"
      :class="className"
      :value="modelValue"
      @input="emitValue"
      :placeholder="placeholder"
      :aria-label="placeholder"
    />
    <label v-if="floatLabel" :for="id">{{ placeholder }}</label>
  </div>
</template>

<script setup lang="ts">
defineProps({
  id: { type: String, required: true }, // 👈 accept id from parent
  modelValue: String,
  className: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  floatLabel: { type: Boolean, default: false },
  type: { type: String as PropType<'email' | 'text'>, default: 'text' },
});

const emit = defineEmits(['update:modelValue'])

function emitValue(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>
