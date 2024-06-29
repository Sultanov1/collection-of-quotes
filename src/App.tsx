import NavBar from './components/NavBar/NavBar';
import {Route, Routes} from 'react-router-dom';
import Quote from './containers/Quote/Quote';
import QuoteForm from './containers/QuoteForm/QuoteForm';

const App = () => {
  return (
    <div>
      <header>
        <NavBar/>
      </header>
      <Routes>
        <Route path='/' element={<Quote/>}/>
        <Route path='/add-quote' element={<QuoteForm isEditing={true}/>}/>
      </Routes>
    </div>
  );
};

export default App;