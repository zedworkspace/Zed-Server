// import Member from "../models/memberModel";
// import Role from "../models/roleModel";
// import CustomError from "../utils/CustomError";

// export const checkProjectPermission = (requiredPermissions) => {
//     return async (req, res, next) => {
//         const { projectId } = req.params;
//         const userId = req.user.id; // Assuming user is authenticated

//         // Find the user's roles in the project
//         const member = await Member.findOne({ projectId, userId }).populate("roles");
//         if (!member) throw new CustomError("User is not part of this project", 403);

//         // Collect all permissions from assigned roles
//         let userPermissions = [];
//         member.roles.forEach(role => {
//             userPermissions.push(...role.permissions);
//         });

//         // Check if the user has all required permissions
//         const hasPermission = requiredPermissions.every(permission => userPermissions.includes(permission));

//         if (!hasPermission) {
//             return res.status(403).json({ message: "Permission Denied" });
//         }

//         next();
//     };
// };
