import { getUpcomingProjects, getProjectDetails, getCategoriesByProjectId } from "../models/projects.js";

const NUMBER_OF_UPCOMING_PROJECTS = 5;

/**
 * Upcoming projects page
 */
const showProjectsPage = async (req,res) => {

    const projects =
        await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);

    res.render("projects",{
        title:"Upcoming Service Projects",
        projects
    });

};

/**
 * Project details page
 */
const showProjectDetailsPage = async (req, res) => {

    const id = req.params.id;

    const project = await getProjectDetails(id);

    if (!project) {

        return res.status(404).render("error", {
            title: "Project Not Found",
            message: "Project not found."
        });

    }

    const categories =
        await getCategoriesByProjectId(id);

    res.render("project", {
        title: project.title,
        project,
        categories
    });

};

export { showProjectsPage, showProjectDetailsPage };