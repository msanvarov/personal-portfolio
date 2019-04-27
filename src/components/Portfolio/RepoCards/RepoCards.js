import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeBranch, faStar } from "@fortawesome/free-solid-svg-icons";
import "./RepoCards.css";

const RepoCards = props => {
  return (
    <Card
      border="primary"
      bg="primary"
      text="white"
      style={{ height: "15rem" }}
    >
      <Card.Body>
        <Card.Title>
          <h4>
            <a href={props.data.htmlRef}>{props.data.name}</a>
          </h4>
        </Card.Title>
        <hr />
        <Card.Subtitle className="mb-3 mt-2 row">
          <div className="pl-3 col-1-sm">
            <FontAwesomeIcon icon={faStar} /> {props.data.stargazers_count}
          </div>
          <div className="pl-3 col-1-sm">
            <FontAwesomeIcon icon={faCodeBranch} /> {props.data.forks}
          </div>
          <div className="text-right col">{props.data.language}</div>
        </Card.Subtitle>
        <Card.Text>{props.data.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default RepoCards;
