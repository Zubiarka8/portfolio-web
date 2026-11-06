import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/pages/ProjectPage";
import { routes } from "@/data/navigation";
import { getProject, projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/proyectos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    locale: "es",
    title: `${project.name}: ${project.category.es}`,
    description: project.summary.es,
    paths: { es: routes.project("es", slug), en: routes.project("en", slug) },
  });
}

export default async function Page({ params }: PageProps<"/proyectos/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <ProjectPage project={project} locale="es" />;
}
