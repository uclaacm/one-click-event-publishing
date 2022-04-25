import { HeaderSections } from '../globalTypes';

/**
 * We can use our enum as the specified type that our HeaderProps recieves
 * Type our React Element with an interface
 */
export interface HeaderProps {
  section: HeaderSections;
}

export default function Header(): JSX.Element {
  return (
    <div id="header">
      <h3>One-Click Event Publishing!</h3>
    </div>
  );
}
