import React from 'react'
import { Table } from 'react-bootstrap'

const Comments = ({ comments }) => (
  <div>
    <h2>Comments</h2>
    <Table  striped>
      <tbody>
        {comments.map(comment =>
          <tr key={comment._id}>
            <td>* {comment.comment}</td>
          </tr>
        )}
      </tbody>
    </Table >

  </div>
)

export default Comments
