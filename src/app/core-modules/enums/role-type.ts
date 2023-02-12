export enum RoleType {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  SUPERVISOR = 'SUPERVISOR',
  SALES_MAN = 'SALES_MAN',
}
export namespace RoleType {
  export function values() {
    return Object.keys(RoleType).filter(
      (type) => isNaN(type as any) && type !== 'values' && type !== 'enumObject'
    );
  }

  export function enumObject() {
    const enums: {
      key: string;
      value: RoleType | (() => string[]) | (() => any[]);
    }[] = [];
    values().forEach((elem) => {
      enums.push({
        key: elem,
        value: RoleType[elem as keyof typeof RoleType]
      });
    });
    return enums;
  }
}
