import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Table, Media, Grid, Row, Col, Image, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'

const UserList = ({ users }) => (
  <div>
    <h2>Users</h2>
    <Table  striped>
      <tbody>
        {users.map(user =>
          <tr key={user.id}>
            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
            <td>{user.blogCount}</td>
          </tr>
        )}
      </tbody>
    </Table >

  </div>
)

export default UserList
