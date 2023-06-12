<script>
export default {
  data() {
    return {
      className: '',
      tailwindInput: '',
      cssOutput: '',
    }
  }
}
</script>

<template>
  <div class="container">
    <h1>Tailwind Reverter</h1>

    <label for="className">
      Class Name:
      <input type="text" name="className">
    </label>
    <label for="tailwindInput">
      Tailwind Input:
      <input type="text" name="tailwindInput">
    </label>
    <button>Convert</button>
    <hr />
    
    <label for="cssOutput">Output:</label>
    <textarea name="cssOutput" rows="10"></textarea>
  </div>
</template>

