// src/constants/sidebarConfig.js

import {
  LayoutDashboard,
  Settings,
  Upload,
  Globe,
  FileText,
  Users,
  MessageSquare,
  Languages,
  MapPinned,
  FileSpreadsheet,
  BookOpen,
} from "lucide-react";

export const sidebarConfig = [
  {
    section: "Main",
    items: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Site Configuration",
        path: "/site-configuration",
        icon: Settings,
      },
      {
        title: "Publish",
        path: "/publish",
        icon: Upload,
      },
      {
        title: "Multiple Publish",
        path: "/multiple-publish",
        icon: FileSpreadsheet,
      },
      {
        title: "Site Region",
        path: "/site-region",
        icon: MapPinned,
      },
      {
        title: "Language",
        path: "/language",
        icon: Languages,
      },
    ],
  },
  {
    section: "Content",
    items: [
      {
        title: "Blogs",
        path: "/blogs",
        icon: FileText,
      },
      {
        title: "Blog Comments",
        path: "/blog-comments",
        icon: MessageSquare,
      },
      {
        title: "Manage Authors",
        path: "/authors",
        icon: Users,
      },
      {
  title: "Glossary",
  path: "/glossary",
  icon: BookOpen,
}
    ],
  },
];