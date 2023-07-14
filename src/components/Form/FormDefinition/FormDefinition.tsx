import { Bool } from '../Bool'
import { BoolWithAll } from '../BoolWithAll'
import { DateField, DateTimeField } from '../DateTimeFields'
import { MultiSelect } from '../MultiSelect'
import { RadioGroup } from '../RadioGroup'
import { RichTextField } from '../RichTextField'
import { TagsSelect } from '../TagsSelect'
import { TextField } from '../TextField'
import { VirtualizedSelect } from '../VirtualizedSelect'
import { FormApi } from 'final-form'
import arrayMutators from 'final-form-arrays'
import { isNil, not } from '../../utils'
import React from 'react'
import { Form } from 'react-final-form'
import { ArrayFormControl } from './ArrayFormControl'
import { FormControl, IdWithName, LWForm, LWFormItemValidate, ViewType } from './types'
import { SelectField } from '../SelectField'
import { mdiContentSaveOutline, mdiPlusThick } from '@mdi/js'
import { ArrayValidations, validate, Validator } from '../validate'
import { Button } from '../../Buttons'

const itemToString = (item: IdWithName | null) => {
  return item ? item.name : ''
}

export function renderForm(form: FormApi) {
  return function getFormControl<T>(
    item: FormControl<T>,
    namePrefix = '',
    viewType: ViewType = 'column',
    addKey = true,
    tValue: T | undefined = undefined,
  ): React.ReactNode {
    // todo: use labelClassName
    const { label, name, required, className, readonly, style } = item
    const formControlName = `${namePrefix}${name}`
    switch (item.type) {
      case 'CustomRender': {
        const { render } = item
        return tValue ? render(tValue) : null
      }
      case 'DateTimeField': {
        const { timeCaption, wrapperClassName } = item
        return (
          <DateTimeField
            key={addKey ? formControlName : undefined}
            name={formControlName}
            label={viewType === 'column' ? label : undefined}
            required={required}
            wrapperClassName={wrapperClassName}
            className={className}
            disabled={readonly}
            timeCaption={timeCaption}
          />
        )
      }
      case 'DateField': {
        const { wrapperClassName } = item
        return (
          <DateField
            key={addKey ? formControlName : undefined}
            name={formControlName}
            label={viewType === 'column' ? label : undefined}
            required={required}
            wrapperClassName={wrapperClassName}
            className={className}
            disabled={readonly}
          />
        )
      }
      case 'TextField': {
        const { variant, inputClassName } = item
        return (
          <TextField
            key={addKey ? formControlName : undefined}
            name={formControlName}
            label={viewType === 'column' ? label : undefined}
            required={required}
            className={className}
            inputClassName={inputClassName}
            variant={variant}
            disabled={readonly}
          />
        )
      }
      case 'RichTextField': {
        const { disableRichText, singleLine, suggestions, help } = item
        return (
          <RichTextField
            key={addKey ? formControlName : undefined}
            name={formControlName}
            label={viewType === 'column' ? label : undefined}
            required={required}
            className={className}
            disabled={readonly}
            disableRichText={disableRichText}
            singleLine={singleLine}
            suggestions={suggestions && tValue ? suggestions(tValue) : undefined}
            help={help}
          />
        )
      }
      case 'PasswordField': {
        const { confirmLabel } = item
        return (
          <React.Fragment key={addKey ? formControlName : undefined}>
            <TextField
              name={formControlName}
              label={viewType === 'column' ? label : undefined}
              required={required}
              className={className}
              variant="password"
              disabled={readonly}
              autocomplete="new-password"
            />
            <TextField
              name={`${formControlName}_confirm`}
              label={viewType === 'column' ? confirmLabel : undefined}
              required={required}
              className={className}
              variant="password"
              disabled={readonly}
              autocomplete="new-password"
            />
          </React.Fragment>
        )
      }
      case 'MultiSelect': {
        const { options } = item
        return (
          <MultiSelect
            key={addKey ? formControlName : undefined}
            name={formControlName}
            label={viewType === 'column' ? label : undefined}
            required={required}
            style={style}
            options={options}
            className={className}
            disabled={readonly}
          />
        )
      }
      case 'TagsSelect': {
        const { options } = item
        return (
          <TagsSelect
            key={addKey ? formControlName : undefined}
            name={formControlName}
            label={viewType === 'column' ? label : undefined}
            required={required}
            style={style}
            options={options}
            className={className}
            disabled={readonly}
          />
        )
      }
      case 'Select': {
        const { options } = item
        return (
          <SelectField
            key={addKey ? formControlName : undefined}
            name={formControlName}
            label={viewType === 'column' ? label : undefined}
            required={required}
            style={style}
            options={options}
            className={className}
            disabled={readonly}
          />
        )
      }
      case 'VirtualizedMultiSelect': {
        const { options } = item
        return (
          <VirtualizedSelect<IdWithName>
            key={addKey ? formControlName : undefined}
            name={formControlName}
            label={viewType === 'column' ? label : undefined}
            required={required}
            style={style}
            options={options}
            keyName="id"
            notClearable
            className={className}
            multiselect
            disabled={readonly}
            itemToString={itemToString}
          />
        )
      }
      case 'VirtualizedSelect': {
        const { options, clearable } = item
        return (
          <VirtualizedSelect<IdWithName>
            key={addKey ? formControlName : undefined}
            name={formControlName}
            label={viewType === 'column' ? label : undefined}
            required={required}
            style={style}
            options={options}
            keyName="id"
            notClearable={not(clearable)}
            className={className}
            disabled={readonly}
            itemToString={itemToString}
          />
        )
      }
      case 'Bool': {
        return (
          <Bool
            key={addKey ? formControlName : undefined}
            name={formControlName}
            label={viewType === 'column' ? label : undefined}
            required={required}
            className={className}
            disabled={readonly}
          />
        )
      }
      case 'BoolWithAll': {
        return (
          <BoolWithAll
            key={addKey ? formControlName : undefined}
            name={formControlName}
            label={viewType === 'column' ? label : undefined}
            required={required}
            className={className}
            disabled={readonly}
          />
        )
      }
      case 'Nested': {
        const { items } = item
        return items.map((x) => getFormControl(x, `${name}.`, 'column', true, tValue))
      }
      case 'Array': {
        return (
          <ArrayFormControl
            key={formControlName}
            {...item}
            form={form}
            getFormControl={getFormControl}
            formControlName={formControlName}
          />
        )
      }
      case 'RadioGroup': {
        const { options } = item
        return (
          <RadioGroup
            key={addKey ? formControlName : undefined}
            name={formControlName}
            label={viewType === 'column' ? label : undefined}
            required={required}
            style={style}
            options={options}
            className={className}
            disabled={readonly}
          />
        )
      }
    }
  }
}

