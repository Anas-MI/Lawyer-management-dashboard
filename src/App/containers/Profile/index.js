import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Table } from 'react-bootstrap';

const Profile = (props) => {
  const [admin, setAdmin] = useState(false);

  const user = useSelector((state) => state.user.token.user);

  useEffect(() => {
    if (user.admin) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [user]);

  return admin ? (
    <Card.Body className="px-0 py-2">
      <Table responsive hover>
        <tbody>
          <tr className="unread">
            <td>Email Address</td>
            <td>{user.emailAddress}</td>
          </tr>
        </tbody>
      </Table>
    </Card.Body>
  ) : (
    <Card.Body className="px-0 py-2">
      <Table responsive hover>
        <tbody>
          <tr className="unread">
            <td>First Name</td>
            <td>{user.firstName}</td>
          </tr>
          <tr className="unread">
            <td>Last Name</td>
            <td>{user.lastName}</td>
          </tr>
          <tr className="unread">
            <td>Email Address</td>
            <td>{user.emailAddress}</td>
          </tr>
          <tr className="unread">
            <td>PhoneNumber</td>
            <td>{user.phoneNumber}</td>
          </tr>

          <tr className="unread">
            <td>Country</td>
            <td>{user.countryOfPractice}</td>
          </tr>
          <tr className="unread">
            <td>Firm Size</td>
            <td>{user.lawFirmSize}</td>
          </tr>
        </tbody>
      </Table>
    </Card.Body>
  );
};

export default Profile;
