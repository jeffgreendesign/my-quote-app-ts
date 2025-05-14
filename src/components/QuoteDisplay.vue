<template>
  <div class="quote-display">
    <!-- Loading State -->
    <div v-if="quoteStore.isLoading" class="loading">
      <p>Fetching a fresh quote...</p>
      <!-- Optional: Add a simple spinner or animation here -->
    </div>

    <!-- Error State -->
    <div v-else-if="quoteStore.errorMessage" class="error">
      <p>⚠️ {{ quoteStore.errorMessage }}</p>
    </div>

    <!-- Quote Display State -->
    <div v-else-if="quoteStore.hasQuote" class="quote-content">
      <blockquote class="quote-text">
        "{{ quoteStore.currentQuote!.content }}"
      </blockquote>
      <p class="quote-author">- {{ quoteStore.currentQuote!.author }}</p>
      <p v-if="quoteStore.formattedTags" class="quote-tags">
        <em>Tags: {{ quoteStore.formattedTags }}</em>
      </p>
    </div>

    <!-- Initial State (before first fetch or after clearing) -->
    <div v-else class="no-quote">
      <p>Click the button below to get a random quote!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import the store hook
import { useQuoteStore } from '../stores/quoteStore';

// Get the store instance
const quoteStore = useQuoteStore();

// No need to return quoteStore, <script setup> makes it available to the template
</script>

<style scoped>
.quote-display {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  min-height: 150px; /* Ensure it doesn't collapse too much */
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
}

.loading p,
.error p,
.no-quote p {
  color: #555;
  font-style: italic;
}

.error p {
  color: #e74c3c; /* Red for errors */
  font-weight: bold;
}

.quote-content blockquote {
  font-size: 1.4em;
  margin: 0 0 15px 0;
  padding: 0;
  border: none;
  color: #333;
  line-height: 1.6;
}

.quote-author {
  font-size: 1.1em;
  color: #555;
  margin-bottom: 10px;
  font-style: normal;
  text-align: right; /* Align author to the right */
  padding-right: 10%; /* Some padding for alignment */
}

.quote-tags {
  font-size: 0.9em;
  color: #777;
  margin-top: 10px;
  text-align: center; /* Center tags */
}
</style>