import { action } from '@storybook/addon-actions'

import { Props, Table } from './Table'

export type CustomerViewModel = {
  id: number
  name: string
  uic: string | null
}

const customerNames: ReadonlyArray<string> = [
  'SIGMA-ALDRICH',
  'FARMA VET LTD',
  'YANGZHOU TIANHE PHARMACEUTICAL CO., LTD',
  'FUJIAN FUKANG PHARMACEUTICAL CO., LTD',
  'NANJING BAIJINGIU PHARMACEUTICALS CO., LTD',
  'САМЕКС ЕООД',
  'ZAHARN ZAVODI AD',
  'ПАРМАШ АД',
  'ФАРМАЦЕВТИЧНИ ЗАВОДИ МИЛВЕ АД',
  'КОДАП ЕООД',
  'МЕГЛЕ БЪЛГАРИЯ ЕООД',
  'БСС ХАНДЕЛ ООД',
  'BULGARIAN YOGHURT LTD',
  'LGC Standards Proficiency Testing',
  'ИЛИЯНА МАТОВА',
  'ЧИПОЛИНО ЕООД',
  'МОНСИ - 52 ЕООД',
  'АУРИМЕТРИЯ ЕООД',
  'ХЕПИ ФУУД 1 ЕООД',
  'СЛАДКА ВЕСТ 5 ЕООД',
  'АРОМЕНА ЕООД',
  'ДЖИ ЕНД ВИ ЕООД',
  'Кауфланд България ЕООД енд КО КД, Филиал 25 (РЦ 4600)',
  'Кауфланд България ЕООД енд КО КД, Филиал 3 (РЦ 1900)',
  'CHEH OOD',
  'СУДАХИМ ЕООД',
  'ShinEtsu',
  'ЛОМСКО ПИВО АД',
  'СЕВЕРЕН ВЕТЕРИНАРЕН ДИЛЪР - СВД ЕООД ',
  'МАКСИТУР АД',
  'ФАВОРИТ СОФИЯ ЕООД',
  'ПЪЗЛ УЕБ ОФИС ЕООД ',
  'ШАТО КГВ ЕООД',
  'МАКСИМУМ 69 ООД',
  'ГЕОРГИ БОРИСЛАВОВ СОФИЯНСКИ',
  'North aegean sea canneries S.A.',
  'ULKER BISKUVI SANAYI AS',
  'Nutracorp Ltd.',
  'HaYa Labs LLC',
  'Gadot Biochemical Ind. Ltd.',
  'ТПК Михалково',
  'ФОРЕЛ ООД',
  'А И Д КОМЕРСИАЛ ЕООД',
  'ВЪЛЧЕВ ООД',
  'ДОБРУДЖАНСКИ ХЛЯБ АД',
  'Шрайбер Фуудс България ЕООД',
  'Енергийна агенция - Пловдив',
]

export const customers: ReadonlyArray<CustomerViewModel> = customerNames.map((name, idx) => ({
  id: idx,
  name,
  uic: `${idx}`,
}))

const baseProps: Props<CustomerViewModel> = {
  type: 'cells',
  thead: (
    <tr>
      <th>Customer</th>
      <th>UIC</th>
    </tr>
  ),
  data: customers,
  getUniqKey: (datum) => `${datum.id}`,
  render: (x) => (
    <>
      <td>{x.name}</td>
      <td>{x.uic}</td>
    </>
  ),
}

export default {
  title: 'common/Table/Table',
  excludeStories: ['CustomerViewModel', 'customers'],
}

export const Default = () => <Table<CustomerViewModel> {...baseProps} />

Default.story = {
  name: 'default',
}

export const OnRowClick = () => (
  <Table<CustomerViewModel>
    {...baseProps}
    onRowSelect={action('on row click')}
    render={(x) => (
      <>
        <td>{x.name}</td>
        <td>{x.uic}</td>
      </>
    )}
  />
)

OnRowClick.story = {
  name: 'on row click',
}

export const Selectable = () => (
  <Table<CustomerViewModel>
    {...baseProps}
    render={(x) => (
      <>
        <td>{x.name}</td>
        <td>{x.uic}</td>
      </>
    )}
    selectable={(x) => x.id === 3}
  />
)

Selectable.story = {
  name: 'selectable',
}

export const PaginationLocal = () => (
  <Table<CustomerViewModel> {...baseProps} pagination={{ type: 'local' }} />
)

PaginationLocal.story = {
  name: 'pagination local',
}

export const PaginationRemote = () => (
  <Table<CustomerViewModel>
    {...baseProps}
    pagination={{
      type: 'remote',
      onGridPagerChange: action('onGridPagerChange'),
      itemsPerPage: 50,
      pageNumber: 3,
      totalItemsCount: 3001,
    }}
  />
)

PaginationRemote.story = {
  name: 'pagination remote',
}

export const RowClass = () => (
  <Table<CustomerViewModel>
    {...baseProps}
    setRowClassName={(x) => (x.id % 2 === 0 ? 'bg-green-500' : 'bg-red-500')}
  />
)

RowClass.story = {
  name: 'row class',
}

export const LoadableLoading = () => (
  <Table<CustomerViewModel> {...baseProps} data={{ status: 'loading' }} />
)

LoadableLoading.story = {
  name: 'loadable loading',
}

export const LoadableUpdating = () => (
  <Table<CustomerViewModel>
    {...baseProps}
    data={{ status: 'updating', item: customers.slice(0, 10) }}
    filter={
      <div>
        <h1>Filter body</h1>
      </div>
    }
  />
)

LoadableUpdating.story = {
  name: 'loadable updating',
}

export const LoadableLoaded = () => (
  <Table<CustomerViewModel> {...baseProps} data={{ status: 'loaded', item: customers }} />
)

LoadableLoaded.story = {
  name: 'loadable loaded',
}

export const LoadableError = () => (
  <Table<CustomerViewModel>
    {...baseProps}
    data={{
      status: 'failure',
      failure: 'failure reasons is some failure',
    }}
  />
)

LoadableError.story = {
  name: 'loadable error',
}
