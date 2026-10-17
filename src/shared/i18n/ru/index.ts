import { audiences } from "./audiences";
import { calculator } from "./calculator";
import { casePage } from "./casePage";
import { casesPage } from "./casesPage";
import { contactsPage } from "./contactsPage";
import { home } from "./home";
import { investorsPage } from "./investorsPage";
import { newsPage } from "./newsPage";
import { notFoundPage } from "./notFoundPage";
import { pricing } from "./pricing";
import { relevants } from "./relevants";
import { servicePage } from "./servicePage";
import { servicesGroups } from "./servicesGroups";
import { servicesPage } from "./servicesPage";
import { showcase } from "./showcase";
import { solutionPage } from "./solutionPage";
import { solutionsPage } from "./solutionsPage";
import { teamPage } from "./teamPage";
import { ui } from "./ui";

export const ru = {
  ui,
  home,
  audiences,
  relevants,
  servicesPage,
  servicesGroups,
  servicePage,
  solutionPage,
  solutionsPage,
  casePage,
  investorsPage,
  notFoundPage,
  contactsPage,
  casesPage,
  showcase,
  newsPage,
  teamPage,
  pricing,
  calculator,
};

export type RuDict = typeof ru;
