import type { CasePageProps } from "@/pages/cases/details/model/types";
import { CasePageLayout } from "@/pages/cases/details/ui/CasePageLayout";

/** Shared case template for cases without their own page in the registry. */
export function DefaultCasePage(props: CasePageProps) {
  return <CasePageLayout {...props} />;
}
