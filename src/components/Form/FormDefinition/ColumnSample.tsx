import { Card, CardBody } from '../../Card'
import { FormDefinition } from './FormDefinition'
import { LWForm } from './types'

import {
  FetchTechnicalToolsWorkLoadReportPayload,
  TechnicalToolModel,
  workLoadReportingFilter,
} from './data.support.test'
import { requiredValidator } from '../common-validators'

type Props = Readonly<{
  filterModel: FetchTechnicalToolsWorkLoadReportPayload
  technicalTools: ReadonlyArray<TechnicalToolModel>
  onFilter: (model: any) => void
}>

export function ColumnSample({ filterModel, onFilter, technicalTools }: Props) {
  const formDefinition: LWForm<FetchTechnicalToolsWorkLoadReportPayload> = {
    model: filterModel,
    mkEmpty: () => workLoadReportingFilter,
    viewType: 'column',
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
    <Card style={{ minWidth: 500 }}>
      <CardBody>
        <h5>Filter</h5>
        <FormDefinition formDefinition={formDefinition} onSave={onFilter} />
      </CardBody>
    </Card>
  )
}
