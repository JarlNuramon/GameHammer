export default function Footer() {
  return (
    <div className="footer-dark">
      <footer>
        <div className="container">
          <div className="row">
            <div className="colu-3 colu-s-4 item">
              <center>
                <h3>Links</h3>
                <ul>
                  <li>
                    <a href="https://www.hochschule-bochum.de/studium-lehre/studienangebote/masterstudiengaenge/informatik/">
                      University
                    </a>
                  </li>
                  <li>
                    <a href="https://reactjs.org/">Web</a>
                  </li>
                  <li>
                    <a href="https://www.strato.de/">Hosting</a>
                  </li>
                </ul>
              </center>
            </div>
            <div className="colu-7 colu-s-6 item text">
              <h3>SD(K)</h3>
              <p>
                A team of students from the german university of applied science
                in Bochum. We managed multiple projects together and always kept
                improving upon our success stories. We implemented a learning
                plattform, a voice assistant and GameHammer.
              </p>
            </div>
          </div>
          <p className="copyright">SDK</p>
        </div>
      </footer>
    </div>
  );
}
