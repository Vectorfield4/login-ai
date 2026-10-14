// Jev report assembly and rendering: one shape, one formatter, shared by every
// domain. The prompt version is supplied by the domain that owns the rubrics.

/** The report shape returned when RUNWARE_API_KEY is absent. */
export const noKeyReport = (kind, slug, lang, promptVersion) => ({
  kind,
  slug,
  lang,
  skipped: "no-key",
  findings: [],
  promptVersion,
});

/** Drops duplicate `line|rule` findings, keeping the first. */
export function dedupe(findings) {
  return [...new Map(findings.map((f) => [`${f.line}|${f.rule}`, f])).values()];
}

/** The report object every domain returns. */
export function makeReport({
  kind,
  slug,
  lang,
  file,
  units,
  targets = 0,
  findings,
  usage,
  promptVersion,
}) {
  return {
    kind,
    slug,
    lang,
    file,
    units,
    targets,
    findings: dedupe(findings),
    usage,
    promptVersion,
  };
}

/** One `[file:line] RULE (conf)` line per finding, for the skill procedures. */
export function formatFindings(report) {
  if (report.skipped) return `Jev: пропущено (${report.skipped}) — RUNWARE_API_KEY не задан.`;
  if (!report.findings.length) return "Jev: кандидатов нет.";
  return report.findings
    .map((f) => {
      const where = f.line ? `[${report.file}:${f.line}]` : `[${report.file}]`;
      const detail = f.detail ? ` — ${f.detail}` : "";
      return `${where} ${f.rule} (${f.confidence})${detail}`;
    })
    .join("\n");
}
