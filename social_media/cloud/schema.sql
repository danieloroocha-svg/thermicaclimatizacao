CREATE TABLE IF NOT EXISTS social_state (
  name TEXT PRIMARY KEY,
  ciphertext TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS social_lease (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  owner TEXT,
  expires_at INTEGER NOT NULL DEFAULT 0
);
INSERT OR IGNORE INTO social_lease(id,expires_at) VALUES(1,0);
