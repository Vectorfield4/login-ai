import { audiences } from "./audiences";
import { casePage } from "./casePage";
import { casesPage } from "./casesPage";
import { contactsPage } from "./contactsPage";
import { home } from "./home";
import { investorsPage } from "./investorsPage";
import { newsPage } from "./newsPage";
import { notFoundPage } from "./notFoundPage";
import { relevants } from "./relevants";
import { servicePage } from "./servicePage";
import { servicesPage } from "./servicesPage";
import { showcase } from "./showcase";
import { solutionPage } from "./solutionPage";
import { solutionsPage } from "./solutionsPage";
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
  solutionsPage,
  casePage,
  investorsPage,
  notFoundPage,
  contactsPage,
  casesPage,
  showcase,
  newsPage,
};

export type RuDict = typeof ru;
