export interface Article {
  id: string;
  title: string;
  created: string;
  author: string;
  content: string;
}

export interface ArticleDatabase {
  articles: Record<string, Article>
  categories: Record<string, string[]>
  ends: Record<string, string[]>
}

/** Returns all articles and their contents. */
export function load(...categories: string[]): Promise<void>;
/** Returns all tip categories. */
export function getData(): Promise<ArticleDatabase>;

/**
 * Searches through the database for articles.
 * 
 * - Returns a `Article` if a single match was found
 * - Returns an array of `Article`s if a name conflict was found
 * - Returns `null` if no match
 * 
 * @param query The search query.
 */
export function searchForArticle(query: string): Promise<Article | Article[] | null>;
