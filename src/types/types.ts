export type UXSemanticType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'

export type BackgroundStyle = 'outline' | 'fill'

export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type ActionState = 'active' | 'disabled' | 'none'

export type MessageType = 'success' | 'info' | 'warning' | 'danger'

type SelectOption = Readonly<{
  value: string
  label: React.ReactNode
}>
export type SelectOptions = ReadonlyArray<SelectOption>

export enum GUIDTag {}
// TODO: uncomment. This breaks type inheritance in actions.
// export type Guid = string & GUIDTag
export type Guid = string
export const Guid = {
  of: (value: string) => value as Guid,
}

/**
 * Pagination options
 */
export type Pager = Readonly<{
  /**
   * page number
   */
  page: number
  /**
   * items per page
   */
  count: number
}>

export enum SortDirection {
  Asc = 1,
  Desc = 2,
}

export type SortItem<T extends string> = Readonly<{
  name: T
  direction: SortDirection
}>
