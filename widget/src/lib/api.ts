import sampleTour from "./sample-tour.json";

export async function fetchTour(org: string, tour: string) {
  if (org === "sample-org" && tour === "sample-tour") {
    return sampleTour;
  } else return null;
}
