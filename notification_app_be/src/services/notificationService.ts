import { Notification, PRIORITY_WEIGHTS } from '../types/notification';
import { PriorityQueue } from '../utils/priorityQueue';

export class NotificationService {
  public static comparePriority(a: Notification, b: Notification): number {
    const weightA = PRIORITY_WEIGHTS[a.Type];
    const weightB = PRIORITY_WEIGHTS[b.Type];

    if (weightA !== weightB) {
      return weightA - weightB;
    }

    const timeA = new Date(a.Timestamp).getTime();
    const timeB = new Date(b.Timestamp).getTime();
    return timeA - timeB;
  }

  public static getTopNotifications(notifications: Notification[], n: number = 10): Notification[] {
    const minHeap = new PriorityQueue<Notification>(this.comparePriority);

    for (const notification of notifications) {
      if (minHeap.size() < n) {
        minHeap.push(notification);
      } else {
        const lowestPriorityInTopN = minHeap.peek();
        if (lowestPriorityInTopN && this.comparePriority(notification, lowestPriorityInTopN) > 0) {
          minHeap.pop();
          minHeap.push(notification);
        }
      }
    }

    return minHeap.toArray().sort((a, b) => this.comparePriority(b, a));
  }
}

export class PriorityInbox {
  private minHeap: PriorityQueue<Notification>;
  private n: number;

  constructor(n: number = 10) {
    this.n = n;
    this.minHeap = new PriorityQueue<Notification>(NotificationService.comparePriority);
  }

  public addNotification(notification: Notification): void {
    if (this.minHeap.size() < this.n) {
      this.minHeap.push(notification);
    } else {
      const lowestPriorityInTopN = this.minHeap.peek();
      if (lowestPriorityInTopN && NotificationService.comparePriority(notification, lowestPriorityInTopN) > 0) {
        this.minHeap.pop();
        this.minHeap.push(notification);
      }
    }
  }

  public getTopN(): Notification[] {
    return this.minHeap.toArray().sort((a, b) => NotificationService.comparePriority(b, a));
  }
}
