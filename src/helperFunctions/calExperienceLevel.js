
function calculateExperienceLevel(joiningDate) {
    const currentDate = new Date();
    const joinDate = new Date(joiningDate);

    const experienceInYears = currentDate.getFullYear() - joinDate.getFullYear();

    const isBeforeJoinDate =
        currentDate.getMonth() < joinDate.getMonth() ||
        (currentDate.getMonth() === joinDate.getMonth() && currentDate.getDate() < joinDate.getDate());

    const adjustedExperience = isBeforeJoinDate ? experienceInYears - 1 : experienceInYears;
    return adjustedExperience;
}

module.exports = calculateExperienceLevel