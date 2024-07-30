import { http, HttpResponse } from 'msw';
import characters from '../mock/characters';
import characters2 from '../mock/characters-2';

export const handlers = [
  http.get('https://www.anapioficeandfire.com/api/characters', ({request}) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page'));
    const pageSize = Number(url.searchParams.get('pageSize'));

    if (page === 1) {
      return HttpResponse.json(characters.slice(0, pageSize));
    } else {
      return HttpResponse.json(characters2.slice(0, pageSize));
    }
  }),
];
