import { ExplorerWorkspace } from "@/components/layout/ExplorerWorkspace";

interface Props {
  params: Promise<{ dataset: string }>;
}

export default async function ExplorePage({ params }: Props) {
  const { dataset } = await params;
  return <ExplorerWorkspace datasetSlug={dataset} />;
}
