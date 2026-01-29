import type { DatasetSummary } from "@/lib/api/types";

/**
 * Static dataset registry for the catalog.
 * This serves as the initial curated list; eventually could be fetched dynamically.
 */
export const DATASET_REGISTRY: DatasetSummary[] = [
  {
    id: "9mfq-cb36",
    slug: "covid-hospitalizations",
    title: "COVID-19 Reported Patient Impact and Hospital Capacity",
    description:
      "Facility-level estimates of hospital utilization related to COVID-19.",
    category: "Infectious Disease",
    updateFrequency: "Weekly",
    apiEndpoint: "9mfq-cb36",
  },
  {
    id: "r8kw-7aab",
    slug: "flu-surveillance",
    title: "Influenza Surveillance (ILINet)",
    description:
      "Weekly influenza-like illness surveillance data from outpatient providers.",
    category: "Infectious Disease",
    updateFrequency: "Weekly",
    apiEndpoint: "r8kw-7aab",
  },
  {
    id: "bi63-dtpu",
    slug: "chronic-disease-indicators",
    title: "U.S. Chronic Disease Indicators (CDI)",
    description:
      "State-level chronic disease indicators covering risk factors, health outcomes, and prevention.",
    category: "Chronic Conditions",
    updateFrequency: "Annually",
    apiEndpoint: "bi63-dtpu",
  },
  {
    id: "muzy-jte6",
    slug: "vaccination-coverage",
    title: "Vaccination Coverage Among Adults",
    description:
      "National, state, and selected area vaccination coverage among adults aged 18+.",
    category: "Immunization",
    updateFrequency: "Annually",
    apiEndpoint: "muzy-jte6",
  },
  {
    id: "hk9y-quqm",
    slug: "environmental-health",
    title: "Environmental Health Tracking Network",
    description:
      "Environmental health data including air quality, water quality, and health outcomes.",
    category: "Environmental Health",
    updateFrequency: "Varies",
    apiEndpoint: "hk9y-quqm",
  },
  {
    id: "w9j2-ggv5",
    slug: "mortality-underlying-cause",
    title: "Underlying Cause of Death",
    description:
      "County-level mortality data by underlying cause, demographics, and year.",
    category: "Mortality",
    updateFrequency: "Annually",
    apiEndpoint: "w9j2-ggv5",
  },
];
