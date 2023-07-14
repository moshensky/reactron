import { subWeeks } from 'date-fns'
import { range } from '../../../utils'

export type CalibrationCertificate = {
  id: string
  certificateNumber: string
  isActive: boolean
  measurementDeviations: ReadonlyArray<{
    order: number
    deviation: number
  }>
}

export type TechnicalToolData = {
  calibrationCertificates: ReadonlyArray<{
    id: string
    certificateNumber: string
    isActive: boolean
    measurementDeviations: ReadonlyArray<{
      order: number
      deviation: number
    }>
  }>
}

export type TechnicalToolModel = {
  technicalToolId: string
  description: string
  inventoryNumber: string
  measurementUnitId: string
  isAccredited: boolean
  isActive: boolean
  data: TechnicalToolData
}

export type FetchTechnicalToolsWorkLoadReportPayload = Readonly<{
  fromDate: Date
  toDate: Date
  technicalToolIds: ReadonlyArray<string>
}>

export const workLoadReportingFilter: FetchTechnicalToolsWorkLoadReportPayload = {
  fromDate: subWeeks(new Date(), 1),
  toDate: new Date(),
  technicalToolIds: [],
}

export const technicalTools: ReadonlyArray<TechnicalToolModel> = range(1, 300).map((x) => ({
  technicalToolId: `guid-${x}`,
  description: `desc-${x}`,
  inventoryNumber: `inv-${x}`,
  measurementUnitId: `guid-${(x % 3) + 1}`,
  isAccredited: x % 2 === 0,
  isActive: x % 3 === 0,
  data: {
    calibrationCertificates: [],
  },
}))
