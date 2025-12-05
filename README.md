# ChatWithMe

**Real-time chat application with reliable message delivery using AWS SQS**

Production-ready chat app featuring asynchronous message queueing, real-time WebSocket communication, and end-to-end encryption.

---

## The Problem

Traditional WebSocket-only chat apps lose messages when users are offline. Messages sent while a user is disconnected simply disappear.

**ChatWithMe solves this with AWS SQS message queuing** - guaranteeing delivery even when recipients are offline.

---

## Key Features

### Reliable Messaging
- **AWS SQS queue** - Guaranteed delivery with automatic retries
- **Dead letter queue** - Captures messages after 3 failed attempts
- **Background worker** - Asynchronous processing independent of API servers
- **Exponential backoff** - 1s, 2s, 4s, 8s, 16s retry intervals

### Real-Time Communication
- **Socket.io WebSockets** - Instant message delivery for online users
- **Online status tracking** - Live presence indicators
- **Private & group chat** - One-on-one and multi-user conversations
- **Admin controls** - Group management features

### Security
- **AES-256 encryption** - All messages encrypted at rest
- **JWT authentication** - Secure token-based auth
- **Rate limiting** - 5 login attempts per 15 min, 100 API requests per 15 min
- **Helmet.js** - HTTP security headers

### Operations
- **CloudWatch metrics** - Queue depth, delivery rates, active users
- **PM2 process manager** - Auto-restart and clustering
- **Health checks** - Load balancer monitoring endpoints
- **Graceful shutdown** - Clean connection termination

---

## Architecture
```
Client (React)
     │ HTTPS
     ▼
┌─────────────────────┐
│  AWS EC2 Instance   │
│                     │
│  ┌──────────────┐   │
│  │ Express API  │   │
│  └──────────────┘   │
│  ┌──────────────┐   │
│  │  Socket.io   │   │
│  └──────────────┘   │
│  ┌──────────────┐   │
│  │  SQS Worker  │   │
│  └──────────────┘   │
└──────┬──────────┬───┘
       │          │
       ▼          ▼
   AWS SQS    MongoDB
       │
       ▼
  CloudWatch
```

### Message Flow

1. Client sends message via Socket.io
2. Server encrypts and saves to MongoDB
3. Message queued to SQS for each recipient
4. Background worker polls SQS
5. If recipient online: delivers via Socket.io, deletes from queue
6. If offline: retries 3x, then moves to dead letter queue
7. Recipient connects: fetches from MongoDB

---

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 6+
- AWS Account (SQS access)

### Deployment (AWS EC2)

**1. Launch EC2 Instance**
- Ubuntu 22.04 LTS, t3.micro
- Security groups: SSH (22), HTTP (5000)

**2. Setup**
```bash
# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone and configure
git clone YOUR_REPO
cd chat-app-server
npm install

# Set production config in config/production.json
export NODE_ENV=production
```

**3. Start with PM2**
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Monitoring

### CloudWatch Metrics
- **QueueDepth** - Messages waiting in SQS
- **MessagesDelivered** - Successfully delivered messages
- **ActiveUsers** - Current WebSocket connections
- **ErrorCount** - Application errors

### PM2 Commands
```bash
pm2 status          # View service status
pm2 logs            # View logs
pm2 restart chat-app
pm2 monit           # Live monitoring
```

### API Endpoints
```bash
# Health check
GET /health

# Queue metrics
GET /api/chat/queue/metrics
Headers: access_token: <jwt>

# Worker status
GET /api/chat/worker/status
Headers: access_token: <jwt>
```

---


## Technical Decisions

### Why AWS SQS?
**Problem:** Socket.io only delivers to online users.  
**Solution:** Queue messages with automatic retries.  
**Trade-off:** +100ms latency, but guaranteed delivery.

### Why Separate Worker Process?
- Scales independently from API/Socket servers
- Independent failure domain
- Event-driven scaling based on queue depth

### Why MongoDB?
- Flexible schema for evolving message structure
- Nested documents eliminate joins
- Horizontal sharding by `chatId` for future scale

---


## Project Structure
```
chat-app-server/
├── config/              # Environment configs
├── db/model/            # Mongoose models
├── routes/              # API routes
├── services/
│   ├── monitoring/      # CloudWatch
│   ├── queue/           # SQS client
│   └── workers/         # Background worker
├── socket/              # Socket.io logic
├── auth/                # JWT auth
├── ecosystem.config.js  # PM2 config
└── index.js             # Entry point
```

---

## What I Learned

- Message queue patterns for reliable async processing
- Stateful vs stateless service architecture
- AWS SQS integration with retry policies
- CloudWatch custom metrics for observability
- Production deployment with PM2 and graceful shutdown
- Rate limiting and security best practices
- Horizontal scaling strategies for real-time apps

---

## 📄 License

MIT
