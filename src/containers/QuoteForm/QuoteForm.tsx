import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosApi from '../../axiosApi';

interface Quote {
  author: string;
  text: string;
  category: string;
}

interface Props {
  isEditing?: boolean;
}

const QuoteForm: React.FC<Props> = ({ isEditing = false }) => {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState('star-wars');
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (isEditing && id) {
      const fetchQuote = async () => {
        try {
          const { data } = await axiosApi.get<Quote>(`/quotes/${id}.json`);
          setAuthor(data.author);
          setText(data.text);
          setCategory(data.category);
        } catch (error) {
          console.error('Ошибка при загрузке цитаты:', error);
        }
      };
      fetchQuote();
    }
  }, [isEditing, id]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const quoteData: Quote = { author, text, category };

      try {
        if (isEditing && id) {
          await axiosApi.put(`/quotes/${id}.json`, quoteData);
        } else {
          await axiosApi.post('/quotes.json', quoteData);
        }
        navigate(`/quotes/${category}`);
      } catch (error) {
        console.error('Ошибка при сохранении цитаты:', error);
      }
    },
    [author, text, category, isEditing, id, navigate]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          className="form-select"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="star-wars">Star Wars</option>
          <option value="famous-people">Famous People</option>
          <option value="saying">Saying</option>
          <option value="humour">Humour</option>
          <option value="motivational">Motivational</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="author" className="form-label">
          Author
        </label>
        <input
          type="text"
          className="form-control"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label">
          Text
        </label>
        <textarea
          className="form-control"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter some text"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        {isEditing ? 'Обновить' : 'Сохранить'}
      </button>
    </form>
  );
};

export default QuoteForm;
