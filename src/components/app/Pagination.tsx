import React from 'react'
import ReactPaginate from 'react-paginate'
import { useHistory } from 'react-router'
import { useQueryParams } from '../../utils/hooks'

interface Props {
  pageCount: number
}

const Paginate = ({ pageCount }: Props) => {
  const { page } = useQueryParams<'page'>()
  const history = useHistory()

  const handleChange = ({ selected }: { selected: number }) => {
    history.push('?page=' + (selected + 1))
  }

  const currentPage =
    !isNaN(Number(page)) && Number(page) <= pageCount ? Number(page) - 1 : 0

  return (
    <ReactPaginate
      containerClassName="pagination"
      activeClassName="active"
      pageClassName="waves-effect"
      marginPagesDisplayed={3}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      onPageChange={handleChange}
      previousLabel={<i className="material-icons pointer">chevron_left</i>}
      nextLabel={<i className="material-icons pointer">chevron_right</i>}
      previousClassName="waves-effect"
      nextClassName="waves-effect"
      disabledClassName="disabled"
      initialPage={currentPage}
    />
  )
}

export default Paginate
