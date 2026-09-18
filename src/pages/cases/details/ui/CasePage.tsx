import { Navigate, useParams } from "react-router-dom";
import { selectCaseBySlug, useCasesStore } from "@/entities/case/model/casesStore";
import { casePages } from "@/pages/cases/details/model/registry";
import { DefaultCasePage } from "@/pages/cases/details/ui/DefaultCasePage";

/**
 * Dispatcher for the case detail page /cases/:slug.
 * Resolves the page in the casePages registry; anything else falls back to the
 * DefaultCasePage template. An unknown slug redirects to the cases list.
 */
export default function CasePage() {
  const { slug } = useParams<{ slug: string }>();
  const caseData = useCasesStore((state) => selectCaseBySlug(state.cases, slug));

  if (!caseData) {
    return <Navigate to="/cases" replace />;
  }

  const Page = casePages[caseData.slug] ?? DefaultCasePage;
  return <Page case={caseData} />;
}
