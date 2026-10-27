import { COURSE_ID } from "./course";
import { CS50 } from "./syllabus-cs50";

export type Topic = { n: number; title: string };
export type Module = { id: number; title: string; goal: string; topics: Topic[] };

const t = (n: number, title: string): Topic => ({ n, title });

const SYSTEM_DESIGN: Module[] = [
  {
    id: 1,
    title: "Asoslar va fikrlash usuli",
    goal: "Talablarni aniqlash, raqamlar bilan fikrlash, tarmoq va API qatlamini chuqur tushunish",
    topics: [
      t(1, "System design nima: talablar, trade-off va dizayn jarayoni"),
      t(2, "Latency raqamlari va back-of-envelope hisob-kitob"),
      t(3, "Throughput, latency, percentile (p50/p99), tail latency va Little qonuni"),
      t(4, "Mashina ichida: CPU cache, RAM, SSD/HDD, sequential vs random IO, page cache"),
      t(5, "Tarmoq: TCP/IP, handshake, congestion control, UDP"),
      t(6, "DNS: resolve jarayoni, TTL, anycast, DNS orqali load balancing"),
      t(7, "HTTP/1.1, HTTP/2, HTTP/3 (QUIC) va TLS 1.3"),
      t(8, "Real-time aloqa: polling, long polling, SSE, WebSocket, MQTT"),
      t(9, "API dizayn: REST, gRPC, GraphQL, pagination, versioning, idempotency key"),
      t(10, "Serialization va schema evolution: JSON, Protobuf, Avro"),
    ],
  },
  {
    id: 2,
    title: "Ma'lumot saqlashning ichki tuzilishi",
    goal: "Bazalar ichida nima bo'layotganini bilish: storage engine, indeks, tranzaksiya, izolyatsiya",
    topics: [
      t(11, "Ma'lumot modellari: relational, document, graph, wide-column, key-value"),
      t(12, "Storage engine asoslari: append-only log va hash index"),
      t(13, "LSM-tree, SSTable, compaction, Bloom filter"),
      t(14, "B-tree, WAL va B-tree vs LSM (write/read/space amplification)"),
      t(15, "Indekslar: secondary, composite, covering, partial, GIN/GiST va query planner"),
      t(16, "OLTP vs OLAP, column-oriented storage"),
      t(17, "Tranzaksiyalar: ACID ning haqiqiy ma'nosi"),
      t(18, "Isolation darajalari va anomaliyalar: lost update, write skew, phantom"),
      t(19, "MVCC, snapshot isolation va Serializable (2PL, SSI)"),
      t(20, "Baza tanlash: qaror freymvorki"),
    ],
  },
  {
    id: 3,
    title: "Masshtablash",
    goal: "Yuklama oshganda tizimni qanday kengaytirish: LB, cache, replication, sharding",
    topics: [
      t(21, "Vertical va horizontal scaling, stateless servislar"),
      t(22, "Load balancing: L4 vs L7, algoritmlar, health check"),
      t(23, "Caching strategiyalari: cache-aside, write-through, write-back, eviction"),
      t(24, "Caching muammolari: invalidation, stampede, hot key; Redis ichki tuzilishi"),
      t(25, "CDN va edge caching"),
      t(26, "Replication: single-leader, sync/async, replication lag"),
      t(27, "Multi-leader va leaderless replication, quorum"),
      t(28, "Partitioning (sharding): range, hash, rebalancing"),
      t(29, "Consistent hashing va virtual node"),
      t(30, "Sharding va secondary index, request routing, hot partition"),
    ],
  },
  {
    id: 4,
    title: "Distributed systems nazariyasi",
    goal: "Taqsimlangan tizimlarning fundamental cheklovlari va ularni yengish algoritmlari",
    topics: [
      t(31, "Distributed tizim muammolari: tarmoq, partial failure, timeout"),
      t(32, "Vaqt va soatlar: NTP, Lamport, vector clock, HLC"),
      t(33, "Consistency modellari: linearizability, causal, eventual"),
      t(34, "CAP va PACELC ni to'g'ri tushunish"),
      t(35, "Consensus muammosi, FLP natijasi, Paxos g'oyasi"),
      t(36, "Raft batafsil: leader election, log replication, safety"),
      t(37, "Distributed tranzaksiyalar: 2PC va uning muammolari"),
      t(38, "Leader election, distributed lock, lease va fencing token"),
      t(39, "Idempotency va exactly-once tushunchasi"),
      t(40, "CRDT va konfliktlarni hal qilish"),
    ],
  },
  {
    id: 5,
    title: "Asinxron tizimlar, messaging va streaming",
    goal: "Navbatlar, Kafka, event-driven arxitektura va ular atrofidagi patternlar",
    topics: [
      t(41, "Message queue asoslari: point-to-point vs pub/sub, delivery semantics"),
      t(42, "RabbitMQ va SQS modeli"),
      t(43, "Kafka arxitekturasi: log, partition, consumer group, offset"),
      t(44, "Kafka chuqur: replication, ISR, acks, retention, compaction"),
      t(45, "Stream processing: windowing, watermark, event time vs processing time"),
      t(46, "Event-driven arxitektura va event sourcing"),
      t(47, "CQRS"),
      t(48, "Transactional outbox va CDC"),
      t(49, "Saga pattern: orchestration vs choreography"),
      t(50, "Backpressure, dead letter queue, retry strategiyalari"),
    ],
  },
  {
    id: 6,
    title: "Arxitektura patternlari va qurilish bloklari",
    goal: "Servislarni ajratish, aloqa, gateway, rate limiting, ID, search, blob storage",
    topics: [
      t(51, "Monolit, modular monolit, microservices: qachon qaysi"),
      t(52, "Servis chegaralari: DDD va bounded context"),
      t(53, "Servislar aloqasi: sync vs async, service discovery"),
      t(54, "API Gateway va BFF"),
      t(55, "Service mesh va sidecar"),
      t(56, "Rate limiting: token bucket, sliding window, distributed rate limiter"),
      t(57, "Unique ID generatsiya: UUIDv7, Snowflake"),
      t(58, "Batch processing: MapReduce va Spark g'oyalari"),
      t(59, "Qidiruv tizimlari: inverted index va Elasticsearch"),
      t(60, "Object storage (S3) va fayl yuklash dizayni"),
    ],
  },
  {
    id: 7,
    title: "Ishonchlilik va operatsiyalar",
    goal: "Tizim buzilganda ham ishlashi, uni kuzatish va xavfsiz deploy qilish",
    topics: [
      t(61, "Reliability asoslari: fault vs failure, redundancy, SPOF"),
      t(62, "Timeout, retry, exponential backoff va jitter"),
      t(63, "Circuit breaker, bulkhead, load shedding"),
      t(64, "Cascading failure va graceful degradation"),
      t(65, "SLI, SLO, SLA va error budget"),
      t(66, "Observability: metrics, logs, traces, OpenTelemetry"),
      t(67, "Monitoring va alerting dizayni: RED va USE"),
      t(68, "Deploy strategiyalari: blue-green, canary, feature flag"),
      t(69, "Disaster recovery: RPO/RTO, backup, multi-region failover"),
      t(70, "Chaos engineering, incident management, postmortem"),
    ],
  },
  {
    id: 8,
    title: "Xavfsizlik va infratuzilma",
    goal: "Auth, multi-tenancy, Kubernetes, multi-region va xarajatni hisobga olgan dizayn",
    topics: [
      t(71, "Autentifikatsiya: session, JWT, OAuth2, OIDC"),
      t(72, "Avtorizatsiya: RBAC, ABAC, ReBAC (Zanzibar)"),
      t(73, "Multi-tenancy dizayni (SaaS)"),
      t(74, "Shifrlash, secrets boshqaruvi, mTLS"),
      t(75, "Konteynerlar va Kubernetes: system design nuqtai nazaridan"),
      t(76, "Autoscaling va capacity planning"),
      t(77, "Multi-region arxitektura va geo-routing"),
      t(78, "Data lifecycle: retention, arxivlash, data residency"),
      t(79, "Xarajatni hisobga olgan (cost-aware) dizayn"),
      t(80, "DDoS himoyasi va WAF"),
    ],
  },
  {
    id: 9,
    title: "Maxsus tizimlar",
    goal: "Time-series, geo, video, notification, to'lov va AI tizimlari dizayni",
    topics: [
      t(81, "Time-series ma'lumotlar: saqlash, downsampling, ClickHouse/TimescaleDB"),
      t(82, "Geospatial indekslash: geohash, quadtree, S2, H3, R-tree"),
      t(83, "Geofencing va proximity search"),
      t(84, "Video ingest va streaming: RTSP, HLS, transcoding"),
      t(85, "Notification tizimi: push, SMS, email"),
      t(86, "Real-time chat va presence"),
      t(87, "News feed: fan-out on write vs fan-out on read"),
      t(88, "To'lov tizimlari: ledger, double-entry, idempotency"),
      t(89, "Recommendation va ML serving asoslari"),
      t(90, "LLM tizimlari dizayni: RAG va inference serving"),
    ],
  },
  {
    id: 10,
    title: "Case study va yakuniy loyiha",
    goal: "O'rganilgan hamma narsani real tizimlarni boshidan oxirigacha loyihalashda qo'llash",
    topics: [
      t(91, "Interview va review freymvorki: dizaynni qanday taqdim etish"),
      t(92, "Case: URL shortener"),
      t(93, "Case: distributed key-value store (Dynamo)"),
      t(94, "Case: web crawler"),
      t(95, "Case: ride-hailing (Uber)"),
      t(96, "Case: fleet tracking platforma - 100k qurilmadan telemetriya"),
      t(97, "Case: collaborative editing (Google Docs)"),
      t(98, "Case: video platforma (YouTube)"),
      t(99, "Case: chipta sotish va flash sale (Ticketmaster)"),
      t(100, "Yakuniy loyiha: o'z tizimingizni to'liq dizayn qilish va review"),
    ],
  },
];

export const MODULES: Module[] = COURSE_ID === "cs50" ? CS50 : SYSTEM_DESIGN;

export const LINE_COLORS = [
  "#2f5bea", "#1f8a5b", "#b4441f", "#7a4ccf", "#0f8b9c",
  "#c28a12", "#c23a6b", "#4a6b2a", "#3d5a80", "#8a5a3c",
];

export const TOPICS: Topic[] = MODULES.flatMap((m) => m.topics);

export const moduleOf = (n: number): Module | undefined =>
  MODULES.find((m) => m.topics.some((x) => x.n === n));
