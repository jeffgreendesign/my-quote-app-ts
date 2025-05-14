<template>
  <div class="quote-controls">
    <button
      @click="fetchNewQuote"
      :disabled="quoteStore.isLoading"
      class="fetch-button"
    >
      {{ quoteStore.isLoading ? 'Fetching...' : 'Get New Quote' }}
    </button>
  </div>
</template>

<script setup lang="ts">
// Import the store hook
import { useQuoteStore } from '../stores/quoteStore';

// Get the store instance
const quoteStore = useQuoteStore();

// Function to call the action from the store
function fetchNewQuote(): void {
  quoteStore.fetchRandomQuote();
}

// No need to return, <script setup> handles it
</script>

<style scoped>
.quote-controls {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.fetch-button {
  padding: 12px 25px;
  font-size: 1em;
  color: white;
  background-color: #3498db; /* A nice blue */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.fetch-button:hover:not(:disabled) {
  background-color: #2980b9; /* Darker blue on hover */
}

.fetch-button:active:not(:disabled) {
  transform: scale(0.98); /* Slight press effect */
}

.fetch-button:disabled {
  background-color: #bdc3c7; /* Grey when disabled */
  cursor: not-allowed;
}
</style>