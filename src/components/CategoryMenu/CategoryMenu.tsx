import React from 'react';
import { NavLink } from 'react-router-dom';

interface Category {
  title: string;
  id: string;
}

const categories: Category[] = [
  { title: 'All', id: 'all' },
  { title: 'Star Wars', id: 'star-wars' },
  { title: 'Famous People', id: 'famous-people' },
  { title: 'Saying', id: 'saying' },
  { title: 'Humour', id: 'humour' },
  { title: 'Motivational', id: 'motivational' },
];

const CategoryMenu: React.FC = () => (
  <ul>
    {categories.map((category) => (
      <li key={category.id}>
        <NavLink to={`/quotes/${category.id}`}>{category.title}</NavLink>
      </li>
    ))}
  </ul>
);

export default CategoryMenu;
