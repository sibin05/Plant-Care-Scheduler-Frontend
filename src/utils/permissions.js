export const USER_ROLES = {
  ADMIN: 'ADMIN',
  PLANT_CARE_SPECIALIST: 'PLANT_CARE_SPECIALIST', 
  PREMIUM_PLANT_OWNER: 'PREMIUM_PLANT_OWNER',
  STANDARD_PLANT_OWNER: 'STANDARD_PLANT_OWNER',
  COMMUNITY_MEMBER: 'COMMUNITY_MEMBER',
  GUEST: 'GUEST'
};

const rolePermissions = {
  ADMIN: ['READ', 'CREATE', 'UPDATE', 'DELETE'],
  PLANT_CARE_SPECIALIST: ['READ', 'CREATE', 'UPDATE'],
  PREMIUM_PLANT_OWNER: ['READ', 'CREATE', 'UPDATE'],
  STANDARD_PLANT_OWNER: ['READ', 'CREATE', 'UPDATE'],
  COMMUNITY_MEMBER: ['READ'],
  GUEST: ['READ']
};

export const hasPermission = (userRole, permission) => {
  const permissions = rolePermissions[userRole] || [];
  return permissions.includes(permission);
};

export const canCreate = (userRole) => hasPermission(userRole, 'CREATE');
export const canUpdate = (userRole) => hasPermission(userRole, 'UPDATE');
export const canDelete = (userRole) => hasPermission(userRole, 'DELETE');
export const isReadOnly = (userRole) => userRole === 'COMMUNITY_MEMBER' || userRole === 'GUEST';