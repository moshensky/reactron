import { RichText } from '../../../types'
import { action } from '@storybook/addon-actions'

import { ColumnSample } from './ColumnSample'
import { RowSample } from './RowSample'
import { UpdateCalibrationCertificatesForm } from './UpdateCalibrationCertificatesForm'
import { LWForm, LabelWithValue } from './types'
import { passwordValidator, requiredValidator } from '../common-validators'
import { FormDefinition } from './FormDefinition'
import { range } from '../../../utils'
import { MultiselectOptions } from '../../MultiSelect'
import {
  CalibrationCertificate,
  technicalTools,
  workLoadReportingFilter,
} from './data.support.test'

const calibrationCertificates: ReadonlyArray<CalibrationCertificate> = range(1, 4).map((x) => ({
  id: `guid-${x}`,
  certificateNumber: `cert-${x}`,
  isActive: x % 3 === 0,
  measurementDeviations: [
    {
      deviation: 10,
      order: 20,
    },
  ],
}))

const idWithNames: ReadonlyArray<LabelWithValue> = [
  { value: 7, label: 'seven' },
  { value: 8, label: 'eight' },
  { value: 9, label: 'nine' },
]

export default {
  title: 'common/Form/FormDefinition',
}

export const Row = () => (
  <RowSample
    onFilter={action('on save')}
    technicalTools={technicalTools}
    filterModel={{
      ...workLoadReportingFilter,
      fromDate: new Date('2011-11-29T10:34:44Z'),
      toDate: new Date('2011-11-29T14:34:44Z'),
    }}
    onResetFilter={action('onResetFilter')}
  />
)

export const Column = () => (
  <ColumnSample
    onFilter={action('on save')}
    technicalTools={technicalTools}
    filterModel={{
      ...workLoadReportingFilter,
      fromDate: new Date('2011-11-29T10:34:44Z'),
      toDate: new Date('2011-11-29T14:34:44Z'),
    }}
  />
)

export const ArrayInArrayUpdateCalibrationCertificatesEmptyState = () => (
  <UpdateCalibrationCertificatesForm
    onSave={action('on save')}
    technicalToolData={{
      calibrationCertificates: [],
    }}
  />
)

ArrayInArrayUpdateCalibrationCertificatesEmptyState.story = {
  name: 'Array in array update calibration certificates empty state',
}

export const UpdateCalibrationCertificatesNonEmptyState = () => (
  <UpdateCalibrationCertificatesForm
    onSave={action('on save')}
    technicalToolData={{ calibrationCertificates }}
  />
)

UpdateCalibrationCertificatesNonEmptyState.story = {
  name: 'update calibration certificates non empty state',
}

export const RadioGroup = () => {
  const formDefinition: LWForm<{ someTestId: number }> = {
    viewType: 'column',
    mkEmpty: () => ({}),
    items: [
      {
        name: 'someTestId',
        type: 'RadioGroup',
        label: 'Test label',
        options: idWithNames,
        required: true,
        validate: requiredValidator(),
      },
    ],
  }
  return <FormDefinition formDefinition={formDefinition} onSave={action('onSave')} />
}

RadioGroup.story = {
  name: 'RadioGroup',
}

export const RadioGroupWithInitValue = () => {
  const formDefinition: LWForm<{ someTestId: number }> = {
    viewType: 'column',
    model: { someTestId: 8 },
    mkEmpty: () => ({}),
    items: [
      {
        name: 'someTestId',
        type: 'RadioGroup',
        label: 'Test label',
        options: idWithNames,
        required: true,
        validate: requiredValidator(),
      },
    ],
  }
  return <FormDefinition formDefinition={formDefinition} onSave={action('onSave')} />
}

RadioGroupWithInitValue.story = {
  name: 'RadioGroup with init value',
}

export const PasswordField = () => {
  const passwordFormDefinition: LWForm<{ password: string }> = {
    viewType: 'column',
    mkEmpty: () => ({}),
    items: [
      {
        name: 'password',
        type: 'PasswordField',
        label: 'New Password',
        confirmLabel: 'Confirm Password',
        required: true,
        validate: passwordValidator(),
      },
    ],
  }
  return <FormDefinition formDefinition={passwordFormDefinition} onSave={action('onSave')} />
}

PasswordField.story = {
  name: 'PasswordField',
}

export const MultiSelect = () => {
  const selected: MultiselectOptions = ['second'].map((x) => ({
    id: `id_${x}`,
    label: x,
  }))
  const options: MultiselectOptions = ['first', 'second', 'third'].map((x) => ({
    id: `id_${x}`,
    label: x,
  }))
  const formDefinition: LWForm<{ tags: MultiselectOptions }> = {
    model: { tags: selected },
    viewType: 'column',
    mkEmpty: () => ({}),
    items: [
      {
        name: 'tags',
        type: 'MultiSelect',
        options,
        label: 'Tags',
        required: true,
      },
    ],
  }
  return <FormDefinition formDefinition={formDefinition} onSave={action('onSave')} />
}

MultiSelect.story = {
  name: 'MultiSelect',
}

export const TagsSelect = () => {
  const formDefinition: LWForm<{ tags: string[] }> = {
    model: { tags: ['second'] },
    viewType: 'column',
    mkEmpty: () => ({}),
    items: [
      {
        name: 'tags',
        type: 'TagsSelect',
        options: ['first', 'second', 'third'],
        label: 'Tags',
        required: true,
      },
    ],
  }
  return <FormDefinition formDefinition={formDefinition} onSave={action('onSave')} />
}

TagsSelect.story = {
  name: 'TagsSelect',
}

export const _RichText = () => {
  const formDefinition: LWForm<{ sampleRichText: RichText }> = {
    model: { sampleRichText: [] },
    viewType: 'column',
    mkEmpty: () => ({}),
    items: [
      {
        name: 'sampleRichText',
        type: 'RichTextField',
        label: 'Enter sample rich text',
        required: true,
      },
    ],
  }
  return <FormDefinition formDefinition={formDefinition} onSave={action('onSave')} />
}

_RichText.story = {
  name: 'RichText',
}
