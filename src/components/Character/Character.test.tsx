import { beforeEach, describe, expect, test } from "vitest";
import {cleanup, render, screen} from '@testing-library/react';
import Character from "./Character";
import characters from '../../testing/mock/characters';
import { server } from '../../testing/msw/node';
import { beforeAll, afterEach, afterAll } from 'vitest';

describe("<Character />", () => {
  const mockCharacter = characters[0];

  beforeAll(() => {
    server.listen();
  });
  beforeEach(() => {
    render(<Character character={mockCharacter}/>);
  })
  afterEach(() => {
    server.resetHandlers();
    cleanup();
  });
  afterAll(() => server.close());

  test('shows fields for "name" and "culture"', async () => {
    const name = screen.getByText('name');
    const culture = screen.getByText('culture');

    expect(name).toBeInTheDocument();
    expect(culture).toBeInTheDocument();
  });

  test("shows culture if it is present", async () => {
    const culture = screen.getByText('culture');

    expect(culture).toBeInTheDocument();
    expect(culture.parentElement?.textContent).toContain(mockCharacter.culture);
  });
  
  test("shows alias if no name is present", async () => {
    const alias = screen.getByText('name');

    expect(alias).toBeInTheDocument();
    expect(alias.parentElement?.textContent).toContain(mockCharacter.aliases[0]);
  });

  test("shows how many books this characters made an appearance in", async () => {
    const numOfBooks = screen.getByText('Number of Books:');
    
    expect(numOfBooks).toBeInTheDocument();
    expect(numOfBooks.parentElement?.textContent).toContain(mockCharacter.books.length);
  });
});
