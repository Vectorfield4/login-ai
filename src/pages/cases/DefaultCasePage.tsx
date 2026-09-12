import { CasePageLayout } from "./CasePageLayout";
import type { CasePageProps } from "./types";

/** Shared case template for cases without their own page in the registry. */
export function DefaultCasePage(props: CasePageProps) {
  return <CasePageLayout {...props} />;
}
