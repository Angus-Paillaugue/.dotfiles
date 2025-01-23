export interface Role {
  name: string;
  description: string;
}

export const ROLES = {
	ADMIN: "admin",
	GUEST: "guest",
  OWNER: "owner"
};

export const PERMISSIONS = {
  READ_OTHER_ACCOUNTS: "read:other_accounts",
  CREATE_OTHER_ACCOUNTS: "create:other_accounts",
  UPDATE_OTHER_ACCOUNTS: "update:other_accounts",
  DELETE_OTHER_ACCOUNTS: "delete:other_accounts",


	READ_LOG: "read:log",
	DELETE_LOG: "delete:log",

  READ_SERVER: "read:server",
	CREATE_SERVER: "create:server",
	UPDATE_SERVER: "update:server",
	DELETE_SERVER: "delete:server",
};

const rolePermissions = {
  [ROLES.OWNER]: [
    PERMISSIONS.READ_OTHER_ACCOUNTS,
    PERMISSIONS.CREATE_OTHER_ACCOUNTS,
    PERMISSIONS.UPDATE_OTHER_ACCOUNTS,
    PERMISSIONS.DELETE_OTHER_ACCOUNTS,
    PERMISSIONS.READ_LOG,
    PERMISSIONS.DELETE_LOG,
    PERMISSIONS.READ_SERVER,
    PERMISSIONS.CREATE_SERVER,
    PERMISSIONS.UPDATE_SERVER,
    PERMISSIONS.DELETE_SERVER,
  ],
	[ROLES.ADMIN]: [
		PERMISSIONS.READ_OTHER_ACCOUNTS,
    PERMISSIONS.CREATE_OTHER_ACCOUNTS,
    PERMISSIONS.UPDATE_OTHER_ACCOUNTS,
    PERMISSIONS.DELETE_OTHER_ACCOUNTS,
    PERMISSIONS.READ_LOG,
    PERMISSIONS.DELETE_LOG,
    PERMISSIONS.READ_SERVER,
    PERMISSIONS.CREATE_SERVER,
    PERMISSIONS.UPDATE_SERVER,
    PERMISSIONS.DELETE_SERVER,
	],
	[ROLES.GUEST]: [
    PERMISSIONS.READ_SERVER,
    PERMISSIONS.READ_LOG,
  ],
};



export function hasPermission(role: string | undefined, ...permissions: string[]): boolean {
  if (!role) {
    return false;
  }
  if (!rolePermissions[role]) {
    return false;
  }
  return permissions.every((permission) => rolePermissions[role].includes(permission));
}
