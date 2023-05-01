import * as Errors from "../errors";

const checkPermissions = (
  requestUser: { role: string; userId: string },
  resourceUserId: string
) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;

  throw new Errors.UnauthenticatedError("Not Athorized to access this route");
};

export default checkPermissions;
