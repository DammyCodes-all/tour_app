import "./style.css";
import "shepherd.js/dist/css/shepherd.css";
import { fetchTour } from "./lib/api.js";
import { runShepherdTour } from "./run-shepard.js";

// function to initialize the widget
const script = document.querySelector(
  "script[data-tour-id]"
) as HTMLScriptElement;

function init() {
  if (!script) {
    console.error("[Tourify] Script element not found");
    return;
  }
  const tour = script.getAttribute("data-tour-id");

  if (!tour) {
    console.error("[Tourify] Missing data-tour-id");
    return;
  }
  fetchTour(tour)
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
