import { Button, Table } from "react-bootstrap";

function ArticlesTable() {
  return (
    <>
      <div className="container mt-3">
        <Button>New article</Button>

        <Table hover style={{ fontSize: '18px', marginTop: '1rem' }}>
          <thead style={{ textAlign: 'center' }} >
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Description</th>
              <th>Current stock</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </Table >
      </div>
    </>

  )
}
export default ArticlesTable;