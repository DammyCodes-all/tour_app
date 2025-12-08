import "./style.css";
import "shepherd.js/dist/css/shepherd.css";
import { fetchTour } from "./lib/api.js";
import { runShepherdTour } from "./run-shepard.js";

// function to initialize the widget
const script = document.querySelector(
  "script[data-org][data-tour]"
) as HTMLScriptElement;

function init() {
  if (!script) {
    console.error("[Tourify] Script element not found");
    return;
  }
  const org = script.getAttribute("data-org");
  const tour = script.getAttribute("data-tour");

  if (!org || !tour) {
    console.error("[Tourify] Missing data-org or data-tour");
    return;
  }
  fetchTour(org, tour)
    .then((tourData) => {
      if (tourData) {
        runShepherdTour(tourData);
      } else {
        console.error("[Tourify] Tour not found");
      }
    })
    .catch((err) => {
      console.error("[Tourify] Error fetching tour:", err);
    });
}

window.addEventListener("load", init);
