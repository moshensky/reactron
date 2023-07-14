import cn from 'classnames'
import { calcMaxPageNumber, capPageNumber, Pagination } from '../Pagination'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/function'

import { Loadable, Pager } from '../../types'
import { Alert } from '../Alerts'
import { TableContainer } from './TableContainer'
import { TableHead } from './TableHead'
import { TableBody } from './TableBody'

export type RemotePagination = Readonly<{
  type: 'remote'
  pageNumber: number
  itemsPerPage: number
  totalItemsCount: number
  onGridPagerChange: (gridPager: Pager) => void
}>

export type LocalPagination = Readonly<{
  type: 'local'
  defaultPage?: number
}>

type Pagination = RemotePagination | LocalPagination

export type Cells<T> = Readonly<{
  type: 'cells'
  setRowClassName?: (datum: T) => string | undefined
  selectable?: (datum: T) => boolean
  onRowSelect?: (datum: T) => void
}>

export type Row = Readonly<{
  type: 'row'
}>

export type Props<T> = Readonly<{
  loadingDataError?: React.ReactNode
  className?: string
  filter?: React.ReactNode
  thead: React.ReactNode
  data: Loadable<ReadonlyArray<T>, React.ReactNode> | ReadonlyArray<T>
  getUniqKey: (datum: T) => string
  pagination?: Pagination
  render: (datum: T, idx: number) => React.ReactNode
}> &
  (Cells<T> | Row)

const isDefined = (value: any) => !!value

function isLoadable<T>(
  data: Loadable<ReadonlyArray<T>, any> | ReadonlyArray<T>,
): data is Loadable<ReadonlyArray<T>, any> {
  return (data as Loadable<ReadonlyArray<T>, any>).status !== undefined
}

function calcVisibleData<T>(data: ReadonlyArray<T>, itemsPerPage: number, pageNumber: number) {
  const start = itemsPerPage * (pageNumber - 1)
  const end = start + itemsPerPage

  return data.slice(start, end)
}

function getData<T>(data: Loadable<ReadonlyArray<T>, any> | ReadonlyArray<T>): ReadonlyArray<T> {
  return isLoadable(data) ? (Loadable.isLoadedOrUpdating(data) ? data.item : []) : data
}

type LocalPaginationState = Readonly<{
  type: 'local'
  pageNumber: number
  itemsPerPage: number
  totalItemsCount: number
}>

type State =
  | Readonly<{
      type: 'remote'
    }>
  | LocalPaginationState

function initState<T>(props: Props<T>): State {
  const itemsPerPage = 25
  const data = getData(props.data)

  return props.pagination && props.pagination.type === 'local'
    ? {
        type: 'local',
        pageNumber: pipe(
          O.fromNullable(props.pagination),
          O.chain((x) => O.fromNullable(x.defaultPage)),
          O.map((x) => capPageNumber(x, calcMaxPageNumber(data.length, itemsPerPage))),
          O.getOrElse(() => 1),
        ),
        itemsPerPage,
        totalItemsCount: data.length,
      }
    : { type: 'remote' }
}

export class Table<T> extends React.Component<Props<T>, State> {
  static getDerivedStateFromProps<T>(props: Props<T>, state: State) {
    const data = getData(props.data)

    return state.type === 'local' && data.length !== state.totalItemsCount
      ? {
          ...state,
          pageNumber: 1,
          totalItemsCount: data.length,
        }
      : null
  }

  itemsPerPageOptions: ReadonlyArray<number> = [10, 25, 50, 100]
  pagesCountToShow = 5

  readonly state = initState(this.props)

  handleOnPaginationChange = (pager: Pager) => {
    const { pagination } = this.props
    if (pagination) {
      pagination.type === 'local'
        ? this.setState({
            type: 'local',
            pageNumber: pager.page,
            itemsPerPage: pager.count,
          })
        : pagination.onGridPagerChange(pager)
    }
  }

  renderPagination(pagination: Pagination): React.ReactNode {
    if (this.state.type === 'local') {
      const { itemsPerPage, pageNumber, totalItemsCount } = this.state
      return (
        <Pagination
          pageNumber={pageNumber}
          itemsPerPage={itemsPerPage}
          totalItemsCount={totalItemsCount}
          itemsPerPageOptions={this.itemsPerPageOptions}
          pagesCountToShow={this.pagesCountToShow}
          onChange={this.handleOnPaginationChange}
        />
      )
    } else if (pagination.type === 'remote') {
      const { pageNumber, itemsPerPage, totalItemsCount } = pagination
      return (
        <Pagination
          pageNumber={pageNumber}
          itemsPerPage={itemsPerPage}
          totalItemsCount={totalItemsCount}
          itemsPerPageOptions={this.itemsPerPageOptions}
          pagesCountToShow={this.pagesCountToShow}
          onChange={this.handleOnPaginationChange}
        />
      )
    }

    return null
  }

  getData = (): ReadonlyArray<T> => {
    const { pagination } = this.props

    const data = getData(this.props.data)
    return pagination && this.state.type === 'local'
      ? calcVisibleData(data, this.state.itemsPerPage, this.state.pageNumber)
      : data
  }

  render() {
    const props = this.props
    const { filter, thead, render, pagination, getUniqKey, data, loadingDataError } = this.props

    const onRowSelect = props.type === 'cells' ? props.onRowSelect : undefined

    const tbody =
      props.type === 'cells'
        ? this.getData().map((datum, idx) => (
            <tr
              className={cn(props.setRowClassName && props.setRowClassName(datum), {
                'hover:bg-gray-100': isDefined(onRowSelect),
                'cursor-pointer': isDefined(onRowSelect),
                'bg-gray-200 lw-selected-table-row': props.selectable && props.selectable(datum),
              })}
              key={getUniqKey(datum)}
              onClick={
                onRowSelect
                  ? () => {
                      const selection = window.getSelection()
                      if (selection === null || selection.toString().length === 0) {
                        onRowSelect(datum)
                      }
                    }
                  : undefined
              }
            >
              {render(datum, idx)}
            </tr>
          ))
        : this.getData().map((datum, idx) => render(datum, idx))

    return (
      <div>
        {filter && <div className="do-not-print pb-5">{filter}</div>}
        <TableContainer
          className={props.className}
          loading={isLoadable(data) && Loadable.isLoadingOrUpdating(data)}
          footer={
            pagination && (
              <div className="do-not-print bg-white px-2 py-3 border-t border-gray-200">
                {this.renderPagination(pagination)}
              </div>
            )
          }
        >
          <TableHead>{thead}</TableHead>
          <TableBody>
            {tbody}
            {isLoadable(data) && Loadable.isFailure(data) && (
              <tr>
                <td colSpan={100}>
                  <Alert type="danger">
                    {loadingDataError || 'Error loading or updating data. Please reload.'}
                    <br />
                    {data.failure && JSON.stringify(data.failure, undefined, 2)}
                  </Alert>
                </td>
              </tr>
            )}
          </TableBody>
        </TableContainer>
      </div>
    )
  }
}
