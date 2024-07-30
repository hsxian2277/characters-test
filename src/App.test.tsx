import { cleanup, render, fireEvent, screen, waitFor } from "@testing-library/react";
import { beforeAll, afterEach, afterAll, beforeEach } from 'vitest';
import React from "react";
import App from "./App";
import characters from './testing/mock/characters';
import characters2 from './testing/mock/characters-2';
import { server } from './testing/msw/node';

import { describe, expect, test } from "vitest";

describe("<App />", () => {
  beforeAll(() => {
    server.listen();
  });
  beforeEach(() => {
    render(<App />);
  })
  afterEach(() => {
    server.resetHandlers();
    cleanup();
  });
  afterAll(() => server.close());

  describe("loading character", () => {
    test('renders the title "Characters"', async () => {
      const title = screen.getByText('Characters');

      expect(title).not.toBe(null);
    });

    test("renders a list of 10 characters", async () => {
      // use find to Wait for data to load
      const names = await screen.findAllByText('name');

      expect(names).not.toBe(null);
      expect(names.length).toBe(10);
    });
  });

  describe("loading more characters", () => {
    const alias1 = characters[0].aliases[0];
    const alias2 = characters2[0].aliases[0];

    test('has a "Load More Characters" button', async () => {
      const button = screen.getByText('Load More Characters');

      expect(button).not.toBe(null);
    });

    test("clicking load more gets 10 more characters", async () => {
      const button = screen.getByText('Load More Characters');
      await screen.findAllByText('name');
      const character1 = screen.getByText(alias1);

      // Check that characters changed between pages
      expect(character1).not.toBe(null);
      expect(screen.queryByText(alias2)).toBe(null);

      fireEvent.click(button);

      await screen.findAllByText('name');
      const character2 = screen.getByText(alias2);

      expect(character2).not.toBe(null);
      expect(screen.queryByText(alias1)).toBe(null);
    });

    test("clicking load more increases the page number", async () => {
      const button = screen.getByText('Load More Characters');

      expect(screen.getByText('Next Page: 1')).not.toBe(null);
      fireEvent.click(button);
      expect(screen.getByText('Next Page: 2')).not.toBe(null);
    });
  });
});
