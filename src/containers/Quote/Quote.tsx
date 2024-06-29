import CategoryMenu from '../../components/CategoryMenu/CategoryMenu';
import QuoteList from '../../components/QuoteList/QuoteList';

const Quote = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <CategoryMenu/>
        </div>
        <div className="col-md-9">
          <QuoteList/>
        </div>
      </div>
    </div>
  );
};

export default Quote;