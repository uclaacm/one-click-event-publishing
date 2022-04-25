import BoardLogo from '../../../assets/acm_logo.svg';
function Footer(): JSX.Element {
  return (
    <div id="footer">
      <h3>
        Brought to you by{' '}
        <a
          href="https://uclaacm.com/dev"
          target="_blank"
          rel="noopener noreferrer"
          id="footer-link"
        >
          {' '}
          <img id="board-logo" src={BoardLogo} alt="board logo!" />
          .dev
        </a>
      </h3>
    </div>
  );
}

export default Footer;
