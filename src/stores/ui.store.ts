import type {
  ImageField,
  KeyTextField,
  RichTextField,
} from "@prismicio/client";
import { create } from "zustand";
import { combine } from "zustand/middleware";

// Define the structure for team member data
export interface TeamMember {
  id: KeyTextField;
  name: KeyTextField;
  bio: RichTextField;
  image: ImageField;
  // Add other fields like title, social links etc. if necessary
}

export type UiStoreValuesType = {
  headerColor: "white" | "black";
  isMenuOpen: boolean;
  isTeamModalOpen: boolean; // Add team modal state
  selectedTeamMember: TeamMember | null; // Add selected member state
  breadcrumbs: {
    title: string;
    path: string;
  }[];
  selectedVideoUrl: string | null;
  isVideoModalOpen: boolean;
};

export const INITIAL_UI_STORE_VALUES: UiStoreValuesType = {
  headerColor: "white",
  isMenuOpen: false,
  isTeamModalOpen: false, // Initialize team modal as closed
  selectedTeamMember: null, // Initialize selected member as null
  breadcrumbs: [],
  selectedVideoUrl: null,
  isVideoModalOpen: false,
};

const uiStore = create(
  combine(INITIAL_UI_STORE_VALUES, (set, get) => ({
    setHeaderColor: (color: UiStoreValuesType["headerColor"]) => {
      set({ headerColor: color });
    },
    setIsMenuOpen: (open: UiStoreValuesType["isMenuOpen"]) => {
      set({ isMenuOpen: open });
    },
    // Action to set team modal visibility
    setIsTeamModalOpen: (open: UiStoreValuesType["isTeamModalOpen"]) => {
      set({ isTeamModalOpen: open });
    },
    // Action to set the selected team member
    setSelectedTeamMember: (
      member: UiStoreValuesType["selectedTeamMember"]
    ) => {
      set({ selectedTeamMember: member });
    },
    // Action to open the modal for a specific member
    openTeamModalFor: (member: TeamMember) => {
      set({ selectedTeamMember: member, isTeamModalOpen: true });
    },
    setBreadcrumbs: (breadcrumbs: UiStoreValuesType["breadcrumbs"]) => {
      set({ breadcrumbs });
    },
    setSelectedVideoUrl: (url: UiStoreValuesType["selectedVideoUrl"]) => {
      set({ selectedVideoUrl: url });
    },
    setIsVideoModalOpen: (open: UiStoreValuesType["isVideoModalOpen"]) => {
      set({ isVideoModalOpen: open });
    },
  }))
);
export default uiStore;
