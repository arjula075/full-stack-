import BootstrapTable from 'react-bootstrap-table-next';

const anecdotes = [ ... ];
const columns = [{
  dataField: 'content',
  text: 'anecdote'
}, {
  dataField: 'author',
  text: 'Anecdote author'
}];

export default () =>
  <BootstrapTable keyField='id' data={ products } columns={ columns } />
