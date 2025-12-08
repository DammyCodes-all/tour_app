import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";

interface Step {
  id: string;
  selector: string;
  text: string;
}

interface Tour {
  title: string;
  steps: Step[];
}

export function runShepherdTour(tour: Tour) {
  const shepherd = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
      scrollTo: true,
      cancelIcon: {
        enabled: true,
      },
      classes: "tourify-step",
    },
  });

  tour.steps.forEach((step) => {
    shepherd.addStep({
      id: step.id,
      text: step.text,
      attachTo: {
        element: step.selector,
        on: "auto",
      },
      buttons: [
        {
          text: "Back",
          classes: "shepherd-button-secondary",
          action() {
            shepherd.back();
          },
        },
        {
          text: "Next",
          classes: "shepherd-button-primary",
          action() {
            shepherd.next();
          },
        },
      ],
    });
  });

  shepherd.start();
}
