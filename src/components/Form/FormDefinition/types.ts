import { RichText, SelectOptions } from '../../../types'
import { ErrorMessage, Validator } from '../validate'
import { FormApi } from 'final-form'

export type TextFieldVariant = 'text' | 'multiline' | 'password' | 'number'

export type IdWithName = Readonly<{
  id: number | string
  name: string
}>

export type IdWithLabel = Readonly<{
  id: string
  label: string
}>

export type LabelWithValue = Readonly<{
  label: string
  value: string | number
  disabled?: boolean
}>

export type ViewType = 'table' | 'column' | 'row'

export type UnpackArrayType<T> = T extends ReadonlyArray<infer U> ? U : never

export type LWFormItemValidate<T, K extends keyof T> = Readonly<{
  errorMsg: ErrorMessage
  validator: (value: T[K], model: T) => boolean
}>

export type CommonFormItem<T, K extends keyof T> = Readonly<{
  name: K
  label: React.ReactNode
  required?: boolean
  validate?: LWFormItemValidate<T, K> | Validator
  className?: string
  style?: React.CSSProperties
  labelClassName?: string
  readonly?: boolean
}>

export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T

export type NestedFormControl<T, K extends keyof T> = Readonly<{
  type: 'Nested'
  // name: K
  // label?: React.ReactNode
  // FIXME: type!
  items: ReadonlyArray<FormControl<any>>
}> &
  CommonFormItem<T, K>

export type ArrayFormControl<T, K extends keyof T> = Readonly<{
  type: 'Array'
  viewType: ViewType
  mkEmpty: () => UnpackArrayType<T[K]>
  // TODO: when static is set, mkEmpty does not make sense
  disableAddingOrDeletingElements?: boolean
  items: ReadonlyArray<FormControl<UnpackArrayType<T[K]>>>
  secondaryItems?: ReadonlyArray<FormControl<UnpackArrayType<T[K]>>>
}> &
  CommonFormItem<T, K>

export type CustomRenderFormControl<T> = Readonly<{
  type: 'CustomRender'
  render: (t: T) => React.ReactNode
}> &
  CommonFormItem<T, keyof T>

export type PasswordField<T> = Readonly<{
  type: 'PasswordField'
  confirmLabel: React.ReactNode
}> &
  CommonFormItem<T, keyof T>

export type TextFieldFormControl<T> = Readonly<{
  type: 'TextField'
  inputClassName?: string
  variant?: TextFieldVariant
}> &
  CommonFormItem<T, keyof T>

export type RichTextFieldFormControl<T> = Readonly<{
  type: 'RichTextField'
  disableRichText?: boolean
  singleLine?: boolean
  suggestions?: (t: T) => RichText[]
  help?: React.ReactNode
}> &
  CommonFormItem<T, keyof T>

export type DateFieldFormControl<T> = Readonly<{
  type: 'DateField'
  wrapperClassName?: string
}> &
  CommonFormItem<T, keyof T>

export type DateTimeFieldFormControl<T> = Readonly<{
  type: 'DateTimeField'
  wrapperClassName?: string
  timeCaption: string
}> &
  CommonFormItem<T, keyof T>

export type MultiSelectFormControl<T> = Readonly<{
  type: 'MultiSelect'
  options: Array<IdWithLabel>
}> &
  CommonFormItem<T, keyof T>

export type TagsSelectFormControl<T> = Readonly<{
  type: 'TagsSelect'
  options: ReadonlyArray<string>
}> &
  CommonFormItem<T, keyof T>

export type SelectFormControl<T> = Readonly<{
  type: 'Select'
  options: SelectOptions
}> &
  CommonFormItem<T, keyof T>

export type VirtualizedSelectFormControl<T> = Readonly<{
  type: 'VirtualizedSelect'
  options: ReadonlyArray<IdWithName>
  clearable?: boolean
}> &
  CommonFormItem<T, keyof T>

export type VirtualizedMultiSelect<T> = Readonly<{
  type: 'VirtualizedMultiSelect'
  options: ReadonlyArray<IdWithName>
}> &
  CommonFormItem<T, keyof T>

export type BoolFormControl<T> = Readonly<{
  type: 'Bool'
}> &
  CommonFormItem<T, keyof T>

export type BoolWithAllFormControl<T> = Readonly<{
  type: 'BoolWithAll'
}> &
  CommonFormItem<T, keyof T>

export type RadioGroupFormControl<T> = Readonly<{
  type: 'RadioGroup'
  options: ReadonlyArray<LabelWithValue>
}> &
  CommonFormItem<T, keyof T>

export type FormControl<T> =
  | CustomRenderFormControl<T>
  | DateFieldFormControl<T>
  | DateTimeFieldFormControl<T>
  | TextFieldFormControl<T>
  | RichTextFieldFormControl<T>
  | PasswordField<T>
  | MultiSelectFormControl<T>
  | TagsSelectFormControl<T>
  | SelectFormControl<T>
  | VirtualizedSelectFormControl<T>
  | VirtualizedMultiSelect<T>
  | BoolFormControl<T>
  | BoolWithAllFormControl<T>
  | ArrayFormControl<T, keyof T>
  | NestedFormControl<T, keyof T>
  | RadioGroupFormControl<T>

export const FormControl = {
  isArrayFormControl<T>(f: FormControl<T>): f is ArrayFormControl<T, keyof T> {
    return f.type === 'Array'
  },
  isNestedType<T>(f: FormControl<T>): f is NestedFormControl<T, keyof T> {
    return f.type === 'Nested'
  },
}

export type RenderButtons = (
  args: Readonly<{
    // FIXME: any
    form: FormApi<any>
    submitting: boolean
    pristine: boolean
  }>,
) => React.ReactNode

export type LWForm<T> = Readonly<{
  model?: Partial<T>
  mkEmpty: () => DeepPartial<T>
  items: ReadonlyArray<FormControl<T>>
  viewType: ViewType
  renderButtons?: RenderButtons
}>

export type GetFormControl<T> = (
  item: FormControl<T>,
  namePrefix?: string,
  viewType?: ViewType,
  addKey?: boolean,
  tValue?: T,
) => React.ReactNode
