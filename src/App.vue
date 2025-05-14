<template>
  <div id="app-wrapper">
    <header>
      <h1>Random Quote Generator</h1>
    </header>

    <main>
      <!-- Display the Quote Section -->
      <QuoteDisplay />

      <!-- Display the Controls (button) Section -->
      <QuoteControls />
    </main>

    <footer>
      <p>Quotes provided by <a href="https://api-ninjas.com/" target="_blank" rel="noopener noreferrer">API-Ninjas.com</a></p>
      <p>An experiment by <a href="https://hirejeffgreen.com" target="_blank" rel="noopener noreferrer">Jeff Green</a>. This project is developed with Vite, Vue.js, and Pinia. This version is using TypeScript. Hosted on Netlify.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Import the components we created
import QuoteDisplay from './components/QuoteDisplay.vue';
import QuoteControls from './components/QuoteControls.vue';

// We can also trigger an initial quote fetch when the app loads if desired
// Uncomment the lines below to fetch a quote immediately:
/*
import { onMounted } from 'vue';
import { useQuoteStore } from './stores/quoteStore';

const store = useQuoteStore();
onMounted(() => {
  // Optional: Check if a quote already exists before fetching
  // if (!store.hasQuote) {
  //  store.fetchRandomQuote();
  // }
  store.fetchRandomQuote(); // Fetch a quote as soon as the component mounts
});
*/

</script>

<style>
/* Global styles - applying to elements inside App.vue and potentially child components */
#app-wrapper {
  max-width: 700px;
  margin: 40px auto;
  padding: 20px 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

header h1 {
  color: #2c3e50;
  font-weight: 600;
}

footer {
  text-align: center;
  margin-top: 30px;
  padding-top: 15px;
  border-top: 1px solid #eee;
  font-size: 0.9em;
  color: #777;
}

footer a {
  color: #3498db;
  text-decoration: none;
}

footer a:hover {
  text-decoration: underline;
}
</style>