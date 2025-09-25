import { useState } from "react";

export interface NewsletterState {
  email: string;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

export interface UseNewsletterReturn {
  state: NewsletterState;
  subscribe: (email: string) => Promise<void>;
  reset: () => void;
  setEmail: (email: string) => void;
}

export function useNewsletter(): UseNewsletterReturn {
  const [state, setState] = useState<NewsletterState>({
    email: "",
    isLoading: false,
    isSuccess: false,
    error: null,
  });

  const subscribe = async (email: string) => {
    if (!email || !email.includes("@")) {
      setState((prev) => ({
        ...prev,
        error: "Please enter a valid email address",
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe to newsletter");
      }

      setState((prev) => ({
        ...prev,
        isLoading: false,
        isSuccess: true,
        email: "",
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Something went wrong",
      }));
    }
  };

  const reset = () => {
    setState({
      email: "",
      isLoading: false,
      isSuccess: false,
      error: null,
    });
  };

  const setEmail = (email: string) => {
    setState((prev) => ({
      ...prev,
      email,
      error: null, // Clear error when user types
    }));
  };

  return {
    state,
    subscribe,
    reset,
    setEmail,
  };
}
