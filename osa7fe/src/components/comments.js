import React from 'react'
import { Table, Media, Grid, Row, Col, Image, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'

const Comments = ({ comments }) => (
  <div>
    <h2>Comments</h2>
    <Table  striped>
      <tbody>
        {comments.map(comment =>
          <tr key={comment.id}>
            <td>* {comment.comment}</td>
          </tr>
        )}
      </tbody>
    </Table >

  </div>
)

export default Comments
