import { useState } from "react";

export interface ContactFormData {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactState {
  formData: ContactFormData;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

export interface UseContactReturn {
  state: ContactState;
  updateField: (field: keyof ContactFormData, value: string) => void;
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
};

export function useContact(): UseContactReturn {
  const [state, setState] = useState<ContactState>({
    formData: initialFormData,
    isLoading: false,
    isSuccess: false,
    error: null,
  });

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

  const validateForm = (data: ContactFormData): string | null => {
    if (!data.firstName.trim() || !data.lastName.trim()) {
      return "First and last name are required";
    }
    if (!data.companyName.trim()) {
      return "Company name is required";
    }
    if (!data.email || !data.email.includes("@")) {
      return "Please enter a valid email address";
    }
    if (!data.phone.trim()) {
      return "Phone number is required";
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

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const payload = {
        firstName: state.formData.firstName,
        lastName: state.formData.lastName,
        companyName: state.formData.companyName,
        email: state.formData.email,
        phone: state.formData.phone,
        message: state.formData.message,
      };
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
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
      formData: initialFormData,
      isLoading: false,
      isSuccess: false,
      error: null,
    });
  };

  return {
    state,
    updateField,
    submitForm,
    reset,
  };
}
