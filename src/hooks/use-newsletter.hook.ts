import { useState } from "react";

export interface NewsletterFormData {
  firstName: string;
  lastName: string;
  email: string;
  // Honeypot — hidden from people, so anything in it came from a bot.
  website: string;
}

export interface NewsletterState {
  formData: NewsletterFormData;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  turnstileToken: string | null;
  // Bumped after every submit so the Turnstile widget remounts with a fresh
  // token — tokens are single-use, even when the submit fails.
  attempt: number;
}

export interface UseNewsletterReturn {
  state: NewsletterState;
  updateField: (field: keyof NewsletterFormData, value: string) => void;
  setTurnstileToken: (token: string | null) => void;
  setError: (error: string | null) => void;
  subscribe: () => Promise<void>;
  reset: () => void;
}

const initialFormData: NewsletterFormData = {
  firstName: "",
  lastName: "",
  email: "",
  website: "",
};

const initialState: NewsletterState = {
  formData: initialFormData,
  isLoading: false,
  isSuccess: false,
  error: null,
  turnstileToken: null,
  attempt: 0,
};

export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export function useNewsletter(): UseNewsletterReturn {
  const [state, setState] = useState<NewsletterState>(initialState);

  const updateField = (field: keyof NewsletterFormData, value: string) => {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, [field]: value },
      error: null, // Clear error when user types
    }));
  };

  const setTurnstileToken = (token: string | null) => {
    setState((prev) => ({ ...prev, turnstileToken: token }));
  };

  const setError = (error: string | null) => {
    setState((prev) => ({ ...prev, error }));
  };

  const subscribe = async () => {
    const { firstName, lastName, email } = state.formData;

    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter your first and last name");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!state.turnstileToken) {
      setError("Just a moment — we're checking your connection. Please try again.");
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...state.formData,
          turnstileToken: state.turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe to newsletter");
      }

      setState((prev) => ({
        ...prev,
        isLoading: false,
        isSuccess: true,
        formData: initialFormData,
        turnstileToken: null,
        attempt: prev.attempt + 1,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Something went wrong",
        turnstileToken: null,
        attempt: prev.attempt + 1,
      }));
    }
  };

  const reset = () => {
    setState((prev) => ({ ...initialState, attempt: prev.attempt + 1 }));
  };

  return {
    state,
    updateField,
    setTurnstileToken,
    setError,
    subscribe,
    reset,
  };
}
