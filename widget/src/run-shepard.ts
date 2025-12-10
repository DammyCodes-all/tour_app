import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";

interface Step {
  id: string | null;
  target_selector: string;
  content: string;
  title: string;
  placement?: "auto" | "top" | "bottom" | "left" | "right";
  step_number?: number | null;
}

interface Tour {
  id?: string | null;
  title?: string;
  description?: string;
  tour_steps: Step[];
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

  const steps = [...(tour.tour_steps || [])].sort((a, b) => {
    const an = a.step_number ?? 0;
    const bn = b.step_number ?? 0;
    return an - bn;
  });

  steps.forEach((step, idx) => {
    if (!step || !step.target_selector) return;

    const isFirst = idx === 0;
    const isLast = idx === steps.length - 1;

    const buttons: any[] = [];

    if (!isFirst) {
      buttons.push({
        text: "Back",
        classes: "shepherd-button-secondary",
        action() {
          shepherd.back();
        },
      });
    }

    buttons.push({
      text: isLast ? "Done" : "Next",
      classes: "shepherd-button-primary",
      action() {
        if (isLast) {
          shepherd.complete();
        } else {
          shepherd.next();
        }
      },
    });

    shepherd.addStep({
      id: step.id ?? undefined,
      text: step.content,
      attachTo: {
        element: step.target_selector,
        on: step.placement ?? "auto",
      },
      buttons,
    });
  });

  shepherd.start();
}
