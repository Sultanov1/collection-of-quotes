import React, { useState, useEffect } from 'react';
import axiosApi from '../../axiosApi';
import { useParams } from 'react-router-dom';

interface Quote {
  id: string;
  author: string;
  text: string;
  category: string;
}

const QuoteList: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const [editedText, setEditedText] = useState('');
  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    const query = category ? `?orderBy="category"&equalTo="${category}"` : '';
    axiosApi.get(`/quotes.json${query}`).then((response) => {
      const quotesData = response.data;
      const loadedQuotes: Quote[] = [];

      for (const key in quotesData) {
        loadedQuotes.push({
          id: key,
          ...quotesData[key],
        });
      }

      setQuotes(loadedQuotes);
    });
  }, [category]);

  const handleEdit = (quote: Quote) => {
    setEditingQuote(quote);
    setEditedText(quote.text);
  };

  const handleSaveEdit = () => {
    if (!editingQuote) return;

    const updatedQuote = {
      ...editingQuote,
      text: editedText,
    };

    axiosApi.put(`/quotes/${editingQuote.id}.json`, updatedQuote).then(() => {
      setQuotes((prevQuotes) =>
        prevQuotes.map((q) => (q.id === updatedQuote.id ? updatedQuote : q))
      );
      setEditingQuote(null);
    });
  };

  const handleCancelEdit = () => {
    setEditingQuote(null);
    setEditedText('');
  };

  const handleDelete = (quoteId: string) => {
    axiosApi.delete(`/quotes/${quoteId}.json`).then(() => {
      setQuotes((prevQuotes) => prevQuotes.filter((q) => q.id !== quoteId));
    });
  };

  return (
    <div>
      <ul className="list-group">
        {quotes.map((quote) => (
          <li key={quote.id} className="list-group-item">
            {editingQuote && editingQuote.id === quote.id ? (
              <div>
                <textarea
                  className="form-control mb-2"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button className="btn btn-success btn-sm me-2" onClick={handleSaveEdit}>
                  Save
                </button>
                <button className="btn btn-outline-secondary btn-sm" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <blockquote>
                  <p>{quote.text}</p>
                  <footer>— {quote.author}</footer>
                </blockquote>
                <button
                  className="btn btn-secondary btn-sm me-2"
                  onClick={() => handleEdit(quote)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDelete(quote.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuoteList;
