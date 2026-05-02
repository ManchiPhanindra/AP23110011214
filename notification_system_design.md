# Notification System Design - Stage 1

## Overview
The "Campus Notifications Priority Inbox" is a high-performance, in-memory microservice designed to filter and rank a large stream of campus updates (Placements, Results, Events) based on business priority rules and recency.

## Approach
As a senior backend engineer, I implemented a **Clean Architecture** approach, decoupling the API communication, the data structures, and the core business logic.

### 1. Priority Logic
Priority is determined by a two-tier weighted system:
- **Tier 1: Category Weight**
    - `Placement` (High Priority - Weight 3)
    - `Result` (Medium Priority - Weight 2)
    - `Event` (Low Priority - Weight 1)
- **Tier 2: Recency**
    - If two notifications have the same category weight, the one with the more recent `Timestamp` takes precedence.

### 2. Data Structure: Min-Heap
To efficiently maintain the **Top N** notifications in a continuous stream without a database, I used a **Min-Heap** (Priority Queue).

- **Why Min-Heap?**
    - In a Min-Heap of size `N`, the root always contains the element with the *lowest* priority among the current Top N.
    - When a new notification arrives, we compare it with the root (O(1)).
    - If the new notification has a higher priority than the root, we remove the root and insert the new one (O(log N)).
    - This ensures we don't store thousands of irrelevant notifications in memory, maintaining a strict space complexity of **O(N)**.

### 3. Complexity Analysis
- **Time Complexity**: 
    - Fetching: O(1) request.
    - Processing $M$ notifications for Top $N$: **O(M log N)**.
    - This is significantly faster than sorting the entire list (O(M log M)) when $M >> N$.
- **Space Complexity**: 
    - Storage of Top N: **O(N)**.

## Scalability for Real-Time Updates
The system is designed for real-time scalability:
1. **Streaming Compatibility**: The Min-Heap approach works perfectly for streaming data (e.g., via WebSockets or Kafka). You can push notifications into the heap one-by-one as they arrive.
2. **Stateless Processing**: The logic is encapsulated in the `NotificationService`, making it easy to deploy in a serverless environment or as part of a larger Express/NestJS application.
3. **Memory Efficiency**: By only keeping the Top N items, we prevent memory leaks or heap overflows even if the campus sends millions of notifications.

## Project Structure
- `src/types/`: Type-safe interfaces for data integrity.
- `src/utils/`: Reusable `PriorityQueue` implementation.
- `src/services/apiService.ts`: Isolated API logic.
- `src/services/notificationService.ts`: Core priority logic and `PriorityInbox` class for continuous state maintenance.
- `src/index.ts`: Orchestration and runner.