import { defineStore } from "pinia";
import { ref, computed } from "vue";

interface Quote {
  content: string;
  author: string;
  tags: string[];
}

interface QuoteResponse {
  quote: string;
  author: string | null;
  category?: string;
}

export const useQuoteStore = defineStore("quote", () => {
  // --- State ---
  const currentQuote = ref<Quote | null>(null);
  const isLoading = ref(false);
  const errorMessage = ref<string | null>(null);

  // --- Getters ---
  const hasQuote = computed(() => {
    return (
      currentQuote.value !== null &&
      typeof currentQuote.value.content === "string"
    );
  });

  const formattedTags = computed(() => {
    if (
      hasQuote.value &&
      currentQuote.value?.tags &&
      currentQuote.value.tags.length > 0
    ) {
      return currentQuote.value.tags.join(", ");
    }
    return "";
  });

  // --- Actions ---
  async function fetchRandomQuote(): Promise<void> {
    isLoading.value = true;
    errorMessage.value = null;
    currentQuote.value = null;

    try {
      const isDevelopment = import.meta.env.DEV;
      const fetchUrl = isDevelopment
        ? "/api/v1/quotes"
        : "/.netlify/functions/get-quote";

      console.log("Fetching from:", fetchUrl);
      const response = await fetch(fetchUrl);
      console.log("Fetch response status:", response.status);

      if (!response.ok) {
        let errorData: { error?: string; message?: string } | undefined;
        try {
          errorData = await response.json();
        } catch (e) {
          // Ignore if response body is not JSON
        }
        const errorMsgDetail =
          errorData?.error ||
          errorData?.message ||
          `Status: ${response.status}`;
        console.error("API Error Response:", errorData);
        throw new Error(`API error! ${errorMsgDetail}`);
      }

      const data = await response.json();
      console.log("API Data received:", data);

      const quoteData = isDevelopment ? data[0] : data;

      if (quoteData) {
        currentQuote.value = {
          content: quoteData.quote,
          author: quoteData.author || "Unknown",
          tags: quoteData.category ? [quoteData.category] : [],
        };
      } else {
        throw new Error("Received no quote data from API");
      }
    } catch (error) {
      console.error("Failed to fetch quote (Catch Block):", error);
      errorMessage.value = `Oops! Could not fetch quote: ${
        error instanceof Error ? error.message : "Please try again."
      }`;
      currentQuote.value = null;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    currentQuote,
    isLoading,
    errorMessage,
    hasQuote,
    formattedTags,
    fetchRandomQuote,
  };
});
