export { servicesEn, servicesRu } from "./i18n";
export { services } from "./model/fixtures";
export { getServiceBySlug, getServices } from "./model/getters";
export { groupServices, SERVICE_GROUP_ORDER } from "./model/groupServices";
export type {
  Service,
  ServiceFeature,
  ServiceGroup,
  SvgIconComponent,
  TechGroup,
  TechItem,
} from "./model/services";
export { ServiceTabList } from "./ui/molecules/ServiceTabList";
export { ServiceCard } from "./ui/organisms/ServiceCard";
export { ServiceSpotlight } from "./ui/organisms/ServiceSpotlight";
export { TechStackSection } from "./ui/organisms/TechStackSection";
