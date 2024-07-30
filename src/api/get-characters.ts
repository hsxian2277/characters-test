import { CharacterType } from "../types/characterType";

/**
 * see documentation for more info on this API
 * https://www.anapioficeandfire.com/Documentation
 */

export async function getCharacters(page = 1): Promise<CharacterType[]> {
  const apiResp = await fetch(
    `https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=10`
  );
  const apiData = await apiResp.json();
  return apiData;
}
