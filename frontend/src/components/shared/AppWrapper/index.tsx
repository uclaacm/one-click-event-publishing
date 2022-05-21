import Footer from './Footer';
import Header from './Header';
import '../../../styles/AppWrapper.scss';

export interface AppWrapperProps {
  children?: JSX.Element | string;
}

export default function AppWrapper(props: AppWrapperProps): JSX.Element {
  return (
    <div id="app-wrapper">
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}
