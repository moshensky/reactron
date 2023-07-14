import { Button, ConfirmButton } from '../../Buttons'
import { RequiredSymbol } from '../../RequiredSymbol'
import { FieldState, FormApi } from 'final-form'

import { FieldArray } from 'react-final-form-arrays'
import { ArrayFormControl, FormControl, GetFormControl, UnpackArrayType } from './types'
import './array-form-control.css'
import { mdiPlusThick, mdiTrashCanOutline } from '@mdi/js'

const secondaryTDStyle = {
  borderTop: 'none',
  paddingRight: 0,
  paddingLeft: '1rem',
}

const mkFieldName =
  (fieldName: string) =>
  <T, K extends keyof T>({ name }: FormControl<UnpackArrayType<T[K]>>): string =>
    `${fieldName}.${name}`

const hasFieldError = (x?: FieldState<any>): boolean =>
  x !== undefined && x.touched === true && x.valid === false

type Props<T, K extends keyof T> = ArrayFormControl<T, K> &
  Readonly<{
    addRowLabel?: React.ReactNode
    // FIXME
    getFormControl: GetFormControl<any>
    formControlName: string
    form: FormApi
  }>

function renderTableViewType<T, K extends keyof T>({
  form,
  getFormControl,
  formControlName,
  items,
  secondaryItems,
  disableAddingOrDeletingElements,
}: Props<T, K>) {
  const allowAddingOrDeletingElements = disableAddingOrDeletingElements !== true
  return (
    <FieldArray
      name={formControlName}
      render={({ fields }) => (
        <table className="table table-sm">
          <thead>
            <tr>
              {items.map((x) => (
                <th key={`${x.name}.label`} className={x.labelClassName}>
                  {x.label}
                  {x.required && <RequiredSymbol />}
                </th>
              ))}
              {allowAddingOrDeletingElements && <th />}
            </tr>
          </thead>
          <tbody>
            {fields.map((fieldName, idx) => {
              const tValue = fields.value[idx]
              const mkFieldNameC = mkFieldName(fieldName)
              const hasRowErrors =
                items.map(mkFieldNameC).map(form.getFieldState).filter(hasFieldError).length > 0
              return [
                <tr
                  key={fieldName}
                  className={secondaryItems ? (idx % 2 === 0 ? 'odd' : 'even') : undefined}
                >
                  {items.map((x) => {
                    // @ts-ignore FIXME any
                    const x1 = x as any
                    const control = getFormControl(x1, `${fieldName}.`, 'table', false, tValue)
                    const innerFieldName = mkFieldNameC(x)
                    const hasError = hasFieldError(form.getFieldState(innerFieldName))
                    return (
                      <td key={innerFieldName} className="align-bottom">
                        {control}
                        {/* Align all controls by compensating for row errors */}
                        {hasRowErrors && hasError === false && <div>&nbsp;</div>}
                      </td>
                    )
                  })}

                  {allowAddingOrDeletingElements && (
                    <td className="whitespace-nowrap align-bottom text-right">
                      <ConfirmButton
                        outline
                        variant="danger"
                        onClick={() => form.mutators.remove(formControlName, idx)}
                        icon={mdiTrashCanOutline}
                      />
                      {/* Align all controls by compensating for row errors */}
                      {hasRowErrors && <div>&nbsp;</div>}
                    </td>
                  )}
                </tr>,
                secondaryItems && (
                  <tr
                    key={`${fieldName}.secondary`}
                    className={secondaryItems ? (idx % 2 === 0 ? 'odd' : 'even') : undefined}
                  >
                    <td
                      colSpan={items.length + (allowAddingOrDeletingElements ? 1 : 0)}
                      style={secondaryTDStyle}
                    >
                      {secondaryItems.map((x) => {
                        // @ts-ignore FIXME any
                        const x1 = x as any
                        return getFormControl(x1, `${fieldName}.`)
                      })}
                      <br />
                    </td>
                  </tr>
                ),
              ]
            })}
          </tbody>
        </table>
      )}
    />
  )
}

const getGridCols = (x?: number): string => {
  // explicitly state all class names for styles to be generated
  switch (x) {
    case 1:
      return 'grid-cols-1'
    case 2:
      return 'grid-cols-2'
    case 3:
      return 'grid-cols-3'
    case 4:
      return 'grid-cols-4'
    case 5:
      return 'grid-cols-5'
    case 6:
      return 'grid-cols-6'
    case 7:
      return 'grid-cols-7'
    case 8:
      return 'grid-cols-8'
    case 9:
      return 'grid-cols-9'
    case 10:
      return 'grid-cols-10'
    case 11:
      return 'grid-cols-11'
    case 12:
      return 'grid-cols-12'
    default:
      return 'grid-cols-none'
  }
}

// TODO: implement adding, deleting and secondary items functionality
function renderColumnViewType<T, K extends keyof T>({
  form,
  getFormControl,
  formControlName,
  items,
}: Props<T, K>) {
  return (
    <FieldArray
      name={formControlName}
      render={({ fields }) => {
        const gridCols = getGridCols(fields.length)
        return (
          <div className={`grid ${gridCols} gap-3`}>
            {items.map((x) => {
              return fields.map((fieldName, idx) => {
                const tValue = fields.value[idx]
                const mkFieldNameC = mkFieldName(fieldName)
                const hasRowErrors =
                  items.map(mkFieldNameC).map(form.getFieldState).filter(hasFieldError).length > 0
                // @ts-ignore FIXME any
                const x1 = x as any
                const control = getFormControl(x1, `${fieldName}.`, 'column', false, tValue)
                const innerFieldName = mkFieldNameC(x)
                const hasError = hasFieldError(form.getFieldState(innerFieldName))
                return (
                  <div key={innerFieldName}>
                    {control}
                    {/* Align all controls by compensating for row errors */}
                    {hasRowErrors && hasError === false && <div>&nbsp;</div>}
                  </div>
                )
              })
            })}
          </div>
        )
      }}
    />
  )
}

function renderRowViewType() {
  return <div>Not Implemented `row` render type for arrays!</div>
}

export function ArrayFormControl<T, K extends keyof T>(props: Props<T, K>) {
  const { disableAddingOrDeletingElements, viewType, label, form, formControlName, mkEmpty } = props
  const allowAddingOrDeletingElements = disableAddingOrDeletingElements !== true
  const view =
    viewType === 'table'
      ? renderTableViewType(props)
      : viewType === 'column'
      ? renderColumnViewType(props)
      : renderRowViewType()

  return (
    <div key={formControlName} className="lw-array-form-control">
      <div className="flex">
        {label && label}
        {allowAddingOrDeletingElements && (
          <Button
            className="ml-auto mb-1 btn-sm"
            onClick={() => form.mutators.push(formControlName, mkEmpty())}
            variant="secondary"
            label={props.addRowLabel || 'Add row'}
            icon={mdiPlusThick}
            outline
          />
        )}
      </div>

      {view}
    </div>
  )
}
