import sampleTour from "./sample-tour.json";

const BASE_URL = "https://tour-app-virid-kappa.vercel.app";

type RawStep = Record<string, any>;
type RawTour = Record<string, any>;

function normalizeTour(t: RawTour) {
  const steps = (t.tour_steps ?? t.steps ?? []) as RawStep[];
  const tour_steps = steps.map((s) => ({
    id: s.id ?? s.step_id ?? s.stepId ?? null,
    title: s.title ?? s.name ?? "",
    content: s.content ?? s.text ?? "",
    target_selector: s.target_selector ?? s.selector ?? s.target ?? "",
    placement: s.placement ?? "auto",
    step_number: s.step_number ?? s.stepNumber ?? null,
    step_id: s.step_id ?? s.stepId ?? null,
    tour_id: s.tour_id ?? t.id ?? null,
  }));
  return {
    id: t.id ?? null,
    title: t.title ?? t.name ?? "",
    description: t.description ?? "",
    tour_steps,
  };
}

export async function fetchTour(org: string, tour: string) {
  if (org === "sample-org" && tour === "sample-tour") {
    return normalizeTour(sampleTour);
  }
  try {
    const url = new URL(`${BASE_URL}/api/widget`);
    url.searchParams.append("org", org);
    url.searchParams.append("tour_id", tour);
    const response = await fetch(url.toString());
    if (!response.ok) {
      console.error(
        `Error fetching tour: ${response.status} ${response.statusText}`
      );
      return null;
    }
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      return normalizeTour(data[0]);
    }
  } catch (error) {
    console.error("Error fetching tour:", error);
  }

  return null;
}