function isValidator<T>(
  validator: LWFormItemValidate<T, keyof T> | Validator,
): validator is Validator {
  return Array.isArray(validator)
}

function toFieldValidator<T>(item: FormControl<T>): Validator {
  // FIXME
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const validator = item.validate!
  return isValidator(validator)
    ? validator
    : [[`${item.name}`], validator.errorMsg, validator.validator]
}

function toValidations<T>(items: ReadonlyArray<FormControl<T>>) {
  return items.map(toFieldValidator)
}

type Props<T> = Readonly<{
  createLabel?: React.ReactNode
  saveLabel?: React.ReactNode
  disablePristine?: boolean
  formDefinition: LWForm<T>
  onSave: (model: T, isNew: boolean) => void
  render?: (
    args: Readonly<{
      formControls: ReadonlyArray<{
        control: FormControl<T>
        node: React.ReactNode
      }>
      form: FormApi<any>
      submitting: boolean
      pristine: boolean
    }>,
  ) => React.ReactNode
}>

export function FormDefinition<T>({
  createLabel,
  saveLabel,
  disablePristine,
  formDefinition,
  render,
  onSave,
}: Props<T>) {
  const { items, renderButtons, viewType, model, mkEmpty } = formDefinition
  const isNew = isNil(model)

  const validations: ReadonlyArray<Validator> = toValidations(
    items.filter(
      (x) =>
        x.validate !== undefined &&
        not(FormControl.isArrayFormControl(x)) &&
        not(FormControl.isNestedType(x)),
    ),
  )

  const nestedItems: ReadonlyArray<Validator> = items
    .map((x) => (FormControl.isNestedType(x) ? x.items : []))
    .reduce((acc, val) => [...acc, ...val], [])
    .filter((y) => y.validate !== undefined)
    // FIXME
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .map((x) => x.validate! as Validator)

  const nestedValidations: ReadonlyArray<Validator> = toValidations(
    items.filter((x) => x.validate !== undefined && FormControl.isNestedType(x)),
  )
  const arrayValidations: ArrayValidations = items
    .filter(FormControl.isArrayFormControl)
    .map((x) => {
      const primaryItemsValidation: ArrayValidations = [
        {
          pathToArray: [`${x.name}`],
          validations: toValidations(x.items.filter((y) => y.validate !== undefined)),
        },
      ]

      // TODO: build all validations recursively
      if (x.secondaryItems && x.secondaryItems.length === 1) {
        const firstSecondaryItem = x.secondaryItems[0]
        if (firstSecondaryItem.type === 'Array') {
          const secondaryItemsValidation: ArrayValidations = [
            {
              pathToArray: [`${x.name}`, '*', `${firstSecondaryItem.name}`],
              validations: toValidations(
                firstSecondaryItem.items.filter((y) => y.validate !== undefined),
              ),
            },
          ]

          return [primaryItemsValidation, secondaryItemsValidation]
        }
      }

      return [primaryItemsValidation]
    })
    .reduce((acc: ArrayValidations, x) => acc.concat(...x), [])

  return (
    <Form
      onSubmit={(values: any) =>
        onSave(
          {
            ...values,
          },
          isNew,
        )
      }
      initialValues={model ? Object.assign({}, model) : mkEmpty()}
      validate={validate([...validations, ...nestedValidations, ...nestedItems], arrayValidations)}
      // FIXME enable only when there is an `Array` field type
      mutators={{ ...arrayMutators }}
      render={({ handleSubmit, submitting, pristine, form }) => {
        const getFormControl = renderForm(form)

        return render ? (
          <form onSubmit={handleSubmit} noValidate>
            {render({
              formControls: items.map((x) => ({ control: x, node: getFormControl(x) })),
              form,
              submitting,
              pristine,
            })}
          </form>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className={viewType === 'row' ? 'lw-form-row' : 'flex flex-col'}
          >
            {items.map((x) => getFormControl(x))}
            {renderButtons ? (
              <div className="ml-3 flex self-end mb-4">
                {renderButtons({ form, submitting, pristine })}
              </div>
            ) : (
              <Button
                className={viewType === 'row' ? 'ml-3 mb-4 self-end' : 'ml-auto'}
                type="submit"
                disabled={submitting || disablePristine ? false : pristine}
                variant="success"
                label={isNew ? createLabel || 'Create' : saveLabel || 'Save'}
                icon={isNew ? mdiPlusThick : mdiContentSaveOutline}
              />
            )}
          </form>
        )
      }}
    />
  )
}
