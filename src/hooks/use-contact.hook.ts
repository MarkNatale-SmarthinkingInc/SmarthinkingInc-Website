import { useState } from "react";

export interface ContactFormData {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  message: string;
  // Honeypot — hidden from people, so anything in it came from a bot.
  website: string;
}

export interface ContactState {
  formData: ContactFormData;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  turnstileToken: string | null;
  // Bumped after every submit so the Turnstile widget remounts with a fresh
  // token — tokens are single-use, even when the submit fails.
  attempt: number;
}

export interface UseContactReturn {
  state: ContactState;
  updateField: (field: keyof ContactFormData, value: string) => void;
  setTurnstileToken: (token: string | null) => void;
  submitForm: () => Promise<void>;
  reset: () => void;
}

const initialFormData: ContactFormData = {
  firstName: "",
  lastName: "",
  companyName: "",
  email: "",
  phone: "",
  message: "",
  website: "",
};

const initialState: ContactState = {
  formData: initialFormData,
  isLoading: false,
  isSuccess: false,
  error: null,
  turnstileToken: null,
  attempt: 0,
};

export function useContact(): UseContactReturn {
  const [state, setState] = useState<ContactState>(initialState);

  const updateField = (field: keyof ContactFormData, value: string) => {
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        [field]: value,
      },
      error: null, // Clear error when user types
    }));
  };

  const setTurnstileToken = (token: string | null) => {
    setState((prev) => ({ ...prev, turnstileToken: token }));
  };

  // Required fields mirror the Jotform form — keep them in step with it.
  const validateForm = (data: ContactFormData): string | null => {
    if (!data.firstName.trim() || !data.lastName.trim()) {
      return "First and last name are required";
    }
    if (!data.email || !data.email.includes("@")) {
      return "Please enter a valid email address";
    }
    if (!data.message.trim()) {
      return "Message is required";
    }
    return null;
  };

  const submitForm = async () => {
    const validationError = validateForm(state.formData);
    if (validationError) {
      setState((prev) => ({
        ...prev,
        error: validationError,
      }));
      return;
    }

    if (!state.turnstileToken) {
      setState((prev) => ({
        ...prev,
        error: "Just a moment — we're checking your connection. Please try again.",
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...state.formData,
          turnstileToken: state.turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit contact form");
      }

      setState((prev) => ({
        ...prev,
        isLoading: false,
        isSuccess: true,
        formData: initialFormData, // Reset form on success
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
    submitForm,
    reset,
  };
}
