export { servicesEn, servicesRu } from "./i18n";
export { services } from "./model/fixtures";
export { getFeaturedServices, getServiceBySlug, getServices } from "./model/getters";
export type {
  ServiceDirectionBucket,
  ServiceGroupBucket,
} from "./model/groupServices";
export {
  groupDirection,
  groupServices,
  groupServicesByDirection,
  isServiceDirection,
  isServiceGroup,
  SERVICE_DIRECTION_GROUPS,
  SERVICE_DIRECTION_ORDER,
  SERVICE_GROUP_DIRECTION,
  SERVICE_GROUP_ORDER,
} from "./model/groupServices";
export type {
  Service,
  ServiceDirection,
  ServiceFeature,
  ServiceGroup,
  SvgIconComponent,
  TechGroup,
  TechItem,
} from "./model/services";
export { ServiceTabList } from "./ui/molecules/ServiceTabList";
export { ServiceCard } from "./ui/organisms/ServiceCard";
export { ServiceGroupCard } from "./ui/organisms/ServiceGroupCard";
export { ServiceSpotlight } from "./ui/organisms/ServiceSpotlight";
export { TechStackSection } from "./ui/organisms/TechStackSection";
