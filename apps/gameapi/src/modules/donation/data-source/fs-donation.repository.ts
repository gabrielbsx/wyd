import { writeFileSync } from "fs";
import { IDonationRepository } from "../domain/donation.repository.js";
import { env } from "@gameapi/shared/env/index.js";
import { join } from "path";
import { randomUUID } from "crypto";

export class FileSystemDonationRepository implements IDonationRepository {
  public async importCoins(username: string, coins: number) {
    const fileName = `${randomUUID()}.txt`;
    const content = `${username} ${coins}`;

    writeFileSync(join(env.IMPORT_DONATION_DIR, fileName), content);
  }

  public async importItems(username: string, items: string[]) {
    for (const item of items) {
      const fileName = `${randomUUID()}.txt`;
      const content = `${username} ${item}`;

      writeFileSync(join(env.IMPORT_ITEM_DIR, fileName), content);
    }
  }
}
