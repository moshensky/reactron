import { Pager } from '../types'
import React from 'react'
import { range } from '../utils'
import './pagination.css'
import { SelectInput } from '../SelectInput'

type Props = Readonly<{
  firstLabel?: string
  lastLabel?: string
  itemsPerPageLabel?: React.ReactNode
  showingOfTotalLabel?: React.ReactNode
  previousLabel?: React.ReactNode
  nextLabel?: React.ReactNode
  forward10Label?: string
  backward10Label?: string
  pageNumber: number
  itemsPerPage: number
  totalItemsCount: number
  itemsPerPageOptions: ReadonlyArray<number>
  pagesCountToShow?: number
  onChange: (pager: Pager) => void
}>

export const capPageNumber = (pageNumber: number, pagesCount: number): number => {
  if (pageNumber < 1) {
    return 1
  } else if (pageNumber > pagesCount) {
    return pagesCount
  } else {
    return pageNumber
  }
}

export const calcMaxPageNumber = (totalItems: number, itemsPerPage: number) =>
  Math.ceil(totalItems / itemsPerPage)

export function Pagination({
  firstLabel,
  lastLabel,
  itemsPerPageLabel,
  showingOfTotalLabel,
  previousLabel,
  nextLabel,
  backward10Label,
  forward10Label,
  pageNumber,
  itemsPerPage,
  totalItemsCount,
  itemsPerPageOptions,
  onChange,
  pagesCountToShow,
}: Props) {
  const pagesCount = calcMaxPageNumber(totalItemsCount, itemsPerPage)
  const currentPage = capPageNumber(pageNumber, pagesCount)
  // Cap the number of pages to render if the count is less than number to show at once
  const numToRender = pagesCount < (pagesCountToShow || 10) ? pagesCount : pagesCountToShow || 10
  // The current page should try to appear in the middle, so get the median
  // of the number of pages to show at once - this will be our adjustment factor
  const indicatorPosition = Math.ceil(numToRender / 2)
  // Subtract the pos from the current page to get the first page no
  let firstPageNumber = currentPage - indicatorPosition + 1
  // If the first page is less than 1, make it 1
  if (firstPageNumber < 1) {
    firstPageNumber = 1
  }

  // Add the number of pages to render
  // remember to subtract 1 as this represents the first page number
  let lastPageNumber = firstPageNumber + numToRender - 1
  // If the last page is greater than the page count
  // add the difference to the first/last page
  if (lastPageNumber > pagesCount) {
    const diff = pagesCount - lastPageNumber

    firstPageNumber += diff
    lastPageNumber += diff
  }

  const nextClass = currentPage === pagesCount ? 'page-item disabled' : 'page-item'
  const prevClass = currentPage === 1 ? 'page-item disabled' : 'page-item'

  const firstVisibleItem = totalItemsCount === 0 ? 0 : (pageNumber - 1) * itemsPerPage + 1
  const lastVisibleItem = Math.min(pageNumber * itemsPerPage, totalItemsCount)

  return (
    <div className="flex flex-row items-center flex-wrap">
      <nav>
        <ul className="flex">
          <li className={prevClass}>
            <button
              className="h-8 page-link"
              onClick={() => onChange({ page: 1, count: itemsPerPage })}
            >
              {firstLabel || 'First'}
            </button>
          </li>
          <li className={prevClass}>
            <button
              className="h-8 page-link"
              title={backward10Label || 'Backward 10'}
              onClick={() =>
                onChange({ page: pageNumber - 10 > 1 ? pageNumber - 10 : 1, count: itemsPerPage })
              }
            >
              ...
            </button>
          </li>
          <li className={prevClass}>
            <button
              className="h-8 page-link"
              aria-label="Previous"
              onClick={() => onChange({ page: pageNumber - 1, count: itemsPerPage })}
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">{previousLabel || 'Previous'}</span>
            </button>
          </li>

          {range(firstPageNumber, lastPageNumber + 1).map((idx) => (
            <li className={`page-item${idx === pageNumber ? ' active' : ''}`} key={idx}>
              <button
                className="h-8 page-link"
                onClick={() => onChange({ page: idx, count: itemsPerPage })}
              >
                {idx}
              </button>
            </li>
          ))}

          <li className={nextClass}>
            <button
              className="h-8 page-link"
              aria-label="Next"
              onClick={() => onChange({ page: pageNumber + 1, count: itemsPerPage })}
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">{nextLabel || 'Next'}</span>
            </button>
          </li>
          <li className={nextClass}>
            <button
              className="h-8 page-link"
              title={forward10Label || 'Forward 10'}
              onClick={() =>
                onChange({
                  page: pageNumber + 10 < pagesCount ? pageNumber + 10 : pagesCount,
                  count: itemsPerPage,
                })
              }
            >
              ...
            </button>
          </li>
          <li className={nextClass}>
            <button
              className="h-8 page-link"
              onClick={() => onChange({ page: pagesCount, count: itemsPerPage })}
            >
              {lastLabel || 'Last'}
            </button>
          </li>
        </ul>
      </nav>

      <SelectInput
        className="ml-1 w-24"
        options={itemsPerPageOptions.map((x) => ({ value: `${x}`, label: x }))}
        value={`${itemsPerPage}`}
        onChange={(x) => onChange({ page: 1, count: parseInt(x, 10) })}
      />

      <div className="ml-1 mr-3">{itemsPerPageLabel || 'Items per page'}</div>

      <div className="ml-auto">
        {showingOfTotalLabel ||
          `Showing ${firstVisibleItem} - ${lastVisibleItem} of ${totalItemsCount} items`}
      </div>
    </div>
  )
}
