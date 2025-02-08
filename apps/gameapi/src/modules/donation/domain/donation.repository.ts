export interface IDonationRepository {
  importCoins: (username: string, coins: number) => Promise<void>;
  importItems: (username: string, items: string[]) => Promise<void>;
}
