export interface CharacterType {
  url: string; // 	The hypermedia URL of this resource
  name: string; // 	The name of this character
  gender: string; // 	The gender of this character.
  culture: string; // 	The culture that this character belongs to.
  born: string; // 	Textual representation of when and where this character was born.
  died: string; // 	Textual representation of when and where this character died.
  titles: string[]; // The titles that this character holds.
  aliases: string[]; // The aliases that this character goes by.
  father: string; // 	The character resource URL of this character's father.
  mother: string; // 	The character resource URL of this character's mother.
  spouse: string; // 	An array of Character resource URLs that has had a POV-chapter in this book.
  allegiances: string[]; // 	An array of House resource URLs that this character is loyal to.
  books: string[]; // of strings 	An array of Book resource URLs that this character has been in.
  povBooks: string[]; // 	An array of Book resource URLs that this character has had a POV-chapter in.
  tvSeries: string[]; // 	An array of names of the seasons of Game of Thrones that this character has been in.
  playedBy: string[]; //  An array of actor names that has played this character in the TV show Game Of Thrones.
}
