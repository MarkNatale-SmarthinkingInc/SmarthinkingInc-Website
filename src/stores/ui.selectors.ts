import type { SelectParameters } from "@/@types/zustand";
import type uiStore from "@/stores/ui.store";

type UiStoreSelectors = SelectParameters<typeof uiStore>;

export function selectGetIsMenuOpen(state: UiStoreSelectors) {
  return state.isMenuOpen;
}

export function selectGetHeaderColor(state: UiStoreSelectors) {
  return state.headerColor;
}

export function selectGetIsTeamModalOpen(state: UiStoreSelectors) {
  return state.isTeamModalOpen;
}

export function selectGetSelectedTeamMember(state: UiStoreSelectors) {
  return state.selectedTeamMember;
}

export function selectGetBreadcrumbs(state: UiStoreSelectors) {
  return state.breadcrumbs;
}

export function selectGetSelectedVideoUrl(state: UiStoreSelectors) {
  return state.selectedVideoUrl;
}

export function selectGetIsVideoModalOpen(state: UiStoreSelectors) {
  return state.isVideoModalOpen;
}
