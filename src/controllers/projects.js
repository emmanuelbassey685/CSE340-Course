import { getUpcomingProjects, getProjectDetails } from "../models/projects.js";

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
    try {
        const id = req.params.id;

        const project = await getProjectDetails(id);

        if (!project) {
            return res.status(404).send("Project not found");
        }

        res.render("project", {
            title: project.title,
            project
        });

    } catch (error) {
        console.error("Project Details Error:", error);
        res.status(500).send(error.message);
    }
};

export { showProjectsPage, showProjectDetailsPage };