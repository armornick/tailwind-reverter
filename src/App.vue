<script>
import TwReverter from './TailwindReverter.js';

export default {
  data() {
    return {
      className: '',
      tailwindInput: '',
      cssOutput: '',
    }
  },
  methods: {
    convert() {
      const reverter = new TwReverter();
      reverter.add(this.className, this.tailwindInput);
      this.cssOutput = JSON.stringify(reverter.stylesheet, null, 2);
    }
  }
}
</script>

<template>
  <div class="container">
    <h1>Tailwind Reverter</h1>

    <label for="className">
      Class Name:
      <input type="text" name="className" v-model="className">
    </label>
    <label for="tailwindInput">
      Tailwind Input:
      <input type="text" name="tailwindInput" v-model="tailwindInput">
    </label>
    <button @click="convert()">Convert</button>
    <hr />
    
    <label for="cssOutput">Output:</label>
    <textarea name="cssOutput" rows="10">{{ cssOutput }}</textarea>
  </div>
</template>

