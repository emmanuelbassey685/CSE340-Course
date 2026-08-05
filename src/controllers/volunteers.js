import { addVolunteer, removeVolunteer } from "../models/volunteers.js";

/**
 * Add the logged-in user as a volunteer
 */
const volunteerForProject = async (req, res) => {
    try {
        const userId = req.session.user.user_id;
        const projectId = req.params.id;

        await addVolunteer(userId, projectId);

        req.flash("success", "You have successfully volunteered for this project.");

        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error("Volunteer Error:", error);

        req.flash("error", "Unable to volunteer for this project.");

        res.redirect(`/project/${req.params.id}`);
    }
};

/**
 * Remove the logged-in user as a volunteer
 */
const removeVolunteerFromProject = async (req, res) => {
    try {
        const userId = req.session.user.user_id;
        const projectId = req.params.id;

        await removeVolunteer(userId, projectId);

        req.flash("success", "You have been removed as a volunteer.");

        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error("Remove Volunteer Error:", error);

        req.flash("error", "Unable to remove volunteer.");

        res.redirect(`/project/${req.params.id}`);
    }
};

export { volunteerForProject, removeVolunteerFromProject };