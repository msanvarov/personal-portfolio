import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

const RepoCards = props => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <h4>
            <a href={props.htmlRef}>{props.name}</a>
          </h4>
        </Card.Title>
        <Card.Subtitle className="mb-3 row">
          <div className="pl-3 col-1-sm">
            <i className="fas fa-star" /> {props.stargazers_count}
          </div>
          <div className="col-1-sm">
            <i className="fas fa-code-branch pl-2" /> {props.forks}
          </div>
          <div className="text-right col">{props.language}</div>
        </Card.Subtitle>
        <Card.Text>{props.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

RepoCards.propTypes = {
  name: PropTypes.string.isRequired,
  htmlRef: PropTypes.string.isRequired,
  stargazers_count: PropTypes.string.isRequired,
  forks: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default RepoCards;
