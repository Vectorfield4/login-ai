import { digest_exporterEn } from "./en/digest-exporter";
import { event_analyzerEn } from "./en/event-analyzer";
import { source_collectorEn } from "./en/source-collector";
import { digest_exporterRu } from "./ru/digest-exporter";
import { event_analyzerRu } from "./ru/event-analyzer";
import { source_collectorRu } from "./ru/source-collector";

export const modulesRu = {
  modules: {
    common: {
      providersTitle: "Провайдеры данных",
      defaultBadge: "по умолчанию",
    },
    "source-collector": source_collectorRu,
    "event-analyzer": event_analyzerRu,
    "digest-exporter": digest_exporterRu,
  },
};

export const modulesEn = {
  modules: {
    common: {
      providersTitle: "Data providers",
      defaultBadge: "default",
    },
    "source-collector": source_collectorEn,
    "event-analyzer": event_analyzerEn,
    "digest-exporter": digest_exporterEn,
  },
};
