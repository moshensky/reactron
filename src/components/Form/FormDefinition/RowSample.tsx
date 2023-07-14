import { LWForm } from './types'
import { FormDefinition } from './FormDefinition'
import { requiredValidator } from '../common-validators'
import { Button } from '../../Buttons'
import { Card, CardBody } from '../../Card'
import React from 'react'
import { mdiClose, mdiMagnify } from '@mdi/js'
import {
  FetchTechnicalToolsWorkLoadReportPayload,
  TechnicalToolModel,
  workLoadReportingFilter,
} from './data.support.test'

type Props = Readonly<{
  filterModel: FetchTechnicalToolsWorkLoadReportPayload
  technicalTools: ReadonlyArray<TechnicalToolModel>
  onFilter: (model: any) => void
  onResetFilter: () => void
}>

export function RowSample({ filterModel, onFilter, technicalTools, onResetFilter }: Props) {
  const formDefinition: LWForm<FetchTechnicalToolsWorkLoadReportPayload> = {
    model: filterModel,
    mkEmpty: () => workLoadReportingFilter,
    viewType: 'row',
    renderButtons: () => (
      <>
        <Button
          type="reset"
          outline
          onClick={onResetFilter}
          variant="secondary"
          label="Reset filters"
          icon={mdiClose}
        />
        <Button type="submit" className="ml-1" variant="primary" label="Filter" icon={mdiMagnify} />
      </>
    ),
    items: [
      {
        name: 'fromDate',
        type: 'DateField',
        label: 'From Date',
        required: true,
        validate: requiredValidator(),
      },
      {
        name: 'toDate',
        type: 'TextField',
        label: 'To Date',
        required: true,
        validate: requiredValidator(),
      },
      {
        name: 'technicalToolIds',
        type: 'VirtualizedMultiSelect',
        label: 'Technical tools',
        required: true,
        options: technicalTools.map((x) => ({
          id: x.technicalToolId,
          name: x.description,
        })),
        validate: requiredValidator(),
      },
    ],
  }

  return (
    <Card>
      <CardBody>
        <h5>Filter</h5>
        <FormDefinition formDefinition={formDefinition} onSave={onFilter} />
      </CardBody>
    </Card>
  )
}
