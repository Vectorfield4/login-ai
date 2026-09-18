import { audiences } from "./audiences";
import { casePage } from "./casePage";
import { casesPage } from "./casesPage";
import { contactsPage } from "./contactsPage";
import { home } from "./home";
import { investorsPage } from "./investorsPage";
import { relevants } from "./relevants";
import { servicePage } from "./servicePage";
import { servicesPage } from "./servicesPage";
import { showcase } from "./showcase";
import { solutionPage } from "./solutionPage";
import { technologies } from "./technologies";
import { ui } from "./ui";

export const ru = {
  ui,
  home,
  audiences,
  technologies,
  relevants,
  servicesPage,
  servicePage,
  solutionPage,
  casePage,
  investorsPage,
  contactsPage,
  casesPage,
  showcase,
};

export type RuDict = typeof ru;
