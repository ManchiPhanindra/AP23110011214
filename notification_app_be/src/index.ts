import { ApiService } from './services/apiService';
import { NotificationService, PriorityInbox } from './services/notificationService';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  console.log("--- Stage 1: Campus Notifications Priority Inbox ---");
  
  try {
    const TOP_N = 10;
    
    // Optional: Fetch token from environment if available
    const apiToken = process.env.LOG_API_TOKEN;

    console.log("Fetching notifications...");
    const allNotifications = await ApiService.fetchNotifications(apiToken);
    console.log(`Total notifications fetched: ${allNotifications.length}`);

    console.log(`Processing Top ${TOP_N} priority notifications...`);
    const topNotifications = NotificationService.getTopNotifications(allNotifications, TOP_N);

    console.log("\n--- Priority Inbox (Top 10) ---");
    if (topNotifications.length === 0) {
      console.log("No notifications found.");
    } else {
      topNotifications.forEach((notif, index) => {
        console.log(`${index + 1}. [${notif.Type}] (ID: ${notif.ID})`);
        console.log(`   Message: ${notif.Message}`);
        console.log(`   Time: ${notif.Timestamp}`);
        console.log("   -------------------------------------------");
      });
    }

    // --- Bonus: Continuous Stream Demonstration ---
    console.log("\n--- Bonus: Real-time Update Demonstration ---");
    const inbox = new PriorityInbox(3); // Maintain top 3
    console.log("Adding new notifications one-by-one...");
    
    allNotifications.slice(0, 5).forEach(n => inbox.addNotification(n));
    console.log("Current Top 3 in inbox:");
    inbox.getTopN().forEach((notif, i) => console.log(`   ${i+1}. ${notif.Type}: ${notif.Message}`));

  } catch (error) {
    console.error("Critical System Error:", error instanceof Error ? error.message : error);
  }
}

main();
