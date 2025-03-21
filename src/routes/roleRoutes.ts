import express, { Router } from "express";
import {
  assignRoleToUser,
  createRole,
  deleteRoles,
  getMemberPermissions,
  getRolesWithMembersByProject,
  getSingleRole,
  removeUserfromRoles,
  updateRole,
} from "../controllers/roleController";
import { userAuth } from "../middlewares/userAuth";

const roleRouter: Router = express.Router();

roleRouter.post("/role/create", createRole);
roleRouter.post("/role/assign", assignRoleToUser);
roleRouter.post("/role/remove", removeUserfromRoles);
// roleRouter.get('/role/project/:projectId',getRolesByProject)
roleRouter.get("/role/:roleId", getSingleRole);
roleRouter.put("/role/update", updateRole);
roleRouter.get("/role/project/:projectId", getRolesWithMembersByProject);
roleRouter.delete("/role/delete", deleteRoles);
roleRouter.get("/role/permissions/:projectId", userAuth, getMemberPermissions);

export default roleRouter;
