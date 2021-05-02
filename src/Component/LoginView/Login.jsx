import { Jumbotron, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function submit(history) {
  history.push("/dashboard/saied");
}
export default function Login() {
  let history = useHistory();
  return (
    <div className="row">
      <div className="colu-5 colu-s-10 login">
        <Jumbotron>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" onClick={() => submit(history)}>
              Submit
            </Button>
          </Form>
        </Jumbotron>
      </div>
    </div>
  );
}
