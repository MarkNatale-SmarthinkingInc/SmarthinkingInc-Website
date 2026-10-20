import { useState } from "react";

export interface GatedContentFormData {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  jobTitle: string;
  // Honeypot — hidden from people, so anything in it came from a bot.
  website: string;
}

export interface GatedContentState {
  formData: GatedContentFormData;
  isLoading: boolean;
  isSuccess: boolean;
  // Only sent back by the server once the submission has gone through.
  downloadUrl: string | null;
  error: string | null;
  turnstileToken: string | null;
  // Bumped after every submit so the Turnstile widget remounts with a fresh
  // token — tokens are single-use, even when the submit fails.
  attempt: number;
}

export interface UseGatedContentReturn {
  state: GatedContentState;
  updateField: (field: keyof GatedContentFormData, value: string) => void;
  setTurnstileToken: (token: string | null) => void;
  submitForm: () => Promise<void>;
}

const initialFormData: GatedContentFormData = {
  email: "",
  firstName: "",
  lastName: "",
  company: "",
  jobTitle: "",
  website: "",
};

const initialState: GatedContentState = {
  formData: initialFormData,
  isLoading: false,
  isSuccess: false,
  downloadUrl: null,
  error: null,
  turnstileToken: null,
  attempt: 0,
};

// `uid` is the blog post's — the server looks up that post's form name,
// Act-On form ID and download link, so none of them live in the browser.
export function useGatedContent(uid: string): UseGatedContentReturn {
  const [state, setState] = useState<GatedContentState>(initialState);

  const updateField = (field: keyof GatedContentFormData, value: string) => {
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

  // Every field is required — keep in step with the API route.
  const validateForm = (data: GatedContentFormData): string | null => {
    if (!data.email || !data.email.includes("@")) {
      return "Please enter a valid email address";
    }
    if (
      !data.firstName.trim() ||
      !data.lastName.trim() ||
      !data.company.trim() ||
      !data.jobTitle.trim()
    ) {
      return "Please fill in every field";
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
        error:
          "Just a moment — we're checking your connection. Please try again.",
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const response = await fetch("/api/gated-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...state.formData,
          uid,
          turnstileToken: state.turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit the form");
      }

      setState((prev) => ({
        ...prev,
        isLoading: false,
        isSuccess: true,
        downloadUrl: data.downloadUrl ?? null,
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

  return {
    state,
    updateField,
    setTurnstileToken,
    submitForm,
  };
}
