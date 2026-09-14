import type { CasePageProps } from "@/pages/cases/[slug]/model/types";
import { CasePageLayout } from "@/pages/cases/[slug]/ui/CasePageLayout";

/** Shared case template for cases without their own page in the registry. */
export function DefaultCasePage(props: CasePageProps) {
  return <CasePageLayout {...props} />;
}
