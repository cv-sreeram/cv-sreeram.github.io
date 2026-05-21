import { onMounted } from "vue";
import { emitFrameworkActive, emitMfeState } from "@my-portal/utils";

export function useExperienceEvents() {
  onMounted(() => {
    emitFrameworkActive("Vue", window.location.pathname);
    emitMfeState("mfe-vue-page", "ready", "Experience page is ready.");
  });
}
